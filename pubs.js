let altmetricScriptLoaded = false;
let anyBadgeInserted = false;

// Loads Altmetric's official embed script once. The script scans the page
// for .altmetric-embed elements itself and decides whether to show a badge
// (via data-hide-less-than / data-hide-no-mentions) - we don't pre-check
// scores ourselves, since that requires a separate call to Altmetric's
// rate-limited Details API, which browsers/ad-blockers frequently block.
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
  const linksRow = pub.querySelector('.links-row');
  let hasPdf = false;
  if (pdfBtn) {
    if (pdfUrl) {
      pdfBtn.href = pdfUrl;
      pdfBtn.target = '_blank';
      pdfBtn.rel = 'noopener';
      hasPdf = true;
    } else {
      pdfBtn.remove();
    }
  }

  const codeUrl = pub.getAttribute('data-code');
  const codeBtn = pub.querySelector('.code-btn');
  let hasCode = false;
  if (codeBtn) {
    if (codeUrl) {
      codeBtn.href = codeUrl;
      codeBtn.target = '_blank';
      codeBtn.rel = 'noopener';
      hasCode = true;
    } else {
      codeBtn.remove();
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
    const badge = document.createElement('div');
    badge.className = 'altmetric-embed';
    badge.setAttribute('data-badge-type', 'donut');
    badge.setAttribute('data-doi', doi);
    badge.setAttribute('data-badge-popover', 'right');
    // only show a badge for papers with real attention - matches the
    // previous >100 threshold, but Altmetric's own script now enforces it
    badge.setAttribute('data-hide-less-than', '100');
    badgeHolder.appendChild(badge);
    anyBadgeInserted = true;

    if (!hasPdf && !hasCode && linksRow) {
      // hide the row until we know whether the badge actually renders,
      // so a paper with neither a pdf/code link nor a qualifying score
      // doesn't leave blank reserved space
      linksRow.style.display = 'none';
      badge.addEventListener('altmetric:show', function () {
        linksRow.style.display = '';
      });
    }
  } else if (!hasPdf && !hasCode && linksRow) {
    // no pdf, no code link, and no doi to even check for a badge - collapse immediately
    linksRow.style.display = 'none';
  }
});

if (anyBadgeInserted) {
  loadAltmetricScript();
}
