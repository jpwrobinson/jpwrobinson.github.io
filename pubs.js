let altmetricScriptLoaded = false;

function loadAltmetricScript() {
  if (altmetricScriptLoaded) {
    if (window._altmetric_embed_init) window._altmetric_embed_init();
    return;
  }
  altmetricScriptLoaded = true;
  const s = document.createElement('script');
  s.src = 'https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js';
  document.body.appendChild(s);
}

let jsonpCounter = 0;

function altmetricJsonp(doi, callback) {
  const cbName = 'altmetricCb' + (jsonpCounter++);
  const script = document.createElement('script');

  window[cbName] = function (data) {
    callback(data);
    delete window[cbName];
    script.remove();
  };

  script.onerror = function () {
    // no Altmetric record for this DOI, or the lookup failed - treat as "no badge"
    delete window[cbName];
    script.remove();
  };

  script.src = 'https://api.altmetric.com/v1/doi/' + encodeURIComponent(doi) + '?callback=' + cbName;
  document.body.appendChild(script);
}

document.querySelectorAll('.pub').forEach(function (pub) {
  const thumbUrl = pub.getAttribute('data-thumb');
  if (thumbUrl) {
    const img = document.createElement('img');
    img.className = 'thumb';
    img.src = thumbUrl;
    img.alt = '';
    img.loading = 'lazy';
    const yearEl = pub.querySelector('.year');
    if (yearEl) {
      yearEl.after(img);
    } else {
      pub.insertBefore(img, pub.firstChild);
    }
  }

  const pdfUrl = pub.getAttribute('data-pdf');
  const pdfBtn = pub.querySelector('.pdf-btn');
  if (pdfBtn) {
    if (pdfUrl) {
      pdfBtn.href = pdfUrl;
      pdfBtn.target = '_blank';
      pdfBtn.rel = 'noopener';
    } else {
      pdfBtn.remove();
    }
  }

  const journalUrl = pub.getAttribute('data-url');
  const titleEl = pub.querySelector('.title');
  if (journalUrl && titleEl) {
    const a = document.createElement('a');
    a.href = journalUrl;
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = titleEl.textContent;
    titleEl.textContent = '';
    titleEl.appendChild(a);
  }

  const doi = pub.getAttribute('data-doi');
  const badgeHolder = pub.querySelector('.badge-holder');
  if (doi && badgeHolder) {
    altmetricJsonp(doi, function (data) {
      if (data && data.score && data.score > 100) {
        const badge = document.createElement('a');
        badge.className = 'altmetric-embed';
        badge.setAttribute('data-badge-type', 'donut');
        badge.setAttribute('data-doi', doi);
        badge.setAttribute('data-badge-popover', 'right');
        badgeHolder.appendChild(badge);
        loadAltmetricScript();
      }
    });
  }
});
