/* The Index in the Library's style (2026-11-05, built into the live site). It holds what the Index page held before, from the same data file (data.json) and the same rules (the old
   app.js): the same categories with their counts, the two sort orders, the search over the same fields, each entry's projects with their photographs, credits and OPEN links, and
   "Also Connected". Phil, 2026-11-03: "don't add information to terminal mockup that isn't there on current index page". The Library's masthead index gives the look: names in Book capitals
   under a Bold heading. This is the mockup's people.js (Phils Website/mockups/film-music-originals/library-site/) with the live data and the live addresses. */
(function () {
  const AG = window.D4AG, esc = AG.esc;
  const nav = [['Info', '/#info'], ['Film', '/#film'], ['Music', '/#music'], ['Index', '#people-artists']].map(x => '<a href="' + x[1] + '"' + (x[0] === 'Index' ? ' aria-current="page"' : '') + '>' + x[0] + '</a>').join('');
  document.body.insertAdjacentHTML('afterbegin', '<header class="hd"><a href="/#home" aria-label="Philip Di Fiore — Home">Philip Di Fiore</a><nav aria-label="Main navigation">' + nav + '</nav></header>');
  const main = document.getElementById('main');
  main.innerHTML = '<div class="pg"><h1 class="mast"><a href="#people-artists"><span class="ag-fit ag-logo nolig" data-w=".36">Index</span></a></h1><div class="ix-tools"><nav class="ix-cats" id="cats" aria-label="Browse index"></nav><div class="ix-find"><input id="q" type="search" autocomplete="off" placeholder="Search" aria-label="Search"><div class="ix-sort" id="sort" role="group" aria-label="Sort entries"></div></div></div><div id="out" aria-live="polite"></div></div>';
  const out = document.getElementById('out');

  function start(D) {
    const E = Object.fromEntries(D.entities.map(e => [e.id, e]));
    const P = Object.fromEntries(D.projects.map(p => [p.id, p]));

    // The Index page's rules, as in the old app.js.
    const projectCategories = ['Film', 'Music', 'Live'];
    const tagCategories = ['People/Artists', 'Places', 'Equipment', 'Techniques', 'Formats', 'Genres', 'Organizations', 'Press', 'Awards'];
    const categories = [tagCategories[0], ...projectCategories, ...tagCategories.slice(1), 'All'];
    const categoryLabel = c => c === 'People/Artists' ? 'People/Groups' : c;
    const slug = c => c.toLowerCase().replace(/[\s/]+/g, '-');
    const projectIds = e => [...new Set(e.associations.map(a => a.projectId))];
    const tagCount = p => D.entities.filter(e => e.associations.some(a => a.projectId === p.id)).length;
    const inCategory = (e, c) => e.category === c || (e.secondaryCategories || []).includes(c);
    const entriesFor = c => c === 'All' ? [...D.entities, ...D.projects.filter(p => !p.indexHidden)] : projectCategories.includes(c) ? D.projects.filter(p => p.indexCategory === c) : D.entities.filter(e => inCategory(e, c));
    const isProject = x => Boolean(x.title);
    const countFor = x => isProject(x) ? tagCount(x) : projectIds(x).length;
    const alphabeticKey = x => isProject(x) ? x.title : x.originalCategory === 'person' && x.lastName ? x.lastName + ', ' + x.label : x.label;
    const alphabeticCompare = (a, b) => alphabeticKey(a).localeCompare(alphabeticKey(b), 'en', { sensitivity: 'base', numeric: true });
    let sortBy = 'alpha';
    const sorted = items => [...items].sort((a, b) => sortBy === 'tags' ? (countFor(b) - countFor(a) || alphabeticCompare(a, b)) : alphabeticCompare(a, b));
    const directAssociation = a => ['documented', 'philip-provided'].includes(a.status) && !(/affiliat|prior artist|reference|influence|comparison/i.test(a.role));
    function relatedToProjects(ids, excludedId) {
      const featured = ids.includes('in-the-city') ? ['julia-stiles', 'fran-kranz'] : [];
      const priority = e => { const i = featured.indexOf(e.id); return i < 0 ? featured.length : i; };
      return D.entities.filter(e => e.id !== excludedId && e.category === 'People/Artists')
        .map(e => ({ entity: e, score: new Set(e.associations.filter(a => directAssociation(a) && ids.includes(a.projectId)).map(a => a.projectId)).size }))
        .filter(x => x.score > 0).sort((a, b) => priority(a.entity) - priority(b.entity) || b.score - a.score || alphabeticCompare(a.entity, b.entity)).slice(0, 5).map(x => x.entity);
    }
    const relatedTo = e => relatedToProjects(e.associations.filter(directAssociation).map(a => a.projectId), e.id);
    const conciseCredit = assocs => [...new Set(assocs.map(a => (a.displayRole || a.role) + (a.status === 'unresolved' ? ' (unconfirmed)' : a.status === 'suggested' ? ' (suggested)' : '')))].join(' · ');

    const link = x => (isProject(x) ? '#project/' : '#entity/') + encodeURIComponent(x.id);
    const name = x => isProject(x) ? esc(x.title) + (x.artist && x.artist !== 'Philip Di Fiore' ? '<i>' + esc(x.artist) + '</i>' : '') : x.festival ? esc(x.festival) + '<i>' + esc(x.distinction) + '</i>' : esc(x.label);
    // a project opens at the address its data gives: a page of the site in this tab, any other place in a new one
    const card = (p, credit, showTitle = true) => {
      const h = p.href || '', away = /^https?:/.test(h);
      return '<figure class="ix-card">' + (p.image ? '<img src="' + esc(p.image) + '" alt="' + esc(p.imageAlt || p.title) + '" loading="lazy" decoding="async">' : '') + '<figcaption class="ag-cap">' + (showTitle ? '<b>' + esc(p.title) + '</b>' : '') + '<span class="pr">' + esc(credit) + '</span>' + (h ? '<span class="pr"><a href="' + esc(h) + '"' + (away ? ' target="_blank" rel="noopener"' : '') + '>Open</a></span>' : '') + '</figcaption></figure>';
    };
    const also = list => list.length ? '<h3 class="ix-sec">Also Connected</h3><p class="ix-also">' + list.map(r => '<a href="' + link(r) + '">' + esc(r.label) + '</a>').join('') + '</p>' : '';
    const record = (x, cards, rel) => '<div class="ag-bar"><span>' + esc(categoryLabel(isProject(x) ? x.indexCategory || 'All' : x.category)) + '</span><nav><a href="#' + slug(isProject(x) ? x.indexCategory || 'All' : x.category) + '">Back</a></nav></div><h2 class="ix-title">' + esc(x.festival || x.label || x.title) + '</h2>' + (x.distinction ? '<p class="ix-dist">' + esc(x.distinction) + '</p>' : '') + '<div class="ix-cards">' + cards + '</div>' + also(rel);
    function renderEntity(e) {
      const ids = projectIds(e).sort((a, b) => Number(P[b]?.recordType === 'studio') - Number(P[a]?.recordType === 'studio'));
      return record(e, ids.map(id => P[id] ? card(P[id], conciseCredit(e.associations.filter(a => a.projectId === id))) : '').join(''), relatedTo(e));
    }
    const renderProject = p => record(p, card(p, p.credit || p.artist || '', false), relatedToProjects([p.id]));
    function renderList(category, query) {
      const t = query.toLowerCase();
      const items = sorted(entriesFor(query ? 'All' : category).filter(x => !t || (isProject(x) ? [x.title, x.artist] : [x.label, x.category, categoryLabel(x.category), ...x.associations.map(a => a.role)]).join(' ').toLowerCase().includes(t)));
      if (!items.length) return '<p class="ix-none">' + (query ? 'No matches for “' + esc(query) + '”. Try another category or search term.' : 'No entries yet.') + '</p>';
      const row = x => '<a href="' + link(x) + '">' + name(x) + '</a>';
      if (sortBy === 'tags') return '<div class="ix-list">' + items.map(row).join('') + '</div>';
      // the magazine's masthead: each letter in Bold, its names under it
      let last = '', html = '';
      items.forEach(x => { const k = alphabeticKey(x).charAt(0).toUpperCase(), L = /[A-Z]/.test(k) ? k : '#'; if (L !== last) { html += '<h3>' + L + '</h3>'; last = L; } html += row(x); });
      return '<div class="ix-list">' + html + '</div>';
    }

    const cats = document.getElementById('cats'), sortEl = document.getElementById('sort'), q = document.getElementById('q');
    function render() {
      const parts = location.hash.slice(1).split('/'), type = parts[0] || 'people-artists';
      let id = ''; try { id = decodeURIComponent(parts.slice(1).join('/')); } catch (err) { id = ''; }
      id = D.aliases?.[id] || id;
      const entity = type === 'entity' ? E[id] : null, project = type === 'project' ? P[id] : null, selected = entity || project || null;
      const current = entity?.category || project?.indexCategory || categories.find(c => slug(c) === type) || 'People/Artists';
      document.body.classList.toggle('is-record', !!selected);
      cats.innerHTML = categories.map(c => '<a href="#' + slug(c) + '"' + (c === current && !selected ? ' aria-current="true"' : '') + '>' + esc(categoryLabel(c)) + '<b>' + entriesFor(c).length + '</b></a>').join('');
      sortEl.innerHTML = selected ? '' : 'Sort<button type="button" data-sort="alpha"' + (sortBy === 'alpha' ? ' aria-pressed="true"' : '') + '>Alphabetical</button><button type="button" data-sort="tags"' + (sortBy === 'tags' ? ' aria-pressed="true"' : '') + '>Tag count</button>';
      out.innerHTML = ['entity', 'project'].includes(type) && !selected ? '<p class="ix-none">This entry is no longer in the Index. <a href="#all">Browse all entries</a></p>' : entity ? renderEntity(entity) : project ? renderProject(project) : renderList(current, q.value.trim());
      document.title = (entity?.label || project?.title || 'Index') + ' · Philip Di Fiore';
      AG.fit(document);
    }
    sortEl.addEventListener('click', e => { const b = e.target.closest('[data-sort]'); if (b) { sortBy = b.dataset.sort; render(); } });
    q.addEventListener('input', () => { if (/^#(entity|project)\//.test(location.hash)) location.hash = '#all'; else render(); });
    addEventListener('hashchange', () => { render(); scrollTo(0, 0); });
    render();
  }

  fetch('data.json').then(r => { if (!r.ok) throw new Error('Content unavailable'); return r.json(); }).then(start)
    .catch(() => { out.innerHTML = '<p class="ix-none">The index couldn’t load. <a href="" onclick="location.reload();return false">Try again</a></p>'; });
})();
