(() => {
  const songs = [
    { title: 'STAY HERE 4 LIFE', artist: 'A$AP ROCKY', src: 'assets/music/stayhere.mp3', cover: 'assets/music/cover1.jpg' },
    { title: 'Passionfruit', artist: 'Drake', src: 'assets/music/passionfruit.mp3', cover: 'assets/music/cover2.jpg' },
    { title: 'Headlines', artist: 'Drake', src: 'assets/music/headlines.mp3', cover: 'assets/music/cover3.jpg' },
    { title: 'Wet Hands', artist: 'C418', src: 'assets/music/Wet Hands.mp3', cover: 'assets/music/cover1.jpg' }
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
  const themeButton = document.querySelector('#theme-toggle');
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
      if (state) state.textContent = 'TAP TO PLAY';
      console.warn('Music playback could not start:', error);
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
  }
  toggle?.addEventListener('click', () => {
    if (!audio) return;
    if (audio.paused) playMusic();
    else audio.pause();
  });
  next?.addEventListener('click', () => changeTrack(1));
  prev?.addEventListener('click', () => changeTrack(-1));
  volume?.addEventListener('input', () => { if (audio) audio.volume = Number(volume.value); });

  // The theme preference is shared across every page on this site.
  const themeKey = 'voltage-minecraft-theme';
  function applyTheme(enabled) {
    document.body.classList.toggle('minecraft-theme', enabled);
    if (themeButton) {
      themeButton.textContent = enabled ? 'MINECRAFT MODE: ON' : 'MINECRAFT MODE: OFF';
      themeButton.setAttribute('aria-pressed', String(enabled));
    }
  }
  let minecraftEnabled = false;
  try { minecraftEnabled = localStorage.getItem(themeKey) === 'true'; } catch (_) {}
  applyTheme(minecraftEnabled);
  themeButton?.addEventListener('click', () => {
    minecraftEnabled = !document.body.classList.contains('minecraft-theme');
    applyTheme(minecraftEnabled);
    try { localStorage.setItem(themeKey, String(minecraftEnabled)); } catch (_) {}
  });

  document.querySelector('.menu-toggle')?.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    const open = links.classList.toggle('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.pathname.split('/').pop() === location.pathname.split('/').pop()) link.setAttribute('aria-current', 'page');
  });
  const cursor = document.querySelector('.custom-cursor');
  if (cursor && matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', event => {
      cursor.style.left = event.clientX + 'px';
      cursor.style.top = event.clientY + 'px';
    });
  } else document.body.classList.add('no-cursor');
  document.querySelectorAll('[data-year]').forEach(node => node.textContent = new Date().getFullYear());
})();