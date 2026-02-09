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

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
  // 2. 확률 버튼 동작
  const probabilityBtn = document.getElementById('btn-probability');
  if (probabilityBtn) {
    probabilityBtn.addEventListener('click', () => {
      const url = probabilityBtn.getAttribute('data-url');
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    });
  }

  // 3. 시계 로직
  const updateClock = () => {
    const now = new Date();
    const format = (date) => {
      const pad = (n) => String(n).padStart(2, '0');
      return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };
    const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const utcEl = document.getElementById('utc-time');
    const kstEl = document.getElementById('kst-time');
    if (utcEl) utcEl.textContent = format(utcTime);
    if (kstEl) kstEl.textContent = format(now);
  };
  setInterval(updateClock, 1000);
  updateClock();

  // 4. Firebase 카운터 로직
  const viewsEl = document.getElementById('views-count');
  const visitorsEl = document.getElementById('visitors-count');

  // 전체 조회수(Views) 증가
  runTransaction(ref(db, 'stats/totalViews'), (current) => (current || 0) + 1)
    .then(res => { if(viewsEl) viewsEl.innerText = res.snapshot.val(); });

  // 방문자수(Visitors) 증가 (로컬 스토리지를 이용해 하루 한 번만)
  const storageKey = 'hasVisited_pubgInfo';
  if (!localStorage.getItem(storageKey)) {
    runTransaction(ref(db, 'stats/totalVisitors'), (current) => (current || 0) + 1)
      .then(res => {
        if(visitorsEl) visitorsEl.innerText = res.snapshot.val();
        localStorage.setItem(storageKey, 'true');
      });
  } else {
    get(ref(db, 'stats/totalVisitors')).then(snap => {
      if(visitorsEl) visitorsEl.innerText = snap.val() || 0;
    });
  }
});
