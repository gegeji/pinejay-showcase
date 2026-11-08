(function () {
  'use strict';

  const PAGES = ['home', 'chronicle', 'review', 'widgets', 'course', 'weather', 'built'];
  const LANGS = [
    ['en', 'EN'],
    ['zh-CN', '简体'],
    ['zh-HK', '繁體'],
    ['ja', '日本語'],
  ];
  const STEP_MS = 1700;

  let lang = pickLang();
  let page = pickPage();
  let teardown = () => {};

  function pickLang() {
    const fromUrl = new URLSearchParams(location.search).get('lang');
    if (fromUrl && CONTENT[fromUrl]) return fromUrl;
    try {
      const saved = localStorage.getItem('pinejay-showcase-lang');
      if (saved && CONTENT[saved]) return saved;
    } catch (e) { /* storage blocked */ }
    return 'en';
  }

  function pickPage() {
    const p = location.hash.replace('#', '');
    // Old links to the "What's Pinejay" page open the home page.
    return PAGES.includes(p) ? p : 'home';
  }

  // Small element builder: h('div', { class: 'x', onclick: fn }, child, ...)
  function h(tag, attrs, ...children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === undefined || v === null || v === false) continue;
      if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (k === 'class') el.className = v;
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const c of children.flat()) {
      if (c === null || c === undefined || c === false) continue;
      el.append(c instanceof Node ? c : document.createTextNode(String(c)));
    }
    return el;
  }

  function svg(markup, w, hgt) {
    const wrap = document.createElement('div');
    wrap.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 ${w} ${hgt}" preserveAspectRatio="none" aria-hidden="true">${markup}</svg>`;
    return wrap.firstChild;
  }

  // ── Rail ──────────────────────────────────────────────────────────────────

  function renderRail() {
    const t = CONTENT[lang];
    document.documentElement.lang = t.htmlLang;
    document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t.ui[el.dataset.i18n]; });

    const langs = document.querySelector('.langs');
    langs.replaceChildren(...LANGS.map(([code, label]) => h('button', {
      type: 'button', 'aria-pressed': String(code === lang), lang: code,
      onclick: () => {
        lang = code;
        try { localStorage.setItem('pinejay-showcase-lang', code); } catch (e) { /* ignore */ }
        renderAll();
      },
    }, label)));

    const nav = document.querySelector('.nav');
    nav.replaceChildren(...PAGES.map((p) => h('button', {
      type: 'button', 'aria-current': p === page ? 'page' : null,
      onclick: () => { if (p !== page) { location.hash = p; } },
    }, t.ui.nav[p])));
  }

  // ── Telegram exhibit ─────────────────────────────────────────────────────

  function bars(kind) {
    const sets = {
      ride: { h: [8, 10, 14, 18, 22, 30, 46, 60], on: [2, 3, 4] },
      storm: { h: [5, 6, 8, 14, 62, 54, 18, 8], on: [4, 5] },
    };
    const s = sets[kind];
    return h('div', { class: 'bars' }, s.h.map((v, i) => h('div', { class: s.on.includes(i) ? 'on' : '', style: `height:${v}px` })));
  }

  function chart(kind, c) {
    return h('div', { class: 'chart' },
      h('div', { class: 'chart-title' }, c.title),
      bars(kind),
      h('div', { class: 'chart-axis' }, h('span', {}, c.left), h('span', { class: 'mid' }, c.mid), h('span', {}, c.right)));
  }

  // Small weather icons for the card: sun, moon, cloud, rain.
  const WX = {
    sun: '<circle cx="8" cy="8" r="3.2" fill="#F2A93B"/><g stroke="#F2A93B" stroke-width="1.4" stroke-linecap="round"><path d="M8 1.2v1.8M8 13v1.8M1.2 8h1.8M13 8h1.8M3.2 3.2l1.3 1.3M11.5 11.5l1.3 1.3M3.2 12.8l1.3-1.3M11.5 4.5l1.3-1.3"/></g>',
    moon: '<path d="M10.8 11.6A5 5 0 0 1 6.4 2.6a5 5 0 1 0 6.9 6.9 5 5 0 0 1-2.5 2.1Z" fill="#8A94A6"/>',
    cloud: '<path d="M4.6 12.4h7a2.8 2.8 0 0 0 .3-5.6 4 4 0 0 0-7.6-.9 2.9 2.9 0 0 0 .3 6.5Z" fill="#9AA3AE"/>',
    rain: '<path d="M4.6 9.6h7a2.6 2.6 0 0 0 .3-5.2 3.8 3.8 0 0 0-7.2-.8 2.7 2.7 0 0 0-.1 6Z" fill="#7C8796"/><g stroke="#3B82F6" stroke-width="1.4" stroke-linecap="round"><path d="M5.5 11.6l-.8 2M8.5 11.6l-.8 2M11.5 11.6l-.8 2"/></g>',
  };
  function wxIcon(kind) {
    const wrap = document.createElement('span');
    wrap.className = 'wx';
    wrap.innerHTML = `<svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">${WX[kind]}</svg>`;
    return wrap;
  }

  // The morning card as the digest sends it: one row per place, the day's lines on the left, day and night on the right.
  function digestCard(c) {
    return h('div', { class: 'digest' },
      h('div', { class: 'digest-head' }, h('div', { class: 'digest-date' }, c.date), h('div', { class: 'digest-hours' }, c.hours)),
      c.places.map((p) => h('div', { class: 'digest-place' },
        h('div', { class: 'dp-facts' },
          h('div', { class: 'dp-name' }, p.name),
          p.line ? h('div', { class: 'dp-line' }, p.line) : null,
          p.detail ? h('div', { class: 'dp-detail' }, p.detail) : null,
          p.air ? h('div', { class: 'dp-detail' }, p.air) : null),
        h('div', { class: 'dp-periods' }, h('span', {}, wxIcon(p.icons[0]), p.day[0]), h('b', {}, p.day[1]), h('span', {}, wxIcon(p.icons[1]), p.night[0]), h('b', {}, p.night[1])))));
  }

  // A message paragraph is a string, or a list of strings and { b } bold runs.
  function rich(p) {
    return Array.isArray(p) ? p.map((x) => (typeof x === 'string' ? x : h('b', {}, x.b))) : p;
  }

  // ── Typhoon track: past track, forecast points at 0/24/48/72 h, the cone they make ──
  const TY_PAST = [[304, 196], [282, 186], [260, 172], [236, 158]];
  const TY_FC = [[236, 158, 3], [192, 124, 12], [156, 92, 22], [130, 58, 34]];
  const TY_CITY = [101, 70];
  const TY_KM = 2.7; // km per map unit
  const TY_CONE = 'M96 58 L97.2 49.2 L100.6 41 L106 34 L113 28.6 L121.2 25.2 L130 24 L138.8 25.2 L147 28.6 L154 34 L157 37.3 L238.4 156.2 L239 158 L238.4 159.8 L236 161 L234.5 160.6 L186 134.4 L145 111.1 L142.6 109.5 L109.3 85 L106 82 L103 78.7 L100.6 75 L98.6 71 L97.2 66.8 L96.3 62.4 Z';

  function tyAt(hr) {
    const i = Math.min(2, Math.floor(hr / 24));
    const t = (hr - 24 * i) / 24;
    const p = TY_FC[i];
    const q = TY_FC[i + 1];
    return [p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t];
  }

  // The map as SVG markup. `hr` null draws the still image; a number draws the interactive frame at that hour.
  function typhoonMap(w, hr) {
    const live = hr !== null;
    const pos = live ? tyAt(hr) : TY_FC[0];
    const path = (pts) => pts.map(([x, y], i) => (i ? 'L' : 'M') + x + ' ' + y).join(' ');
    const fc = TY_FC.map(([x, y]) => [x, y]);
    const done = live ? [...fc.filter((_, i) => i * 24 <= hr), [pos[0], pos[1]]] : [];
    const labelAt = [[246, 152], [206, 122], [182, 88], [168, 44]];
    return `
      <defs><linearGradient id="ty-sea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0F2740"/><stop offset="1" stop-color="#143A5E"/></linearGradient></defs>
      <rect width="318" height="206" fill="url(#ty-sea)"/>
      <g stroke="#fff" stroke-opacity="0.07"><path d="M80 0 V206 M160 0 V206 M240 0 V206 M0 70 H318 M0 140 H318"/></g>
      <path d="M0 0 L118 0 C108 22 92 34 98 52 C104 70 84 82 88 100 C92 118 70 130 62 150 C56 166 40 180 30 206 L0 206 Z" fill="#26362F" stroke="#4B6658" stroke-width="1.2"/>
      <path d="${TY_CONE}" fill="#F2C14E" fill-opacity="${live ? 0.08 : 0.16}" stroke="#F2C14E" stroke-opacity="${live ? 0.3 : 0.55}"/>
      ${live ? `<circle cx="${pos[0]}" cy="${pos[1]}" r="${pos[2]}" fill="#F2C14E" fill-opacity="0.22" stroke="#F2C14E" stroke-width="1.5"/>`
    : TY_FC.slice(1).map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#F2C14E" stroke-opacity="0.45" stroke-dasharray="2 3"/>`).join('')}
      <path d="${path(TY_PAST)}" fill="none" stroke="#FF8A65" stroke-width="2"/>
      ${TY_PAST.slice(1, 3).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.5" fill="#FF8A65"/>`).join('')}
      <path d="${path(fc)}" fill="none" stroke="#F2C14E" stroke-opacity="${live ? 0.35 : 1}" stroke-width="2" stroke-dasharray="5 4"/>
      ${live ? `<path d="${path(done)}" fill="none" stroke="#F2C14E" stroke-width="2" stroke-dasharray="5 4"/>`
    : fc.slice(1).map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#F2C14E"/>`).join('')}
      <g transform="translate(${pos[0]} ${pos[1]})"><path d="M0 -9 C6 -9 9 -4 9 0 M0 9 C-6 9 -9 4 -9 0" fill="none" stroke="#FF7A59" stroke-width="2.4" stroke-linecap="round"/><circle r="4.5" fill="#FF7A59"/></g>
      <circle cx="${TY_CITY[0]}" cy="${TY_CITY[1]}" r="4" fill="#fff"/>
      <text x="93" y="74" fill="#F2F3F5" font-size="12" font-weight="600" text-anchor="end">${w.place}</text>
      ${live ? '' : `<g fill="#C9D3DF" font-size="10">${w.labels.map((l, i) => `<text x="${labelAt[i][0]}" y="${labelAt[i][1]}">${l}</text>`).join('')}</g>`}`;
  }

  function tySvg(markup) {
    const wrap = document.createElement('div');
    wrap.innerHTML = `<svg viewBox="0 0 318 206" aria-hidden="true" font-family="inherit">${markup}</svg>`;
    return wrap.firstChild;
  }

  function tyLegend(w) {
    return h('span', { class: 'ty-legend' }, w.legend.map((text, i) => h('span', {}, h('i', { class: 'k' + i }), text)));
  }

  function typhoonImage(w) {
    const btn = h('button', { type: 'button', class: 'widget-img', 'aria-label': w.open, onclick: () => openWidget(w) });
    btn.append(h('span', { class: 'ty-head' }, h('b', {}, w.title), h('span', {}, w.issued)), tySvg(typhoonMap(w, null)), tyLegend(w));
    return btn;
  }

  /**
   * Plays a scripted conversation. `keyboard(kind, msg)` returns inline buttons
   * for a message; `extra(msg)` renders charts, maps or widgets inside it.
   */
  function mountChat(container, opts) {
    const t = CONTENT[lang];
    const msgs = h('div', { class: 'tg-msgs', 'aria-live': 'polite' });
    const stepEl = h('div', { class: 'tg-step' });
    const primary = h('button', { type: 'button', class: 'primary' });
    const replay = h('button', { type: 'button' }, t.ui.replay);
    const exhibit = h('section', { class: 'tg', 'aria-label': opts.chat.name },
      h('div', { class: 'tg-head' },
        h('div', { class: 'avatar' + (opts.sun ? ' sun' : '') + (opts.dark ? ' dark' : '') }, opts.chat.avatar),
        h('div', {}, h('div', { class: 'tg-name' }, opts.chat.name), h('div', { class: 'tg-sub' }, opts.chat.sub))),
      msgs,
      h('div', { class: 'tg-foot' }, stepEl, h('div', { class: 'tg-ctrl' }, replay, primary)));
    container.append(exhibit);

    let idx = 0;
    let playing = true;
    let timer = null;

    function render(m) {
      const wide = m.card || m.widget;
      const box = h('div', { class: 'msg' + (m.from === 'me' ? ' me' : '') + (wide ? ' wide' : '') });
      if (m.by && opts.by) box.append(h('div', { class: 'msg-by by-' + m.by }, opts.by[m.by]));
      if (m.title) box.append(h('div', { class: 'msg-title' }, m.title));
      if (opts.extraTop) { const top = opts.extraTop(m); if (top) box.append(...[].concat(top)); }
      (m.text || []).forEach((p) => box.append(h('p', { class: 'msg-text' }, rich(p))));
      if (opts.extra) { const x = opts.extra(m); if (x) box.append(x); }
      (m.after || []).forEach((p) => box.append(h('p', { class: 'msg-text' }, p)));
      box.append(h('div', { class: 'msg-time' }, m.time));
      msgs.append(box);
      if (m.keyboard) msgs.append(opts.keyboard(m.keyboard, api));
      msgs.scrollTop = msgs.scrollHeight;
      if (opts.onShow) opts.onShow(m);
    }

    function update() {
      stepEl.textContent = t.ui.step(idx, opts.script.length);
      const done = idx >= opts.script.length;
      primary.hidden = done;
      primary.textContent = playing ? t.ui.pause : t.ui.play;
      if (opts.onStep) opts.onStep(idx);
    }

    function schedule(delay) {
      clearTimeout(timer);
      if (!playing || idx >= opts.script.length) return;
      timer = setTimeout(() => { render(opts.script[idx]); idx += 1; update(); schedule(STEP_MS); }, delay);
    }

    primary.addEventListener('click', () => { playing = !playing; update(); schedule(250); });
    replay.addEventListener('click', () => {
      clearTimeout(timer);
      msgs.replaceChildren();
      idx = 0;
      playing = true;
      if (opts.onReset) opts.onReset();
      update();
      schedule(300);
    });

    // Shows the script up to and including message n at once and pauses there.
    function jumpTo(n) {
      clearTimeout(timer);
      msgs.replaceChildren();
      if (opts.onReset) opts.onReset();
      for (let i = 0; i <= n; i += 1) render(opts.script[i]);
      idx = n + 1;
      playing = false;
      update();
    }
    if (opts.onReady) opts.onReady({ jumpTo });

    const api = {
      append: (m) => render(m),
      keys: (buttons, cls) => h('div', { class: 'keys' + (cls ? ' ' + cls : '') }, buttons),
    };
    update();
    schedule(400);
    return () => clearTimeout(timer);
  }

  // A body paragraph is a string, or a list of strings and { text, href } links.
  function para(b) {
    const parts = Array.isArray(b) ? b : [b];
    return h('p', {}, parts.map((x) => (typeof x === 'string' ? x : h('a', { href: x.href, rel: 'external' }, x.text))));
  }

  function intro(p) {
    return h('section', { class: 'intro' },
      h('h1', {}, p.title),
      p.body.map(para));
  }

  // ── Pages ────────────────────────────────────────────────────────────────

  function coursePage(main) {
    const c = CONTENT[lang].course;
    const state = { now: 2, side: false, ended: false };
    const mapEl = h('div', { class: 'rows' });

    function drawMap() {
      mapEl.replaceChildren(...c.map.lessons.map((title, i) => {
        const cls = i < state.now ? 'done' : i === state.now ? 'now' : '';
        const status = i < state.now ? c.map.done : i === state.now ? c.map.now : '';
        return h('div', { class: 'lesson ' + cls },
          h('div', { class: 'lesson-line' }, h('span', { class: 'num' }, i + 1), h('span', { class: 't' }, title), h('span', { class: 's' }, status)),
          i === 2 && state.side ? h('div', { class: 'detour' }, c.map.side) : null);
      }));
    }

    main.append(intro(c));
    const chatHost = h('div', { style: 'display:contents' });
    main.append(chatHost);
    main.append(h('section', { class: 'side' }, h('div', { class: 'label' }, c.map.label), mapEl));
    drawMap();

    return mountChat(chatHost, {
      chat: c.chat,
      script: c.script,
      extra: (m) => (m.chart ? chart(m.chart, c.chart) : null),
      onShow: (m) => {
        if (m.side) { state.side = true; drawMap(); }
        if (m.advance) { state.now = 3; drawMap(); }
      },
      onReset: () => { state.now = 2; state.side = false; state.ended = false; drawMap(); },
      keyboard: (kind, api) => {
        if (kind === 'practice') {
          const buttons = c.practice.options.map((label, i) => h('button', {
            type: 'button',
            onclick: () => {
              buttons.forEach((b) => { b.disabled = true; });
              api.append({ from: 'me', time: '07:46', text: [label] });
              api.append({ from: 'bot', time: '07:46', text: [i === c.practice.correct ? c.practice.right : c.practice.wrong] });
            },
          }, label));
          return api.keys(buttons, 'three');
        }
        const b = c.branches;
        return api.keys(['next', 'differently', 'example', 'practice'].map((k) => h('button', {
          type: 'button',
          onclick: () => {
            if (k === 'next') {
              api.append(state.now === 2 ? b.next : b.nextEnd);
            } else {
              api.append(b[k]);
            }
          },
        }, c.keys[k])));
      },
    });
  }

  function weatherPage(main) {
    const w = CONTENT[lang].weather;
    main.append(intro(w));
    const chatHost = h('div', { style: 'display:contents' });
    main.append(chatHost);
    main.append(h('section', { class: 'side' },
      h('div', { class: 'label' }, w.rules.label),
      h('div', { class: 'rows' }, w.rules.rows.map(([time, head, desc]) => h('div', { class: 'row' },
        h('span', { class: 'time' + (time === '—' ? ' muted' : '') }, time),
        h('div', { class: 'stack' }, h('div', { class: 'head' }, head), h('div', { class: 'desc' }, desc)))))));

    return mountChat(chatHost, {
      chat: w.chat,
      sun: true,
      script: w.script,
      extraTop: (m) => (m.card ? digestCard(w.card) : null),
    });
  }

  function chroniclePage(main) {
    const c = CONTENT[lang].chronicle;
    let current = c.defaultEvent;
    let selected = null;

    const saidLabel = h('div', { class: 'label' });
    const said = h('div', { class: 'said' });
    const countLabel = h('div', { class: 'label' });
    const stmts = h('div', { class: 'stmts' });
    const tl = h('div', { class: 'tl' });

    function stepLabel(n, labelEl) {
      return h('div', { class: 'step-label' }, h('span', { class: 'n' }, n), labelEl);
    }

    function draw() {
      const ev = c.events[current];
      saidLabel.textContent = c.steps.said(ev.said);
      said.replaceChildren(...ev.original.map((seg) => (seg.s === undefined ? seg.t : h('u', { 'data-s': seg.s, class: seg.s === selected ? 'on' : '' }, seg.t))));
      countLabel.textContent = c.steps.statements(ev.statements.length);
      stmts.replaceChildren(...ev.statements.map((s, i) => h('button', {
        type: 'button', class: 'stmt' + (i === selected ? ' on' : ''), 'aria-pressed': String(i === selected),
        onclick: () => { selected = selected === i ? null : i; draw(); },
      },
      h('span', { class: 'k' }, c.kinds[s.kind]),
      h('span', { class: 'x' }, s.text))));
      tl.replaceChildren(...c.events.map((e, i) => h('button', {
        type: 'button', 'aria-pressed': String(i === current),
        onclick: () => { current = i; selected = null; draw(); },
      },
      h('span', { class: 'd' }, e.date),
      h('span', { class: 'tt' }, e.title),
      i === current ? h('span', { class: 'c' }, c.steps.statements(e.statements.length)) : null,
      e.plan ? h('span', { class: 'p' }, c.planLabel) : null)));
    }

    main.append(intro(c));
    main.append(h('section', { class: 'flow' },
      h('div', { class: 'step' }, stepLabel(1, saidLabel), said),
      h('div', { class: 'hint' }, c.hint),
      h('div', { class: 'step' }, stepLabel(2, countLabel), stmts),
      h('div', { class: 'step' }, stepLabel(3, h('div', { class: 'label' }, c.steps.timeline)), tl),
      h('div', { class: 'step' }, stepLabel(4, h('div', { class: 'label' }, c.steps.asked)),
        h('div', { class: 'qa' },
          h('div', { class: 'msg me' }, h('p', { class: 'msg-text' }, c.qa.q)),
          h('div', { class: 'msg' }, h('p', { class: 'msg-text' }, c.qa.a), h('button', {
            type: 'button', class: 'msg-link',
            onclick: () => {
              current = c.qa.event;
              selected = c.qa.statement;
              draw();
              said.scrollIntoView({ behavior: 'smooth', block: 'center' });
              said.classList.add('flash');
              setTimeout(() => said.classList.remove('flash'), 1200);
            },
          }, c.qa.link))))));
    draw();
    return () => {};
  }

  function widgetsPage(main) {
    const w = CONTENT[lang].widgets;
    main.append(intro(w));
    const chatHost = h('div', { style: 'display:contents' });
    main.append(chatHost);
    main.append(h('section', { class: 'side' },
      h('div', { class: 'label' }, w.steps.label),
      h('div', { class: 'rows' }, w.steps.rows.map(([head, desc], i) => h('div', { class: 'row' },
        h('span', { class: 'num' }, i + 1),
        h('div', { class: 'stack' }, h('div', { class: 'head' }, head), h('div', { class: 'desc' }, desc)))))));

    return mountChat(chatHost, {
      chat: w.chat,
      script: w.script,
      extraTop: (m) => (m.widget ? [typhoonImage(w.widget), h('button', { type: 'button', class: 'msg-link', onclick: () => openWidget(w.widget) }, w.widget.open)] : null),
      keyboard: () => null,
    });
  }

  function builtPage(main) {
    const b = CONTENT[lang].built;
    const d = b.demo;
    const t = CONTENT[lang].ui;
    main.append(intro(b));

    const pill = h('span', { class: 'wi-pill' });
    const stepper = h('div', { class: 'wi-stepper' });
    const conds = h('div', { class: 'wi-conds', hidden: true });
    const log = h('div', { class: 'wi-log', 'aria-live': 'polite' });
    const stepEl = h('div', { class: 'wi-step' });
    const primary = h('button', { type: 'button', class: 'primary' });
    const replay = h('button', { type: 'button' }, t.replay);

    main.append(h('section', { class: 'side' },
      h('div', { class: 'label' }, b.label),
      h('div', { class: 'wi' },
        h('div', { class: 'wi-head' },
          h('div', { class: 'wi-top' }, h('span', { class: 'wi-id' }, d.id), pill),
          h('div', { class: 'wi-title' }, d.title),
          h('div', { class: 'wi-quote' }, d.quoteLabel, h('span', {}, d.quote))),
        stepper,
        conds,
        log,
        h('div', { class: 'wi-foot' }, stepEl, h('div', { class: 'tg-ctrl light' }, replay, primary)))));

    let idx = 0;
    let playing = true;
    let timer = null;

    function draw() {
      const cur = idx > 0 ? d.steps[idx - 1] : null;
      pill.textContent = cur ? cur.status : '';
      pill.className = 'wi-pill' + (cur && cur.tone ? ' ' + cur.tone : '');
      pill.hidden = !cur;
      stepper.replaceChildren(...d.stages.map((name, i) => {
        let cls = '';
        if (cur && i < cur.stage) cls = 'done';
        if (cur && i === cur.stage) cls = 'now' + (cur.tone === 'bad' ? ' bad' : cur.tone === 'good' ? ' good' : '');
        if (cur && cur.tone === 'live' && i <= cur.stage) cls = 'done';
        return h('div', { class: 'wi-stage ' + cls }, h('div', { class: 'bar' }), h('span', {}, name));
      }));
      const condState = cur && cur.cond;
      conds.hidden = !condState;
      if (condState) {
        conds.replaceChildren(h('div', { class: 'wi-sub' }, d.acceptLabel), ...d.conditions.map((text, i) => h('div', { class: 'wi-cond ' + condState[i] },
          h('span', { class: 'st' }, d.states[condState[i]]), h('span', {}, text))));
      }
      log.replaceChildren(...d.steps.slice(0, idx).map((st, i) => h('div', { class: 'wi-entry' + (i === idx - 1 ? ' latest' : '') + (st.tone === 'bad' ? ' bad' : '') },
        h('span', { class: 'time' }, st.log.time), h('span', { class: 'who' }, d.who[st.log.who]), h('span', { class: 'what' }, st.log.text))));
      stepEl.textContent = t.step(idx, d.steps.length);
      primary.hidden = idx >= d.steps.length;
      primary.textContent = playing ? t.pause : t.play;
    }

    function schedule(delay) {
      clearTimeout(timer);
      if (!playing || idx >= d.steps.length) return;
      timer = setTimeout(() => { idx += 1; draw(); schedule(2000); }, delay);
    }

    primary.addEventListener('click', () => { playing = !playing; draw(); schedule(300); });
    replay.addEventListener('click', () => { idx = 0; playing = true; draw(); schedule(400); });
    draw();
    schedule(500);
    return () => clearTimeout(timer);
  }

  function homePage(main) {
    const c = CONTENT[lang].home;
    const d = c.diagram;
    main.classList.add('stacked', 'home-page');

    // First screen: what it does in plain words, and a day of messages in the phone.
    const phone = h('div', { class: 'hero-phone' });
    main.append(h('section', { class: 'hero' },
      h('div', { class: 'hero-text' }, h('h1', {}, c.title), c.body.map(para), h('p', { class: 'aside' }, c.aside)),
      phone));
    let chat = null;
    const points = c.timeline.map(([at, time, label]) => h('button', {
      type: 'button', class: 'tl-pt', onclick: () => { if (chat) chat.jumpTo(at); },
    }, h('span', { class: 'd' }, time), h('span', { class: 't' }, label)));
    const stop = mountChat(phone, {
      chat: c.chat,
      script: c.script,
      by: c.by,
      onReady: (ctl) => { chat = ctl; },
      onStep: (shown) => {
        let current = -1;
        points.forEach((p, i) => {
          const on = c.timeline[i][0] < shown;
          p.classList.toggle('on', on);
          if (on) current = i;
        });
        points.forEach((p, i) => p.classList.toggle('now', i === current));
      },
      keyboard: (kind, api) => {
        const buttons = c.keys.map((label, i) => h('button', {
          type: 'button',
          onclick: () => {
            buttons.forEach((b) => { b.disabled = true; });
            api.append({ from: 'me', time: '12:42', text: [label] });
            api.append({ from: 'bot', by: 'journal', time: '12:42', text: [c.keyReplies[i]] });
          },
        }, label));
        return api.keys(buttons);
      },
    });
    phone.append(h('div', { class: 'home-tl' }, points));

    main.append(h('section', { class: 'features' },
      h('h2', {}, c.featuresTitle),
      h('div', { class: 'feat-list' }, c.features.map(([p, name, desc]) => h('a', { class: 'feat', href: '#' + p },
        h('span', { class: 'feat-name' }, name),
        h('span', { class: 'feat-desc' }, desc),
        h('span', { class: 'feat-go' }, c.demo, h('span', { 'aria-hidden': 'true' }, ' ›')))))));

    main.append(h('section', { class: 'how' }, h('h2', {}, c.howTitle), h('div', { class: 'how-body' }, c.how.map(para))));

    const box = (cls, [cat, title, desc]) => h('div', { class: 'dg-box ' + cls }, cat ? h('div', { class: 'cat' }, cat) : null, h('div', { class: 't' }, title), h('div', { class: 'd' }, desc));
    const label = (cls, n, text) => h('div', { class: 'dg-label ' + cls }, n ? h('span', { class: 'n' }, n) : null, h('span', {}, text));
    const arrows = `
      <line x1="182" y1="196" x2="272" y2="196" class="a-main"/><path d="M268 191 L276 196 L268 201" class="a-main"/>
      <line x1="278" y1="232" x2="188" y2="232" class="a-reply"/><path d="M192 227 L184 232 L192 237" class="a-reply"/>
      <line x1="492" y1="196" x2="582" y2="196" class="a-main"/><path d="M578 191 L586 196 L578 201" class="a-main"/>
      <line x1="588" y1="232" x2="498" y2="232" class="a-reply"/><path d="M502 227 L494 232 L502 237" class="a-reply"/>
      <line x1="822" y1="196" x2="912" y2="196" class="a-model"/><path d="M908 191 L916 196 L908 201" class="a-model"/>
      <line x1="918" y1="232" x2="828" y2="232" class="a-return"/><path d="M832 227 L824 232 L832 237" class="a-return"/>
      <line x1="385" y1="262" x2="385" y2="334" class="a-keep"/>`;
    main.append(h('section', { class: 'dg-scroll' },
      h('div', { class: 'dg', role: 'img', 'aria-label': [d.you[1], d.host[1], d.group, d.model[1]].join(', ') },
        svg(arrows, 1080, 450),
        box('you', d.you),
        box('host', d.host),
        box('records', d.records),
        box('model', d.model),
        h('div', { class: 'dg-group' },
          h('div', { class: 'cap' }, d.group),
          d.agents.map((a) => h('div', { class: 'dg-box agent' }, h('div', { class: 't' }, a), h('div', { class: 'd' }, d.agentDesc)))),
        label('l1', '1', d.arrows.message),
        label('l6 reply', '6', d.arrows.reply),
        label('l2 stack', '2', d.arrows.toAgent),
        label('l5 reply', '5', d.arrows.handsBack),
        label('l3 stack model', '3', d.arrows.asks),
        label('l4r model', '4', d.arrows.returns),
        h('div', { class: 'dg-label lk' }, d.arrows.keeps))));
    return () => { stop(); main.classList.remove('stacked', 'home-page'); };
  }

  function reviewPage(main) {
    const r = CONTENT[lang].review;
    main.append(intro(r));
    const chatHost = h('div', { style: 'display:contents' });
    main.append(chatHost);
    main.append(h('section', { class: 'side' },
      h('div', { class: 'label' }, r.side.label),
      h('div', { class: 'rows' }, r.side.rows.map(([time, head, desc]) => h('div', { class: 'row' },
        h('span', { class: 'time' }, time),
        h('div', { class: 'stack' }, h('div', { class: 'head' }, head), h('div', { class: 'desc' }, desc))))),
      h('div', { class: 'check' }, h('div', { class: 'label' }, r.side.checkLabel), h('p', {}, r.side.checkText))));

    return mountChat(chatHost, {
      chat: r.chat,
      dark: true,
      script: r.script,
      extra: (m) => (m.quotes ? h('div', { class: 'quotes' }, m.quotes.map(([q, src]) => h('div', { class: 'quote' }, h('span', {}, q), h('span', { class: 'src' }, src)))) : null),
      keyboard: (kind, api) => {
        const buttons = r.keys[kind].map(([id, labelText]) => h('button', {
          type: 'button',
          onclick: () => {
            buttons.forEach((b) => { b.disabled = true; });
            api.append({ from: 'me', time: '21:02', text: [labelText] });
            api.append({ from: 'bot', time: '21:02', text: [r.replies[id]] });
          },
        }, labelText));
        return api.keys(buttons);
      },
    });
  }

  // ── Interactive widget: drag the hours and watch the typhoon and its circle move ──

  function openWidget(w) {
    const modal = document.getElementById('modal');
    const t = CONTENT[lang];
    const state = h('div', { class: 'state' });
    const value = h('b', {});
    const range = h('input', { type: 'range', min: '0', max: '72', step: '1', value: '0' });
    const pic = h('div', { class: 'ty-pic' });

    function draw() {
      const hr = Number(range.value);
      const [x, y] = tyAt(hr);
      const km = Math.round((Math.hypot(x - TY_CITY[0], y - TY_CITY[1]) * TY_KM) / 10) * 10;
      pic.replaceChildren(tySvg(typhoonMap(w, hr)));
      value.textContent = `${hr} ${w.unit}`;
      const phase = hr < 12 ? 0 : hr < 36 ? 1 : hr < 60 ? 2 : 3;
      state.textContent = w.states[phase].replace('{km}', km);
    }

    range.addEventListener('input', draw);
    const close = () => { modal.hidden = true; modal.replaceChildren(); document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    modal.onclick = (e) => { if (e.target === modal) close(); };

    modal.replaceChildren(h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': w.title },
      h('div', { class: 'sheet-head' }, h('b', {}, w.title), h('button', { type: 'button', onclick: close }, t.ui.close)),
      pic,
      h('label', {}, h('span', { class: 'ty-row' }, w.slider, value), range,
        h('span', { class: 'ty-ticks' }, w.labels.map((l) => h('span', {}, l)))),
      state));
    draw();
    modal.hidden = false;
    range.focus();
  }

  // ── Wiring ──────────────────────────────────────────────────────────────

  const RENDER = { home: homePage, course: coursePage, weather: weatherPage, chronicle: chroniclePage, review: reviewPage, widgets: widgetsPage, built: builtPage };

  function renderAll() {
    teardown();
    renderRail();
    const main = document.getElementById('page');
    main.replaceChildren();
    document.title = `${CONTENT[lang].ui.nav[page]} | Pinejay`;
    teardown = RENDER[page](main) || (() => {});
    window.scrollTo(0, 0);
  }

  // Page switch: the rail stays, the content fades out (120 ms) and the new
  // page fades in while rising 6 px (200 ms). Reduced motion switches at once.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let switching = null;
  function switchPage() {
    const main = document.getElementById('page');
    clearTimeout(switching);
    if (reduceMotion.matches) { renderAll(); return; }
    main.classList.remove('entering');
    main.classList.add('leaving');
    switching = setTimeout(() => {
      main.classList.remove('leaving');
      renderAll();
      void main.offsetWidth; // restart the entry animation
      main.classList.add('entering');
    }, 120);
  }

  window.addEventListener('hashchange', () => { page = pickPage(); switchPage(); });
  renderAll();
})();
