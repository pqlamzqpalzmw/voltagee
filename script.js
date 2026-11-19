(() => {
  const songs = [
    { title: 'STAY HERE 4 LIFE', artist: 'A$AP ROCKY', src: 'assets/music/stayhere.mp3', cover: 'assets/music/cover1.jpg' },
    { title: 'Passionfruit', artist: 'Drake', src: 'assets/music/passionfruit.mp3', cover: 'assets/music/cover2.jpg' },
    { title: 'Headlines', artist: 'Drake', src: 'assets/music/headlines.mp3', cover: 'assets/music/cover3.jpg' },
    { title: 'Wet Hands', artist: 'C418', src: 'assets/music/Wet Hands.mp3', cover: 'assets/music/cover1.jpg' },
    { title: 'Love Blur', artist: 'slayr', src: 'assets/music/Love Blur - slayr.mp3', cover: 'assets/music/cover4.jpg' }
  ];
  const audio = document.querySelector('#music-audio');
  const toggle = document.querySelector('#music-toggle');
  const next = document.querySelector('#music-next');
  const prev = document.querySelector('#music-prev');
  const title = document.querySelector('#music-title');
  const artist = document.querySelector('#music-artist');
  const cover = document.querySelector('#music-cover');
  const volume = document.querySelector('#music-volume');
  const state = document.querySelector('#music-state');
  let current = 0;
  let started = false;

  function renderMusicUI() {
    if (!audio) return;
    if (toggle) toggle.textContent = audio.paused ? '▶' : 'Ⅱ';
    if (state) state.textContent = audio.error ? 'UNAVAILABLE' : (audio.paused ? 'PAUSED' : 'PLAYING');
  }
  function loadTrack(index) {
    current = (index + songs.length) % songs.length;
    const song = songs[current];
    audio.src = song.src;
    audio.load();
    if (title) title.textContent = song.title;
    if (artist) artist.textContent = song.artist;
    if (cover) cover.src = song.cover;
    renderMusicUI();
  }
  async function playMusic() {
    if (!audio) return;
    try {
      await audio.play();
      started = true;
      renderMusicUI();
    } catch (error) {
      if (state) state.textContent = 'TAP TO START';
      console.info('Your browser requires a user gesture before audio can play.');
    }
  }
  function changeTrack(step) {
    loadTrack(current + step);
    if (started) playMusic();
  }
  if (audio) {
    audio.volume = 0.22;
    audio.addEventListener('ended', () => changeTrack(1));
    audio.addEventListener('play', renderMusicUI);
    audio.addEventListener('pause', renderMusicUI);
    audio.addEventListener('error', renderMusicUI);
    loadTrack(0);
    // Try autoplay. Browsers may block audible autoplay until the visitor interacts.
    playMusic();
    const startOnFirstGesture = () => {
      if (!started) playMusic();
      if (started) {
        document.removeEventListener('pointerdown', startOnFirstGesture);
        document.removeEventListener('keydown', startOnFirstGesture);
      }
    };
    document.addEventListener('pointerdown', startOnFirstGesture);
    document.addEventListener('keydown', startOnFirstGesture);
  }
  toggle?.addEventListener('click', () => {
    if (!audio) return;
    if (audio.paused) playMusic();
    else audio.pause();
  });
  next?.addEventListener('click', () => changeTrack(1));
  prev?.addEventListener('click', () => changeTrack(-1));
  volume?.addEventListener('input', () => { if (audio) audio.volume = Number(volume.value); });

  const themeKey = 'voltage-minecraft-theme';
  function applyTheme(enabled) {
    document.body.classList.toggle('minecraft-theme', enabled);
    const button = document.querySelector('#theme-toggle');
    if (button) {
      button.textContent = enabled ? 'MINECRAFT MODE: ON' : 'MINECRAFT MODE: OFF';
      button.setAttribute('aria-pressed', String(enabled));
    }
  }
  let minecraftEnabled = false;
  try { minecraftEnabled = localStorage.getItem(themeKey) === 'true'; } catch (_) {}
  applyTheme(minecraftEnabled);
  document.addEventListener('click', event => {
    if (!event.target.closest('#theme-toggle')) return;
    minecraftEnabled = !document.body.classList.contains('minecraft-theme');
    applyTheme(minecraftEnabled);
    try { localStorage.setItem(themeKey, String(minecraftEnabled)); } catch (_) {}
  });

  function setupPage() {
    const menuButton = document.querySelector('.menu-toggle');
    menuButton?.addEventListener('click', () => {
      const links = document.querySelector('.nav-links');
      const open = links.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      if (link.pathname.split('/').pop() === location.pathname.split('/').pop()) link.setAttribute('aria-current', 'page');
    });
    document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
    applyTheme(minecraftEnabled);
  }
  setupPage();

  // Swap page content without reloading the document, keeping the same audio element alive.
  async function navigate(url, addHistory = true) {
    const target = new URL(url, location.href);
    if (target.origin !== location.origin || !/\.html$/.test(target.pathname)) return;
    try {
      const response = await fetch(target.href);
      if (!response.ok) throw new Error('Page could not be loaded');
      const html = await response.text();
      const nextDoc = new DOMParser().parseFromString(html, 'text/html');
      for (const selector of ['.site-header', 'main', '.site-footer', '#theme-toggle']) {
        const currentNode = document.querySelector(selector);
        const nextNode = nextDoc.querySelector(selector);
        if (currentNode && nextNode) currentNode.replaceWith(nextNode);
      }
      document.title = nextDoc.title;
      if (addHistory) history.pushState({}, '', target.href);
      setupPage();
      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (error) {
      location.href = target.href;
    }
  }
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || link.target === '_blank' || link.hasAttribute('download')) return;
    const url = new URL(link.href, location.href);
    if (url.origin === location.origin && /\.html$/.test(url.pathname)) {
      event.preventDefault();
      navigate(url.href);
    }
  });
  window.addEventListener('popstate', () => navigate(location.href, false));

  const cursor = document.querySelector('.custom-cursor');
  if (cursor && matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', event => {
      cursor.style.left = event.clientX + 'px';
      cursor.style.top = event.clientY + 'px';
    });
  } else document.body.classList.add('no-cursor');
})();