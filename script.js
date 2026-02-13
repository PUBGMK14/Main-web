/**
 * [최종 통합 스크립트 - 보완 완료]
 * 변경사항: 새로운 DB 주소 연결 및 데이터 오염 방지 로직 강화
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, runTransaction, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 1. 새로운 Firebase 설정 (main-web-1 프로젝트 정보 적용)
const firebaseConfig = {
  apiKey: "AIzaSyAIYpdLy7Wb2AUAnx9IGQumKj5Q-1Vg9Yc",
  authDomain: "main-web-1.firebaseapp.com",
  projectId: "main-web-1",
  storageBucket: "main-web-1.firebasestorage.app",
  messagingSenderId: "452463851103",
  appId: "1:452463851103:web:7655a681336c908c11cdea",
  measurementId: "G-BDJGNV02VW",
  // 새로 만드신 데이터베이스 주소를 반드시 포함해야 합니다.
  databaseURL: "https://main-web-1-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. 실시간 시계 로직 (방해받지 않도록 최상단 실행)
function updateClock() {
    try {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const format = (date) => `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        
        // UTC 시간 계산
        const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        
        const utcEl = document.getElementById('utc-time');
        const kstEl = document.getElementById('kst-time');
        
        if (utcEl) utcEl.textContent = format(utcTime);
        if (kstEl) kstEl.textContent = format(now);
    } catch (e) {
        console.error("시계 업데이트 중 오류 발생:", e);
    }
}
setInterval(updateClock, 1000);
updateClock();

// 3. 오늘 날짜 구하기 (한국 시간 기준)
const nowKst = new Date(new Date().getTime() + (9 * 60 * 60 * 1000));
const todayStr = nowKst.toISOString().split('T')[0];

// 4. 방문자 카운터 로직
const dailyEl = document.getElementById('daily-visitors-count');
const totalEl = document.getElementById('visitors-count');

// [A] TODAY (오늘 방문자)
const dailyRef = ref(db, `stats/daily/${todayStr}`);
const dailyKey = `hasVisited_daily_${todayStr}`;

if (!localStorage.getItem(dailyKey)) {
    runTransaction(dailyRef, (current) => {
        // 숫자만 들어가도록 확실하게 체크 (태그 오염 원천 차단)
        return (typeof current === 'number') ? current + 1 : 1;
    }).then(res => {
        if(dailyEl && res.committed) dailyEl.innerText = res.snapshot.val();
        localStorage.setItem(dailyKey, 'true');
    }).catch(err => console.error("Today 카운트 에러:", err));
} else {
    get(dailyRef).then(snap => { if(dailyEl) dailyEl.innerText = snap.val() || 0; });
}

// [B] TOTAL (전체 방문자)
const totalRef = ref(db, 'stats/totalVisitors');
const totalKey = 'hasVisited_total_forever';

if (!localStorage.getItem(totalKey)) {
    runTransaction(totalRef, (current) => {
        // 숫자만 들어가도록 확실하게 체크
        return (typeof current === 'number') ? current + 1 : 1;
    }).then(res => {
        if(totalEl && res.committed) totalEl.innerText = res.snapshot.val();
        localStorage.setItem(totalKey, 'true');
    }).catch(err => console.error("Total 카운트 에러:", err));
} else {
    get(totalRef).then(snap => { if(totalEl) totalEl.innerText = snap.val() || 0; });
}

// 5. 버튼 외부 링크 연동
const probBtn = document.getElementById('btn-probability');
if (probBtn) {
    probBtn.onclick = () => {
        const url = probBtn.getAttribute('data-url');
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };
}
