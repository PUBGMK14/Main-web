import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, runTransaction, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// 1. Firebase 설정 (projectId 등 오타 수정 확인)
const firebaseConfig = {
  apiKey: "AIzaSyAIYpdLy7Wb2AUAnx9IGQumKj5Q-1Vg9Yc",
  authDomain: "main-web-1.firebaseapp.com",
  projectId: "main-web-1", // 'main-web-'에서 'main-web-1'로 수정 확인 필요
  storageBucket: "main-web-1.firebasestorage.app",
  messagingSenderId: "452463851103",
  appId: "1:452463851103:web:7655a681336c908c11cdea",
  measurementId: "G-BDJGNV02VW",
  databaseURL: "https://main-web-1-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

// 2. 실시간 시계 로직 (기존 유지)
function updateClock() {
    try {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const format = (date) => `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
        
        // UTC 계산 수정
        const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
        
        const utcEl = document.getElementById('utc-time');
        const kstEl = document.getElementById('kst-time');
        
        if (utcEl) utcEl.textContent = format(utcTime);
        if (kstEl) kstEl.textContent = format(now);
    } catch (e) { console.error("시계 오류:", e); }
}
setInterval(updateClock, 1000);
updateClock();

// 3. 방문자 카운터 로직 개선
const dailyEl = document.getElementById('daily-visitors-count');
const totalEl = document.getElementById('visitors-count');

// 현재 날짜 구하기 (KST 기준)
const now = new Date();
const kstNow = new Date(now.getTime() + (9 * 60 * 60 * 1000));
const todayStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

const safeCounter = (current) => (current || 0) + 1;

async function handleVisitors() {
    const dailyKey = `visited_daily_${todayStr}`;
    const totalKey = `visited_total_all`;

    // A. TODAY 카운트 (하루 한 번)
    const dailyRef = ref(db, `stats/daily/${todayStr}`);
    if (!localStorage.getItem(dailyKey)) {
        await runTransaction(dailyRef, safeCounter);
        localStorage.setItem(dailyKey, 'true');
    }
    // 화면 업데이트
    get(dailyRef).then(snap => { if(dailyEl) dailyEl.innerText = snap.val() || 0; });

    // B. TOTAL 카운트 (영구 한 번)
    const totalRef = ref(db, 'stats/totalVisitors');
    if (!localStorage.getItem(totalKey)) {
        await runTransaction(totalRef, safeCounter);
        localStorage.setItem(totalKey, 'true');
    }
    // 화면 업데이트
    get(totalRef).then(snap => { if(totalEl) totalEl.innerText = snap.val() || 0; });
}

handleVisitors().catch(err => console.error("Visitor Counter Error:", err));

// 4. 버튼 이벤트 (기존 유지)
const probBtn = document.getElementById('btn-probability');
if (probBtn) {
    probBtn.onclick = () => {
        const url = probBtn.getAttribute('data-url');
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };
}
