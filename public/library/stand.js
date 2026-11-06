/* Film and Music as the Library draws a collection, built into the live site (2026-11-05). Phil: "I'd like you to mockup the site with LIBRARY COVERS option using the site images", then
   "This is great". This is the mockup's site.js (Phils Website/mockups/film-music-originals/library-site/) with the live site's addresses: #film and #music show the stand, and #film/<slug>
   and #music/<slug> open that work above the stand, its cover beside its contents page. Each cover comes from Studio 101's own D4AG.cover (ag.js).
   The page draws inside the root it is given, a shadow root, so that the site's other styles and the Library's styles never meet. It asks its host for what the site already has:
   onPress(slug) opens a press article, onGallery(link) opens The Buffalo Hunt's photo gallery, onWatch(work) says that a film starts, and busy() says that one of those is open. */
(function () {
  function mount(root, opts) {
    opts = opts || {};
    var AG = window.D4AG, LS = window.LS, esc = AG.esc, host = root.host || root;
    var section = '', works = [], WORD = '', shown = -1, timer;
    var no = function (i) { return (i < 9 ? '0' : '') + (i + 1); };
    var at = function (id) { for (var i = 0; i < works.length; i++) if (works[i].id === id) return i; return -1; };
    var to = function (id) { return '#' + section + (id ? '/' + id : ''); };

    var box = document.createElement('div');
    root.appendChild(box);
    /* the film, on the work's own ground, from the same player as the old page */
    var dlg = document.createElement('dialog');
    dlg.className = 'film';
    dlg.innerHTML = '<button type="button" autofocus>Close</button><div class="fr"></div><p></p>';
    root.appendChild(dlg);

    function cover(w, i, href) {
      var c = w.c, lay = c.layout || 'plate', label = w.title;
      var html = AG.cover({ id: w.id, label: label, n: no(i), layout: lay, href: href, logoW: c.w, story: { title: w.by, href: href, rel: '', photo: { url: '/library/img/' + w.id + '.jpg', w: Math.round(w.s * 1000), h: 1000, title: w.title } } });
      html = html.replace('class="ag-fit ag-logo"', 'class="ag-fit ag-logo nolig"');
      if (c.br) html = html.replace(label.replace(/&/g, '&amp;') + '<b', c.br.join('<br>') + '<b');
      if (c.lg) html = html.replace(c.lg[0] + '<b', c.lg[1] + '<b');
      /* the plate fills the height that the title and the artist leave it; a short title leaves it more. [its width, its top], in cqw, for a cover set by hand */
      if (!c.free) {
        var size = c.w * 100 / (label.length * .6), top = 8 + size * .8, foot = lay === 'night' ? 84.5 : 91, H = foot - top, W = H * w.s;
        if (c.plate) { W = c.plate[0]; H = W / w.s; top = c.plate[1]; }
        if (W > 74) { W = 74; H = W / w.s; top += (foot - top - H) / 2; }
        html = html.replace(/<figure class="cv-ph" style="[^"]*"/, '<figure class="cv-ph" style="width:' + W.toFixed(2) + 'cqw;height:' + H.toFixed(2) + 'cqw;top:' + top.toFixed(2) + 'cqw;"');
      }
      if (c.lineStyle) html = html.replace(/<p class="cv-line"( style="([^"]*)")?/, function (m, a, st) { return '<p class="cv-line" style="' + (st || '') + c.lineStyle + '"'; });
      /* the work's own colours */
      var st = (c.bg ? 'background:' + c.bg + ';' : '') + (c.ink ? 'color:' + c.ink + ';' : '') + (c.nb ? '--nb:' + c.nb + ';--nt:' + c.nt + ';' : '') + (c.line ? '--ln:' + c.line + ';' : '');
      html = html.replace('<a class="cv ', '<a' + (st ? ' style="' + st + '"' : '') + ' class="cv ' + (c.nb ? 'own-no ' : '') + (c.line ? 'own-ln ' : ''));
      return html.replace(/aria-label="[^"]*"/, 'aria-label="' + esc(w.title + ', ' + w.by) + '"');
    }

    function cap(w, i) {
      var press = (w.press || []).map(function (p) { return esc(p[0]); }).join(' · ');
      var act = w.vimeo ? '<a href="#watch" data-watch="' + w.id + '">Watch</a>' : '<a href="' + to(w.id) + '">Open</a>';
      return '<figcaption class="ag-cap"><b>' + no(i) + ' ' + esc(w.title) + '</b>' + esc(w.by) + (press ? '<span class="pr">' + press + '</span>' : '') + '<span class="pr">' + act + '</span></figcaption>';
    }

    /* the contents page of one work: what its page offered, in that page's words */
    function entries(w) {
      var xs = [], n = 0, next = function () { n++; return (n < 10 ? '0' : '') + n; };
      if (w.vimeo) xs.push({ title: 'Watch', n: next(), href: '#watch', by: w.by });
      if (w.open) xs.push({ title: 'Open', n: next(), href: w.open, by: w.by });
      (w.parties || []).forEach(function (u, k) { xs.push({ title: 'Party ' + (k + 1), n: next(), href: u, by: 'Recording Parties' }); });
      (w.press || []).forEach(function (p) { xs.push({ title: p[0], n: next(), href: '/press/' + p[1], by: 'Press' }); });
      (w.links || []).forEach(function (l) { xs.push({ title: l[0], n: next(), href: l[1], by: 'Links' }); });
      return xs;
    }
    function spread(w, i) {
      var first = w.vimeo ? '#watch' : w.open || w.links[0][1];
      var html = AG.spread(cover(w, i, first), AG.contents(entries(w)).replace(/href="https:/g, 'target="_blank" rel="noopener" href="https:') + '<p class="ag-pg-cred">Cover: ' + esc(w.title) + ', ' + esc(w.by) + '</p>');
      if (/^https:/.test(first)) html = html.replace('<a style=', '<a target="_blank" rel="noopener" style=').replace('<a class="cv ', '<a target="_blank" rel="noopener" class="cv ');
      return html;
    }
    function bar(i) {
      var prev = works[(i + works.length - 1) % works.length], nxt = works[(i + 1) % works.length];
      return '<div class="ag-bar"><span>' + WORD + ' ' + no(i) + ' / ' + works.length + '</span><nav><a href="' + to(prev.id) + '" rel="prev">Previous</a><a href="' + to(nxt.id) + '" rel="next">Next</a><a href="' + to() + '">Close</a></nav></div>';
    }

    /* the page of one section: the site's header, the logotype, the open work's place, the stand */
    function draw() {
      var stand = works.map(function (w, i) { return '<figure>' + cover(w, i, to(w.id)) + cap(w, i) + '</figure>'; }).join('');
      /* the page's own contents page closes a long stand */
      if (works.length > 6) stand += '<figure class="toc"><div class="ag-pg"><h2 class="ag-pg-h">Contents</h2>' + AG.contents(works.map(function (w, i) { return { title: w.title, n: no(i), href: to(w.id) }; })) + '</div></figure>';
      var mast = '<h1 class="mast"><a href="' + to() + '"><span class="ag-fit ag-logo' + (section === 'film' ? ' nolig' : '') + '" data-w="' + (section === 'film' ? .3 : .42) + '">' + WORD + '</span></a></h1>';
      var nav = [['Info', '#info'], ['Film', '#film'], ['Music', '#music'], ['Index', '/index/index.html#people-artists']].map(function (x) { return '<a href="' + x[1] + '"' + (x[0].toLowerCase() === section ? ' aria-current="page"' : '') + '>' + x[0] + '</a>'; }).join('');
      box.innerHTML = '<header class="hd"><a href="#home" aria-label="Philip Di Fiore — Home">Philip Di Fiore</a><nav aria-label="Main navigation">' + nav + '</nav></header>' +
        '<main id="main"><div class="pg">' + mast + '<section id="open" hidden></section><div class="stand" id="stand">' + stand + '</div></div></main>';
    }

    /* the lines are fitted at once, in the face the page draws, then again when the face's weights have loaded */
    function fit() { AG.fit(root); }
    function refit() { fit(); AG.ready(fit); }
    function soon() { clearTimeout(timer); timer = setTimeout(refit, 60); }

    function show(sec, slug) {
      var fresh = sec !== section;
      if (fresh) { section = sec; works = LS[sec] || []; WORD = sec === 'film' ? 'Film' : 'Music'; draw(); }
      var open = box.querySelector('#open'), i = at(slug || '');
      shown = i;
      open.hidden = i < 0;
      host.classList.toggle('is-open', i >= 0);    /* the open work takes the first screen, in place of the page's logotype */
      open.innerHTML = i < 0 ? '' : bar(i) + spread(works[i], i);
      document.title = (i < 0 ? '' : works[i].title + ' · ') + WORD + ' · Philip Di Fiore';
      refit();
      if (i >= 0 || fresh) window.scrollTo({ top: 0, behavior: 'instant' });
    }

    function watch(w) {
      if (opts.onWatch) opts.onWatch(w);
      dlg.style.setProperty('--g', w.g); dlg.style.setProperty('--t', w.t);
      dlg.querySelector('.fr').innerHTML = '<iframe src="https://player.vimeo.com/video/' + encodeURIComponent(w.vimeo) + '?autoplay=1&title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen title="' + esc(w.title) + '"></iframe>';
      dlg.querySelector('p').textContent = w.by + ': ' + w.title;
      if (!dlg.open) dlg.showModal();
    }
    function onClose() { dlg.querySelector('.fr').innerHTML = ''; }
    function stop() { dlg.close(); }
    function onClick(e) {
      var a = e.target.closest && e.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href === '#watch') {
        e.preventDefault();
        var w = a.dataset.watch ? works[at(a.dataset.watch)] : works[shown];
        if (w) watch(w);
      } else if (href === '#gallery') {
        e.preventDefault();
        if (opts.onGallery) opts.onGallery(a);
      } else if (href.indexOf('/press/') === 0 && opts.onPress && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
        e.preventDefault();       /* the article opens over the page, as it did; its address still opens it on its own */
        opts.onPress(href.slice(7));
      }
    }
    function onKey(e) {
      if (dlg.open || shown < 0 || (opts.busy && opts.busy())) return;
      if (e.key === 'Escape') location.hash = to();
      if (e.key === 'ArrowLeft') location.hash = to(works[(shown + works.length - 1) % works.length].id);
      if (e.key === 'ArrowRight') location.hash = to(works[(shown + 1) % works.length].id);
    }
    dlg.addEventListener('close', onClose);
    dlg.querySelector('button').addEventListener('click', stop);
    root.addEventListener('click', onClick);
    addEventListener('keydown', onKey);
    addEventListener('resize', soon);
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', soon);

    return {
      show: show,
      /* a film that a press article names: the work with that film, on its ground; any other film, on the Library's black */
      watch: function (vimeo, title) {
        var all = LS.film.concat(LS.music), w = null;
        for (var i = 0; i < all.length; i++) if (all[i].vimeo === vimeo) w = all[i];
        watch(w || { vimeo: vimeo, title: title, by: 'Philip Di Fiore', g: '#13110f', t: '#f6f2e9' });
      },
      destroy: function () {
        clearTimeout(timer);
        removeEventListener('keydown', onKey);
        removeEventListener('resize', soon);
        if (document.fonts && document.fonts.removeEventListener) document.fonts.removeEventListener('loadingdone', soon);
        root.removeEventListener('click', onClick);
        if (dlg.open) dlg.close();
        host.classList.remove('is-open');
        box.remove(); dlg.remove();
      }
    };
  }
  window.LibraryStand = { mount: mount };
})();
