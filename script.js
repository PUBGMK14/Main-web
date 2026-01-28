document.addEventListener('DOMContentLoaded', () => {
  // 1. 기존 확률 버튼 동작
  const probabilityBtn = document.getElementById('btn-probability');
  if (probabilityBtn) {
    probabilityBtn.addEventListener('click', () => {
      const url = probabilityBtn.getAttribute('data-url');
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // 2. 실시간 배틀그라운드 시계 로직 (UTC & KST)
  const updateClock = () => {
    const now = new Date();

    // 시간 포맷 함수 (YYYY.MM.DD HH:mm:ss)
    const format = (date) => {
      const pad = (n) => String(n).padStart(2, '0');
      return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    // UTC 시간 계산
    const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    
    // 화면 업데이트
    const utcEl = document.getElementById('utc-time');
    const kstEl = document.getElementById('kst-time');

    if (utcEl) utcEl.textContent = format(utcTime);
    if (kstEl) kstEl.textContent = format(now); // 브라우저 기반 한국 시간
  };

  // 1초마다 실행
  setInterval(updateClock, 1000);
  updateClock(); // 페이지 로드 즉시 실행
});

