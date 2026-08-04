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

document.querySelectorAll('.pub').forEach(function (pub) {
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

  const doi = pub.getAttribute('data-doi');
  const badgeHolder = pub.querySelector('.badge-holder');
  if (doi && badgeHolder) {
    fetch('https://api.altmetric.com/v1/doi/' + encodeURIComponent(doi))
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (data) {
        if (data && data.score > 100) {
          const badge = document.createElement('a');
          badge.className = 'altmetric-embed';
          badge.setAttribute('data-badge-type', 'donut');
          badge.setAttribute('data-doi', doi);
          badge.setAttribute('data-badge-popover', 'right');
          badgeHolder.appendChild(badge);
          loadAltmetricScript();
        }
      })
      .catch(function () {});
  }
});
