/* Studio 101 · the Library in the Avant Garde design (2026-11-03): window.D4AG, the parts that draw it. Reads nothing and
   saves nothing. It needs no D4, so a test page draws with it too (ag/test.html).
   Phil, 2026-11-03, of the mockup of nine covers: "I'm loving what I'm seeing so far in the thumbnails", then "redesign
   the entire LIBRARY with this AVANT GARDE design aesthetic. And deploy." The rules are on the design page,
   Projects/Apps/Studio 101/Studio 101 Avant Garde design.md; the styles are in ag/ag.css; each collection's cover layout
   is in ag/covers.js (window.D4AG_COVERS); the mockups this code comes from are public/mockups/2026-11-03-avant-garde/.
     cols()           the collections in order, [{ id, label, n: the issue number ("01") }]. 2026-11-03 (AGENTS.md: the
                      structure "can change at any time", and the app "always shows the current structure"): the list is
                      the shell's (D4.ST.cols, which GET /api/structure reads from zz-system/structure.json), so a new or
                      renamed collection takes its number and its name at once; a page without D4 (ag/test.html) takes
                      the list of 2026-11-03 below (COLS)
     no(id), label(id)  a collection's issue number and name ('' and the id when the list does not hold it)
     INK              each collection's accent, by id (a collection with no row: Studio 101's orange)
     acc(id)          the collection's accent, number and name as the value of a style attribute: --ag-acc, which the
                      kickers' names and the drop caps inside that element take, and --ag-no and --ag-name as CSS
                      strings, which research-read.css sets in a brief's and a finding's kicker
     layout(id)       the collection's cover layout (covers.js; plate for a collection with no row)
     pick(id, story)  the collection's cover (an object for cover()) on story, the story that pages/library.js
                      chooses (a front's story of the day, D4.libKit.agCover; the Library home's from issue.js's leads
                      and the tiles' rules): { title, href, rel (its vault
                      path), photo (a picker's record or the helper's photo field), para (its own line) }. The cover
                      takes the collection's layout when the photograph's shape suits it (the design page's table), else
                      plate; a story with no photograph is set in type. A type or kraft cover takes the hand-broken
                      headline that covers.js keeps for the story's rel, else breaks the headline itself; a kraft
                      cover's paragraph is the one covers.js keeps for the rel, else story.para (its index line, or its
                      opening sentences: pages/library.js agPara), else none. null when there is no story.
     cover(o)         the cover: one link to the collection's front. o = { id, label, n, layout, href, story: { title,
                      href, photo: { url, small, w, h, title, maker } }, lines, para, logoW, plateW, eager }. lines: a
                      cover in type's headline, [[words, ink], ...] with @ where the photograph sits, and a line's own
                      share of the width as a third item (['@', '', .53]: the photograph on its own line); without them
                      the headline is broken into four to six lines of similar length. logoW: the share of the width the
                      logotype fills (each collection has its own). plateW: a plate's width in cqw (60; the design page
                      gives 74 for a landscape on the Library home). eager: the cover is in the first screen.
     photo(o)         the photograph a cover shows, or null (a kraft cover is type only)
     credit(photo)    "Cover: <title>, <maker>" ('' for none): the caption under a cover, the foot of a contents page
     spread(cover, contents)  a cover and its contents page side by side, stacked on a phone; contents is the page's
                      HTML under its heading: D4AG.contents(...) + '<p class="ag-pg-cred">' + D4AG.credit(...) + '</p>'
     contents(xs)     contents entries, xs = [{ title, href, n (a number or a count), by (the collection or the kind) }],
                      and a last item that counts the entries a short page leaves out (pages())
     index(groups)    the masthead index, groups = [{ label, n, href, items: [{ label, count, href }] }]
     fit(root)        sets each fitted line in root (an .ag-fit with data-w, the share of its box it fills: on a cover
                      the cover's width, elsewhere its parent's, a block that is not a title fit.js sizes), then keeps
                      each contents page as high as its cover (pages()). It runs by itself on every page the shell draws
                      in #main, at once, again after the fonts load, and when the window changes.
     ready(fn)        fn, once the face's four weights have loaded
     esc(s)           s escaped for HTML
   How a page draws a collection's cover: pages/library.js D4.libKit.agCover chooses the day's story and takes its
   photograph through the page's picker (D4.pick) before any other, so no photograph shows twice on the page, then asks
   pick() for the cover.
     var pk = D4.pick;                                      at the start of render, before any await
     L.library(c.id).then(function (Lc) {                   the loader registers the answer's photographs
       var o = D4.libKit.agCover(c, Lc, pk);                null when the collection has no story at all: no cover
       return D4.libKit.agPara(o);                          a kraft cover with no paragraph reads its story's opening
     }).then(function (o) {
       html = D4AG.spread(D4AG.cover(o), D4AG.contents(xs) + '<p class="ag-pg-cred">' + D4AG.credit(D4AG.photo(o)) + '</p>');
   The nine covers on one page (the Library home) each take theirs the same way. */
(function () {
  'use strict';
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  /* a title copied from a web page may hold "&amp;" and the like; the cover shows the character (library.js plain) */
  var plain = function (s) { return String(s == null ? '' : s).replace(/&(amp|quot|#39|apos|lt|gt);/g, function (m, k) { return { amp: '&', quot: '"', '#39': "'", apos: "'", lt: '<', gt: '>' }[k]; }); };
  var n2 = function (x) { return +x.toFixed(2); };

  /* ================= the collections ================= */
  /* the order, the numbers and the names: the shell's list of the collections (the structure file), else this one */
  var COLS = [['writing', 'Writing'], ['ai', 'AI'], ['filmmaking', 'Filmmaking'], ['photography', 'Photography'], ['music', 'Music'], ['research', 'Research'], ['interests', 'Interests'], ['architecture', 'Architecture'], ['philbrain', 'PhilBrain']];
  function cols() {
    var D4 = window.D4, xs = D4 && D4.ST && D4.ST.cols && D4.ST.cols.length ? D4.ST.cols : COLS.map(function (c) { return { id: c[0], label: c[1] }; });
    return xs.map(function (c, i) { return { id: c.id, label: c.label, n: (i < 9 ? '0' : '') + (i + 1) }; });
  }
  function col(id) { return cols().filter(function (c) { return c.id === id; })[0] || null; }
  function no(id) { var c = col(id); return c ? c.n : ''; }
  function label(id) { var c = col(id); return c ? c.label : String(id || ''); }
  /* The tables by id. A collection with no row (a new one) takes Studio 101's orange, the plate layout (layout(), below)
     and a logotype of .6 of the cover's width. The accents (the design page, Colour): Writing blue, AI red, Filmmaking
     and Music the field's red-orange, Photography red, Research green, Interests dark orange, Architecture teal,
     PhilBrain magenta */
  var ORANGE = '#ff8c00';
  var INK = { writing: '#1d4ea8', ai: '#e2402a', filmmaking: '#ec4a2a', photography: '#e2402a', music: '#ec4a2a', research: '#3d7b33', interests: '#c96a00', architecture: '#1f5c6b', philbrain: '#b3247c' };
  /* a CSS string ("06", "Research") */
  function cssStr(s) { return '"' + String(s).replace(/[\\"]/g, '\\$&').replace(/[\r\n]+/g, ' ') + '"'; }
  function acc(id) { var c = col(id); return '--ag-acc:' + (INK[id] || ORANGE) + (c ? ';--ag-no:' + cssStr(c.n) + ';--ag-name:' + cssStr(c.label) : ''); }
  /* the share of a cover's width that each collection's logotype fills (the mockup's) */
  var LOGO = { writing: .44, ai: .3, filmmaking: .9, photography: .86, music: .6, research: .9, interests: .62, architecture: .9, philbrain: .64 };

  /* ================= photographs ================= */
  /* a photograph's shape (width / height). Black bars inside the file (photo-bars.js, the helper's bars) are not part of
     the picture: a picker record has taken them off w and h already (it keeps the file's in fw and fh) */
  function shape(p) {
    var b = p.bars, w = +p.w || 1, h = +p.h || 1;
    if (b && b.length === 4 && !p.fw) { w *= 1 - b[1] - b[3]; h *= 1 - b[0] - b[2]; }
    return w / h;
  }
  function img(p, o) {
    o = o || {};
    var fw = p.fw || p.w, fsw = p.fsw || p.sw, b = p.bars;
    var set = !o.small && p.small && p.small !== p.url && fsw && fw > fsw ? ' srcset="' + esc(p.small) + ' ' + fsw + 'w, ' + esc(p.url) + ' ' + fw + 'w" sizes="' + (o.eager ? '(max-width: 760px) 100vw, 600px' : 'auto, (max-width: 760px) 100vw, 400px') + '"' : '';
    var css = (o.style || '') + (b && b.length === 4 && (b[0] || b[1] || b[2] || b[3]) ? 'object-view-box:inset(' + b.map(function (x) { return n2(100 * x) + '%'; }).join(' ') + ');' : '');
    return '<img' + (o.cls ? ' class="' + o.cls + '"' : '') + ' src="' + esc(p.small || p.url) + '"' + set + ' alt="' + esc(o.alt != null ? o.alt : p.title) + '"' +
      (o.eager ? ' fetchpriority="high"' : ' loading="lazy"') + ' decoding="async"' + (css ? ' style="' + esc(css) + '"' : '') + '>';
  }
  /* a photograph placed whole: its width in cqw, its height from its shape */
  function ph(p, w, style, eager) {
    return '<figure class="cv-ph" style="width:' + n2(w) + 'cqw;height:' + n2(w / shape(p)) + 'cqw;' + (style || '') + '">' + img(p, { eager: eager }) + '</figure>';
  }

  /* ================= the cover's type ================= */
  /* the average width of a capital in Avant Garde Bold, letter-spaced as a cover sets it, in ems: an estimate, for a
     line's size before fit() measures it and for the line breaks below */
  var ADV = .6;
  /* the logotype and its number square */
  function logo(o, w) {
    var lab = String(o.label || '');
    return '<div class="cv-logo"><span class="ag-fit ag-logo" data-w="' + w + '" style="font-size:' + n2(w * 100 / (lab.length * ADV + (o.n ? .4 : 0) || 1)) + 'cqw">' + esc(lab) +
      (o.n ? '<b class="cv-no">' + esc(o.n) + '</b>' : '') + '</span></div>';
  }
  /* the cover line: the story's headline, word for word, at k of its layout's size (--cv-k; kIn). A photograph chosen for
     the collection itself belongs to no story, so its cover has no line (2026-11-03, the Library home) */
  function line(t, k, style) {
    if (!t) return '';
    var st = (k < 1 ? '--cv-k:' + k.toFixed(3) + ';' : '') + (style || '');
    return '<p class="cv-line"' + (st ? ' style="' + st + '"' : '') + '>' + esc(t) + '</p>';
  }
  /* the height in cqw of a cover line's block, set at size x k (cqw) in a column width wide: an estimate, so that a
     photograph keeps clear of it */
  function block(t, size, width, lh, k) { var s = size * k; return t ? Math.max(1, Math.ceil(t.length * s * ADV / width)) * s * lh : 0; }
  /* 2026-11-03 (the review: AI's 107-character line was 8.4 px on the Library home's covers, the mockup's line 11.5 px): a
     cover line sets at its layout's size, and smaller only as far as its block must to fit the room its layout leaves
     it (avail, in cqw), never under .6 of that size. Until then a line past 64 characters set at the square root of 64
     over its length, so its block kept the height of a 64-character one, whatever room the cover had. */
  function kIn(t, size, width, lh, avail) { var k = 1; while (k > .6 && block(t, size, width, lh, k) > avail) k -= .02; return k; }
  /* the inset's width in characters of the line it sits in (.74em high) */
  function insetChars(p) { return shape(p) * .74 / ADV; }
  /* a cover in type: each line fitted to 90% of the width, or to its own share (a third item: the photograph's own line,
     breakLines); @ is the photograph, at the height of the capitals */
  function hl(lines, p) {
    return '<div class="cv-hl">' + lines.map(function (l) {
      var words = String(l[0] || ''), at = words.indexOf('@') >= 0 && p, w = l[2] || .9, c = words.replace(/\s*@\s*/, at ? ' ' : '').trim().length + (at ? insetChars(p) : 0);
      var t = at ? esc(words).replace('@', img(p, { cls: 'cv-inset', small: true, alt: '', style: 'aspect-ratio:' + n2(shape(p)) + ';' })) : esc(words.replace(/\s*@\s*/, ' ').trim());
      return '<span class="ag-fit' + (l[1] ? ' cv-' + l[1] : '') + '" data-w="' + w + '" style="font-size:' + n2(w * 100 / (Math.max(c, 1) * ADV)) + 'cqw">' + t + '</span>';
    }).join('') + '</div>';
  }
  /* A headline broken by its words into k lines whose lengths are as near the same as they can be (the least sum of
     squares from the mean). */
  function balance(words, k) {
    var n = words.length, T = words.join(' ').length / k, cost = [], cut = [], i, j, m;
    var len = function (a, b) { return words.slice(a, b).join(' ').length; };
    for (j = 0; j <= k; j++) { cost.push([]); cut.push([]); for (i = 0; i <= n; i++) cost[j][i] = Infinity; }
    cost[0][0] = 0;
    for (j = 1; j <= k; j++) for (i = j; i <= n; i++) for (m = j - 1; m < i; m++) {
      var c = cost[j - 1][m] + Math.pow(len(m, i) - T, 2);
      if (c < cost[j][i]) { cost[j][i] = c; cut[j][i] = m; }
    }
    var out = [], e = n;
    for (j = k; j > 0; j--) { m = cut[j][e]; out.unshift(words.slice(m, e).join(' ')); e = m; }
    return out;
  }
  /* The lines of a type or kraft cover whose covers.js entry gives none (the design page: "the headline lines are broken
     by hand so that the lines have similar lengths"): four to six lines that fit the height the cover leaves the
     headline, the count whose lines fill about four fifths of it and run most even; a headline too short for four such
     lines takes fewer, longer ones. On a type cover the photograph goes at the end of the shortest line, the first lines
     are blue and the rest red; kraft is all black. The room: on a type cover from under the logotype to the foot; on a
     kraft cover from 24cqw to the foot, less its paragraph (3cqw Book capitals at 1.12, 90cqw wide) and the gap over it.
     2026-11-03 (the review: the Writing cover set "Bong Joon-ho" in two lines at its foot and left half of it blank
     cream): when a type cover's lines fill less than three fifths of their room, the photograph leaves its line and
     stands on a line of its own between the two inks, as wide as the room the words leave it allows (90cqw at most), so
     the words and the photograph fill the cover; its line is ['@', '', the share of the cover's width it fills]. */
  function breakLines(title, lay, p, para) {
    var words = plain(title).trim().split(/\s+/).filter(Boolean), type = lay === 'type';
    var room = type ? 78 : 68 - (para ? Math.ceil(para.length * 3 * ADV / 90) * 3 * 1.12 : 0);
    var best = function (room, inset) {
      var b = null;
      for (var k = Math.min(6, words.length); k >= 1; k--) {
        var ls = balance(words, k), cs = ls.map(function (l) { return l.length; }), at = -1;
        if (inset) { at = cs.indexOf(Math.min.apply(null, cs)); cs[at] += 1 + insetChars(p); }
        /* the height of the lines in cqw: each fills 90 of the 100, and takes .86 of its size with the gap under it */
        var h = cs.reduce(function (s, c) { return s + .86 * 90 / (c * ADV); }, 0), even = Math.max.apply(null, cs) / Math.min.apply(null, cs);
        var score = Math.abs(h - .8 * room) / (.8 * room) + (even - 1) / 2 + (k < 4 ? 1 : 0);
        if (h <= room && (!b || score < b.score)) b = { ls: ls, at: at, h: h, score: score };
      }
      return b || { ls: [words.join(' ')], at: inset ? 0 : -1, h: room };
    };
    var b = best(room, type && !!p), alone = 0;
    if (type && p && b.h < .6 * room) {
      var c = best(room - 24, false), ph = Math.min(.96 * room - c.h - 2, 90 / shape(p));
      if (ph >= 20) { b = c; alone = +(ph * shape(p) / 100).toFixed(3); }
    }
    var blue = type ? Math.max(1, Math.round(b.ls.length * .4)) : 0, out = [];
    b.ls.forEach(function (l, i) {
      out.push([l + (i === b.at ? ' @' : ''), type ? (i < blue ? 'b' : 'r') : '']);
      if (alone && i === blue - 1) out.push(['@', '', alone]);
    });
    return out;
  }

  /* ================= the cover ================= */
  /* the shapes (width / height) a layout's photograph needs, from the design page's table; type and kraft need none */
  var SUIT = { type: [0, Infinity], kraft: [0, Infinity], plate: [0, Infinity], night: [0, Infinity], field: [1.25, 1.9], bleed: [1.6, Infinity], field2: [1.5, Infinity], corner: [.6, .95], band: [1.3, 1.8] };
  function suits(lay, p) {
    var q = SUIT[lay]; if (!q) return false;
    if (lay === 'type' || lay === 'kraft') return true;
    if (!p) return false;
    var r = shape(p); return r >= q[0] && r <= q[1];
  }
  function photo(o) { var p = o && o.story && o.story.photo; return p && p.url && o.layout !== 'kraft' ? p : null; }
  /* The nine layouts (the design page, "The nine layouts"), as the mockup set them, with each photograph's box sized so a
     shape the layout suits stays whole inside the cover and clear of the line: a plate and the night's plate keep to the
     height between the logotype and the line, centred in it; the bleed's photograph ends above the line; the corner's
     keeps 21cqw free at its left for the line. The line's room (kIn): field, the yellow band over the photograph; bleed,
     what the photograph leaves under the logotype; plate and night, all but the 44 and 34cqw the photograph keeps;
     field2, above the photograph; corner, the column under the logotype; band, under the logotype. A plate with no line
     (a photograph chosen for the collection, 2026-11-03) takes the line's room too, up to 74% of the width. */
  function cover(o) {
    var s = o.story || {}, p = photo(o), t = plain(s.title), lay = SUIT[o.layout] ? o.layout : 'plate', lw = o.logoW || LOGO[o.id] || .6, out = '', w, h, r, k, room;
    if (!p && lay !== 'kraft') lay = 'type';   /* a story with no photograph: the cover is set in type */
    r = p ? shape(p) : 1;
    switch (lay) {
      case 'type': out = logo(o, lw) + hl(o.lines || breakLines(t, lay, p), p); break;
      case 'field': k = kIn(t, 3.1, 43.5, 1.04, 93 - 100 / r); out = logo(o, lw) + line(t, k) + ph(p, 100, '', o.eager); break;
      case 'bleed': k = kIn(t, 3.5, 65, 1.04, 76 - 100 / r); out = logo(o, lw) + ph(p, 100, 'top:' + n2(Math.max(17, Math.min(Math.max(25, 52 - 50 / r), 93 - block(t, 3.5, 65, 1.04, k) - 100 / r))) + 'cqw;', o.eager) + line(t, k); break;
      case 'plate': k = kIn(t, 2.9, 86, 1.04, 29); room = Math.min(t ? 62 : 73.3, 73.3 - block(t, 2.9, 86, 1.04, k)); w = Math.min(o.plateW || (t ? 60 : 74), room * r); h = w / r; out = logo(o, lw) + ph(p, w, 'top:' + n2(21 + (room - h) / 2) + 'cqw;', o.eager) + line(t, k); break;
      case 'field2': k = kIn(t, 3.5, 40, 1.04, 63 - 70 / r); out = logo(o, lw) + line(t, k) + ph(p, 70, '', o.eager); break;
      case 'kraft': out = logo(o, lw) + hl(o.lines || breakLines(t, lay, null, o.para), null) + (o.para ? '<p class="cv-par">' + esc(o.para) + '</p>' : ''); break;
      case 'corner': w = Math.min(82 * r, 70); k = kIn(t, 3.5, 91 - w, 1.04, 74); out = logo(o, lw) + ph(p, w, '', o.eager) + line(t, k, 'width:' + n2(91 - w) + 'cqw;'); break;
      case 'band': k = kIn(t, 2.9, 90, 1.04, 7.5); out = ph(p, 100, '', o.eager) + logo(o, lw) + line(t, k); break;
      case 'night': k = kIn(t, 5.6, 80, .98, 37); room = Math.min(60, 71 - block(t, 5.6, 80, .98, k)); w = Math.min(56, room * r); h = w / r; out = logo(o, lw) + ph(p, w, 'top:' + n2(20 + (room - h) / 2) + 'cqw;', o.eager) + line(t, k); break;
    }
    return '<a class="cv cv-' + lay + '" href="' + esc(o.href) + '" aria-label="' + esc(t ? o.label + ': ' + t : o.label) + '">' + out + '</a>';
  }
  /* the collection's layout (covers.js), plate for a collection with no row */
  function layout(id) { var k = (window.D4AG_COVERS || {})[id]; return k && SUIT[k.layout] ? k.layout : 'plate'; }
  /* hand-broken lines fit only the headline they were broken from (a headline Phil changes is broken again) */
  function same(lines, t) {
    var w = function (s) { return plain(s).replace(/@/g, ' ').replace(/\s+/g, ' ').trim(); };
    return w(lines.map(function (l) { return l[0]; }).join(' ')) === w(t);
  }
  function pick(id, s) {
    if (!s) return null;
    var hand = (((window.D4AG_COVERS || {})[id] || {}).hand || {})[s.rel] || {}, t = plain(s.title);
    var p = s.photo && s.photo.url ? s.photo : null, lay = layout(id);
    if (!suits(lay, p)) lay = p ? 'plate' : 'type';
    var para = lay === 'kraft' ? hand.para || s.para || '' : '';
    return {
      id: id, label: label(id), n: no(id), layout: lay, href: '#library/' + encodeURIComponent(id), story: { title: t, href: s.href, rel: s.rel || '', photo: p },
      lines: lay === 'type' || lay === 'kraft' ? (hand.lines && same(hand.lines, t) ? hand.lines : breakLines(t, lay, lay === 'type' ? p : null, para)) : null,
      para: para, logoW: LOGO[id] || .6
    };
  }

  /* ================= the parts around a cover ================= */
  /* the photograph's credit: its title, then its maker when the title does not name the maker already. A maker that is
     "not recorded", and a note in brackets, are left out */
  function credit(p) {
    if (!p || !p.url) return '';
    var t = plain(p.title).trim(), m = String(p.maker || '').replace(/\s*\([^)]*\)/g, '').trim(), first = m.split(/[,;]/)[0].trim().toLowerCase();
    return 'Cover: ' + esc(t + (m && !/not (recorded|named)/i.test(m) && t.toLowerCase().indexOf(first) < 0 ? ', ' + m : ''));
  }
  function spread(cv, contentsHtml) {
    return '<section class="ag-spread">' + cv + '<div class="ag-pg"><h2 class="ag-pg-h">Contents</h2>' + (contentsHtml || '') + '</div></section>';
  }
  /* the last item counts the entries a short contents page cannot hold (pages()); it shows only then */
  function contents(xs) {
    return '<ol class="ag-toc">' + (xs || []).map(function (x) {
      var t = '<span class="ag-toc-t">' + esc(plain(x.title)) + (x.n != null && x.n !== '' ? '<b>' + esc(x.n) + '</b>' : '') + '</span>' + (x.by ? '<span class="ag-toc-by">' + esc(x.by) + '</span>' : '');
      return '<li>' + (x.href ? '<a href="' + esc(x.href) + '">' + t + '</a>' : '<span>' + t + '</span>') + '</li>';
    }).join('') + '<li class="ag-toc-more" hidden></li></ol>';
  }
  function index(groups) {
    var num = function (x) { return typeof x === 'number' ? x.toLocaleString('en-US') : String(x == null ? '' : x); };
    return '<div class="ag-ix">' + (groups || []).map(function (g) {
      var h = (g.n ? '<b class="ag-no">' + esc(g.n) + '</b>' : '') + esc(g.label);
      return '<div class="ag-ix-g"><h3 class="ag-ix-h">' + (g.href ? '<a href="' + esc(g.href) + '">' + h + '</a>' : h) + '</h3><ul>' +
        (g.items || []).map(function (x) {
          var row = '<span>' + esc(x.label) + '</span><b>' + esc(num(x.count)) + '</b>';
          return '<li>' + (x.href ? '<a href="' + esc(x.href) + '">' + row + '</a>' : '<span>' + row + '</span>') + '</li>';
        }).join('') + '</ul></div>';
    }).join('') + '</div>';
  }

  /* ================= fitted lines (the design page, "Fitted lines") =================
     A fitted line is an .ag-fit with its share in data-w (the Photography front keeps pixel widths in data-w of its own,
     pages/photography.js, so the class is part of the mark). Each line is measured once at 100 px, then set to
     share x 10000 / width in cqw on a cover (the cover's container units keep the fit at every width), or to share x the
     parent's width x 100 / width in px elsewhere. All the lines are measured in one pass, so the page lays out once. A
     line that is not drawn (a closed fold) keeps its size until the next fit. */
  var FIT = '.ag-fit[data-w]';
  function fit(root) {
    var els = [].slice.call((root || document).querySelectorAll(FIT));
    var was = els.map(function (el) { return el.style.fontSize; }), cv = els.map(function (el) { return !!el.closest('.cv'); });
    els.forEach(function (el) { el.style.fontSize = '100px'; });
    var ws = els.map(function (el) { return el.getBoundingClientRect().width; });
    var pw = els.map(function (el, i) { return cv[i] ? 0 : el.parentElement.getBoundingClientRect().width; });
    els.forEach(function (el, i) {
      var f = parseFloat(el.getAttribute('data-w'));
      if (!ws[i] || !f || (!cv[i] && !pw[i])) { el.style.fontSize = was[i]; return; }
      el.style.fontSize = cv[i] ? n2(f * 10000 / ws[i]) + 'cqw' : n2(f * pw[i] * 100 / ws[i]) + 'px';
    });
    pages(root);
  }
  /* 2026-11-03 (the design chat): a contents page is a square as high as its cover (ag.css .ag-pg), also where its type
     stays at the smallest size that reads (between 761 and 1100 px the page grew past its square, and a strip of the
     page's ground showed under the cover: AI's at 1024 px was 504 px high, its cover 484). What does not fit leaves it,
     so its credit stays at its foot: first the kinds under the titles (is-short), so every title stays; then, when the
     titles alone do not fit, the entries from the end, and the last line counts them ("3 more"; 2026-11-03, the review: at
     820 px AI's page showed 5 of its 8 entries, and nothing on it said that the list went on). It changes only
     attributes, which the page's watch below does not see. On a phone the page takes its whole list under the cover. */
  function pages(root) {
    [].forEach.call((root || document).querySelectorAll('.ag-pg'), function (pg) {
      var li = [].slice.call(pg.querySelectorAll('.ag-toc > li:not(.ag-toc-more)')), more = pg.querySelector('.ag-toc-more');
      var full = function () { return pg.scrollHeight > pg.clientHeight + 1; };
      pg.classList.remove('is-short'); li.forEach(function (x) { x.hidden = false; });
      if (more) more.hidden = true;
      if (!full()) return;
      pg.classList.add('is-short');
      if (!more || !full()) return;
      more.hidden = false;
      for (var i = li.length - 1, k = 1; i > 0 && full(); i--, k++) { li[i].hidden = true; more.setAttribute('data-n', k); }
    });
  }
  /* fn, once the face's four weights have loaded (a fallback font measures differently) */
  function ready(fn) {
    var F = document.fonts;
    if (!F || !F.load) { fn(); return; }
    Promise.all(['700', '300', '100', '500'].map(function (w) { return F.load(w + ' 40px "itc-avant-garde-gothic-pro"', 'AB'); }))
      .then(null, function () {}).then(function () { return F.ready; }).then(function () { fn(); });
  }
  /* every page the shell draws in #main, as fit.js watches it: when its content changes, when the window changes, and
     when a font arrives. The lines are fitted at once, in the face the page draws (the fallback while the kit is late),
     then again once the face's four weights have loaded (2026-11-03, the review: until all four had loaded, each line
     kept ag.js's estimate, which can run past its box, for 1 to 4 seconds and, with a slow kit, for 25 or more). A page
     with no fitted line (Home, Projects, Agenda, LLM) asks for no font. */
  var main = document.getElementById('main'), t;
  function soon() { clearTimeout(t); t = setTimeout(function () { if (main.querySelector(FIT)) { fit(main); ready(function () { fit(main); }); } }, 60); }
  if (main) {
    new MutationObserver(soon).observe(main, { childList: true, subtree: true });
    addEventListener('resize', soon);
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', soon);
    soon();
  }

  window.D4AG = { cols: cols, no: no, label: label, INK: INK, acc: acc, layout: layout, pick: pick, cover: cover, photo: photo, credit: credit, spread: spread, contents: contents, index: index, fit: fit, ready: ready, esc: esc };
})();
