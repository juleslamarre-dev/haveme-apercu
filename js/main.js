/* have me productions — v2 : données, interactions, couche vidéo et motion premium
   Bibliothèques : Lenis (scroll doux), GSAP + ScrollTrigger + SplitText + Flip. */
(function () {
  'use strict';
  const root = document.documentElement;

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
    { id: '1024748393', titre: 'AlloCiné × Dessange — « L’Amour ouf »',               cat: 'cinema',     type: 'social',      duree: 77,  vertical: true },
    { id: '1003669149', titre: 'Avant-première « Blink Twice » (Warner Bros)',        cat: 'cinema',     type: 'événement',   duree: 31,  vertical: true },
    { id: '1138018758', titre: 'AlloCiné — Soirée du Jeudi à Deauville',              cat: 'cinema',     type: 'reportage',   duree: 108 },
    { id: '1138053459', titre: 'Handi’Chiens — Chiens d’assistance en entreprises',   cat: 'engagement', type: 'reportage',   duree: 257 },
    { id: '1138050593', titre: 'Handi’Chiens en action — Éducateur',                  cat: 'engagement', type: 'campagne',    duree: 73 },
    { id: '1138048302', titre: 'Handi’Chiens en action — Délégué',                    cat: 'engagement', type: 'campagne',    duree: 62 },
    { id: '1138046441', titre: 'Les futurs Handi’Chiens',                             cat: 'engagement', type: 'campagne',    duree: 143 },
    { id: '1138044675', titre: 'This is U.S. Handi’Chiens — Épisode 4',               cat: 'engagement', type: 'série',       duree: 161 },
    { id: '1138044063', titre: 'This is U.S. Handi’Chiens — Épisode 3',               cat: 'engagement', type: 'série',       duree: 163 },
    { id: '1138042494', titre: 'Handi’Chiens × Truffaut',                             cat: 'engagement', type: 'partenariat', duree: 99 },
    { id: '1138038937', titre: 'Cérémonie Handi’Chiens 2025 — MAIF',                  cat: 'engagement', type: 'captation',   duree: 94 },
    { id: '1031859560', titre: 'Handi’Chiens — Focus bénéficiaires',                  cat: 'engagement', type: 'reportage',   duree: 260 },
    { id: '1138021515', titre: 'La Coupe du Monde des Fleuristes 2025',               cat: 'evenement',  type: 'captation',   duree: 1341 },
    { id: '1138012631', titre: 'La Coupe de France des Fleuristes 2025',              cat: 'evenement',  type: 'captation',   duree: 581 },
    { id: '1026462734', titre: 'La Coupe de France des Fleuristes 2024',              cat: 'evenement',  type: 'captation',   duree: 309 },
    { id: '1138017298', titre: 'L’Oscar des Jeunes Fleuristes 2025',                  cat: 'evenement',  type: 'captation',   duree: 438 },
    { id: '1138020257', titre: 'Hyper Voisins 2025',                                  cat: 'evenement',  type: 'reportage',   duree: 110 },
    { id: '1138014856', titre: 'Revue Urbanisme — Afterwork',                         cat: 'evenement',  type: 'aftermovie',  duree: 69 }
  ];
  /* la sélection du défilement horizontal, dans l'ordre d'affichage */
  const SELECTION = ['1138025530', '1138023505', '1138053459', '1049667722',
                     '1138021515', '1138018758', '1003669149', '1138020257'];

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

  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pointeurFin = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  const motion = !reduit && !!(window.gsap && window.ScrollTrigger && window.SplitText && window.Flip);
  if (!motion) root.classList.remove('motion', 'avec-intro');

  /* guillemets français collés à leur mot (espace insécable) */
  const insecables = (t) => t.replace(/« /g, '«\u00a0').replace(/ »/g, '\u00a0»');
  const fmtDuree = (s) => Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0');
  const parId = Object.fromEntries(VIDEOS.map((v) => [v.id, v]));

  /* ============ sélection (rail horizontal) ============ */
  const rail = document.getElementById('rail');
  SELECTION.forEach((id, i) => {
    const v = parId[id];
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'une' + (v.vertical ? ' une--v' : '');
    b.dataset.video = v.id;
    b.dataset.titre = v.titre;
    if (v.vertical) b.dataset.vertical = '1';
    b.innerHTML =
      '<span class="une__media">' +
        '<img src="assets/thumbs/' + v.id + '.jpg" alt="" loading="lazy">' +
        '<span class="une__num">' + String(i + 1).padStart(2, '0') + '</span>' +
        '<span class="une__duree">' + fmtDuree(v.duree) + '</span>' +
      '</span>' +
      '<span class="une__titre">' + insecables(v.titre) + '</span>' +
      '<span class="une__meta"><b>' + NOMS_CAT[v.cat] + '</b> · ' + v.type + '</span>';
    rail.appendChild(b);
  });

  /* ============ catalogue ============ */
  const grille = document.getElementById('grille');
  VIDEOS.forEach((v) => {
    const carte = document.createElement('button');
    carte.type = 'button';
    carte.className = 'carte';
    carte.dataset.cat = v.cat;
    carte.dataset.video = v.id;
    carte.dataset.titre = v.titre;
    if (v.vertical) carte.dataset.vertical = '1';
    carte.innerHTML =
      '<span class="carte__media">' +
        '<img src="assets/thumbs/' + v.id + '.jpg" alt="" loading="lazy">' +
        '<span class="charge" aria-hidden="true"></span>' +
        (v.vertical ? '<span class="carte__format">9:16</span>' : '') +
        '<span class="carte__duree">' + fmtDuree(v.duree) + '</span>' +
      '</span>' +
      '<span class="carte__titre">' + insecables(v.titre) + '</span>' +
      '<span class="carte__meta"><b>' + NOMS_CAT[v.cat] + '</b> · ' + v.type + '</span>';
    grille.appendChild(carte);
  });
  const cartes = Array.from(grille.children);

  /* ============ mobile : 6 films visibles, le reste derrière un bouton (CSS ≤ 600 px) ============ */
  const plus = document.getElementById('catalogue-plus');
  function limiter() {
    const visibles = cartes.filter((c) => !c.classList.contains('cachee'));
    cartes.forEach((c) => c.classList.toggle('au-dela', visibles.indexOf(c) >= 6));
    plus.querySelector('b').textContent = visibles.length - 6;
    plus.hidden = grille.classList.contains('ouverte') || visibles.length <= 6;
  }
  limiter();
  plus.addEventListener('click', () => {
    grille.classList.add('ouverte');
    plus.hidden = true;
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });

  /* ============ filtres (+ compteurs) — animés avec Flip si dispo ============ */
  const filtres = document.querySelectorAll('.filtre');
  filtres.forEach((f) => {
    const cat = f.dataset.cat;
    f.querySelector('sup').textContent =
      cat === 'tout' ? VIDEOS.length : VIDEOS.filter((v) => v.cat === cat).length;
    f.addEventListener('click', () => {
      filtres.forEach((x) => x.classList.toggle('actif', x === f));
      grille.classList.remove('ouverte');
      const appliquer = () => {
        cartes.forEach((c) => c.classList.toggle('cachee', cat !== 'tout' && c.dataset.cat !== cat));
        limiter();
      };
      if (!motion) { appliquer(); return; }
      const etat = Flip.getState(cartes);
      appliquer();
      Flip.from(etat, {
        duration: .8, ease: 'expo.inOut', absolute: true, stagger: .015, scale: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: .82, y: 0 },
          { opacity: 1, scale: 1, duration: .7, delay: .2, ease: 'expo.out', stagger: .03 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: .82, duration: .4, ease: 'power2.in' }),
        onComplete: () => ScrollTrigger.refresh()
      });
    });
  });

  /* ============ marquee clients ============ */
  const marquee = document.getElementById('marquee');
  const serie = LOGOS.map(([f, nom]) =>
    '<img src="assets/logos/' + f + '" alt="' + nom + '" loading="lazy">').join('');
  marquee.innerHTML = serie + serie; /* doublé pour la boucle infinie */
  marquee.querySelectorAll('img:nth-child(n+' + (LOGOS.length + 1) + ')')
    .forEach((img) => img.setAttribute('aria-hidden', 'true'));

  /* ============ scroll doux (Lenis) ============ */
  let lenis = null;
  if (motion && window.Lenis) {
    lenis = new Lenis({ lerp: .09, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const bloquerScroll = (oui) => {
    if (lenis) { oui ? lenis.stop() : lenis.start(); }
    document.body.style.overflow = oui ? 'hidden' : '';
  };
  /* ancres : glissé long avec Lenis, natif sinon */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || !lenis) return;
    const id = a.getAttribute('href');
    const cible = id === '#haut' ? 0 : document.querySelector(id);
    if (cible === null) return;
    e.preventDefault();
    lenis.scrollTo(cible, { offset: id === '#haut' ? 0 : -70, duration: 1.8,
      easing: (x) => 1 - Math.pow(1 - x, 4) });
  });

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
    iframe.src = 'https://player.vimeo.com/video/' + id + '?autoplay=1&title=0&byline=0&portrait=0&dnt=1';
    iframe.allow = 'autoplay; fullscreen; picture-in-picture';
    iframe.title = titre || 'Vidéo have me productions';
    cadre.appendChild(iframe);
    lightbox.classList.add('ouverte');
    bloquerScroll(true);
    btnFermer.focus();
    /* le lecteur jaillit de la vignette cliquée (FLIP) */
    if (motion && origine) {
      const r = origine.getBoundingClientRect();
      const c = cadre.getBoundingClientRect();
      gsap.from(cadre, {
        x: r.left + r.width / 2 - (c.left + c.width / 2),
        y: r.top + r.height / 2 - (c.top + c.height / 2),
        scaleX: r.width / c.width, scaleY: r.height / c.height,
        duration: .8, ease: 'expo.out'
      });
    }
  }

  function fermerVideo() {
    lightbox.classList.remove('ouverte');
    bloquerScroll(false);
    if (iframe) { iframe.remove(); iframe = null; }
    if (dernierFocus) dernierFocus.focus();
  }

  document.addEventListener('click', (e) => {
    const declencheur = e.target.closest('[data-video]');
    if (!declencheur) return;
    const vignette = declencheur.querySelector('.carte__media, .une__media') ||
                     declencheur.closest('.cas__carte')?.querySelector('.cas__media') ||
                     (declencheur.classList.contains('screen') ? declencheur : null);
    ouvrirVideo(declencheur.dataset.video, declencheur.dataset.titre,
                declencheur.dataset.vertical, vignette);
  });
  btnFermer.addEventListener('click', fermerVideo);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) fermerVideo(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (lightbox.classList.contains('ouverte')) fermerVideo();
    else if (document.body.classList.contains('nav-ouverte')) basculerMenu(false);
  });

  /* ============ menu mobile (rideau plein écran) ============ */
  const burger = document.querySelector('.burger');
  function basculerMenu(ouvert) {
    document.body.classList.toggle('nav-ouverte', ouvert);
    burger.setAttribute('aria-expanded', ouvert);
    burger.setAttribute('aria-label', ouvert ? 'Fermer le menu' : 'Ouvrir le menu');
    bloquerScroll(ouvert);
    if (ouvert && motion) {
      gsap.fromTo('.header__nav li', { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: .9, stagger: .06, ease: 'expo.out', delay: .15 });
    }
  }
  burger.addEventListener('click', () =>
    basculerMenu(!document.body.classList.contains('nav-ouverte')));
  document.querySelectorAll('.header__nav a').forEach((a) =>
    a.addEventListener('click', () => {
      if (document.body.classList.contains('nav-ouverte')) basculerMenu(false);
    }));

  /* ============ formulaire devis : mailto prérempli ============
     Pour un envoi sans client mail, brancher sur Formspree/Netlify Forms
     (voir README). */
  const form = document.getElementById('form-devis');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const d = new FormData(form);
    const sujet = 'Demande de devis : ' + (d.get('type') || 'projet vidéo');
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

  /* ======================================================================
     COUCHE VIDÉO — fonds Vimeo (helper partagé)
     L'iframe reste invisible tant que Vimeo n'a pas confirmé la lecture :
     aucun écran d'erreur possible côté visiteur.
     ====================================================================== */
  const VIMEO = 'https://player.vimeo.com';

  function videoFond(id, quandJoue) {
    const f = document.createElement('iframe');
    f.src = VIMEO + '/video/' + id + '?background=1&autoplay=1&loop=1&muted=1&api=1&dnt=1';
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
  window.addEventListener('resize', () =>
    aCouvrir.forEach(([boite, f]) => { if (f.isConnected) couvrir(boite, f); }));

  if (!reduit) {
    /* ---------- showreel ambiant dans l'écran hero ---------- */
    window.addEventListener('load', () => {
      const screen = document.querySelector('.screen');
      const fond = videoFond('990136377', () => screen.classList.add('ambiant-actif'));
      screen.insertBefore(fond, screen.querySelector('.screen__voile'));
      suivreCouverture(screen, fond);
    });

    /* ---------- aperçu vidéo au survol (catalogue + sélection, un seul à la fois) ---------- */
    if (pointeurFin) {
      let active = null, minuteur = null;
      const stopApercu = () => {
        if (!active) return;
        const c = active; active = null;
        c.classList.remove('apercu', 'charge-en-cours');
        const f = c.querySelector('iframe');
        if (f) { f.stopEcoute(); f.remove(); }
      };
      document.querySelectorAll('.carte, .une').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          clearTimeout(minuteur);
          minuteur = setTimeout(() => {
            stopApercu();
            active = el;
            el.classList.add('charge-en-cours');
            const f = videoFond(el.dataset.video, () => {
              el.classList.remove('charge-en-cours');
              el.classList.add('apercu');
            });
            el.querySelector('.carte__media, .une__media').appendChild(f);
          }, 280);
        });
        el.addEventListener('mouseleave', () => { clearTimeout(minuteur); stopApercu(); });
      });
      filtres.forEach((f) => f.addEventListener('click', () => { clearTimeout(minuteur); stopApercu(); }));
    }

    /* ---------- études de cas : la carte la plus visible passe en vidéo ---------- */
    const medias = Array.from(document.querySelectorAll('.cas__media[data-fond]'));
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

    /* ---------- fond vidéo de la section devis ---------- */
    const fondDevis = document.querySelector('.devis__fond[data-fond]');
    new IntersectionObserver((entrees, obs) => {
      if (!entrees[0].isIntersecting) return;
      obs.disconnect();
      const f = videoFond(fondDevis.dataset.fond, () => {
        couvrir(fondDevis, f); fondDevis.classList.add('joue');
      });
      fondDevis.appendChild(f);
      suivreCouverture(fondDevis, f);
    }, { rootMargin: '350px' }).observe(fondDevis);
  }

  /* ---------- barre de progression du scroll ---------- */
  const barre = document.createElement('div');
  barre.className = 'progression';
  barre.setAttribute('aria-hidden', 'true');
  document.body.appendChild(barre);
  const majBarre = () => {
    const h = root.scrollHeight - window.innerHeight;
    barre.style.transform = 'scaleX(' + (h > 0 ? window.scrollY / h : 0) + ')';
  };
  window.addEventListener('scroll', majBarre, { passive: true });
  majBarre();

  /* header : fond dès qu'on quitte le haut de page */
  const header = document.querySelector('.header');
  const majHeader = () => header.classList.toggle('plein', window.scrollY > 40);
  window.addEventListener('scroll', majHeader, { passive: true });
  majHeader();

  /* footer : la marque géante remplit exactement la largeur */
  const marque = document.querySelector('.footer__marque');
  const ajusterMarque = () => {
    marque.style.fontSize = '';
    const st = getComputedStyle(marque.parentElement);
    const dispo = marque.parentElement.clientWidth - parseFloat(st.paddingLeft) - parseFloat(st.paddingRight);
    marque.style.fontSize = parseFloat(getComputedStyle(marque).fontSize) * dispo / marque.scrollWidth + 'px';
  };
  if (document.fonts) document.fonts.ready.then(ajusterMarque); else ajusterMarque();
  window.addEventListener('resize', ajusterMarque);

  if (!motion) {
    root.classList.add('no-motion');
    return;
  }

  /* ======================================================================
     COUCHE MOTION
     ====================================================================== */
  gsap.registerPlugin(ScrollTrigger, SplitText, Flip);
  const mm = gsap.matchMedia();
  const BUREAU = '(min-width: 901px)';

  /* ---------- grain, curseur, aimants (desktop) ---------- */
  const grain = document.createElement('div');
  grain.className = 'grain';
  grain.setAttribute('aria-hidden', 'true');
  document.body.appendChild(grain);

  if (pointeurFin) {
    root.classList.add('curseur-actif');
    const anneau = document.createElement('div');
    anneau.className = 'curseur';
    anneau.setAttribute('aria-hidden', 'true');
    anneau.innerHTML = '<span class="curseur__label">play</span>';
    const point = document.createElement('div');
    point.className = 'curseur__point';
    point.setAttribute('aria-hidden', 'true');
    document.body.append(anneau, point);
    const ax = gsap.quickTo(anneau, 'x', { duration: .5, ease: 'power3' });
    const ay = gsap.quickTo(anneau, 'y', { duration: .5, ease: 'power3' });
    const px = gsap.quickSetter(point, 'x', 'px');
    const py = gsap.quickSetter(point, 'y', 'px');
    document.addEventListener('mousemove', (e) => {
      ax(e.clientX); ay(e.clientY); px(e.clientX); py(e.clientY);
      const surVideo = !!e.target.closest('[data-video]');
      anneau.classList.toggle('sur-video', surVideo);
      anneau.classList.toggle('sur-lien', !surVideo && !!e.target.closest('a,button,.service'));
      anneau.classList.toggle('sombre', !!e.target.closest('.devis,.lightbox'));
    });

    document.querySelectorAll('.aimant, .filtre, .cas__lien i, .lightbox__fermer').forEach((b) => {
      const bx = gsap.quickTo(b, 'x', { duration: .6, ease: 'elastic.out(1,.4)' });
      const by = gsap.quickTo(b, 'y', { duration: .6, ease: 'elastic.out(1,.4)' });
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        bx((e.clientX - r.left - r.width / 2) * .3);
        by((e.clientY - r.top - r.height / 2) * .4);
      });
      b.addEventListener('mouseleave', () => { bx(0); by(0); });
    });

    /* cartes du catalogue : inclinaison 3D qui suit le pointeur */
    cartes.forEach((c) => {
      const m = c.querySelector('.carte__media');
      const rx = gsap.quickTo(m, 'rotationX', { duration: .6, ease: 'power3' });
      const ry = gsap.quickTo(m, 'rotationY', { duration: .6, ease: 'power3' });
      c.addEventListener('mousemove', (e) => {
        const r = m.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - .5) * 10);
        rx(-((e.clientY - r.top) / r.height - .5) * 8);
      });
      c.addEventListener('mouseleave', () => { rx(0); ry(0); });
    });
  }

  /* ---------- header : se cache en descendant, revient en remontant ---------- */
  ScrollTrigger.create({
    start: 'top -120',
    end: 'max',
    onUpdate: (self) => {
      if (document.body.classList.contains('nav-ouverte')) return;
      gsap.to(header, { yPercent: self.direction === 1 ? -110 : 0, duration: .6, ease: 'expo.out', overwrite: true });
    },
    onLeaveBack: () => gsap.to(header, { yPercent: 0, duration: .6, ease: 'expo.out', overwrite: true })
  });

  /* ---------- intro : compteur, puis le rideau se lève ---------- */
  function intro() {
    return new Promise((fini) => {
      const el = document.querySelector('.intro');
      if (!root.classList.contains('avec-intro') || !el) { el?.remove(); fini(); return; }
      try { sessionStorage.setItem('hm-intro', '1'); } catch (e) {}
      el.style.animation = 'none'; /* le JS prend la main sur le secours CSS */
      window.scrollTo(0, 0);
      bloquerScroll(true);
      const n = el.querySelector('.intro__compteur b');
      const o = { v: 0 };
      gsap.timeline({
        onComplete: () => { el.remove(); root.classList.remove('avec-intro'); bloquerScroll(false); }
      })
        /* court exprès : le rideau retarde l'affichage du hero (LCP mobile), viser ~1,2 s avant la levée */
        .from('.intro__haut > *', { yPercent: 100, opacity: 0, duration: .5, stagger: .08, ease: 'expo.out' })
        .to(o, { v: 100, duration: .9, ease: 'power3.inOut',
                 onUpdate: () => { n.textContent = Math.round(o.v); } }, 0.05)
        .to('.intro__barre i', { scaleX: 1, duration: .9, ease: 'power3.inOut' }, 0.05)
        .to('.intro__compteur, .intro__haut', { yPercent: -60, opacity: 0, duration: .45, ease: 'expo.in' }, '+=.05')
        .to(el, { clipPath: 'inset(0 0 100% 0)', duration: .9, ease: 'expo.inOut', onStart: fini }, '-=.2');
    });
  }

  /* ---------- hero : entrée du titre lettre à lettre ---------- */
  const lignesHero = gsap.utils.toArray('.hero__ligne');
  const splitHero = SplitText.create(lignesHero, { type: 'chars', smartWrap: true });
  gsap.set(lignesHero, { overflow: 'hidden', paddingBottom: '.06em' });
  gsap.set(splitHero.chars, { yPercent: 115 });
  gsap.set('.hero .eyebrow, .hero__bas > *', { opacity: 0, y: 24 });
  gsap.set('.hero__scene', { y: () => window.innerHeight * .7 });
  gsap.set('.screen img', { scale: 1.6 });
  gsap.set('.annotation', { opacity: 0 });

  function entreeHero() {
    /* les lignes masquent les lettres qui montent ; le cercle déborde de la ligne,
       donc on ne le trace qu'une fois le masque retiré (dernière lettre à ~97 %) */
    const finMasque = .05 + (splitHero.chars.length - 1) * .028 + .65;
    gsap.timeline({ defaults: { ease: 'expo.out' } })
      .to('.hero .eyebrow', { opacity: 1, y: 0, duration: 1 }, 0)
      .to(splitHero.chars, { yPercent: 0, duration: 1.3, stagger: .028 }, .05)
      .set(lignesHero, { overflow: 'visible' }, finMasque)
      .fromTo('.hero__titre .cercle path', { strokeDashoffset: 3000 },
        { strokeDashoffset: 0, duration: 1.2, ease: 'power2.out' }, finMasque)
      .to('.hero__bas > *', { opacity: 1, y: 0, duration: 1, stagger: .1 }, .6)
      .to('.hero__scene', { y: 0, duration: 1.5, ease: 'expo.inOut', clearProps: 'transform' }, .3)
      .to('.screen img', { scale: 1.25, duration: 2, ease: 'expo.out', clearProps: 'transform' }, .5)
      .to('.annotation', { opacity: 1, duration: .6 }, 1.5);
  }

  /* ---------- hero : le film avale l'écran au scroll ---------- */
  gsap.timeline({
    scrollTrigger: { trigger: '.hero', start: 'top top', end: '+=150%', pin: true, scrub: 1 }
  })
    .to('.hero__scene', { '--p': 1, duration: 1, ease: 'power2.inOut' }, 0)
    /* le titre et le bloc du bas séparément : un transform sur .hero__texte
       en ferait le repère du bloc du bas, positionné en absolu */
    .to('.hero__titre, .hero__bas', { y: -90, opacity: 0, filter: 'blur(10px)', duration: .55, ease: 'power1.in' }, 0)
    .to('.annotation', { opacity: 0, duration: .15 }, 0)
    .set('.screen__legende', { opacity: 1 }, .6)
    .fromTo('.screen__mot', { yPercent: 110, opacity: 0 },
      { yPercent: 0, opacity: 1, stagger: .1, duration: .35, ease: 'power3.out' }, .6)
    .to({}, { duration: .35 });

  Promise.all([intro(), document.fonts ? document.fonts.ready : null]).then(entreeHero);

  /* ---------- marquee : vitesse et sens suivent le scroll ---------- */
  root.classList.add('js-marquee');
  let mx = 0, sens = -1, elan = 0;
  ScrollTrigger.create({
    onUpdate: (self) => {
      sens = self.direction === 1 ? -1 : 1;
      elan = Math.min(Math.abs(self.getVelocity()) / 250, 12);
    }
  });
  gsap.ticker.add((t, dt) => {
    const w = marquee.scrollWidth / 2;
    if (!w) return;
    elan *= .94;
    mx = gsap.utils.wrap(-w, 0, mx + sens * (1 + elan) * dt * .045);
    gsap.set(marquee, { x: mx });
  });

  /* ---------- titres de section : lettres qui montent de leur masque ---------- */
  document.querySelectorAll('.section__titre, .selection__titre').forEach((el) => {
    SplitText.create(el, {
      type: 'lines,words,chars', mask: 'lines', linesClass: 'ligne-masque', autoSplit: true,
      onSplit: (self) => gsap.from(self.chars, {
        yPercent: 110, rotate: 6, duration: 1.1, stagger: .022, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true }
      })
    });
  });
  gsap.utils.toArray('.eyebrow').forEach((el) => {
    if (el.closest('.hero')) return;
    gsap.from(el, { opacity: 0, y: 20, rotate: -6, duration: .9, ease: 'expo.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
  });

  /* ---------- manifeste : les mots s'allument, les pastilles vidéo s'ouvrent ---------- */
  SplitText.create('#manifeste-texte', {
    type: 'words', autoSplit: true,
    onSplit: (self) => gsap.fromTo(self.words, { opacity: .12 }, {
      opacity: 1, stagger: .1, ease: 'none',
      scrollTrigger: { trigger: '#manifeste-texte', start: 'top 78%', end: 'bottom 50%', scrub: true }
    })
  });
  gsap.from('.pastille', {
    width: 0, marginLeft: 0, marginRight: 0, ease: 'none', stagger: .3,
    scrollTrigger: { trigger: '#manifeste-texte', start: 'top 70%', end: 'bottom 55%', scrub: true }
  });

  /* ---------- compteurs ---------- */
  document.querySelectorAll('[data-compte]').forEach((b) => {
    const fin = +b.dataset.compte, suffixe = b.dataset.suffixe || '';
    const o = { v: fin > 1000 ? fin - 40 : 0 };
    ScrollTrigger.create({
      trigger: b, start: 'top 90%', once: true,
      onEnter: () => gsap.to(o, { v: fin, duration: 1.6, ease: 'expo.out',
        onUpdate: () => { b.textContent = Math.round(o.v) + suffixe; } })
    });
    b.textContent = Math.round(o.v) + suffixe;
  });
  gsap.from('.chiffre', { y: 40, opacity: 0, duration: 1, stagger: .08, ease: 'expo.out',
    scrollTrigger: { trigger: '.chiffres', start: 'top 88%', once: true } });

  /* ---------- sélection : défilement horizontal épinglé (desktop) ---------- */
  mm.add(BUREAU, () => {
    const piste = document.querySelector('.selection__piste');
    const distance = () => piste.scrollWidth - window.innerWidth;
    const inclinaison = gsap.quickSetter(rail, 'skewX', 'deg');
    const borne = gsap.utils.clamp(-7, 7);
    const proxy = { s: 0 };
    const defile = gsap.to(piste, {
      x: () => -distance(), ease: 'none',
      scrollTrigger: {
        trigger: '.selection', start: 'top top', end: () => '+=' + distance(),
        pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: (self) => {
          const s = borne(self.getVelocity() / -350);
          if (Math.abs(s) > Math.abs(proxy.s)) {
            proxy.s = s;
            gsap.to(proxy, { s: 0, duration: .8, ease: 'power3', overwrite: true,
              onUpdate: () => inclinaison(proxy.s) });
          }
        }
      }
    });
    gsap.utils.toArray('.une').forEach((une) => {
      const media = une.querySelector('.une__media');
      gsap.fromTo(media.querySelector('img'), { xPercent: -7 }, {
        xPercent: 7, ease: 'none',
        scrollTrigger: { trigger: une, containerAnimation: defile, start: 'left right', end: 'right left', scrub: true }
      });
      gsap.from(media, {
        clipPath: 'inset(12% 0 12% 0 round 18px)', scale: .9, ease: 'none',
        scrollTrigger: { trigger: une, containerAnimation: defile, start: 'left right', end: 'left 55%', scrub: true }
      });
    });
    gsap.from('.selection__fin', {
      scale: .4, rotate: -30, ease: 'none',
      scrollTrigger: { trigger: '.selection__fin', containerAnimation: defile, start: 'left right', end: 'center 60%', scrub: true }
    });
  });

  /* ---------- catalogue : cascade d'apparition ---------- */
  gsap.set(cartes, { opacity: 0, y: 60 });
  ScrollTrigger.batch(cartes, {
    start: 'top 92%', once: true,
    onEnter: (lot) => gsap.to(lot, { opacity: 1, y: 0, duration: 1, stagger: .07, ease: 'expo.out' })
  });

  /* ---------- études de cas : les cartes s'empilent, la précédente recule ---------- */
  const casCartes = gsap.utils.toArray('.cas__carte');
  casCartes.forEach((c, i) => c.style.setProperty('--i', i));
  mm.add(BUREAU, () => {
    casCartes.forEach((c, i) => {
      const suivante = casCartes[i + 1];
      if (suivante) {
        /* départ explicite : depuis « filter: none », GSAP partait de brightness(0) et la carte visible était noire */
        gsap.fromTo(c, { scale: 1, filter: 'brightness(1)' }, {
          scale: .9 + i * .02, filter: 'brightness(.55)', ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: suivante, start: 'top bottom', end: 'top ' + (96 + (i + 1) * 22) + 'px', scrub: true }
        });
      }
      gsap.from(c.querySelector('.cas__media img'), {
        scale: 1.35, ease: 'none',
        scrollTrigger: { trigger: c, start: 'top bottom', end: 'top 20%', scrub: true }
      });
    });
  });
  casCartes.forEach((c) => {
    gsap.from(c.querySelectorAll('.cas__client, .cas__titre, .cas__desc, .cas__chiffres, .cas__lien'), {
      y: 40, opacity: 0, duration: 1, stagger: .08, ease: 'expo.out',
      scrollTrigger: { trigger: c, start: 'top 70%', once: true }
    });
  });

  /* ---------- services : lignes + image flottante qui suit le curseur ---------- */
  const services = gsap.utils.toArray('.service');
  gsap.from(services, { y: 50, opacity: 0, duration: 1, stagger: .1, ease: 'expo.out',
    scrollTrigger: { trigger: '.services__liste', start: 'top 85%', once: true } });
  if (pointeurFin) {
    const flot = document.querySelector('.services__flottant');
    const pile = flot.querySelector('.services__images');
    services.forEach((s) => {
      const img = document.createElement('img');
      img.src = s.dataset.image; img.alt = ''; img.loading = 'lazy';
      pile.appendChild(img);
    });
    gsap.set(flot, { autoAlpha: 0, scale: .5 });
    const fx = gsap.quickTo(flot, 'x', { duration: .7, ease: 'power3' });
    const fy = gsap.quickTo(flot, 'y', { duration: .7, ease: 'power3' });
    const fr = gsap.quickTo(flot, 'rotation', { duration: .8, ease: 'power3' });
    let dernierX = 0;
    const liste = document.querySelector('.services__liste');
    liste.addEventListener('mousemove', (e) => {
      fx(e.clientX); fy(e.clientY);
      fr(gsap.utils.clamp(-14, 14, (e.clientX - dernierX) * .6));
      dernierX = e.clientX;
    });
    liste.addEventListener('mouseenter', (e) => {
      gsap.set(flot, { x: e.clientX, y: e.clientY });
      gsap.to(flot, { autoAlpha: 1, scale: 1, duration: .6, ease: 'expo.out', overwrite: 'auto' });
    });
    liste.addEventListener('mouseleave', () => {
      gsap.to(flot, { autoAlpha: 0, scale: .5, rotation: 0, duration: .5, ease: 'expo.out', overwrite: 'auto' });
    });
    services.forEach((s, i) => s.addEventListener('mouseenter', () =>
      gsap.to(pile, { yPercent: -100 * i, duration: .8, ease: 'expo.out', overwrite: true })));
  }

  /* ---------- process : grand numéro qui défile, étape active ---------- */
  const compteur = document.querySelector('.process__compteur');
  const etapes = gsap.utils.toArray('.etape');
  etapes.forEach((et, i) => {
    ScrollTrigger.create({
      trigger: et, start: 'top 62%', end: 'bottom 62%',
      onToggle: (self) => {
        et.classList.toggle('active', self.isActive);
        if (self.isActive) compteur.style.setProperty('--etape', i);
      }
    });
  });
  gsap.to('#ligne-progression', {
    scaleX: 1, ease: 'none',
    scrollTrigger: { trigger: '.process__etapes', start: 'top 62%', end: 'bottom 62%', scrub: true }
  });

  /* ---------- devis : titre géant qui se lève au scroll ---------- */
  SplitText.create('.devis__geant', {
    type: 'lines,chars', mask: 'lines', linesClass: 'ligne-masque', autoSplit: true,
    onSplit: (self) => gsap.from(self.chars, {
      yPercent: 115, stagger: .03, ease: 'power2.out',
      scrollTrigger: { trigger: '.devis', start: 'top 85%', end: 'top 15%', scrub: 1 }
    })
  });
  gsap.from('.devis__inner > div, .form > *', {
    y: 40, opacity: 0, duration: 1, stagger: .05, ease: 'expo.out',
    scrollTrigger: { trigger: '.devis__inner', start: 'top 80%', once: true }
  });

  /* ---------- footer : la marque remonte sous le rideau ---------- */
  gsap.from('.footer__marque', {
    yPercent: 70, ease: 'none',
    scrollTrigger: { trigger: '.footer-rideau', start: 'top bottom', end: 'bottom bottom', scrub: true }
  });
  gsap.from('.footer__haut, .footer__bas', {
    y: -60, opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '.footer-rideau', start: 'top 80%', end: 'bottom bottom', scrub: true }
  });

  /* recalcul quand les images et polices sont là */
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
