// Shared header + tab menu for every page.
// Put <div id="site-header"></div> then <script src="site.js"></script> at the top of each page's .wrap.
// To add a tab, add one line to PAGES. To change the bio, links or portrait, edit HEADER once.
(function () {
  var PAGES = [
    ['index.html', 'Home'],
    ['publications.html', 'Publications'],
    ['team.html', 'Team'],
    ['nutrients.html', 'Fish nutrients']
  ];

  var HEADER = `
  <div class="profile">
    <div class="profile-img-col">
      <img src="img/portrait.jpg" alt="James Robinson">
      <ul class="links">
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 10L12 4 2 10l10 6 10-6z"/><path d="M6 12.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/></svg>
          <a href="https://scholar.google.com/citations?user=OMNeiYEAAAAJ&hl=en">Scholar</a>
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.94c-2.78.62-3.37-1.36-3.37-1.36-.46-1.19-1.11-1.51-1.11-1.51-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.9-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.79-4.58 5.05.36.32.68.94.68 1.9v2.82c0 .28.18.61.69.5C19.14 20.61 22 16.78 22 12.25 22 6.58 17.52 2 12 2z"/></svg>
          <a href="https://github.com/jpwrobinson">GitHub</a>
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
          <a href="https://lec-reefs.org/">LEC REEFS</a>
        </li>
        <li>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m3 6 9 6 9-6"/></svg>
          <a href="mailto:james.robinson@lancaster.ac.uk">Email</a>
        </li>
      </ul>
    </div>
    <div>
      <h1>James PW Robinson</h1>
      <p class="role">Coral reefs, fisheries, and food security<br>Reader @ Lancaster Environment Centre, Lancaster University, UK</p>
      <p class="bio"> My research uses data-driven approaches to understand how marine ecosystems work. As a marine ecologist, I have a strong focus on tropical coastal systems, and I collaborate widely with experts in fisheries, nutrition, oceanography, and social sciences. Our work has uncovered <strong>climate impacts</strong> on coral reefs, <strong>overfishing</strong> in tropical small-scale fisheries, and the vital contributions of <strong>aquatic foods</strong> to food security.</p>
      <p class="bio">My team and I work within the <a href="https://lec-reefs.org/">LEC REEFS</a> group at Lancaster University, and my funders include the Royal Society, the Leverhulme Trust, and EU HORIZON. Most of my papers are available here. Please get in touch with any questions.
</p>
    </div>
  </div>
`;

  var current = location.pathname.split('/').pop() || 'index.html';
  if (current === '') current = 'index.html';

  var nav = '<nav class="top">' + PAGES.map(function (p) {
    var active = p[0] === current ? ' class="active"' : '';
    return '<a href="' + p[0] + '"' + active + '>' + p[1] + '</a>';
  }).join('') + '</nav>';

  var slot = document.getElementById('site-header');
  if (slot) slot.innerHTML = HEADER + nav;
})();
