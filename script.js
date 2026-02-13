// Firebase 라이브러리 불러오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, runTransaction, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

// 1. Firebase 설정 (질문자님 프로젝트 전용 키)
const firebaseConfig = {
  apiKey: "AIzaSyAF953mfSaCRBlJlUmHKJWGQeFSxqpVMZg",
  authDomain: "main-web-14.firebaseapp.com",
  databaseURL: "https://main-web-14-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "main-web-14",
  storageBucket: "main-web-14.firebasestorage.app",
  messagingSenderId: "85078611766",
  appId: "1:85078611766:web:539188365463d6c4db8597"
};

// Firebase 시작 및 DB 연결
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. 현재 한국 시간(KST) 기준으로 '오늘 날짜' 계산 (YYYY-MM-DD 형식)
const nowKst = new Date(new Date().getTime() + (9 * 60 * 60 * 1000));
const todayStr = nowKst.toISOString().split('T')[0];

// 3. 실시간 시계 로직 (UTC & KST)
function updateClock() {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const format = (date) => `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    
    const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    
    const utcEl = document.getElementById('utc-time');
    const kstEl = document.getElementById('kst-time');
    
    if (utcEl) utcEl.textContent = format(utcTime);
    if (kstEl) kstEl.textContent = format(now);
}

// 1초마다 시계 업데이트 실행
setInterval(updateClock, 1000);
updateClock();

// 4. 방문자 카운터 로직
const dailyEl = document.getElementById('daily-visitors-count'); // TODAY 표시 태그
const totalEl = document.getElementById('visitors-count');       // TOTAL 표시 태그

// [A] TODAY 방문자 처리 (날짜별로 DB에 따로 저장됨)
const dailyRef = ref(db, `stats/daily/${todayStr}`);
const dailyKey = `hasVisited_daily_${todayStr}`; // 오늘 방문했는지 기록하는 열쇠

if (!localStorage.getItem(dailyKey)) {
    // 오늘 처음 들어온 사람이라면 DB 숫자 +1
    runTransaction(dailyRef, (current) => (Number(current) || 0) + 1).then(res => {
        if(dailyEl) dailyEl.innerText = res.snapshot.val();
        localStorage.setItem(dailyKey, 'true'); // 오늘 방문 완료 기록
    });
} else {
    // 오늘 이미 왔던 사람이라면 DB 숫자만 읽어오기
    get(dailyRef).then(snap => {
        if(dailyEl) dailyEl.innerText = snap.val() || 0;
    });
}

// [B] TOTAL(누적) 방문자 처리
const totalRef = ref(db, 'stats/totalVisitors');
const totalKey = 'hasVisited_total_forever'; // 이 사이트에 평생 한 번이라도 왔는지 기록

if (!localStorage.getItem(totalKey)) {
    // 이 사이트 자체가 처음인 사람이라면 DB 숫자 +1
    runTransaction(totalRef, (current) => (Number(current) || 0) + 1).then(res => {
        if(totalEl) totalEl.innerText = res.snapshot.val();
        localStorage.setItem(totalKey, 'true'); // 평생 방문 완료 기록
    });
} else {
    // 이미 온 적 있는 사람이라면 DB 숫자만 읽어오기
    get(totalRef).then(snap => {
        if(totalEl) totalEl.innerText = snap.val() || 0;
    });
}

// 5. 기존 확률 계산기 버튼 로직
const probBtn = document.getElementById('btn-probability');
if (probBtn) {
    probBtn.onclick = () => {
        const url = probBtn.getAttribute('data-url');
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };
}
