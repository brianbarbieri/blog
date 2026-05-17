/*
  Casa Modero — Gallery System
  Replaces the old W3.CSS thumbnail + slideshow approach.
  Drop this file next to index.html and add:
    <script src="static/gallery.js"></script>
  at the bottom of <body> (after the existing scripts).

  Usage in HTML:
    <div class="cm-gallery" data-section="property"></div>
    <div class="cm-gallery" data-section="olivo"></div>
    etc.

  The script finds every .cm-gallery div and builds the grid + lightbox.
*/

(function () {
  'use strict';

  /* ── Image data ─────────────────────────────────────── */
  const SECTIONS = {
    property: {
      label: 'Property',
      images: [
        { src: 'static/images/house/other/0.jpeg', caption: '' },
        { src: 'static/images/house/other/2.jpg',   caption: '' },
        { src: 'static/images/house/other/1.jpg',   caption: '' },
        { src: 'static/images/house/other/3.jpg',   caption: '' },
        { src: 'static/images/house/other/4.jpg', caption: '' },
        { src: 'static/images/house/other/4_2.jpg', caption: '' },
        { src: 'static/images/house/other/4_3.jpg', caption: '' },
        { src: 'static/images/house/other/4_4.jpg', caption: '' },
        { src: 'static/images/house/other/4_5.jpg', caption: '' },
        { src: 'static/images/house/other/4_6.jpg', caption: '' },
        { src: 'static/images/house/other/4_7.jpg', caption: '' },
        { src: 'static/images/house/other/5.jpg',   caption: '' },
        { src: 'static/images/house/other/6.jpg',   caption: '' },
        { src: 'static/images/house/other/7.jpg',  caption: '' },
        { src: 'static/images/house/other/8.jpg',  caption: '' },
        { src: 'static/images/house/other/9.jpg',   caption: '' },
        { src: 'static/images/house/other/10_1.jpg',caption: '' },
        { src: 'static/images/house/other/10_2.jpg',caption: '' },
        { src: 'static/images/house/other/11.jpg',  caption: '' },
        { src: 'static/images/house/other/12.jpg',  caption: '' },
        { src: 'static/images/house/other/13.jpg',  caption: '' },
        { src: 'static/images/house/other/14.jpg',  caption: '' },
        { src: 'static/images/house/other/15.jpg',  caption: '' },
        { src: 'static/images/house/other/16.jpg', caption: '' },
        { src: 'static/images/house/other/17.jpg', caption: '' },
        { src: 'static/images/house/other/18.jpg', caption: '' },
        { src: 'static/images/house/other/19.jpg', caption: '' },
        { src: 'static/images/house/other/20.jpg',  caption: '' },
        { src: 'static/images/house/other/21.jpg',  caption: '' },
        { src: 'static/images/house/other/22.jpg',  caption: '' },
      ],
    },
    olivo: {
      label: 'Olivo',
      images: [
        { src: 'static/images/house/olivo/1.jpg', caption: 'Bedroom' },
        { src: 'static/images/house/olivo/2.jpg', caption: 'Bedroom' },
        { src: 'static/images/house/olivo/3.jpg', caption: 'Bedroom' },
        { src: 'static/images/house/olivo/4.jpg', caption: 'Bedroom' },
        { src: 'static/images/house/olivo/6.jpg', caption: 'Bedroom' },
        { src: 'static/images/house/olivo/7.jpg', caption: 'View'    },
        { src: 'static/images/house/olivo/8.jpg', caption: 'Shower'  },
        { src: 'static/images/house/olivo/9.jpg', caption: 'Shower'  },
      ],
    },
    melanzana: {
      label: 'Melanzana',
      images: [
        { src: 'static/images/house/melanzana/1.jpeg', caption: 'Bedroom' },
        { src: 'static/images/house/melanzana/2.jpeg', caption: 'Bedroom' },
        { src: 'static/images/house/melanzana/3.jpg',  caption: 'Bedroom' },
        { src: 'static/images/house/melanzana/4.jpg',  caption: 'Bedroom' },
        { src: 'static/images/house/melanzana/5.jpg',  caption: 'Bedroom' },
        { src: 'static/images/house/melanzana/6.jpg',  caption: 'Toilet'  },
        { src: 'static/images/house/melanzana/7.jpg',  caption: 'Shower'  },
      ],
    },
    cavolo: {
      label: 'Cavolo',
      images: [
        { src: 'static/images/house/cavolo/1.jpg', caption: 'Bedroom' },
        { src: 'static/images/house/cavolo/2.jpg', caption: 'Bedroom' },
        { src: 'static/images/house/cavolo/3.jpg', caption: 'Bedroom' },
        { src: 'static/images/house/cavolo/4.jpg', caption: 'Bedroom'  },
        { src: 'static/images/house/cavolo/5.jpg', caption: 'View'  },
        { src: 'static/images/house/cavolo/6.jpg', caption: 'Shower'  },
        { src: 'static/images/house/cavolo/7.jpg', caption: 'Toilet'  },
        { src: 'static/images/house/cavolo/8.jpg', caption: 'Shower'  },
      ],
    },
  };

  /* ── State ───────────────────────────────────────────── */
  let lbImages  = [];
  let lbIndex   = 0;
  let lbSection = '';

  /* ── Inject CSS ──────────────────────────────────────── */
  const CSS = `
  .cm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 6px;
    margin-bottom: 1.5rem;
  }
  .cm-thumb {
    aspect-ratio: 4/3;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    background: #e8e2db;
  }
  .cm-thumb img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform .3s ease;
  }
  .cm-thumb:hover img { transform: scale(1.06); }
  .cm-thumb-label {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: rgba(0,0,0,.52); color: #fff;
    font-size: 10px; letter-spacing: .07em; text-transform: uppercase;
    padding: 3px 8px; opacity: 0; transition: opacity .2s;
    font-family: 'DM Sans', sans-serif;
  }
  .cm-thumb:hover .cm-thumb-label { opacity: 1; }
  .cm-thumb-badge {
    position: absolute; top: 6px; right: 6px;
    background: rgba(0,0,0,.42); color: #fff;
    font-size: 10px; border-radius: 10px; padding: 2px 7px;
    font-family: 'DM Sans', sans-serif;
  }

  /* Lightbox */
  .cm-lightbox {
    display: none; position: fixed; inset: 0; z-index: 9999;
    background: rgba(0,0,0,.93);
    flex-direction: column; align-items: center; justify-content: center;
  }
  .cm-lightbox.open { display: flex; }

  .cm-lb-top {
    position: absolute; top: 0; left: 0; right: 0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 16px 20px; z-index: 2;
  }
  .cm-lb-title  { color: rgba(255,255,255,.8); font-size: 13px; letter-spacing: .05em; font-family: 'DM Sans', sans-serif; }
  .cm-lb-counter{ color: rgba(255,255,255,.45); font-size: 12px; font-family: 'DM Sans', sans-serif; }
  .cm-lb-close  {
    background: none; border: none; color: rgba(255,255,255,.6);
    font-size: 22px; cursor: pointer; padding: 4px 8px; line-height: 1; transition: color .2s;
  }
  .cm-lb-close:hover { color: #fff; }

  .cm-lb-stage {
    position: relative; display: flex; align-items: center; justify-content: center;
    width: 100%; flex: 1; padding: 56px 80px 0; overflow: hidden; box-sizing: border-box;
  }
  .cm-lb-img {
    max-width: 100%; max-height: 100%; border-radius: 3px;
    object-fit: contain; display: block; transition: opacity .2s ease;
  }
  .cm-lb-img.fade { opacity: 0; }

  .cm-lb-caption {
    color: rgba(255,255,255,.45); font-size: 11px;
    letter-spacing: .08em; text-transform: uppercase;
    margin-top: 10px; min-height: 18px; font-family: 'DM Sans', sans-serif;
  }

  .cm-lb-nav {
    position: absolute; top: 50%; transform: translateY(-50%);
    background: rgba(255,255,255,.1); border: 0.5px solid rgba(255,255,255,.18);
    color: #fff; border-radius: 50%; width: 46px; height: 46px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 20px; transition: background .2s; flex-shrink: 0;
    line-height: 1;
  }
  .cm-lb-nav:hover  { background: rgba(255,255,255,.22); }
  .cm-lb-nav.prev   { left:  14px; }
  .cm-lb-nav.next   { right: 14px; }

  .cm-filmstrip {
    width: 100%; padding: 14px 20px 22px;
    display: flex; align-items: center; gap: 5px; overflow-x: auto;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.2) transparent; flex-shrink: 0;
    box-sizing: border-box;
  }
  .cm-filmstrip::-webkit-scrollbar { height: 3px; }
  .cm-filmstrip::-webkit-scrollbar-thumb { background: rgba(255,255,255,.2); border-radius: 2px; }

  .cm-film-th {
    flex-shrink: 0; width: 66px; height: 48px; border-radius: 3px;
    overflow: hidden; cursor: pointer; opacity: .38;
    border: 1.5px solid transparent; transition: opacity .18s, border-color .18s;
  }
  .cm-film-th img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .cm-film-th:hover  { opacity: .72; }
  .cm-film-th.active { opacity: 1; border-color: rgba(255,255,255,.72); }
  `;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  /* ── Build lightbox (one, shared) ────────────────────── */
  const lb = document.createElement('div');
  lb.className = 'cm-lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-label', 'Image viewer');
  lb.innerHTML = `
    <div class="cm-lb-top">
      <span class="cm-lb-title"  id="cmLbTitle"></span>
      <span class="cm-lb-counter"id="cmLbCounter"></span>
      <button class="cm-lb-close"id="cmLbClose" aria-label="Close">&#x2715;</button>
    </div>
    <div class="cm-lb-stage">
      <button class="cm-lb-nav prev" id="cmLbPrev" aria-label="Previous">&#8249;</button>
      <img class="cm-lb-img" id="cmLbImg" src="" alt="">
      <button class="cm-lb-nav next" id="cmLbNext" aria-label="Next">&#8250;</button>
    </div>
    <div class="cm-lb-caption"  id="cmLbCaption"></div>
    <div class="cm-filmstrip"   id="cmFilmstrip"></div>
  `;
  document.body.appendChild(lb);

  /* ── Lightbox logic ──────────────────────────────────── */
  function openLightbox(sectionKey, index) {
    lbSection = sectionKey;
    lbImages  = SECTIONS[sectionKey].images;
    lbIndex   = index;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    buildFilmstrip();
    showImage(lbIndex, false);
  }

  function closeLightbox() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function buildFilmstrip() {
    const strip = document.getElementById('cmFilmstrip');
    strip.innerHTML = '';
    lbImages.forEach(function (img, i) {
      const ft  = document.createElement('div');
      ft.className = 'cm-film-th' + (i === lbIndex ? ' active' : '');
      const el  = document.createElement('img');
      el.src = img.src; el.alt = '';
      ft.appendChild(el);
      ft.addEventListener('click', function () { showImage(i, true); });
      strip.appendChild(ft);
    });
  }

  function showImage(index, animate) {
    lbIndex = (index + lbImages.length) % lbImages.length;
    const entry = lbImages[lbIndex];
    const img   = document.getElementById('cmLbImg');

    if (animate) {
      img.classList.add('fade');
      setTimeout(function () {
        img.src = entry.src;
        img.onload = function () { img.classList.remove('fade'); };
      }, 180);
    } else {
      img.src = entry.src;
      img.classList.remove('fade');
    }

    document.getElementById('cmLbTitle').textContent   = SECTIONS[lbSection].label;
    document.getElementById('cmLbCounter').textContent = (lbIndex + 1) + ' / ' + lbImages.length;
    document.getElementById('cmLbCaption').textContent = entry.caption || '';

    const thumbs = document.querySelectorAll('.cm-film-th');
    thumbs.forEach(function (t, i) { t.classList.toggle('active', i === lbIndex); });

    const strip  = document.getElementById('cmFilmstrip');
    const active = strip.children[lbIndex];
    if (active) active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  document.getElementById('cmLbClose').addEventListener('click', closeLightbox);
  document.getElementById('cmLbPrev').addEventListener('click', function () { showImage(lbIndex - 1, true); });
  document.getElementById('cmLbNext').addEventListener('click', function () { showImage(lbIndex + 1, true); });

  lb.addEventListener('click', function (e) { if (e.target === lb) closeLightbox(); });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowLeft')  showImage(lbIndex - 1, true);
    if (e.key === 'ArrowRight') showImage(lbIndex + 1, true);
    if (e.key === 'Escape')     closeLightbox();
  });

  /* ── Build grids ─────────────────────────────────────── */
  function buildGrid(container, sectionKey) {
    const section = SECTIONS[sectionKey];
    if (!section) return;

    const grid = document.createElement('div');
    grid.className = 'cm-grid';

    section.images.forEach(function (imgData, i) {
      const thumb = document.createElement('div');
      thumb.className = 'cm-thumb';

      if (i === 0) {
        const badge = document.createElement('div');
        badge.className = 'cm-thumb-badge';
        badge.textContent = section.images.length + ' photos';
        thumb.appendChild(badge);
      }

      const img = document.createElement('img');
      img.src     = imgData.src;
      img.alt     = imgData.caption || '';
      img.loading = 'lazy';
      thumb.appendChild(img);

      if (imgData.caption) {
        const lbl = document.createElement('div');
        lbl.className   = 'cm-thumb-label';
        lbl.textContent = imgData.caption;
        thumb.appendChild(lbl);
      }

      thumb.addEventListener('click', function () { openLightbox(sectionKey, i); });
      grid.appendChild(thumb);
    });

    container.appendChild(grid);
  }

  /* ── Init ────────────────────────────────────────────── */
  document.querySelectorAll('.cm-gallery').forEach(function (el) {
    const key = el.dataset.section;
    if (key) buildGrid(el, key);
  });

})();