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
  let current = 0;
  let started = false;
  function render() {
    const song = songs[current];
    if (!audio) return;
    audio.src = song.src;
    if (title) title.textContent = song.title;
    if (artist) artist.textContent = song.artist;
    if (cover) cover.src = song.cover;
    if (toggle) toggle.textContent = audio.paused ? '▶' : 'Ⅱ';
    if (state) state.textContent = audio.paused ? 'PAUSED' : 'PLAYING';
  }
  async function play() {
    if (!audio) return;
    try { await audio.play(); started = true; } catch (error) { if (state) state.textContent = 'TAP TO PLAY'; }
    render();
  }
  function change(step) {
    current = (current + step + songs.length) % songs.length;
    render();
    if (started) play();
  }
  if (audio) {
    audio.volume = 0.22;
    render();
    audio.addEventListener('ended', () => change(1));
    audio.addEventListener('play', render);
    audio.addEventListener('pause', render);
  }
  toggle?.addEventListener('click', () => audio.paused ? play() : audio.pause());
  next?.addEventListener('click', () => change(1));
  prev?.addEventListener('click', () => change(-1));
  volume?.addEventListener('input', () => { audio.volume = Number(volume.value); });
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