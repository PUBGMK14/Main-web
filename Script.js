* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background:
    radial-gradient(circle at 20% 50%, rgba(255, 69, 0, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 140, 0, 0.4) 0%, transparent 50%),
    radial-gradient(circle at 40% 80%, rgba(255, 69, 0, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #000000 0%, #1a0a00 30%, #2d1b00 60%, #1a0a00 100%);
  min-height: 100vh;
  font-family: 'Orbitron', monospace;
  overflow-x: hidden;
  position: relative;
}

/* 전체적인 스캔라인 효과 */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(255, 204, 0, 0.03) 2px,
    rgba(255, 204, 0, 0.03) 4px
  );
  pointer-events: none;
  z-index: 1;
}

/* 헥스 패턴 배경 */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffcc00' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.1;
  animation: hexMove 30s linear infinite;
  pointer-events: none;
  z-index: 0;
}

@keyframes hexMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(60px, 60px); }
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 100vw;
  margin: 0 auto;
}

/* 경고 메시지 스타일 */
.warning-banner {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 0, 0, 0.2);
  border: 2px solid #ff4444;
  border-radius: 10px;
  padding: 10px 20px;
  color: #ff6666;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: warningPulse 2s ease-in-out infinite;
  backdrop-filter: blur(10px);
}

@keyframes warningPulse {
  0%, 100% { opacity: 0.7; box-shadow: 0 0 5px rgba(255, 68, 68, 0.3); }
  50% { opacity: 1; box-shadow: 0 0 20px rgba(255, 68, 68, 0.6); }
}

/* 메인 로고 */
.logo-container {
  text-align: center;
  margin-bottom: 60px;
  margin-top: 40px;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo-title {
  color: #ffcc00;
  font-size: 72px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 12px;
  text-shadow:
    0 0 10px rgba(255, 204, 0, 0.8),
    0 0 20px rgba(255, 204, 0, 0.6),
    0 0 40px rgba(255, 204, 0, 0.4),
    0 0 80px rgba(255, 204, 0, 0.2);
  margin-bottom: 15px;
  position: relative;
  animation: titleGlitch 4s ease-in-out infinite;
}

.logo-title::before {
  content: 'PUBG INFO';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: #ff4444;
  animation: glitchShift 4s ease-in-out infinite;
  opacity: 0;
}

@keyframes titleGlitch {
  0%, 90%, 100% { transform: translate(0); }
  92% { transform: translate(-2px, 2px); }
  94% { transform: translate(2px, -2px); }
  96% { transform: translate(-1px, 1px); }
}

@keyframes glitchShift {
  0%, 90%, 100% { opacity: 0; transform: translate(0); }
  92% { opacity: 0.8; transform: translate(2px, -2px); }
  94% { opacity: 0.6; transform: translate(-2px, 2px); }
  96% { opacity: 0.4; transform: translate(1px, -1px); }
}

.logo-subtitle {
  color: #ff6600;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  opacity: 0.9;
  text-shadow: 0 0 10px rgba(255, 102, 0, 0.5);
}

/* 레이더 효과 */
.radar-container {
  position: absolute;
  top: -80px;
  left: 50%;
  transform: translateX(-50%);
  width: 350px;
  height: 350px;
  border-radius: 50%;
  opacity: 0.8;
}

.radar-ring {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 204, 0, 0.4);
  animation: radarPulse 4s ease-in-out infinite;
}

.radar-ring:nth-child(1) {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  animation-delay: 0s;
}

.radar-ring:nth-child(2) {
  width: 70%;
  height: 70%;
  top: 15%;
  left: 15%;
  animation-delay: 1s;
  border-color: rgba(255, 140, 0, 0.5);
}

.radar-ring:nth-child(3) {
  width: 40%;
  height: 40%;
  top: 30%;
  left: 30%;
  animation-delay: 2s;
  border-color: rgba(255, 69, 0, 0.6);
}

.radar-sweep {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3px;
  height: 175px;
  background: linear-gradient(to bottom,
    rgba(255, 204, 0, 0.9) 0%,
    rgba(255, 140, 0, 0.7) 40%,
    rgba(255, 69, 0, 0.4) 70%,
    transparent 100%);
  transform-origin: bottom center;
  animation: radarSweep 5s linear infinite;
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(255, 204, 0, 0.5);
}

.radar-sweep::before {
  content: '';
  position: absolute;
  top: 0;
  left: -10px;
  width: 23px;
  height: 175px;
  background: conic-gradient(from 0deg,
    transparent 0deg,
    rgba(255, 204, 0, 0.1) 10deg,
    rgba(255, 204, 0, 0.3) 20deg,
    rgba(255, 204, 0, 0.1) 30deg,
    transparent 40deg);
  border-radius: 0 175px 175px 0;
}

@keyframes radarSweep {
  0% { transform: translate(-50%, -100%) rotate(0deg); }
  100% { transform: translate(-50%, -100%) rotate(360deg); }
}

@keyframes radarPulse {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
    border-width: 1px;
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
    border-width: 2px;
    box-shadow: 0 0 20px rgba(255, 204, 0, 0.3);
  }
}

/* 버튼 컨테이너 - 자동으로 크기 조정 */
.buttons-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
  max-width: 1200px;
  width: 100%;
  padding: 0 20px;
  justify-items: center;
  place-items: center;
}

.pubg-button {
  background: linear-gradient(145deg,
    rgba(255, 204, 0, 0.9) 0%,
    rgba(255, 140, 0, 0.9) 50%,
    rgba(255, 69, 0, 0.9) 100%);
  color: #000000;
  border: 3px solid rgba(255, 204, 0, 0.8);
  padding: 25px 20px;
  font-size: 16px;
  font-weight: 900;
  font-family: 'Orbitron', monospace;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 0 20px rgba(255, 204, 0, 0.3);
  width: 100%;
  max-width: 350px;
  justify-self: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* 버튼 스캔 효과 */
.pubg-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent);
  transition: left 0.6s ease;
}

.pubg-button::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.pubg-button:hover::before {
  left: 100%;
}

.pubg-button:hover::after {
  opacity: 1;
}

.pubg-button:hover {
  background: linear-gradient(145deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 204, 0, 0.95) 50%,
    rgba(255, 140, 0, 0.95) 100%);
  transform: translateY(-5px) scale(1.05);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.7),
    0 0 50px rgba(255, 204, 0, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.9);
}

.pubg-button:active {
  transform: translateY(-2px) scale(1.02);
  box-shadow:
    0 10px 20px rgba(0, 0, 0, 0.5),
    0 0 30px rgba(255, 204, 0, 0.4);
}

/* 버튼 아이콘 라벨 */
.btn-ios::after { content: '⚡ UC IOS'; font-size: 14px; display: block; margin-top: 5px; }
.btn-aos::after { content: '🔥 UC AOS'; font-size: 14px; display: block; margin-top: 5px; }
.btn-budget-ios::after { content: '💵 Budget iOS'; font-size: 14px; display: block; margin-top: 5px; }
.btn-budget-aos::after { content: '💴 Budget AOS'; font-size: 14px; display: block; margin-top: 5px; }
.btn-calc::after { content: '🎯 CALCULATOR'; font-size: 14px; display: block; margin-top: 5px; }
.btn-tiktok::after { content: '🎵 TIKTOK'; font-size: 14px; display: block; margin-top: 5px; }
.btn-kakaotlak::after { content: '💬 KAKAO TALK'; font-size: 14px; display: block; margin-top: 5px; }
/* 코너 UI 요소들 */
.corner-ui {
  position: fixed;
  font-size: 12px;
  color: rgba(255, 204, 0, 0.7);
  font-weight: bold;
  z-index: 10;
}

.corner-ui.top-left { top: 20px; left: 20px; }
.corner-ui.top-right { top: 20px; right: 20px; }
.corner-ui.bottom-left { bottom: 20px; left: 20px; }
.corner-ui.bottom-right { bottom: 20px; right: 20px; }

/* 반응형 */
@media (max-width: 768px) {
  .logo-title {
    font-size: 48px;
    letter-spacing: 6px;
  }
  .buttons-container {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 0 10px;
  }
  .pubg-button {
    padding: 20px 15px;
    font-size: 14px;
  }
  .radar-container {
    width: 250px;
    height: 250px;
    top: -60px;
  }
  .radar-sweep {
    height: 100px;
  }
}

/* 등장 애니메이션 공통 */
@keyframes loadIn {
  to { opacity: 1; transform: translateY(0); }
}
/* 기본 값: 시작 시 숨김 */
.load-in {
  opacity: 0;
  transform: translateY(50px);
}
/* 로고 블록은 별도 지연 */
.logo-container.load-in {
  animation: loadIn 1.2s ease-out forwards;
  animation-delay: 0.3s;
}
/* 버튼들 계단식 지연 (7개 전부) */
.buttons-container .pubg-button.load-in {
  animation: loadIn 1.2s ease-out forwards;
}
.buttons-container .pubg-button.load-in:nth-child(1) { animation-delay: 0.3s; }
.buttons-container .pubg-button.load-in:nth-child(2) { animation-delay: 0.5s; }
.buttons-container .pubg-button.load-in:nth-child(3) { animation-delay: 0.7s; }
.buttons-container .pubg-button.load-in:nth-child(4) { animation-delay: 0.9s; }
.buttons-container .pubg-button.load-in:nth-child(5) { animation-delay: 1.1s; }
.buttons-container .pubg-button.load-in:nth-child(6) { animation-delay: 1.3s; }
.buttons-container .pubg-button.load-in:nth-child(7) { animation-delay: 1.5s; }

<div class="buttons-container">
  <a class="pubg-button btn-ios load-in" href="http://pubgmk14-ios.kro.kr">IOS SITE</a>
  <a class="pubg-button btn-aos load-in" href="http://pubgmk14-aos.kro.kr">AOS SITE</a>
  <a class="pubg-button btn-budget-ios load-in" href="https://pubgmk14-budget-ios.kro.kr">Budget IOS</a>
  <a class="pubg-button btn-budget-aos load-in" href="https://pubgmk14-budget-aos.kro.kr">Budget AOS</a>
  <div class="pubg-button btn-calc load-in" onclick="window.open('http://pubgmk14-probability.kro.kr', '_blank')">PROBABILITY</div>
  <a class="pubg-button btn-tiktok load-in" href="https://www.tiktok.com/@pubginfo_kr?_t=ZS-8yDPN1MIZdJ&_r=1">TIKTOK</a>
  <a class="pubg-button btn-kakaotlak load-in" href="https://open.kakao.com/o/gxqkyr7f">KAKAO TALK</a>
</div>
