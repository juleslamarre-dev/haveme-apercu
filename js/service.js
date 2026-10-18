/* menu mobile + lecture des films sur place (l'iframe Vimeo n'est chargée qu'au clic) */
const burger = document.querySelector('.burger');
burger.addEventListener('click', () => {
  const ouvert = document.body.classList.toggle('nav-ouverte');
  burger.setAttribute('aria-expanded', ouvert);
  burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
});
document.querySelectorAll('.carte[data-video]').forEach((c) => c.addEventListener('click', () => {
  const f = document.createElement('iframe');
  f.src = 'https://player.vimeo.com/video/' + c.dataset.video + '?autoplay=1&title=0&byline=0&portrait=0&dnt=1';
  f.allow = 'autoplay; fullscreen; picture-in-picture';
  f.allowFullscreen = true;
  f.title = c.querySelector('.carte__titre').textContent;
  const d = document.createElement('div'); /* pas d'iframe dans un <button> */
  d.className = 'carte apercu';
  d.innerHTML = c.innerHTML;
  d.querySelector('.carte__media').appendChild(f);
  c.replaceWith(d);
}));
