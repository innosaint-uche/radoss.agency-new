#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const PptxGenJS = require('pptxgenjs');
const html2pptx = require('/Users/radossagency/.codex/skills/pptx/scripts/html2pptx.js');

function argValue(flag, fallback = null) {
  const i = process.argv.indexOf(flag);
  if (i === -1 || i + 1 >= process.argv.length) return fallback;
  return process.argv[i + 1];
}

const manifestPath = argValue('--manifest', '/Users/radossagency/Documents/Web-Projects/new-radoss.agency/workspace/mandilas-pitch/slide_manifest.json');
const outPptx = argValue('--out-pptx', '/Users/radossagency/Documents/Web-Projects/new-radoss.agency/output/pptx/mandilas_radoss_pitch_2026-02-19.pptx');
const htmlDir = '/Users/radossagency/Documents/Web-Projects/new-radoss.agency/workspace/mandilas-pitch/slides-html-light';
const assetsDir = '/Users/radossagency/Documents/Web-Projects/new-radoss.agency/workspace/mandilas-pitch/assets';
const bg = `file://${assetsDir}/bg-light-starry.png`;
const flower = `file://${assetsDir}/flower-overlay-light.png`;
const mandilasLogo = `file://${assetsDir}/mandilas-logo.png`;

if (!fs.existsSync(manifestPath)) throw new Error(`Manifest not found: ${manifestPath}`);
fs.mkdirSync(htmlDir, { recursive: true });
fs.mkdirSync(path.dirname(outPptx), { recursive: true });

const slides = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const totalDuration = slides.reduce((sum, s) => sum + (s.duration_min || 0), 0);
if (Math.abs(totalDuration - 45) > 0.01) console.warn(`Warning: duration sum is ${totalDuration} minutes (expected 45).`);

const esc = (v = '') => String(v)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const cleanBullets = (arr = [], max = 8) => arr
  .filter(Boolean)
  .slice(0, max)
  .map((x) => String(x).replace(/^[\-\*]\s*/, '').trim());

const imgRe = /\.(png|jpe?g|svg|gif|webp|ico)(\?|$)/i;
const imageAssets = (slide) => (slide.visual_assets || []).filter((u) => imgRe.test(String(u)));

function bulletList(items = [], fontSize = 12) {
  const rows = cleanBullets(items, 8)
    .map((b) => `<li style="margin:4px 0;font-size:${fontSize}px;line-height:1.28;color:#1f2b3e;">${esc(b)}</li>`)
    .join('');
  if (!rows) return '';
  return `<ul style="margin:8px 0 0 0;padding-left:17px;">${rows}</ul>`;
}

function card(title, body = '', bullets = [], accent = '#4745d6', opts = {}) {
  const fsTitle = opts.titleSize || 16;
  const fsBody = opts.bodySize || 12;
  const fsBullet = opts.bulletSize || 12;
  const bodyHtml = body
    ? `<p style="margin:7px 0 0 0;font-size:${fsBody}px;line-height:1.32;color:#334155;max-width:none;">${esc(body)}</p>`
    : '';

  return `
    <div style="background:rgba(255,255,255,0.89);border:1px solid #cfdaea;border-left:6px solid ${accent};padding:10px 11px;">
      <h3 style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:${fsTitle}px;line-height:1.12;color:#0f172a;">${esc(title)}</h3>
      ${bodyHtml}
      ${bulletList(bullets, fsBullet)}
    </div>
  `;
}

function footnote(slide) {
  const note = slide.footnote || '';
  return `
    <div style="position:absolute;left:24px;right:24px;bottom:8px;height:28px;border-top:1px solid #c9d7ea;display:flex;align-items:flex-start;">
      <p style="margin:6px 0 0 0;font-size:10px;line-height:1.2;color:#4b5d78;max-width:none;">
        <span style="font-family:'Inter',Arial,sans-serif;font-weight:700;color:#1e3a8a;letter-spacing:0.02em;">Insight Note:</span>
        ${esc(note)}
      </p>
    </div>
  `;
}

function chrome(slide, inner) {
  return `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Manrope:wght@400;500;600;700&display=swap');
  html, body { margin:0; padding:0; width:960px; height:540px; overflow:hidden; }
  body { position:relative; width:960px; height:540px; background:#eef2f8; color:#0f172a; display:flex; font-family:'Manrope',Arial,sans-serif; }
  .kicker { margin:0; font-family:'Inter',Arial,sans-serif; letter-spacing:0.11em; text-transform:uppercase; font-size:11px; }
  .title { margin:0 0 8px 0; font-family:'Inter',Arial,sans-serif; font-size:39px; line-height:0.97; color:#0f172a; }
  .objective { margin:0; font-size:13px; line-height:1.32; color:#475569; max-width:none; }
</style>
</head>
<body>
  <img src="${bg}" style="position:absolute;left:0;top:0;width:960px;height:540px;object-fit:cover;" />
  <img src="${flower}" style="position:absolute;left:0;top:0;width:220px;opacity:0.15;" />
  <img src="${flower}" style="position:absolute;right:-32px;bottom:-30px;width:250px;opacity:0.16;transform:scaleX(-1);" />

  <div style="position:absolute;left:0;right:0;top:0;height:50px;background:rgba(255,255,255,0.84);border-bottom:1px solid #d4deed;">
    <div style="display:flex;align-items:center;justify-content:space-between;height:50px;padding:0 28px;">
      <p class="kicker" style="color:#1e3a8a;font-weight:700;">Radoss Agency | Mandilas Panel Pitch</p>
      <p class="kicker" style="color:#475569;font-weight:700;">Slide ${slide.slide_no} / ${slides.length}</p>
    </div>
  </div>

  ${inner}
  ${footnote(slide)}
</body>
</html>
`;
}

const TEAM = [
  {
    name: 'Uchenna Innocent, MCIM',
    role: 'Chief Digital Architect & Founder',
    focus: 'Digital transformation, growth strategy, technology enablement',
    img: 'https://res.cloudinary.com/innosaint/image/upload/v1759535536/Uchenna-Innocent_headshot_nzenth.jpg',
    accent: '#4745d6',
  },
  {
    name: 'Timi Uk',
    role: 'Chief Operating Officer & Co-Founder',
    focus: 'Performance operations, campaign governance, delivery quality',
    img: 'file:///Users/radossagency/Documents/Web-Projects/new-radoss.agency/public/images/team/timi-uk-silhouette.svg',
    accent: '#ffd903',
  },
  {
    name: 'Ebere Agbaje',
    role: 'Business Operations Lead',
    focus: 'Operations planning, research intelligence, growth analytics',
    img: 'https://media.licdn.com/dms/image/v2/D4D03AQHarcZat2nPZw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1719027089306?e=2147483647&v=beta&t=qEoLB81CVNV6nJK594wiSEHdc8D2ROPySo4U4kI5rg4',
    accent: '#1e3a8a',
  },
];

function cover(slide) {
  const b1 = slide.content_blocks[0] || { title: '' };
  const b2 = slide.content_blocks[1] || { title: '' };
  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:62px;bottom:42px;">
      <div style="display:grid;grid-template-columns:70% 30%;gap:12px;">
        <div>
          <p class="kicker" style="color:#334155;">Digital & Creative Partner Session</p>
          <h1 class="title" style="font-size:45px;">${esc(slide.slide_title)}</h1>
          <p style="margin:8px 0 0 0;font-size:17px;line-height:1.3;color:#334155;max-width:none;">${esc(slide.objective)}</p>
        </div>
        <div style="display:flex;align-items:flex-start;justify-content:center;gap:8px;">
          <div style="width:130px;height:88px;border:1px solid #c7d5ea;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;">
            <img src="${mandilasLogo}" style="max-width:88%;max-height:72%;object-fit:contain;" />
          </div>
          <div style="width:96px;height:88px;border:1px solid #c7d5ea;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;">
            <img src="${imageAssets(slide)[1] || ''}" style="max-width:78%;max-height:68%;object-fit:contain;" />
          </div>
        </div>
      </div>

      <div style="margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        ${card(b1.title, b1.body || '', b1.bullets || [], '#ffd903', { titleSize: 17, bulletSize: 12 })}
        ${card(b2.title, b2.body || '', b2.bullets || [], '#4745d6', { titleSize: 17, bulletSize: 12 })}
      </div>

      <div style="margin-top:9px;padding:8px 10px;border:1px dashed #a9b9d1;background:rgba(255,255,255,0.82);">
        <p style="margin:0;font-size:11px;color:#334155;line-height:1.28;max-width:none;">Structured response to Mandilas' request: portfolio depth, strategic framework, campaign impact, and Mandilas-specific recommendations.</p>
      </div>
    </div>
  `);
}

function sectionBreaker(slide) {
  const sub = slide.content_blocks[0]?.title || '';
  return chrome(slide, `
    <div style="position:absolute;left:65px;right:65px;top:96px;bottom:86px;display:flex;align-items:center;justify-content:center;text-align:center;">
      <img src="${flower}" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:390px;opacity:0.18;" />
      <div style="position:relative;">
        <p class="kicker" style="color:#1e3a8a;font-weight:700;">Section Breaker</p>
        <h1 class="title" style="font-size:60px;line-height:0.92;">${esc(slide.slide_title)}</h1>
        <p style="margin:10px 0 0 0;font-size:20px;color:#334155;line-height:1.28;max-width:none;">${esc(sub)}</p>
      </div>
    </div>
  `);
}

function teamSlide(slide) {
  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:64px;bottom:44px;">
      <h1 class="title" style="font-size:58px;line-height:0.88;">Leadership & Key Team</h1>
      <p class="objective">${esc(slide.objective)}</p>

      <div style="margin-top:9px;display:grid;grid-template-columns:repeat(3,1fr);gap:9px;">
        ${TEAM.map((m) => `
          <div style="background:rgba(255,255,255,0.9);border:1px solid #cfd9ea;overflow:hidden;">
            <div style="height:122px;background:#edf2fa;display:flex;align-items:center;justify-content:center;">
              <img src="${m.img}" style="max-width:100%;max-height:100%;object-fit:cover;" />
            </div>
            <div style="padding:8px 9px;border-top:4px solid ${m.accent};">
              <h3 style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:14px;line-height:1.15;color:#0f172a;">${esc(m.name)}</h3>
              <p style="margin:4px 0 0 0;font-size:11px;line-height:1.24;color:#1f2b3e;max-width:none;"><b>${esc(m.role)}</b></p>
              <p style="margin:4px 0 0 0;font-size:11px;line-height:1.24;color:#475569;max-width:none;">${esc(m.focus)}</p>
            </div>
          </div>
        `).join('')}
      </div>

      <div style="margin-top:8px;">
        ${card(
          slide.content_blocks[1]?.title || 'Execution Lens',
          '',
          slide.content_blocks[1]?.bullets || [],
          '#4745d6',
          { titleSize: 15, bulletSize: 12 }
        )}
      </div>
    </div>
  `);
}

function whoWeAreSlide(slide) {
  const b1 = slide.content_blocks[0] || { title: '' };
  const b2 = slide.content_blocks[1] || { title: '' };
  const logos = imageAssets(slide);
  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:62px;bottom:44px;display:grid;grid-template-columns:66% 34%;gap:12px;">
      <div>
        <h1 class="title" style="font-size:64px;line-height:0.84;">Who We Are</h1>
        <p style="margin:0 0 7px 0;font-family:'Inter',Arial,sans-serif;font-size:30px;line-height:0.95;color:#1e293b;font-weight:700;">The Nexus of Business, Marketing & Technology</p>
        <p class="objective">${esc(slide.objective)}</p>
        <div style="margin-top:10px;">${card(b1.title, b1.body || '', b1.bullets || [], '#4745d6', { titleSize: 18, bodySize: 14, bulletSize: 13 })}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="height:180px;border:1px solid #cdd8ea;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;">
          <img src="${logos[0] || ''}" style="max-width:82%;max-height:78%;object-fit:contain;" />
        </div>
        <div style="height:82px;border:1px solid #cdd8ea;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;">
          <img src="${logos[1] || logos[0] || ''}" style="max-width:80%;max-height:72%;object-fit:contain;" />
        </div>
        ${card(b2.title, b2.body || '', b2.bullets || [], '#ffd903', { titleSize: 15, bulletSize: 12 })}
      </div>
    </div>
  `);
}

function logosGrid(slide, cols = 5, max = 12) {
  const imgs = imageAssets(slide).slice(0, max);
  return `
    <div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:9px;">
      ${imgs.map((src, i) => `
        <div style="height:66px;border:1px solid #c9d6ea;background:rgba(255,255,255,0.92);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
          <div style="position:absolute;left:0;top:0;bottom:0;width:4px;background:${i % 3 === 0 ? '#4745d6' : i % 3 === 1 ? '#ffd903' : '#1e3a8a'};"></div>
          <img src="${src}" style="max-width:80%;max-height:66%;object-fit:contain;" />
        </div>
      `).join('')}
    </div>
  `;
}

function brandsSlide(slide) {
  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:62px;bottom:44px;display:grid;grid-template-columns:49% 51%;gap:11px;">
      <div>
        <h1 class="title" style="font-size:42px;line-height:0.95;">${esc(slide.slide_title)}</h1>
        <p class="objective">${esc(slide.objective)}</p>
        <div style="margin-top:10px;">${card(slide.content_blocks[0]?.title || '', slide.content_blocks[0]?.body || '', slide.content_blocks[0]?.bullets || [], '#4745d6', { titleSize: 16, bulletSize: 12 })}</div>
        <div style="margin-top:9px;">${card(slide.content_blocks[1]?.title || '', slide.content_blocks[1]?.body || '', slide.content_blocks[1]?.bullets || [], '#ffd903', { titleSize: 15, bodySize: 12, bulletSize: 11 })}</div>
      </div>
      <div>
        <h3 style="margin:6px 0 8px 0;font-family:'Inter',Arial,sans-serif;font-size:24px;color:#1e3a8a;">Brand Reference Matrix</h3>
        ${logosGrid(slide, 5, 12)}
      </div>
    </div>
  `);
}

function caseSlide(slide) {
  const imgs = imageAssets(slide);
  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:62px;bottom:44px;display:grid;grid-template-columns:57% 43%;gap:11px;">
      <div>
        <h1 class="title" style="font-size:33px;line-height:0.95;">${esc(slide.slide_title)}</h1>
        <p class="objective">${esc(slide.objective)}</p>
        <div style="margin-top:9px;display:grid;grid-template-rows:auto auto auto;gap:8px;">
          ${card(slide.content_blocks[0]?.title || '', slide.content_blocks[0]?.body || '', slide.content_blocks[0]?.bullets || [], '#4745d6', { titleSize: 15, bodySize: 12, bulletSize: 11 })}
          ${card(slide.content_blocks[1]?.title || '', slide.content_blocks[1]?.body || '', slide.content_blocks[1]?.bullets || [], '#ffd903', { titleSize: 15, bodySize: 12, bulletSize: 11 })}
          ${card(slide.content_blocks[2]?.title || '', slide.content_blocks[2]?.body || '', slide.content_blocks[2]?.bullets || [], '#1e3a8a', { titleSize: 15, bodySize: 12, bulletSize: 11 })}
        </div>
      </div>

      <div>
        <div style="height:103px;border:1px solid #cbd8ea;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;gap:8px;">
          ${imgs.slice(0, 2).map((src) => `<img src="${src}" style="max-width:44%;max-height:72%;object-fit:contain;" />`).join('')}
        </div>
        <div style="margin-top:9px;border:1px solid #cbd8ea;background:rgba(255,255,255,0.86);padding:10px;">
          <h3 style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:15px;color:#0f172a;">Execution Notes</h3>
          <ul style="margin:8px 0 0 0;padding-left:17px;">
            <li style="margin:4px 0;font-size:11px;line-height:1.25;color:#334155;">Mapped objective to channel-specific execution tracks</li>
            <li style="margin:4px 0;font-size:11px;line-height:1.25;color:#334155;">Built measurement checkpoints before scaling spend</li>
            <li style="margin:4px 0;font-size:11px;line-height:1.25;color:#334155;">Maintained governance cadence to protect delivery quality</li>
          </ul>
        </div>
        <div style="margin-top:9px;">
          ${imgs.length > 2 ? logosGrid({ visual_assets: imgs.slice(2) }, 2, 4) : ''}
        </div>
      </div>
    </div>
  `);
}

function referencesSlide(slide) {
  const refs = cleanBullets(slide.content_blocks[0]?.bullets || [], 16);
  const rows = refs.map((r) => `<li style="margin:3px 0;font-size:11px;line-height:1.25;color:#1f2b3e;word-break:break-word;">${esc(r)}</li>`).join('');
  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:62px;bottom:44px;">
      <h1 class="title" style="font-size:44px;">${esc(slide.slide_title)}</h1>
      <p class="objective">${esc(slide.objective)}</p>
      <div style="margin-top:9px;background:rgba(255,255,255,0.9);border:1px solid #cfdaea;padding:10px 12px;height:330px;overflow:hidden;">
        <ol style="margin:0;padding-left:18px;">${rows}</ol>
      </div>
    </div>
  `);
}

function contactSlide(slide) {
  const left = slide.content_blocks[0] || { title: '' };
  const right = slide.content_blocks[1] || { title: '' };
  const imgs = imageAssets(slide);
  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:62px;bottom:44px;display:grid;grid-template-columns:64% 36%;gap:12px;">
      <div>
        <h1 class="title" style="font-size:56px;line-height:0.86;">Contact & Next Steps</h1>
        <p class="objective">${esc(slide.objective)}</p>
        <div style="margin-top:10px;">${card(left.title, left.body || '', left.bullets || [], '#4745d6', { titleSize: 18, bulletSize: 13 })}</div>
        <div style="margin-top:10px;">${card(right.title, right.body || '', right.bullets || [], '#ffd903', { titleSize: 16, bulletSize: 13 })}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div style="height:95px;border:1px solid #cfd9ea;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;">
          <img src="${imgs[0] || ''}" style="max-width:84%;max-height:70%;object-fit:contain;" />
        </div>
        <div style="height:95px;border:1px solid #cfd9ea;background:rgba(255,255,255,0.9);display:flex;align-items:center;justify-content:center;">
          <img src="${imgs[1] || mandilasLogo}" style="max-width:82%;max-height:72%;object-fit:contain;" />
        </div>
        <div style="flex:1;border:1px dashed #a7b8d4;background:rgba(255,255,255,0.82);padding:10px;">
          <p style="margin:0;font-family:'Inter',Arial,sans-serif;font-size:16px;font-weight:700;color:#1e3a8a;">Partnership Intent</p>
          <p style="margin:6px 0 0 0;font-size:13px;line-height:1.3;color:#334155;max-width:none;">Ready to align teams, scope priority workstreams, and move from pitch to operating execution.</p>
        </div>
      </div>
    </div>
  `);
}

function researchSlide(slide) {
  const b1 = slide.content_blocks[0] || { title: '' };
  const b2 = slide.content_blocks[1] || { title: '' };
  const b3 = slide.content_blocks[2] || null;
  const imgs = imageAssets(slide);
  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:62px;bottom:44px;">
      <h1 class="title" style="font-size:40px;">${esc(slide.slide_title)}</h1>
      <p class="objective">${esc(slide.objective)}</p>
      <div style="margin-top:10px;display:grid;grid-template-columns:${b3 ? '39% 30% 31%' : '58% 42%'};gap:10px;">
        <div>${card(b1.title, b1.body || '', b1.bullets || [], '#4745d6', { titleSize: 16, bulletSize: 12 })}</div>
        <div>${card(b2.title, b2.body || '', b2.bullets || [], '#ffd903', { titleSize: 16, bulletSize: 12 })}</div>
        ${b3 ? `<div>${card(b3.title, b3.body || '', b3.bullets || [], '#1e3a8a', { titleSize: 16, bulletSize: 12 })}</div>` : ''}
      </div>
      ${imgs.length ? `<div style="position:absolute;right:0;top:6px;width:170px;height:88px;border:1px solid #cdd9ea;background:rgba(255,255,255,0.88);display:flex;align-items:center;justify-content:center;"><img src="${imgs[0]}" style="max-width:90%;max-height:72%;object-fit:contain;" /></div>` : ''}
    </div>
  `);
}

function generic(slide) {
  const b1 = slide.content_blocks[0] || { title: '' };
  const b2 = slide.content_blocks[1] || { title: '' };
  const b3 = slide.content_blocks[2] || null;
  const imgs = imageAssets(slide);

  return chrome(slide, `
    <div style="position:absolute;left:30px;right:30px;top:62px;bottom:44px;display:grid;grid-template-columns:56% 44%;gap:11px;">
      <div>
        <h1 class="title" style="font-size:42px;">${esc(slide.slide_title)}</h1>
        <p class="objective">${esc(slide.objective)}</p>
        <div style="margin-top:10px;">${card(b1.title, b1.body || '', b1.bullets || [], '#4745d6', { titleSize: 16, bulletSize: 12 })}</div>
        ${b3 ? `<div style="margin-top:9px;">${card(b3.title, b3.body || '', b3.bullets || [], '#1e3a8a', { titleSize: 16, bulletSize: 12 })}</div>` : ''}
      </div>

      <div>
        <div>${card(b2.title, b2.body || '', b2.bullets || [], '#ffd903', { titleSize: 16, bulletSize: 12 })}</div>
        ${imgs.length ? `<div style="margin-top:9px;">${logosGrid({ visual_assets: imgs }, 3, 6)}</div>` : ''}
      </div>
    </div>
  `);
}

function renderSlide(slide) {
  if (slide.slide_no === 1) return cover(slide);
  if (/^SECTION\s/i.test(slide.slide_title)) return sectionBreaker(slide);
  if (slide.slide_no === 4) return whoWeAreSlide(slide);
  if (slide.slide_no === 5) return teamSlide(slide);
  if (slide.slide_no === 7) return brandsSlide(slide);
  if (slide.slide_no >= 18 && slide.slide_no <= 26) return caseSlide(slide);
  if (slide.slide_no >= 29 && slide.slide_no <= 34) return researchSlide(slide);
  if (slide.slide_no === 35) return referencesSlide(slide);
  if (slide.slide_no === 36) return contactSlide(slide);
  return generic(slide);
}

async function main() {
  const pptx = new PptxGenJS();
  pptx.defineLayout({ name: 'RADOSS16x9', width: 10, height: 5.625 });
  pptx.layout = 'RADOSS16x9';
  pptx.author = 'Radoss Agency';
  pptx.company = 'Radoss Agency';
  pptx.subject = 'Mandilas Group Panel Pitch (Light Theme)';
  pptx.title = 'Mandilas Panel Pitch - Radoss Agency';
  pptx.lang = 'en-NG';

  for (const s of slides) {
    const html = renderSlide(s);
    const fp = path.join(htmlDir, `slide-${String(s.slide_no).padStart(2, '0')}.html`);
    fs.writeFileSync(fp, html, 'utf-8');
    await html2pptx(fp, pptx, { tmpDir: '/tmp' });
  }

  await pptx.writeFile({ fileName: outPptx });
  console.log(`Wrote ${outPptx}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
