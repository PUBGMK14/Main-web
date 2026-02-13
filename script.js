/**
 * [최종 통합 스크립트]
 * 기능: 실시간 시계(UTC/KST), 오늘 방문자, 전체 방문자, 확률 계산기 연동
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, runTransaction, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 1. Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyAF953mfSaCRBlJlUmHKJWGQeFSxqpVMZg",
  authDomain: "main-web-14.firebaseapp.com",
  databaseURL: "https://main-web-14-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "main-web-14",
  storageBucket: "main-web-14.firebasestorage.app",
  messagingSenderId: "85078611766",
  appId: "1:85078611766:web:539188365463d6c4db8597"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. 실시간 시계 로직 (최상단 배치하여 즉시 실행)
function updateClock() {
    try {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        
        // 날짜 및 시간 포맷 함수
        const format = (date) => `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        
        // UTC 시간 계산
        const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        
        const utcEl = document.getElementById('utc-time');
        const kstEl = document.getElementById('kst-time');
        
        // 화면에 시간 출력
        if (utcEl) utcEl.textContent = format(utcTime);
        if (kstEl) kstEl.textContent = format(now);
    } catch (e) {
        console.error("시계 업데이트 중 오류 발생:", e);
    }
}

// 시계 시작 (1초마다 반복)
setInterval(updateClock, 1000);
updateClock();

// 3. 오늘 날짜 구하기 (한국 시간 기준 YYYY-MM-DD)
const nowKst = new Date(new Date().getTime() + (9 * 60 * 60 * 1000));
const todayStr = nowKst.toISOString().split('T')[0];

// 4. 방문자 카운터 로직
const dailyEl = document.getElementById('daily-visitors-count');
const totalEl = document.getElementById('visitors-count');

/**
 * [A] TODAY (오늘 방문자)
 * 날짜별로 별도의 경로에 저장하여 하루 단위로 집계
 */
const dailyRef = ref(db, `stats/daily/${todayStr}`);
const dailyKey = `hasVisited_daily_${todayStr}`;

if (!localStorage.getItem(dailyKey)) {
    // 오늘 처음 접속한 유저라면 DB 숫자 +1
    runTransaction(dailyRef, (current) => {
        // 방어 로직: DB 값이 숫자가 아니면 1로 초기화하여 저장
        if (typeof current !== 'number') return 1;
        return current + 1;
    }).then(res => {
        if(dailyEl && res.committed) {
            dailyEl.innerText = res.snapshot.val();
        }
        localStorage.setItem(dailyKey, 'true'); // 오늘 방문 완료 기록
    }).catch(err => console.error("Today 업데이트 오류:", err));
} else {
    // 이미 오늘 온 유저라면 현재 숫자만 가져오기
    get(dailyRef).then(snap => {
        if(dailyEl) dailyEl.innerText = snap.val() || 0;
    });
}

/**
 * [B] TOTAL (전체 누적 방문자)
 * 사이트 개설 이후 모든 유니크 방문자 수
 */
const totalRef = ref(db, 'stats/totalVisitors');
const totalKey = 'hasVisited_total_forever';

if (!localStorage.getItem(totalKey)) {
    // 사이트 생전 처음 온 유저라면 DB 숫자 +1
    runTransaction(totalRef, (current) => {
        // 방어 로직: HTML 태그 등이 침범하지 못하도록 숫자로 강제 변환
        if (typeof current !== 'number') return 1;
        return current + 1;
    }).then(res => {
        if(totalEl && res.committed) {
            totalEl.innerText = res.snapshot.val();
        }
        localStorage.setItem(totalKey, 'true'); // 영구 방문 기록 저장
    }).catch(err => console.error("Total 업데이트 오류:", err));
} else {
    // 이미 온 적 있는 유저라면 현재 숫자만 가져오기
    get(totalRef).then(snap => {
        if(totalEl) totalEl.innerText = snap.val() || 0;
    });
}

// 5. 확률 계산기 버튼 외부 링크 연동
const probBtn = document.getElementById('btn-probability');
if (probBtn) {
    probBtn.onclick = () => {
        const url = probBtn.getAttribute('data-url');
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };
}
