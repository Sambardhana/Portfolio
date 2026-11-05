(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // mobile menu
  const nav = $('#navLinks');
  $('#menuToggle').onclick = () => nav.classList.toggle('open');
  $$('a', nav).forEach(a => a.onclick = () => nav.classList.remove('open'));

  // gallery rows (colourful tiles from your own skills)
  const pal = [['#ffb347', '#ff5ec4', '#5b8cff', '#2b1b5a'], ['#7bf0d0', '#5b8cff', '#d98cff', '#12305a'], ['#ffe14a', '#ff7a3a', '#ff4a8a', '#5a1d3a'], ['#9dff7a', '#2ee0c0', '#4a7bff', '#0f3a3a']];
  const words = [['PYTHON', 'DEEP LEARNING', 'TENSORFLOW', 'KERAS', 'CNN', 'U-NET', 'BRATS2020', 'JUPYTER'], ['KOTLIN', 'ANDROID', 'JETPACK COMPOSE', 'JAVA', 'SPRING BOOT', 'ANGULAR', 'POSTGRESQL', 'GIT']];
  ['row1', 'row2'].forEach((id, k) => {
    const row = $('#' + id), w = [...words[k], ...words[k]];
    w.forEach((t, i) => {
      const c = pal[(i + k * 2) % 4], d = document.createElement('div');
      d.className = 'g-tile';
      d.style.width = (i % 3 === 0 ? 1.5 : i % 3 === 1 ? 1.1 : 1.3) * 17 + 'vw';
      d.style.background = `radial-gradient(circle at ${20 + i * 9 % 50}% 30%,${c[0]},transparent 48%),radial-gradient(circle at 78% 40%,${c[1]},transparent 52%),radial-gradient(circle at 45% 85%,${c[2]},transparent 55%),${c[3]}`;
      d.innerHTML = `<b>${t}</b>`;
      row.appendChild(d);
    });
  });

  // reveal on scroll
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .15 });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 3) * 90 + 'ms'; io.observe(el); });

  // scroll-linked effects
  const hero = $('.hero'), fills = $$('.fx-fill'), par = $$('[data-speed]'), gal = $('.gallery'), rows = [$('#row1'), $('#row2')], emoji = $('#emoji'), act = $('.activities-section');
  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = innerHeight;
    hero.style.setProperty('--t', clamp(scrollY / (vh * .9)).toFixed(3));
    fills.forEach(el => { const r = el.getBoundingClientRect(); el.style.setProperty('--p', clamp((vh * .88 - r.top) / (vh * .45)).toFixed(3)); });
    const g = gal.getBoundingClientRect(), q = clamp((vh - g.top) / (vh + g.height));
    rows.forEach((r, i) => r.style.transform = `translateX(${(i ? 1 : -1) * (q - .5) * 700 - (i ? 900 : 300)}px)`);
    par.forEach(el => { const r = el.getBoundingClientRect(), off = r.top + r.height / 2 - vh / 2; el.style.transform = `translate3d(0,${(off * parseFloat(el.dataset.speed)).toFixed(1)}px,0) rotate(${(off * .04).toFixed(1)}deg)`; });
    if (emoji) { const a = act.getBoundingClientRect(); emoji.textContent = a.top + a.height * .5 < vh * .5 ? '😮' : '😍'; }
  };
  if (!rm) {
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    addEventListener('resize', update);
  } else fills.forEach(el => el.style.setProperty('--p', 1));
  update();

  // cursor glow + avatar tilt
  const glow = $('.cursor-glow'), av = $('.avatar');
  addEventListener('pointermove', e => {
    glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    if (!rm) { av.style.setProperty('--ry', ((e.clientX / innerWidth - .5) * 18).toFixed(1) + 'deg'); av.style.setProperty('--rx', ((.5 - e.clientY / innerHeight) * 12).toFixed(1) + 'deg'); }
  });
})();