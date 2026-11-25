/* Rendering and interaction for harperrees.com. Content lives in content.js. */
(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const ytWatch = id => `https://www.youtube.com/watch?v=${id}`;
  const ytEmbed = id => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
  const img = slug => `images/${slug}.webp`;
  const frames = slug => [img(slug), `images/${slug}-1.webp`, `images/${slug}-2.webp`, `images/${slug}-3.webp`];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Draft view: add ?draft to the address to see every empty field as a placeholder. */
  const DRAFT = new URLSearchParams(location.search).has('draft');
  const HINT = {
    role: 'Your role, e.g. Writer / Director', runtime: 'Runtime, e.g. 7 min', year: 'Year',
    place: 'Where it was shot', logline: 'Logline: who it’s about, what they want, and what’s in the way',
    note: 'Director’s note: 2–3 sentences on why you made it and what it’s really about',
    screenings: 'Festivals, screenings or class showcases, if any', collabRole: 'Your role on this film',
  };
  const tbd = key => `<i class="tbd">${HINT[key]}</i>`;
  const val = (v, key) => v ? esc(v) : (DRAFT ? tbd(key) : '');
  if (DRAFT) {
    document.body.classList.add('draft');
    const bar = document.createElement('div');
    bar.className = 'draftbar mono';
    bar.innerHTML = 'Draft view · amber text marks fields still to fill in · <a href="' + location.pathname + location.hash + '">See the public view</a>';
    document.body.prepend(bar);
  }

  /* Hover flip-book: cycles through stills while the pointer is over a frame. */
  function flip(el, slug) {
    if (reduced || !matchMedia('(hover: hover)').matches) return;
    const pic = el.querySelector('img');
    let list = frames(slug), i = 0, t = null;
    list.slice(1).forEach(src => { const p = new Image(); p.onerror = () => { list = list.filter(x => x !== src); }; p.src = src; });
    const stop = () => { clearInterval(t); t = null; i = 0; pic.src = list[0]; };
    el.addEventListener('mouseenter', () => { if (!t) t = setInterval(() => { i = (i + 1) % list.length; pic.src = list[i]; }, 650); });
    el.addEventListener('mouseleave', stop);
  }

  function laurel() {
    let s = '';
    for (let k = 0; k < 9; k++) {
      const deg = 255 - k * 13, th = deg * Math.PI / 180;
      const x = 100 + Math.cos(th) * 76, y = 96 - Math.sin(th) * 76, rot = deg - 180 + 22;
      for (const side of [1, -1]) {
        const cx = side > 0 ? x : 200 - x;
        s += `<ellipse cx="${cx.toFixed(1)}" cy="${y.toFixed(1)}" rx="5" ry="12" transform="rotate(${(rot * side).toFixed(1)} ${cx.toFixed(1)} ${y.toFixed(1)})" fill="currentColor" opacity="${(0.95 - k * 0.05).toFixed(2)}"/>`;
      }
    }
    return `<svg viewBox="0 0 200 190" aria-hidden="true">${s}</svg>`;
  }

  const specs = rows => {
    const shown = rows.filter(([, v]) => v || DRAFT);
    return shown.length ? `<dl class="specs">${shown.map(([k, v, key]) => `<dt>${k}</dt><dd>${val(v, key)}</dd>`).join('')}</dl>` : '';
  };

  /* Video modal */
  const modal = $('#modal');
  function play(id, title) {
    if (!modal.showModal) { window.open(ytWatch(id), '_blank', 'noopener'); return; }
    $('#modalTitle').textContent = title;
    $('#modalFrame').innerHTML = `<iframe src="${ytEmbed(id)}" title="${esc(title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    modal.showModal();
  }
  const closeModal = () => { modal.close(); };
  modal.addEventListener('close', () => { $('#modalFrame').innerHTML = ''; });
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  $('#modalClose').addEventListener('click', closeModal);
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-play]');
    if (b) { e.preventDefault(); play(b.dataset.play, b.dataset.title); }
  });

  function renderHome() {
    $('#films').innerHTML = FILMS.map(f => `
      <article class="film">
        <a class="shot" href="#film-${f.slug}" data-slug="${f.slug}" aria-label="Open ${esc(f.title)}">
          <img src="${img(f.slug)}" width="1280" height="720" alt="${esc(f.alt)}" loading="lazy">
          ${f.runtime ? `<span class="tc mono">${esc(f.runtime)}</span>` : ''}
          <span class="hint mono">Previewing stills</span>
        </a>
        <div class="film-text">
          <p class="kind mono">${esc(f.kind)}</p>
          <h3>${esc(f.title)}</h3>
          ${f.logline || DRAFT ? `<p class="log">${val(f.logline, 'logline')}</p>` : ''}
          ${specs([['Role', f.role, 'role'], ['Shot in', f.place, 'place'], ['Year', f.year, 'year']])}
          <div class="links">
            <a class="btn" href="#film-${f.slug}">Film page</a>
            <a class="btn" href="${ytWatch(f.youtube)}" data-play="${f.youtube}" data-title="${esc(f.title)}">▶ Watch</a>
          </div>
        </div>
      </article>`).join('');

    $('#awardWrap').innerHTML = `
      <div class="head"><h2>Festival <em>work</em></h2><span class="mono">With Peter Thomson · Driftless Film Collective</span></div>
      <div class="collabs">${COLLABS.map(c => `
        <article class="collab">
          <a class="shot" href="${ytWatch(c.youtube)}" data-play="${c.youtube}" data-title="${esc(c.title)}" data-slug="${c.slug}" aria-label="Watch ${esc(c.title)}">
            <img src="${img(c.slug)}" width="1280" height="720" alt="${esc(c.alt)}" loading="lazy">
            <span class="hint mono">Previewing stills</span>
          </a>
          <div class="collab-row">
            <div class="laurel">${laurel()}<div class="lt"><span>${esc(c.laurel[0])}</span><b>${esc(c.laurel[1])}</b><span>${esc(c.laurel[2])}</span></div></div>
            <div>
              <span class="mono" style="color:var(--muted)">${esc(c.kind)}</span>
              <h3>${esc(c.title)}</h3>
              ${c.role || DRAFT ? `<p class="role">Harper: ${val(c.role, 'collabRole')}</p>` : ''}
              <p>${c.note}</p>
              <div class="links" style="margin-top:14px"><a class="btn" href="${ytWatch(c.youtube)}" data-play="${c.youtube}" data-title="${esc(c.title)}">▶ Watch</a></div>
            </div>
          </div>
        </article>`).join('')}
      </div>`;

    $('#grid').innerHTML = MORE.map(m => `
      <a class="card" href="${ytWatch(m.youtube)}" data-play="${m.youtube}" data-title="${esc(m.title)}" data-slug="${m.slug}">
        <span class="shot"><img src="${img(m.slug)}" width="1280" height="720" alt="${esc(m.alt)}" loading="lazy"></span>
        <span class="meta mono"><span>${esc(m.tag)}</span><span>▶ Watch</span></span>
        <h4>${esc(m.title)}</h4>
      </a>`).join('');

    document.querySelectorAll('[data-slug]').forEach(el => flip(el, el.dataset.slug));
  }

  function renderFilm(slug) {
    const i = FILMS.findIndex(f => f.slug === slug), f = FILMS[i];
    const prev = FILMS[(i - 1 + FILMS.length) % FILMS.length], next = FILMS[(i + 1) % FILMS.length];
    const stills = frames(f.slug).slice(1).map((s, k) => `<img src="${s}" alt="Still ${k + 1} from ${esc(f.title)}" loading="lazy" onerror="this.remove()">`).join('');
    const creditRows = f.credits && f.credits.length ? f.credits
      : DRAFT ? [['Director', ''], ['Writer', ''], ['Cinematography', ''], ['Editor', ''], ['Cast', '']] : [];
    const credits = creditRows.length
      ? `<h3>Credits</h3><dl class="endcred">${creditRows.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${v ? esc(v) : '<i class="tbd">Name</i>'}</dd>`).join('')}</dl>` : '';
    document.title = `${f.title} | Harper Rees`;
    $('#filmPage').innerHTML = `
      <div class="wrap fp-top">
        <a class="back mono" href="#work">← All films</a>
        <button class="player" type="button" id="inlinePlayer" aria-label="Play ${esc(f.title)}">
          <div class="frame"><img src="${img(f.slug)}" width="1280" height="720" alt="${esc(f.alt)}"></div>
          <span class="play"><span class="mono"><svg viewBox="0 0 10 10"><path d="M1 0l9 5-9 5z"/></svg>Play film</span></span>
        </button>
        <div class="fp-head">
          <div>
            <span class="mono" style="color:var(--muted)">${esc(f.kind)}</span>
            <h1>${esc(f.title)}</h1>
            ${f.logline || DRAFT ? `<p class="log">${val(f.logline, 'logline')}</p>` : ''}
          </div>
          <div style="align-self:end">${specs([['Role', f.role, 'role'], ['Runtime', f.runtime, 'runtime'], ['Shot in', f.place, 'place'], ['Year', f.year, 'year']])}</div>
        </div>
        <div class="fp-body">
          <div>
            ${f.note || DRAFT ? `<h3>Director’s note</h3><p>${val(f.note, 'note')}</p>` : ''}
            <h3 ${f.note || DRAFT ? 'style="margin-top:32px"' : ''}>Stills</h3>
            <div class="stills">${stills}</div>
          </div>
          <div>
            ${credits}
            ${f.screenings || DRAFT ? `<h3 style="margin-top:32px">Screenings</h3><p>${val(f.screenings, 'screenings')}</p>` : ''}
            <p style="margin-top:${credits ? '32px' : '0'}"><a class="btn" href="${ytWatch(f.youtube)}" target="_blank" rel="noopener">Watch on YouTube ↗</a></p>
          </div>
        </div>
        <nav class="pager" aria-label="More films">
          <a href="#film-${prev.slug}"><span class="mono">← Previous</span><b>${esc(prev.title)}</b></a>
          <a href="#film-${next.slug}"><span class="mono">Next →</span><b>${esc(next.title)}</b></a>
        </nav>
      </div>`;
    $('#inlinePlayer').addEventListener('click', e => {
      const fr = e.currentTarget.querySelector('.frame');
      e.currentTarget.querySelector('.play').remove();
      fr.innerHTML = `<iframe src="${ytEmbed(f.youtube)}" title="${esc(f.title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
    }, { once: true });
  }

  const baseTitle = document.title;
  function route() {
    const h = location.hash.slice(1);
    const home = $('#home'), fp = $('#filmPage');
    if (h.startsWith('film-') && FILMS.some(f => 'film-' + f.slug === h)) {
      renderFilm(h.slice(5)); home.hidden = true; fp.hidden = false; window.scrollTo(0, 0);
    } else {
      const wasFilm = !fp.hidden;
      document.title = baseTitle; home.hidden = false; fp.hidden = true; fp.innerHTML = '';
      const el = h && document.getElementById(h);
      if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: wasFilm || reduced ? 'auto' : 'smooth' }));
      else if (wasFilm) window.scrollTo(0, 0);
    }
  }

  /* Film grain texture */
  (function () {
    const c = document.createElement('canvas'); c.width = c.height = 160;
    const x = c.getContext('2d'), d = x.createImageData(160, 160);
    for (let i = 0; i < d.data.length; i += 4) { const v = Math.random() * 255; d.data[i] = d.data[i + 1] = d.data[i + 2] = v; d.data[i + 3] = 255; }
    x.putImageData(d, 0, 0);
    $('#grain').style.backgroundImage = `url(${c.toDataURL()})`;
  })();

  /* Copy email */
  $('#copyBtn').addEventListener('click', e => {
    const btn = e.currentTarget, txt = $('#emailText').textContent;
    const done = m => { btn.textContent = m; setTimeout(() => (btn.textContent = 'Copy email'), 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText(txt).then(() => done('Copied'), () => done('Copy failed'));
  });

  if (typeof SHOW_RESUME !== 'undefined' && SHOW_RESUME) $('#resumeBtn').hidden = false;
  $('#yr').textContent = new Date().getFullYear();

  renderHome();
  route();
  addEventListener('hashchange', route);
})();
