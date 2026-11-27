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


  // Custom Voltage support panel powered by Tawk.to.
  const support = document.createElement('section');
  support.className = 'support-widget';
  support.innerHTML = `
    <div class="support-panel" id="support-panel" hidden>
      <div class="support-panel-head">
        <div><span class="support-kicker">VOLTAGE SUPPORT</span><strong>How can I help?</strong></div>
        <button class="support-close" type="button" aria-label="Close support panel">×</button>
      </div>
      <p>Have a question or want to talk about a project?</p>
      <a class="support-option support-discord" href="https://discordapp.com/users/924463055906160680" target="_blank" rel="noopener noreferrer"><span class="support-option-icon">↗</span><span><strong>Contact on Discord</strong><small>Send me a direct message</small></span></a>
      <button class="support-option support-live" type="button"><span class="support-option-icon">◌</span><span><strong>Start live chat</strong><small>Message me through the website</small></span></button>
      <div class="support-foot">Usually replies as soon as possible</div>
    </div>
    <button class="support-prompt" type="button" aria-expanded="false" aria-controls="support-panel">
      <span class="support-status-dot"></span><span>Any more questions?</span><span class="support-prompt-arrow">↗</span>
    </button>`;
  document.body.appendChild(support);
  const supportPanel = support.querySelector('#support-panel');
  const supportPrompt = support.querySelector('.support-prompt');
  const supportClose = support.querySelector('.support-close');
  let tawkReady = false;
  let openChatWhenReady = false;
  function openTawkChat() {
    if (!tawkReady || !window.Tawk_API || typeof window.Tawk_API.maximize !== 'function') {
      openChatWhenReady = true;
      const liveText = support.querySelector('.support-live small');
      if (liveText) liveText.textContent = 'Connecting to live chat…';
      return;
    }
    window.Tawk_API.showWidget();
    window.Tawk_API.maximize();
    supportPanel.hidden = true;
    supportPrompt.setAttribute('aria-expanded', 'false');
  }
  supportPrompt.addEventListener('click', () => {
    supportPanel.hidden = !supportPanel.hidden;
    supportPrompt.setAttribute('aria-expanded', String(!supportPanel.hidden));
  });
  supportClose.addEventListener('click', () => {
    supportPanel.hidden = true;
    supportPrompt.setAttribute('aria-expanded', 'false');
  });
  support.querySelector('.support-live').addEventListener('click', openTawkChat);

  // Load the normal Tawk widget, but keep its default launcher hidden.
  window.Tawk_API = window.Tawk_API || {};
  window.Tawk_API.onLoad = function () {
    tawkReady = true;
    window.Tawk_API.hideWidget();
    if (openChatWhenReady) openTawkChat();
  };
  window.Tawk_LoadStart = new Date();
  (function () {
    const firstScript = document.getElementsByTagName('script')[0];
    const tawkScript = document.createElement('script');
    tawkScript.async = true;
    tawkScript.src = 'https://embed.tawk.to/62fc3a0437898912e9636a94/1k8f669fb';
    tawkScript.charset = 'UTF-8';
    tawkScript.setAttribute('crossorigin', '*');
    firstScript.parentNode.insertBefore(tawkScript, firstScript);
  })();

  const cursor = document.querySelector('.custom-cursor');
  if (cursor && matchMedia('(pointer:fine)').matches) {
    document.addEventListener('mousemove', event => {
      cursor.style.left = event.clientX + 'px';
      cursor.style.top = event.clientY + 'px';
    });
  } else document.body.classList.add('no-cursor');
})();