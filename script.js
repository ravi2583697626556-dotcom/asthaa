/* ══════════════════════════════════════════
   FLOATING EMOJIS
══════════════════════════════════════════ */
const emojiPalette = [
  '💕','✨','🌸','🦋','🌟','💜','🌺','💫',
  '🥰','⭐','🌈','🎀','🍀','💗','🪷','🌙','💝','🌻'
];
const sea = document.getElementById('emoji-sea');

for (let i = 0; i < 32; i++) {
  const e = document.createElement('span');
  e.className = 'fe';
  e.textContent = emojiPalette[Math.floor(Math.random() * emojiPalette.length)];
  const dur   = 7 + Math.random() * 10;
  const delay = Math.random() * 12;
  const left  = Math.random() * 100;
  const size  = 0.85 + Math.random() * 1.05;
  e.style.cssText =
    `left:${left}%;font-size:${size}rem;` +
    `animation-duration:${dur}s;animation-delay:${delay}s;`;
  sea.appendChild(e);
}


/* ══════════════════════════════════════════
   LOADER DISMISS
══════════════════════════════════════════ */
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('bye');
    setTimeout(type, 400); // start typewriter after loader fades
  }, 2700);
});


/* ══════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════ */
const phrases = [
  'my fav insta bestie 💕',
  'literally so sweet 🌸',
  'the coziest comfort zone ✨',
  'my go-to chat person 💜',
  'a proper sunshine human 🌟',
];
let pi = 0, ci = 0, del = false;
const tagEl = document.getElementById('tagline');

function type() {
  const cur = phrases[pi];
  if (!del) {
    tagEl.innerHTML = cur.slice(0, ci) + '<span class="caret"></span>';
    ci++;
    if (ci > cur.length) {
      del = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    tagEl.innerHTML = cur.slice(0, ci) + '<span class="caret"></span>';
    ci--;
    if (ci < 0) {
      del = false;
      pi = (pi + 1) % phrases.length;
      ci = 0;
      setTimeout(type, 350);
      return;
    }
  }
  setTimeout(type, del ? 42 : 68);
}


/* ══════════════════════════════════════════
   SPARK PARTICLES
══════════════════════════════════════════ */
const sparkGlyphs = ['✨','💕','🌸','⭐','💜','🌟','🦋','💗','🌺','💝'];

function makeSpark(cx, cy) {
  const el = document.createElement('span');
  el.className = 'spark';
  el.textContent = sparkGlyphs[Math.floor(Math.random() * sparkGlyphs.length)];
  const a   = Math.random() * Math.PI * 2;
  const d   = 55 + Math.random() * 90;
  const dx  = Math.cos(a) * d;
  const dy  = Math.sin(a) * d - 35;
  const sz  = 0.9 + Math.random() * .85;
  el.style.cssText =
    `left:${cx}px;top:${cy}px;font-size:${sz}rem;` +
    `--dx:${dx}px;--dy:${dy}px;`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 900);
}

function burst(e) {
  const x = e.clientX, y = e.clientY;
  for (let i = 0; i < 9; i++) makeSpark(x, y);
}

// click anywhere creates 2 sparks
document.addEventListener('click', (e) => {
  if (e.target.closest('#loader') ||
      e.target.closest('.love-btn') ||
      e.target.closest('.tcard')) return;
  makeSpark(e.clientX, e.clientY);
  makeSpark(e.clientX, e.clientY);
});


/* ══════════════════════════════════════════
   LOVE BUTTON
══════════════════════════════════════════ */
function sendLove(e) {
  e.stopPropagation();
  const cx = e.clientX, cy = e.clientY;
  for (let i = 0; i < 24; i++) {
    setTimeout(() => makeSpark(cx + (Math.random()-0.5)*40,
                               cy + (Math.random()-0.5)*40), i * 55);
  }
  const btn = document.getElementById('loveBtn');
  btn.textContent = 'Love sent to Astha!! 💝✨';
  btn.style.background = 'linear-gradient(135deg, #06d6a0, #38bdf8)';
  btn.style.boxShadow  = '0 12px 32px rgba(56,189,248,.55)';
  setTimeout(() => {
    btn.textContent = 'Send her some love 💝';
    btn.style.background = '';
    btn.style.boxShadow  = '';
  }, 2800);
}


/* ══════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════ */
const revs = document.querySelectorAll('.reveal');
const obs  = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) en.target.classList.add('in'); });
}, { threshold: 0.1 });
revs.forEach(r => obs.observe(r));
