#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const manifestPath = '/Users/radossagency/Documents/Web-Projects/new-radoss.agency/workspace/mandilas-pitch/slide_manifest.json';
const outputPath = '/Users/radossagency/Documents/Web-Projects/new-radoss.agency/output/html/mandilas_radoss_pitch_interactive_2026-02-19.html';

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

const esc = (v = '') => String(v)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

function bullets(arr = []) {
  const list = arr.filter(Boolean).slice(0, 8);
  if (!list.length) return '';
  return `<ul>${list.map((b) => `<li>${esc(String(b).replace(/^[\-*]\s*/, ''))}</li>`).join('')}</ul>`;
}

function cards(blocks = []) {
  return blocks.map((b, i) => {
    const accent = i % 3 === 0 ? '#4745d6' : i % 3 === 1 ? '#ffd903' : '#1e3a8a';
    return `
      <article class="card" style="--accent:${accent}">
        <h3>${esc(b.title || '')}</h3>
        ${b.body ? `<p>${esc(b.body)}</p>` : ''}
        ${bullets(b.bullets || [])}
      </article>
    `;
  }).join('');
}

function logos(assets = []) {
  const imgs = assets
    .filter((u) => /\.(png|jpe?g|svg|webp|ico)(\?|$)/i.test(String(u)))
    .slice(0, 12);
  if (!imgs.length) return '';
  return `
    <div class="logo-grid">
      ${imgs.map((src) => `<div class="logo-cell"><img src="${esc(src)}" loading="lazy" /></div>`).join('')}
    </div>
  `;
}

const slidesHtml = manifest.map((s, idx) => {
  const isSection = /^SECTION\s/i.test(s.slide_title || '');
  return `
    <section class="slide ${isSection ? 'section-breaker' : ''}" data-index="${idx}" aria-label="Slide ${s.slide_no}">
      <div class="slide-inner">
        <div class="slide-head">
          <p class="kicker">Radoss Agency | Mandilas Panel Pitch</p>
          <p class="kicker">Slide ${s.slide_no} / ${manifest.length}</p>
        </div>

        <div class="content-wrap">
          <h1>${esc(s.slide_title)}</h1>
          <p class="objective">${esc(s.objective || '')}</p>
          <div class="cards ${s.content_blocks.length >= 3 ? 'three' : ''}">
            ${cards(s.content_blocks || [])}
          </div>
          ${logos(s.visual_assets || [])}
        </div>

        <footer>
          <span class="label">Insight Note</span>
          <span class="text">${esc(s.footnote || '')}</span>
        </footer>
      </div>
    </section>
  `;
}).join('');

const sectionLinks = manifest
  .filter((s) => /^SECTION\s/i.test(s.slide_title || ''))
  .map((s) => `<button class="section-link" data-target="${s.slide_no - 1}">${esc(s.slide_title)}</button>`)
  .join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Mandilas x Radoss - Interactive Deck</title>
<style>
:root {
  --bg: #f2f6fb;
  --text: #0f172a;
  --muted: #475569;
  --blue: #4745d6;
  --gold: #ffd903;
  --navy: #1e3a8a;
  --card: rgba(255,255,255,0.88);
  --line: #c8d5e8;
}
* { box-sizing: border-box; }
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Manrope', 'Segoe UI', Arial, sans-serif;
  color: var(--text);
  background: var(--bg);
  overflow: hidden;
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&family=Manrope:wght@400;500;700&display=swap');

#stars {
  position: fixed;
  inset: 0;
  z-index: 0;
  opacity: 0.45;
}

.flower {
  position: fixed;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  border: 1px solid rgba(71,69,214,0.12);
  background:
    radial-gradient(circle at center, rgba(71,69,214,0.06), transparent 70%),
    repeating-radial-gradient(circle at center, transparent 0 19px, rgba(71,69,214,0.10) 20px 21px, transparent 22px 40px);
  filter: blur(0.2px);
  z-index: 0;
  pointer-events: none;
}
.flower.a { left: -110px; top: -120px; opacity: 0.35; }
.flower.b { right: -120px; bottom: -130px; opacity: 0.30; }

#app {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.toolbar {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  align-items: center;
  background: rgba(255,255,255,0.78);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 12px;
  backdrop-filter: blur(8px);
  z-index: 20;
}

.toolbar button {
  border: 1px solid var(--line);
  background: white;
  color: var(--text);
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: transform .2s ease, background .2s ease;
}
.toolbar button:hover { transform: translateY(-1px); background: #f8fbff; }

.meta {
  font-size: 12px;
  color: var(--muted);
  min-width: 130px;
  text-align: center;
}

.deck {
  position: relative;
  width: 100%;
  height: 100%;
}

.slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: translateX(80px) scale(0.98);
  transition: opacity .5s ease, transform .55s cubic-bezier(.2,.9,.2,1);
  padding: 64px 28px 42px;
  pointer-events: none;
}

.slide.active {
  opacity: 1;
  transform: translateX(0) scale(1);
  pointer-events: auto;
}

.slide-inner {
  height: 100%;
  border: 1px solid var(--line);
  background: rgba(246,250,255,0.62);
  backdrop-filter: blur(2px);
  display: grid;
  grid-template-rows: 46px 1fr 32px;
}

.slide-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--line);
  padding: 0 20px;
}
.kicker {
  margin: 0;
  font-family: 'Inter', Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: .12em;
  font-size: 11px;
  color: var(--navy);
  font-weight: 700;
}

.content-wrap {
  padding: 18px 20px;
  overflow: hidden;
}
.content-wrap h1 {
  margin: 0;
  font-family: 'Inter', Arial, sans-serif;
  font-size: clamp(30px, 4.2vw, 56px);
  line-height: 0.94;
}
.content-wrap .objective {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.cards {
  margin-top: 12px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}
.cards.three { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.card {
  border: 1px solid var(--line);
  border-left: 6px solid var(--accent);
  background: var(--card);
  padding: 10px;
  transform: translateY(12px);
  opacity: 0;
  transition: transform .45s ease, opacity .45s ease;
}
.slide.active .card {
  transform: translateY(0);
  opacity: 1;
}
.slide.active .card:nth-child(2){ transition-delay:.06s; }
.slide.active .card:nth-child(3){ transition-delay:.12s; }

.card h3 {
  margin: 0;
  font-family: 'Inter', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.1;
}
.card p {
  margin: 6px 0 0;
  font-size: 12px;
  color: #334155;
}
.card ul {
  margin: 8px 0 0;
  padding-left: 17px;
}
.card li {
  margin: 4px 0;
  font-size: 12px;
  color: #1f2b3e;
  line-height: 1.25;
}

.logo-grid {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 8px;
}
.logo-cell {
  height: 58px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.92);
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-cell img {
  max-width: 82%;
  max-height: 72%;
  object-fit: contain;
}

footer {
  border-top: 1px solid var(--line);
  padding: 6px 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 11px;
  color: #42556f;
}
footer .label {
  font-family: 'Inter', Arial, sans-serif;
  font-weight: 700;
  color: var(--navy);
}

.section-breaker .content-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.section-breaker .cards,
.section-breaker .logo-grid { display: none; }
.section-breaker .content-wrap h1 { font-size: clamp(44px, 6vw, 78px); }
.section-breaker .content-wrap .objective { font-size: 20px; }

.progress {
  position: fixed;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: min(86vw, 960px);
  height: 8px;
  background: rgba(255,255,255,0.7);
  border: 1px solid var(--line);
  border-radius: 999px;
  overflow: hidden;
  z-index: 20;
}
.bar {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--blue), var(--gold));
  transition: width .35s ease;
}

.section-menu {
  position: fixed;
  right: 12px;
  top: 64px;
  width: 240px;
  max-height: calc(100vh - 120px);
  overflow: auto;
  padding: 10px;
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.84);
  backdrop-filter: blur(6px);
  z-index: 20;
  display: grid;
  gap: 8px;
}
.section-link {
  width: 100%;
  border: 1px solid var(--line);
  background: white;
  padding: 8px 9px;
  font-size: 11px;
  text-align: left;
  cursor: pointer;
}
.section-link:hover { background: #f7faff; }

@media (max-width: 1040px) {
  .section-menu { display: none; }
  .cards.three { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .logo-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
</style>
</head>
<body>
<canvas id="stars"></canvas>
<div class="flower a"></div>
<div class="flower b"></div>

<div id="app">
  <div class="toolbar">
    <button id="prevBtn">Previous</button>
    <span class="meta" id="meta">Slide 1 / ${manifest.length}</span>
    <button id="nextBtn">Next</button>
    <button id="autoplayBtn">Autoplay</button>
  </div>

  <aside class="section-menu">
    ${sectionLinks}
  </aside>

  <main class="deck" id="deck">
    ${slidesHtml}
  </main>

  <div class="progress"><div class="bar" id="progressBar"></div></div>
</div>

<script>
(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const meta = document.getElementById('meta');
  const bar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const autoplayBtn = document.getElementById('autoplayBtn');
  const sectionLinks = [...document.querySelectorAll('.section-link')];

  let i = 0;
  let timer = null;

  function render() {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    meta.textContent = 'Slide ' + (i + 1) + ' / ' + slides.length;
    bar.style.width = (((i + 1) / slides.length) * 100) + '%';
  }

  function go(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    render();
  }

  function next() { go(i + 1); }
  function prev() { go(i - 1); }

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') next();
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
    if (e.key.toLowerCase() === 'home') go(0);
    if (e.key.toLowerCase() === 'end') go(slides.length - 1);
  });

  sectionLinks.forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.dataset.target || '0', 10);
      go(target);
    });
  });

  autoplayBtn.addEventListener('click', () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
      autoplayBtn.textContent = 'Autoplay';
      return;
    }
    timer = setInterval(() => {
      if (i >= slides.length - 1) {
        clearInterval(timer);
        timer = null;
        autoplayBtn.textContent = 'Autoplay';
      } else {
        next();
      }
    }, 6000);
    autoplayBtn.textContent = 'Stop';
  });

  // Starfield animation
  const c = document.getElementById('stars');
  const ctx = c.getContext('2d');
  let stars = [];

  function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    stars = Array.from({ length: Math.floor((c.width * c.height) / 14000) }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.8 + 0.4,
      v: Math.random() * 0.25 + 0.05,
      a: Math.random() * 0.45 + 0.2,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const s of stars) {
      s.y += s.v;
      if (s.y > c.height + 4) {
        s.y = -4;
        s.x = Math.random() * c.width;
      }
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(70, 88, 140, ' + s.a + ')';
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
  render();
})();
</script>
</body>
</html>`;

fs.writeFileSync(outputPath, html, 'utf8');
console.log(`Wrote ${outputPath}`);
