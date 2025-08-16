// 버튼 동작 및 상호작용 스크립트
document.addEventListener('DOMContentLoaded', () => {
  const probabilityBtn = document.getElementById('btn-probability');
  if (probabilityBtn) {
    probabilityBtn.addEventListener('click', () => {
      const url = probabilityBtn.getAttribute('data-url');
      if (url) {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  }
});
