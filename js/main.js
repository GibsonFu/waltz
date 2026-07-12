// hero video autoplay fallback (some browsers block until interaction)
const heroVideo = document.querySelector('.hero-v video');
if (heroVideo) {
  const tryPlay = () => { heroVideo.play().catch(() => {}); };
  tryPlay();
  window.addEventListener('load', tryPlay, { once: true });
  ['click', 'touchstart', 'scroll'].forEach(ev =>
    window.addEventListener(ev, tryPlay, { once: true, passive: true }));
}

// menu toggle
const tg = document.querySelector('.menu-toggle');
if (tg) tg.addEventListener('click', () => document.querySelector('nav.menu').classList.toggle('open'));

// scroll reveal
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// GAD-7 quiz scoring (service page)
const quiz = document.querySelector('.quiz');
if (quiz) {
  const out = quiz.querySelector('.quiz-result');
  quiz.addEventListener('change', () => {
    let total = 0, answered = 0;
    for (let i = 1; i <= 7; i++) {
      const c = quiz.querySelector(`input[name="q${i}"]:checked`);
      if (c) { total += +c.value; answered++; }
    }
    if (!answered) return;
    let verdict = '輕微焦慮';
    if (total >= 15) verdict = '重度焦慮';
    else if (total >= 10) verdict = '中度焦慮';
    else if (total >= 5) verdict = '輕度焦慮';
    out.querySelector('.score').textContent = total;
    out.querySelector('.verdict').textContent =
      answered < 7 ? `已作答 ${answered}/7 題` : `評估結果：${verdict}`;
    out.style.display = 'block';
  });
}
