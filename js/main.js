/* have me productions — interactions & animations */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ======================================================================
     Données portfolio (source : assets/videos.json + catégories éditoriales)
     cat : cinema | engagement | evenement — vertical : format 9:16
     ====================================================================== */
  const VIDEOS = [
    { id: '990136377',  titre: 'Showreel — Cannes 2024',                              cat: 'cinema',     type: 'showreel',    duree: 50 },
    { id: '1138025530', titre: 'Cartel — Festival Séries Mania',                      cat: 'cinema',     type: 'aftermovie',  duree: 125 },
    { id: '1138023505', titre: 'Cartel — Lancement de « Culte » (Prime Video)',       cat: 'cinema',     type: 'événement',   duree: 73,  vertical: true },
    { id: '1049672608', titre: '« Factice » (Universal+) — Pitch',                    cat: 'cinema',     type: 'social',      duree: 22,  vertical: true },
    { id: '1049670845', titre: '« Factice » (Universal+) — Vrai/Faux',                cat: 'cinema',     type: 'social',      duree: 72,  vertical: true },
    { id: '1049667722', titre: '« Factice » (Universal+) — Behind the scene',         cat: 'cinema',     type: 'coulisses',   duree: 75,  vertical: true },
    { id: '1049633505', titre: 'AlloCiné — Sortie de salle « Better Man »',           cat: 'cinema',     type: 'social',      duree: 48,  vertical: true },
    { id: '1024748393', titre: 'AlloCiné × Dessange — « L’Amour ouf »',          cat: 'cinema',     type: 'social',      duree: 77,  vertical: true },
    { id: '1003669149', titre: 'Avant-première « Blink Twice » (Warner Bros)',        cat: 'cinema',     type: 'événement',   duree: 31,  vertical: true },
    { id: '1138018758', titre: 'AlloCiné — Soirée du Jeudi à Deauville',              cat: 'cinema',     type: 'reportage',   duree: 108 },
    { id: '1138053459', titre: 'Handi’Chiens — Chiens d’assistance en entreprises', cat: 'engagement', type: 'reportage', duree: 257 },
    { id: '1138050593', titre: 'Handi’Chiens en action — Éducateur',             cat: 'engagement', type: 'campagne',    duree: 73 },
    { id: '1138048302', titre: 'Handi’Chiens en action — Délégué',               cat: 'engagement', type: 'campagne',    duree: 62 },
    { id: '1138046441', titre: 'Les futurs Handi’Chiens',                        cat: 'engagement', type: 'campagne',    duree: 143 },
    { id: '1138044675', titre: 'This is U.S. Handi’Chiens — Épisode 4',          cat: 'engagement', type: 'série',       duree: 161 },
    { id: '1138044063', titre: 'This is U.S. Handi’Chiens — Épisode 3',          cat: 'engagement', type: 'série',       duree: 163 },
    { id: '1138042494', titre: 'Handi’Chiens × Truffaut',                        cat: 'engagement', type: 'partenariat', duree: 99 },
    { id: '1138038937', titre: 'Cérémonie Handi’Chiens 2025 — MAIF',             cat: 'engagement', type: 'captation',   duree: 94 },
    { id: '1031859560', titre: 'Handi’Chiens — Focus bénéficiaires',             cat: 'engagement', type: 'reportage',   duree: 260 },
    { id: '1138021515', titre: 'La Coupe du Monde des Fleuristes 2025',               cat: 'evenement',  type: 'captation',   duree: 1341 },
    { id: '1138012631', titre: 'La Coupe de France des Fleuristes 2025',              cat: 'evenement',  type: 'captation',   duree: 581 },
    { id: '1026462734', titre: 'La Coupe de France des Fleuristes 2024',              cat: 'evenement',  type: 'captation',   duree: 309 },
    { id: '1138017298', titre: 'L’Oscar des Jeunes Fleuristes 2025',             cat: 'evenement',  type: 'captation',   duree: 438 },
    { id: '1138020257', titre: 'Hyper Voisins 2025',                                  cat: 'evenement',  type: 'reportage',   duree: 110 },
    { id: '1138014856', titre: 'Revue Urbanisme — Afterwork',                         cat: 'evenement',  type: 'aftermovie',  duree: 69 }
  ];

  const NOMS_CAT = { cinema: 'Cinéma & Séries', engagement: 'Engagement', evenement: 'Événementiel' };

  const LOGOS = [
    ['marche-du-film.png', 'Marché du Film'],
    ['institut-francais.jpg', 'Institut Français'],
    ['film-paris-region.jpeg', 'Film Paris Région'],
    ['quais-du-polar.jpg', 'Quais du Polar'],
    ['ecoprod.png', 'EcoProd'],
    ['cinemanext.png', 'CinemaNext'],
    ['scelf.png', 'SCELF'],
    ['the-film-agency.png', 'The Film Agency'],
    ['eclair-color.png', 'Eclair Color'],
    ['studio-bergoend.png', 'Studio Bergoend'],
    ['meditalents.png', 'Méditalents'],
    ['tabhotel.png', 'TabHotel'],
    ['shoot-the-book.png', 'Shoot the Book'],
    ['illucity.png', 'Illucity'],
    ['cy-universite.png', 'CY Cergy Paris Université'],
    ['normand-esante.jpg', 'Normand’e-santé'],
    ['hacking-health.png', 'Hacking Health'],
    ['action-cambodge-handicap.png', 'Action Cambodge Handicap']
  ];

  const fmtDuree = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');

  /* ============ grille créations ============ */
  const grille = document.getElementById('grille');
  VIDEOS.forEach((v) => {
    const carte = document.createElement('button');
    carte.type = 'button';
    carte.className = 'carte gs-reveal';
    carte.dataset.cat = v.cat;
    carte.dataset.video = v.id;
    carte.dataset.titre = v.titre;
    if (v.vertical) carte.dataset.vertical = '1';
    carte.innerHTML =
      '<span class="carte__media">' +
        '<img src="assets/thumbs/' + v.id + '.jpg" alt="" loading="lazy">' +
        '<span class="carte__play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 3l14 9-14 9z"/></svg></span>' +
        '<span class="charge" aria-hidden="true"></span>' +
        (v.vertical ? '<span class="carte__format">9:16</span>' : '') +
        '<span class="carte__duree">' + fmtDuree(v.duree) + '</span>' +
      '</span>' +
      '<span class="carte__titre">' + v.titre + '</span>' +
      '<span class="carte__meta"><b>' + NOMS_CAT[v.cat] + '</b> · ' + v.type + '</span>';
    grille.appendChild(carte);
  });

  /* ============ filtres ============ */
  const filtres = document.querySelectorAll('.filtre');
  filtres.forEach((f) => f.addEventListener('click', () => {
    filtres.forEach((x) => x.classList.remove('actif'));
    f.classList.add('actif');
    const cat = f.dataset.cat;
    document.querySelectorAll('.carte').forEach((c) => {
      c.classList.toggle('cachee', cat !== 'tout' && c.dataset.cat !== cat);
    });
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  }));

  /* ============ marquee clients ============ */
  const marquee = document.getElementById('marquee');
  const serie = LOGOS.map(([f, nom]) =>
    '<img src="assets/logos/' + f + '" alt="' + nom + '" loading="lazy">').join('');
  marquee.innerHTML = serie + serie; /* doublé pour la boucle infinie */
  marquee.querySelectorAll('img:nth-child(n+' + (LOGOS.length + 1) + ')')
    .forEach((img) => img.setAttribute('aria-hidden', 'true'));

  /* ============ lightbox ============ */
  const lightbox = document.getElementById('lightbox');
  const cadre = document.getElementById('lightbox-cadre');
  const lbTitre = document.getElementById('lightbox-titre');
  const btnFermer = lightbox.querySelector('.lightbox__fermer');
  let iframe = null;
  let dernierFocus = null;

  function ouvrirVideo(id, titre, vertical, origine) {
    dernierFocus = document.activeElement;
    cadre.classList.toggle('verticale', !!vertical);
    lbTitre.textContent = titre || '';
    iframe = document.createElement('iframe');
    iframe.src = 'https://player.vimeo.com/video/' + id + '?autoplay=1&title=0&byline=0&portrait=0';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.title = titre || 'Vidéo have me productions';
    cadre.appendChild(iframe);
    lightbox.classList.add('ouverte');
    document.body.style.overflow = 'hidden';
    btnFermer.focus();
    /* le lecteur jaillit de la vignette cliquée (FLIP) */
    if (window.gsap && origine && !prefersReduced) {
      const r = origine.getBoundingClientRect();
      const c = cadre.getBoundingClientRect();
      gsap.from(cadre, {
        x: r.left + r.width / 2 - (c.left + c.width / 2),
        y: r.top + r.height / 2 - (c.top + c.height / 2),
        scaleX: r.width / c.width, scaleY: r.height / c.height,
        duration: .55, ease: 'power3.out'
      });
    }
  }

  function fermerVideo() {
    lightbox.classList.remove('ouverte');
    document.body.style.overflow = '';
    if (iframe) { iframe.remove(); iframe = null; }
    if (dernierFocus) dernierFocus.focus();
  }

  document.addEventListener('click', (e) => {
    const declencheur = e.target.closest('[data-video]');
    if (declencheur) {
      const vignette = declencheur.querySelector('.carte__media, .cas__media') ||
                       (declencheur.classList.contains('screen') ? declencheur : null);
      ouvrirVideo(declencheur.dataset.video, declencheur.dataset.titre,
                  declencheur.dataset.vertical, vignette);
    }
  });
  btnFermer.addEventListener('click', fermerVideo);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) fermerVideo(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('ouverte')) fermerVideo();
  });

  /* ============ menu mobile ============ */
  const burger = document.querySelector('.burger');
  burger.addEventListener('click', () => {
    const ouvert = document.body.classList.toggle('nav-ouverte');
    burger.setAttribute('aria-expanded', ouvert);
    burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  document.querySelectorAll('.header__nav a').forEach((a) =>
    a.addEventListener('click', () => {
      document.body.classList.remove('nav-ouverte');
      burger.setAttribute('aria-expanded', 'false');
    }));

  /* ======================================================================
     COUCHE VIDÉO — fonds Vimeo (helper partagé)
     L'iframe reste invisible tant que Vimeo n'a pas confirmé la lecture :
     aucun écran d'erreur possible côté visiteur.
     ====================================================================== */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointeurFin = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const VIMEO = 'https://player.vimeo.com';

  function videoFond(id, quandJoue) {
    const f = document.createElement('iframe');
    f.src = VIMEO + '/video/' + id + '?background=1&autoplay=1&loop=1&muted=1&api=1';
    f.allow = 'autoplay';
    f.setAttribute('aria-hidden', 'true');
    f.tabIndex = -1;
    const ecoute = (e) => {
      if (e.origin !== VIMEO || e.source !== f.contentWindow) return;
      let d;
      try { d = typeof e.data === 'string' ? JSON.parse(e.data) : e.data; } catch { return; }
      if (d.event === 'ready') {
        f.contentWindow.postMessage(
          JSON.stringify({ method: 'addEventListener', value: 'play' }), VIMEO);
      }
      if (d.event === 'play') { f.stopEcoute(); if (quandJoue) quandJoue(f); }
    };
    f.stopEcoute = () => window.removeEventListener('message', ecoute);
    window.addEventListener('message', ecoute);
    return f;
  }

  /* recadre une iframe 16/9 pour couvrir son conteneur (façon object-fit:cover) */
  const aCouvrir = [];
  function couvrir(boite, f) {
    const r = boite.clientWidth / boite.clientHeight, cible = 16 / 9;
    f.style.top = '50%'; f.style.left = '50%';
    f.style.transform = 'translate(-50%,-50%)';
    if (r > cible) { f.style.width = '100%'; f.style.height = (100 * r / cible) + '%'; }
    else { f.style.height = '100%'; f.style.width = (100 * cible / r) + '%'; }
  }
  function suivreCouverture(boite, f) {
    aCouvrir.push([boite, f]);
    couvrir(boite, f);
  }

  /* largeur réelle du viewport (sans la barre de défilement) pour le cinémascope */
  const majViewport = () => document.documentElement.style.setProperty(
    '--sb', (window.innerWidth - document.documentElement.clientWidth) + 'px');
  majViewport();
  window.addEventListener('resize', () => {
    majViewport();
    aCouvrir.forEach(([boite, f]) => { if (f.isConnected) couvrir(boite, f); });
  });

  /* ---------- showreel ambiant dans l'écran hero ---------- */
  if (!prefersReduced) {
    window.addEventListener('load', () => {
      const screen = document.querySelector('.screen');
      const fond = videoFond('990136377', () => screen.classList.add('ambiant-actif'));
      screen.insertBefore(fond, screen.querySelector('.screen__voile'));
    });
  }

  /* ---------- aperçu vidéo au survol d'une carte (une seule à la fois) ---------- */
  if (!prefersReduced && pointeurFin) {
    let carteActive = null, minuteur = null;
    const stopApercu = () => {
      if (!carteActive) return;
      const c = carteActive; carteActive = null;
      c.classList.remove('apercu', 'charge-en-cours');
      const f = c.querySelector('.carte__media iframe');
      if (f) { f.stopEcoute(); f.remove(); }
    };
    document.querySelectorAll('.carte').forEach((carte) => {
      carte.addEventListener('mouseenter', () => {
        clearTimeout(minuteur);
        minuteur = setTimeout(() => {
          stopApercu();
          carteActive = carte;
          carte.classList.add('charge-en-cours');
          const f = videoFond(carte.dataset.video, () => {
            carte.classList.remove('charge-en-cours');
            carte.classList.add('apercu');
          });
          carte.querySelector('.carte__media').appendChild(f);
        }, 300);
      });
      carte.addEventListener('mouseleave', () => { clearTimeout(minuteur); stopApercu(); });
    });
    document.querySelectorAll('.filtre').forEach((f) =>
      f.addEventListener('click', () => { clearTimeout(minuteur); stopApercu(); }));
  }

  /* ---------- études de cas : la carte la plus visible passe en vidéo ---------- */
  if (!prefersReduced) {
    const medias = Array.prototype.slice.call(document.querySelectorAll('.cas__media[data-fond]'));
    medias.forEach((m) => {
      const badge = document.createElement('span');
      badge.className = 'cas__badge-live';
      badge.setAttribute('aria-hidden', 'true');
      badge.innerHTML = '<i></i>extrait';
      m.appendChild(badge);
    });
    let casActif = null;
    const activerCas = (m) => {
      if (casActif === m) return;
      if (casActif) {
        casActif.classList.remove('joue');
        const vieux = casActif.querySelector('iframe');
        if (vieux) { vieux.stopEcoute(); vieux.remove(); }
      }
      casActif = m;
      if (!m) return;
      const f = videoFond(m.dataset.fond, () => { couvrir(m, f); m.classList.add('joue'); });
      m.insertBefore(f, m.firstChild);
      suivreCouverture(m, f);
    };
    const parts = new Map();
    const ioCas = new IntersectionObserver((entrees) => {
      entrees.forEach((e) => parts.set(e.target, e.intersectionRatio));
      let meilleur = null, score = .45;
      parts.forEach((v, k) => { if (v > score) { score = v; meilleur = k; } });
      if (meilleur) activerCas(meilleur);
      else if (casActif && (parts.get(casActif) || 0) < .1) activerCas(null);
    }, { threshold: [0, .1, .25, .45, .7, .95] });
    medias.forEach((m) => ioCas.observe(m));
  }

  /* ---------- fond vidéo de la section devis ---------- */
  const fondDevis = document.querySelector('.devis__fond[data-fond]');
  if (!prefersReduced && fondDevis) {
    const ioDevis = new IntersectionObserver((entrees, obs) => {
      if (!entrees[0].isIntersecting) return;
      obs.disconnect();
      const f = videoFond(fondDevis.dataset.fond, () => {
        couvrir(fondDevis, f); fondDevis.classList.add('joue');
      });
      fondDevis.appendChild(f);
      suivreCouverture(fondDevis, f);
    }, { rootMargin: '350px' });
    ioDevis.observe(fondDevis);
  }

  /* ======================================================================
     COUCHE MOTION — progression, grain, curseur, aimant, compteurs
     ====================================================================== */

  /* ---------- barre de progression du scroll ---------- */
  const barre = document.createElement('div');
  barre.className = 'progression';
  barre.setAttribute('aria-hidden', 'true');
  document.body.appendChild(barre);
  const majBarre = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    barre.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
  };
  window.addEventListener('scroll', majBarre, { passive: true });
  majBarre();

  /* ---------- grain argentique ---------- */
  if (!prefersReduced) {
    const grain = document.createElement('div');
    grain.className = 'grain';
    grain.setAttribute('aria-hidden', 'true');
    document.body.appendChild(grain);
  }

  /* ---------- curseur personnalisé : point rouge + anneau « play » ---------- */
  if (!prefersReduced && pointeurFin) {
    document.documentElement.classList.add('curseur-actif');
    const anneau = document.createElement('div');
    anneau.className = 'curseur';
    anneau.setAttribute('aria-hidden', 'true');
    anneau.innerHTML = '<span class="curseur__label">play</span>';
    const point = document.createElement('div');
    point.className = 'curseur__point';
    point.setAttribute('aria-hidden', 'true');
    document.body.appendChild(anneau);
    document.body.appendChild(point);

    let x = window.innerWidth / 2, y = window.innerHeight / 2, ax = x, ay = y;
    document.addEventListener('mousemove', (e) => {
      x = e.clientX; y = e.clientY;
      point.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      const surVideo = !!e.target.closest('[data-video]');
      anneau.classList.toggle('sur-video', surVideo);
      anneau.classList.toggle('sur-lien', !surVideo && !!e.target.closest('a,button'));
      anneau.classList.toggle('sombre', !!e.target.closest('.devis,.footer,.lightbox'));
    });
    (function boucleCurseur() {
      ax += (x - ax) * .18; ay += (y - ay) * .18;
      anneau.style.transform = 'translate(' + ax + 'px,' + ay + 'px)';
      requestAnimationFrame(boucleCurseur);
    })();
  }

  /* ---------- boutons aimantés ---------- */
  if (!prefersReduced && pointeurFin) {
    document.querySelectorAll('.btn, .filtre, .cas__lien').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        b.style.transform = 'translate(' +
          ((e.clientX - r.left - r.width / 2) * .2).toFixed(2) + 'px,' +
          ((e.clientY - r.top - r.height / 2) * .35).toFixed(2) + 'px)';
      });
      b.addEventListener('mouseleave', () => { b.style.transform = ''; });
    });
  }

  /* ---------- compteurs des études de cas ---------- */
  if (!prefersReduced) {
    const ioNum = new IntersectionObserver((entrees, obs) => {
      entrees.forEach((e) => {
        if (!e.isIntersecting) return;
        obs.unobserve(e.target);
        const m = e.target.textContent.trim().match(/^(\d+)(\D*)$/);
        if (!m) return;
        const fin = +m[1], suffixe = m[2], t0 = performance.now();
        const pas = (t) => {
          const p = Math.min((t - t0) / 900, 1);
          e.target.textContent = Math.round(fin * (1 - Math.pow(1 - p, 3))) + suffixe;
          if (p < 1) requestAnimationFrame(pas);
        };
        requestAnimationFrame(pas);
      });
    }, { threshold: .6 });
    document.querySelectorAll('.cas__chiffre b').forEach((c) => ioNum.observe(c));
  }

  /* ============ formulaire devis : mailto prérempli ============
     Pour un envoi sans client mail, brancher sur Formspree/Netlify Forms
     (voir README). */
  const form = document.getElementById('form-devis');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const sujet = 'Demande de devis — ' + (d.get('type') || 'projet vidéo');
    const corps =
      'Nom : ' + d.get('nom') + '\n' +
      'Email : ' + d.get('email') + '\n' +
      'Téléphone : ' + (d.get('telephone') || '—') + '\n' +
      'Type de projet : ' + (d.get('type') || '—') + '\n' +
      'Budget : ' + (d.get('budget') || 'À définir') + '\n' +
      'Échéance : ' + (d.get('echeance') || 'Pas encore fixée') + '\n\n' +
      d.get('message');
    window.location.href = 'mailto:sarah.vettes@have-me.com?subject=' +
      encodeURIComponent(sujet) + '&body=' + encodeURIComponent(corps);
  });

  /* ============ animations GSAP (progressive enhancement) ============ */
  if (!window.gsap || prefersReduced) {
    document.querySelectorAll('.gs-reveal').forEach((el) => {
      el.style.opacity = 1; el.style.transform = 'none';
    });
    document.querySelectorAll('.manifeste .mot').forEach((m) => m.classList.add('allume'));
    const ligne = document.getElementById('ligne-progression');
    if (ligne) ligne.style.transform = 'scaleY(1)';
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  /* titres de section : révélés par un balayage vertical */
  document.querySelectorAll('.section__titre').forEach((el) => {
    el.classList.add('titre-wipe');
    gsap.fromTo(el, { clipPath: 'inset(0 0 108% 0)', y: 16 }, {
      clipPath: 'inset(0 0 -14% 0)', y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* reveals génériques : accroches, cartes, services, étapes */
  document.querySelectorAll('.eyebrow, .service, .cas__carte, .etape').forEach((el) => {
    el.classList.add('gs-reveal');
    gsap.fromTo(el, { opacity: 0, y: 30 }, {
      opacity: 1, y: 0, duration: .8, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%' }
    });
  });

  /* cartes de la grille : apparition en cascade */
  ScrollTrigger.batch('.carte', {
    start: 'top 92%',
    onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: .7, stagger: .08, ease: 'power2.out', overwrite: true })
  });

  /* découpe un bloc en mots animables (les éléments enfants restent intacts) */
  function decouperMots(el) {
    const trouves = [];
    Array.prototype.slice.call(el.childNodes).forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((t) => {
          if (t === '' || /^\s+$/.test(t)) { frag.appendChild(document.createTextNode(t)); return; }
          const sp = document.createElement('span');
          sp.className = 'mot'; sp.textContent = t;
          frag.appendChild(sp); trouves.push(sp);
        });
        el.replaceChild(frag, n);
      } else if (n.nodeType === Node.ELEMENT_NODE && !n.classList.contains('point')) {
        n.classList.add('mot');
        if (n.hasAttribute('data-rose')) n.classList.add('rose');
        trouves.push(n);
      }
    });
    return trouves;
  }

  /* hero : le titre se lève mot à mot à l'arrivée */
  const motsHero = decouperMots(document.querySelector('.hero__titre'));
  gsap.from(motsHero, { y: 46, opacity: 0, duration: .95, stagger: .07, ease: 'power3.out' });

  /* hero : le film s'ouvre en cinémascope au scroll */
  gsap.to('.hero__screen', {
    '--ouv': 1, ease: 'none',
    scrollTrigger: { trigger: '.hero__screen', start: 'top 75%', end: 'bottom 20%', scrub: .4 }
  });

  /* études de cas : parallaxe des visuels */
  gsap.utils.toArray('.cas__media img').forEach((img) => {
    gsap.fromTo(img, { yPercent: -5, scale: 1.1 }, {
      yPercent: 5, ease: 'none',
      scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  /* manifeste : les mots s'illuminent au scroll */
  const manifeste = document.getElementById('manifeste-texte');
  const mots = decouperMots(manifeste);
  ScrollTrigger.create({
    trigger: manifeste,
    start: 'top 80%',
    end: 'bottom 45%',
    scrub: true,
    onUpdate: (self) => {
      const seuil = Math.floor(self.progress * mots.length);
      mots.forEach((m, i) => m.classList.toggle('allume', i <= seuil));
    }
  });

  /* écran showreel : légère parallaxe */
  gsap.fromTo('.hero__screen', { y: 60 }, {
    y: 0, ease: 'none',
    scrollTrigger: { trigger: '.hero__screen', start: 'top bottom', end: 'top 45%', scrub: true }
  });

  /* process : la ligne rose se remplit au scroll */
  gsap.fromTo('#ligne-progression', { scaleY: 0 }, {
    scaleY: 1, ease: 'none', transformOrigin: 'top',
    scrollTrigger: { trigger: '.process__liste', start: 'top 75%', end: 'bottom 55%', scrub: true }
  });
})();
