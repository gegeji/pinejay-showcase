(function () {
  'use strict';

  const PAGES = ['course', 'weather', 'chronicle', 'widgets', 'built'];
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
    return PAGES.includes(p) ? p : 'course';
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

  function weatherMap(m, time) {
    const card = h('div', { class: 'map' });
    card.append(svg('<path d="M0 170 C 60 150, 90 190, 150 175 S 250 140, 318 160 L 318 236 L 0 236 Z" fill="#C9DCE6"/><path d="M20 40 C 80 60, 120 20, 190 50 S 280 30, 318 60" stroke="#D3D8DE" stroke-width="2" fill="none"/><path d="M0 110 C 70 100, 130 130, 210 105 S 290 120, 318 100" stroke="#D3D8DE" stroke-width="2" fill="none"/>', 318, 236));
    card.append(h('div', { class: 'map-title' }, m.title), h('div', { class: 'map-time' }, time));
    const pos = [[22, 56, 17], [196, 50, 19], [116, 104, 18, true], [30, 146, 18], [222, 150, 20]];
    pos.forEach(([x, y, temp, main], i) => card.append(h('div', { class: 'pin' + (main ? ' main' : ''), style: `left:${x}px;top:${y}px` }, h('span', {}, m.places[i]), h('b', {}, `${temp}°`))));
    return card;
  }

  function frontImage(w) {
    const btn = h('button', { type: 'button', class: 'widget-img', 'aria-label': w.open, onclick: () => openWidget(w) });
    btn.append(svg('<path d="M0 210 L0 120 C 60 112, 110 70, 170 40 L 170 210 Z" fill="#2C4A73"/><path d="M0 120 C 60 112, 110 70, 170 40" stroke="#8FB8E8" stroke-width="3" fill="none"/><path d="M58 108 l 12 -18 l 9 15 Z M112 78 l 12 -18 l 9 15 Z" fill="#8FB8E8"/><path d="M175 150 C 200 120, 215 100, 230 70" stroke="#D9E4F2" stroke-width="2" stroke-dasharray="4 5" fill="none"/><ellipse cx="205" cy="54" rx="40" ry="16" fill="#D9E4F2" opacity="0.85"/><path d="M190 76 l -4 12 M205 76 l -4 12 M220 76 l -4 12" stroke="#8FB8E8" stroke-width="2"/>', 318, 210));
    btn.append(h('span', { class: 'w-title' }, w.title), h('span', { class: 'w-cold' }, w.cold), h('span', { class: 'w-warm' }, w.warm));
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
        h('div', { class: 'avatar' + (opts.sun ? ' sun' : '') }, opts.chat.avatar),
        h('div', {}, h('div', { class: 'tg-name' }, opts.chat.name), h('div', { class: 'tg-sub' }, opts.chat.sub))),
      msgs,
      h('div', { class: 'tg-foot' }, stepEl, h('div', { class: 'tg-ctrl' }, replay, primary)));
    container.append(exhibit);

    let idx = 0;
    let playing = true;
    let timer = null;

    function render(m) {
      const wide = m.map || m.widget;
      const box = h('div', { class: 'msg' + (m.from === 'me' ? ' me' : '') + (wide ? ' wide' : '') });
      if (m.title) box.append(h('div', { class: 'msg-title' }, m.title));
      if (opts.extraTop) { const top = opts.extraTop(m); if (top) box.append(...[].concat(top)); }
      (m.text || []).forEach((p) => box.append(h('p', { class: 'msg-text' }, p)));
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

    const api = {
      append: (m) => render(m),
      keys: (buttons, cls) => h('div', { class: 'keys' + (cls ? ' ' + cls : '') }, buttons),
    };
    update();
    schedule(400);
    return () => clearTimeout(timer);
  }

  function intro(p) {
    return h('section', { class: 'intro' },
      h('h1', {}, p.title),
      p.body.map((b) => h('p', {}, b)));
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
      extraTop: (m) => (m.map ? weatherMap(w.map, m.time) : null),
      extra: (m) => (m.chart ? chart(m.chart, w.chart) : null),
      keyboard: (kind, api) => {
        const used = new Set();
        return api.keys(['hourly', 'move'].map((k) => h('button', {
          type: 'button',
          onclick: (e) => {
            if (used.has(k)) return;
            used.add(k);
            e.currentTarget.disabled = true;
            api.append(w.branches[k]);
          },
        }, w.keys[k])));
      },
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
      extraTop: (m) => (m.widget ? [frontImage(w.widget), h('button', { type: 'button', class: 'msg-link', onclick: () => openWidget(w.widget) }, w.widget.open)] : null),
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

  // ── Interactive widget: drag time and watch the front pass ──────────────

  function openWidget(w) {
    const modal = document.getElementById('modal');
    const t = CONTENT[lang];
    const state = h('div', { class: 'state' });
    const range = h('input', { type: 'range', min: '0', max: '6', step: '0.1', value: '0' });
    const pic = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    pic.setAttribute('viewBox', '0 0 480 240');

    function draw() {
      const hours = Number(range.value);
      const x = 60 + hours * 50; // front position; "you" stand at x = 300
      pic.innerHTML = `
        <path d="M0 240 L0 ${150} C ${x * 0.4} 145, ${x * 0.75} 110, ${x} 70 L ${x} 240 Z" fill="#2C4A73"/>
        <path d="M0 150 C ${x * 0.4} 145, ${x * 0.75} 110, ${x} 70" stroke="#8FB8E8" stroke-width="3" fill="none"/>
        <ellipse cx="${x + 45}" cy="58" rx="52" ry="20" fill="#D9E4F2" opacity="0.9"/>
        <path d="M${x + 25} 84 l -5 14 M${x + 45} 84 l -5 14 M${x + 65} 84 l -5 14" stroke="#8FB8E8" stroke-width="2"/>
        <line x1="300" y1="200" x2="300" y2="230" stroke="#F2C14E" stroke-width="3"/>
        <circle cx="300" cy="196" r="6" fill="#F2C14E"/>
        <text x="300" y="186" fill="#F2C14E" font-size="13" text-anchor="middle" font-family="inherit">${w.you}</text>
        <text x="16" y="226" fill="#D9E4F2" font-size="13" font-family="inherit">${w.cold}</text>
        <text x="464" y="226" fill="#D9E4F2" font-size="13" text-anchor="end" font-family="inherit">${w.warm}</text>`;
      const phase = x < 240 ? 0 : x < 300 ? 1 : 2;
      state.textContent = w.states[phase];
    }

    range.addEventListener('input', draw);
    const close = () => { modal.hidden = true; modal.replaceChildren(); document.removeEventListener('keydown', onKey); };
    const onKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    modal.onclick = (e) => { if (e.target === modal) close(); };

    modal.replaceChildren(h('div', { class: 'sheet', role: 'dialog', 'aria-modal': 'true', 'aria-label': w.title },
      h('div', { class: 'sheet-head' }, h('b', {}, w.title), h('button', { type: 'button', onclick: close }, t.ui.close)),
      pic,
      h('label', {}, w.slider, range),
      state));
    draw();
    modal.hidden = false;
    range.focus();
  }

  // ── Wiring ──────────────────────────────────────────────────────────────

  const RENDER = { course: coursePage, weather: weatherPage, chronicle: chroniclePage, widgets: widgetsPage, built: builtPage };

  function renderAll() {
    teardown();
    renderRail();
    const main = document.getElementById('page');
    main.replaceChildren();
    document.title = `${CONTENT[lang].ui.nav[page]} | Pinejay`;
    teardown = RENDER[page](main) || (() => {});
    window.scrollTo(0, 0);
  }

  window.addEventListener('hashchange', () => { page = pickPage(); renderAll(); });
  renderAll();
})();
