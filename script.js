import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getDatabase, ref, runTransaction, get } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-database.js";

// 1. Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyAIYpdLy7Wb2AUAnx9IGQumKj5Q-1Vg9Yc",
  authDomain: "main-web-1.firebaseapp.com",
  projectId: "main-web-",
  storageBucket: "main-web-1.firebasestorage.app",
  messagingSenderId: "452463851103",
  appId: "1:452463851103:web:7655a681336c908c11cdea",
  measurementId: "G-BDJGNV02VW",
  databaseURL: "https://main-web-1-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// 2. 실시간 시계 로직
function updateClock() {
    try {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const format = (date) => `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        
        const utcEl = document.getElementById('utc-time');
        const kstEl = document.getElementById('kst-time');
        
        if (utcEl) utcEl.textContent = format(utcTime);
        if (kstEl) kstEl.textContent = format(now);
    } catch (e) { console.error("시계 오류:", e); }
}
setInterval(updateClock, 1000);
updateClock();

// 3. 오늘 날짜 (KST)
const nowKst = new Date(new Date().getTime() + (9 * 60 * 60 * 1000));
const todayStr = nowKst.toISOString().split('T')[0];

// 4. 방문자 카운터 (방어 로직 강화)
const dailyEl = document.getElementById('daily-visitors-count');
const totalEl = document.getElementById('visitors-count');

// [숫자 전용 트랜잭션 함수]
const safeCounter = (current) => {
    // 만약 현재 데이터가 숫자가 아니면 무조건 1로 시작 (오염 차단)
    if (current === null || typeof current !== 'number') return 1;
    return current + 1;
};

// TODAY 로직
const dailyRef = ref(db, `stats/daily/${todayStr}`);
const dailyKey = `hasVisited_daily_${todayStr}`;

if (!localStorage.getItem(dailyKey)) {
    runTransaction(dailyRef, safeCounter).then(res => {
        if(dailyEl && res.committed) dailyEl.innerText = res.snapshot.val();
        localStorage.setItem(dailyKey, 'true');
    }).catch(err => console.error("Today Error:", err));
} else {
    get(dailyRef).then(snap => { if(dailyEl) dailyEl.innerText = snap.val() || 0; });
}

// TOTAL 로직
const totalRef = ref(db, 'stats/totalVisitors');
const totalKey = 'hasVisited_total_forever';

if (!localStorage.getItem(totalKey)) {
    runTransaction(totalRef, safeCounter).then(res => {
        if(totalEl && res.committed) totalEl.innerText = res.snapshot.val();
        localStorage.setItem(totalKey, 'true');
    }).catch(err => console.error("Total Error:", err));
} else {
    get(totalRef).then(snap => { if(totalEl) totalEl.innerText = snap.val() || 0; });
}

// 5. 버튼 연동
const probBtn = document.getElementById('btn-probability');
if (probBtn) {
    probBtn.onclick = () => {
        const url = probBtn.getAttribute('data-url');
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };
}
