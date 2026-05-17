(function () {
  'use strict';

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

  let lbImages = [];
  let lbIndex = 0;

  const toThumb = (src) => src.replace(/(\.\w+)$/, '_small$1');

  const CSS = `
  .cm-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 6px;
    margin-bottom: 1.5rem;
  }

  .cm-thumb {
    aspect-ratio: 4/3;
    overflow: hidden;
    border-radius: 4px;
    cursor: pointer;
    background: #e8e2db;
  }

  .cm-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cm-lightbox {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.93);
    z-index: 9999;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .cm-lightbox.open {
    display: flex;
  }

  .cm-lb-img {
    max-width: 90%;
    max-height: 80vh;
    object-fit: contain;
  }

  .cm-lb-nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 30px;
    color: white;
    background: rgba(255,255,255,0.1);
    border: none;
    cursor: pointer;
    padding: 10px;
  }

  .prev { left: 20px; }
  .next { right: 20px; }
  `;

  const style = document.createElement('style');
  style.textContent = CSS;
  document.head.appendChild(style);

  const lb = document.createElement('div');
  lb.className = 'cm-lightbox';
  lb.innerHTML = `
    <button class="cm-lb-nav prev" id="prev">&#8249;</button>
    <img class="cm-lb-img" id="img">
    <button class="cm-lb-nav next" id="next">&#8250;</button>
  `;
  document.body.appendChild(lb);

  const imgEl = document.getElementById('img');

  function open(section, i) {
    lbSection = section;
    lbImages = SECTIONS[section].images;
    lbIndex = i;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    render();
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  function render() {
    const entry = lbImages[lbIndex];
    imgEl.src = entry.src;
  }

  function next() {
    lbIndex = (lbIndex + 1) % lbImages.length;
    render();
  }

  function prev() {
    lbIndex = (lbIndex - 1 + lbImages.length) % lbImages.length;
    render();
  }

  document.getElementById('next').onclick = next;
  document.getElementById('prev').onclick = prev;
  lb.onclick = (e) => { if (e.target === lb) close(); };

  document.addEventListener('keydown', (e) => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'Escape') close();
  });

  function buildGrid(container, key) {
    const section = SECTIONS[key];
    const grid = document.createElement('div');
    grid.className = 'cm-grid';

    section.images.forEach((img, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'cm-thumb';

      const t = document.createElement('img');
      t.src = toThumb(img.src);
      t.loading = 'lazy';

      thumb.appendChild(t);
      thumb.onclick = () => open(key, i);

      grid.appendChild(thumb);
    });

    container.appendChild(grid);
  }

  document.querySelectorAll('.cm-gallery').forEach(el => {
    const key = el.dataset.section;
    if (key && SECTIONS[key]) buildGrid(el, key);
  });

})();