(() => {
  'use strict';

  // -----------------------------------------------------------------------
  // Elements
  // -----------------------------------------------------------------------
  const heartField = document.getElementById('heartField');
  const questionScreen = document.getElementById('questionScreen');
  const successScreen = document.getElementById('successScreen');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const teaseMessage = document.getElementById('teaseMessage');
  const confettiLayer = document.getElementById('confettiLayer');
  const moreSurpriseBtn = document.getElementById('moreSurpriseBtn');
  const bonusSurprise = document.getElementById('bonusSurprise');
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');

  const HEART_SYMBOLS = ['💜', '❤️', '🤍', '💕', '💗', '💖', '💞', '💓'];

  let noAttempts = 0;

  // -----------------------------------------------------------------------
  // Ambient floating hearts (background layer)
  // -----------------------------------------------------------------------
  function spawnFloatingHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];

    const leftPercent = Math.random() * 100;
    const size = 1 + Math.random() * 1.4; // rem
    const floatDuration = 9 + Math.random() * 7; // seconds
    const swayDuration = 3 + Math.random() * 3;

    heart.style.left = `${leftPercent}%`;
    heart.style.fontSize = `${size}rem`;
    heart.style.animationDuration = `${floatDuration}s, ${swayDuration}s`;

    heartField.appendChild(heart);
    setTimeout(() => heart.remove(), floatDuration * 1000 + 500);
  }

  for (let i = 0; i < 6; i++) {
    setTimeout(() => spawnFloatingHeart(), i * 900);
  }
  setInterval(spawnFloatingHeart, 1400);

  // -----------------------------------------------------------------------
  // Playful "NO" messages
  // -----------------------------------------------------------------------
  const MESSAGES = [
    'Are you sure, babi?',
    'Emggkkkkk.',
    'Ngek maliii.',
    'BLEBLBELBEBELBLEBLEBELBEBLEBLEBLEBBELBLEBELBEBLEBLE.',
    'Nyenyenyenye.',
    'Babi naman.',
    "You can't escape YES.",
    'The YES button is getting bigger.',
    'Nice try, babi.',
    'Just say YES.',
  ];

  function showTeaseMessage() {
    const text = MESSAGES[Math.min(noAttempts, MESSAGES.length) - 1] || MESSAGES[MESSAGES.length - 1];
    teaseMessage.style.animation = 'none';
    void teaseMessage.offsetWidth; // restart the pop animation
    teaseMessage.style.animation = '';
    teaseMessage.textContent = text;
  }

  // -----------------------------------------------------------------------
  // NO button evasion + YES button growth
  // -----------------------------------------------------------------------
  const MAX_SCALE = 2.6;
  const SCALE_STEP = 0.16;

  function growYesButton() {
    const scale = Math.min(1 + noAttempts * SCALE_STEP, MAX_SCALE);
    yesBtn.style.transform = `scale(${scale})`;
  }

  function moveNoButton() {
    const rect = noBtn.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const margin = 12;
    const maxX = Math.max(margin, window.innerWidth - width - margin);
    const maxY = Math.max(margin, window.innerHeight - height - margin);

    const randomX = margin + Math.random() * (maxX - margin);
    const randomY = margin + Math.random() * (maxY - margin);

    if (!noBtn.classList.contains('escaping')) {
      noBtn.classList.add('escaping');
    }

    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
  }

  function handleNoAttempt(event) {
    if (event && event.preventDefault) event.preventDefault();

    noAttempts += 1;
    moveNoButton();
    growYesButton();
    showTeaseMessage();
  }

  noBtn.addEventListener('pointerdown', handleNoAttempt);
  noBtn.addEventListener('mouseenter', () => {
    if (noAttempts > 0) moveNoButton();
  });
  noBtn.addEventListener('click', handleNoAttempt);
  noBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleNoAttempt(e);
    }
  });

  window.addEventListener('resize', () => {
    if (noBtn.classList.contains('escaping')) moveNoButton();
  });

  // -----------------------------------------------------------------------
  // YES → celebration
  // -----------------------------------------------------------------------
  function burstConfetti() {
    const count = 42;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('span');
      piece.className = 'confetti-heart';
      piece.textContent = HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)];
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.fontSize = `${0.9 + Math.random() * 1.3}rem`;
      const duration = 3 + Math.random() * 2.5;
      piece.style.animationDuration = `${duration}s`;
      piece.style.animationDelay = `${Math.random() * 1.2}s`;
      confettiLayer.appendChild(piece);
      setTimeout(() => piece.remove(), (duration + 1.5) * 1000);
    }
  }

  function revealSuccessScreen() {
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
    burstConfetti();
    setTimeout(burstConfetti, 900);
  }

  yesBtn.addEventListener('click', () => {
    revealSuccessScreen();
  });

  moreSurpriseBtn.addEventListener('click', () => {
    bonusSurprise.classList.remove('hidden');
    moreSurpriseBtn.classList.add('hidden');
  });

  // -----------------------------------------------------------------------
  // Music toggle (never autoplays — user must opt in)
  // -----------------------------------------------------------------------
  let isPlaying = false;
  musicToggle.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play().catch(() => {
        /* file may be missing until you add your own song — that's fine */
      });
    }
    isPlaying = !isPlaying;
    musicToggle.setAttribute('aria-pressed', String(isPlaying));
    musicToggle.querySelector('.music-label').textContent = isPlaying ? 'Playing 💜' : 'Music 💜';
  });
})();
