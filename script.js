// 실시간 시계
function updateClock() {
    try {
        const now = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const format = (date) =>
            `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

        const utcTime = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));

        const utcEl = document.getElementById('utc-time');
        const kstEl = document.getElementById('kst-time');

        if (utcEl) utcEl.textContent = format(utcTime);
        if (kstEl) kstEl.textContent = format(now);
    } catch (e) {
        console.error("시계 오류:", e);
    }
}

setInterval(updateClock, 1000);
updateClock();

// 확률 계산기 버튼
const probBtn = document.getElementById('btn-probability');
if (probBtn) {
    probBtn.onclick = () => {
        const url = probBtn.getAttribute('data-url');
        if (url) window.open(url, '_blank', 'noopener,noreferrer');
    };
}
