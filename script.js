let hasUserInteracted = false;

/* =========================
   MUSIC LIBRARY
========================= */

const songs = [
  {
    title: 'STAY HERE 4 LIFE (feat. Brent Faiyaz)',
    artist: 'A$AP ROCKY',
    src: 'assets/music/stayhere.mp3',
    cover: 'assets/music/cover1.jpg'
  },
  {
    title: 'Passionfruit',
    artist: 'Drake',
    src: 'assets/music/passionfruit.mp3',
    cover: 'assets/music/cover2.jpg'
  },
  {
    title: 'Headlines',
    artist: 'Drake',
    src: 'assets/music/headlines.mp3',
    cover: 'assets/music/cover3.jpg'
  }
];

let currentSongIndex = 0;


/* =========================
   INITIAL MEDIA
========================= */

function initMedia() {

  const backgroundVideo =
    document.getElementById('background');

  const musicPlayer =
    document.getElementById('music-player');

  if (!backgroundVideo) {
    console.error('Background video not found.');
    return;
  }

  /*
   * Before the user clicks the start screen,
   * keep the video muted so the browser allows
   * the background video to autoplay.
   */

  backgroundVideo.muted = true;
  backgroundVideo.volume = 0.5;

  backgroundVideo.play().catch(err => {
    console.log(
      'Background video waiting for user interaction:',
      err
    );
  });

  if (musicPlayer) {

    /*
     * Music will start at 25% after
     * the user clicks the start screen.
     */

    musicPlayer.volume = 0.25;
    musicPlayer.pause();
  }
}


/* =========================
   DOM
========================= */

document.addEventListener('DOMContentLoaded', () => {

  const startScreen =
    document.getElementById('start-screen');

  const startText =
    document.getElementById('start-text');

  const profileName =
    document.getElementById('profile-name');

  const profileBio =
    document.getElementById('profile-bio');

  const visitorCount =
    document.getElementById('visitor-count');

  const backgroundVideo =
    document.getElementById('background');

  const musicPlayer =
    document.getElementById('music-player');

  const profileBlock =
    document.getElementById('profile-block');

  const profilePicture =
    document.querySelector('.profile-picture');

  const profileContainer =
    document.querySelector('.profile-container');

  const glitchOverlay =
    document.querySelector('.glitch-overlay');

  const hackerOverlay =
    document.getElementById('hacker-overlay');

  const snowOverlay =
    document.getElementById('snow-overlay');

  const resultsButtonContainer =
    document.getElementById('results-button-container');


  /* =========================
     MEDIA CONTROLS
  ========================= */

  const musicToggle =
    document.getElementById('music-toggle');

  const musicPrev =
    document.getElementById('music-prev');

  const musicNext =
    document.getElementById('music-next');

  const musicVolume =
    document.getElementById('music-volume');

  const musicStatus =
    document.getElementById('music-status');

  const musicCover =
    document.getElementById('music-cover');

  const musicTitle =
    document.getElementById('music-title');

  const musicArtist =
    document.getElementById('music-artist');

  const videoMute =
    document.getElementById('video-mute');

  const videoVolume =
    document.getElementById('video-volume');

  const videoStatus =
    document.getElementById('video-status');


  /* =========================
     MUSIC PLAYER
  ========================= */

  function formatSong(index) {

    const song =
      songs[index];

    musicPlayer.src =
      song.src;

    musicCover.src =
      song.cover;

    musicCover.alt =
      `${song.title} album cover`;

    musicTitle.textContent =
      song.title;

    musicArtist.textContent =
      song.artist;

    musicPlayer.currentTime = 0;

    updateMusicUI();
  }


  function updateMusicUI() {

    musicToggle.textContent =
      musicPlayer.paused
        ? '▶'
        : 'Ⅱ';

    musicStatus.textContent =
      Math.round(
        musicPlayer.volume * 100
      ) + '%';
  }


  function playSong() {

    hasUserInteracted = true;

    musicPlayer.play().catch(err => {

      console.error(
        'Could not start music:',
        err
      );

    });
  }


  function nextSong() {

    currentSongIndex =
      (currentSongIndex + 1) %
      songs.length;

    formatSong(currentSongIndex);

    playSong();
  }


  function previousSong() {

    /*
     * If the song has already played for
     * more than 3 seconds, restart it.
     */

    if (musicPlayer.currentTime > 3) {

      musicPlayer.currentTime = 0;

      return;
    }

    currentSongIndex =
      (
        currentSongIndex -
        1 +
        songs.length
      ) %
      songs.length;

    formatSong(currentSongIndex);

    playSong();
  }


  musicToggle.addEventListener(
    'click',
    () => {

      hasUserInteracted = true;

      if (musicPlayer.paused) {

        playSong();

      } else {

        musicPlayer.pause();

      }

    }
  );


  musicNext.addEventListener(
    'click',
    nextSong
  );


  musicPrev.addEventListener(
    'click',
    previousSong
  );


  musicVolume.addEventListener(
    'input',
    () => {

      const volume =
        parseFloat(
          musicVolume.value
        );

      musicPlayer.volume =
        volume;

      updateMusicUI();

    }
  );


  musicPlayer.addEventListener(
    'play',
    updateMusicUI
  );


  musicPlayer.addEventListener(
    'pause',
    updateMusicUI
  );


  /*
   * Automatically move to the
   * next song when one ends.
   */

  musicPlayer.addEventListener(
    'ended',
    nextSong
  );


  /*
   * Load first song.
   */

  musicPlayer.volume = 0.25;

  /*
   * Make the slider show 25%
   * when the site first loads.
   */

  musicVolume.value = 0.25;

  formatSong(
    currentSongIndex
  );


  /* =========================
     VIDEO CONTROLS
  ========================= */

  function updateVideoUI() {

    if (
      backgroundVideo.muted ||
      backgroundVideo.volume === 0
    ) {

      videoMute.textContent =
        '🔇';

    } else {

      videoMute.textContent =
        '🔊';

    }

    videoStatus.textContent =
      Math.round(
        backgroundVideo.volume * 100
      ) + '%';
  }


  videoMute.addEventListener(
    'click',
    () => {

      hasUserInteracted = true;

      backgroundVideo.muted =
        !backgroundVideo.muted;

      if (!backgroundVideo.muted) {

        backgroundVideo.play().catch(
          err => {
            console.error(
              'Could not play video:',
              err
            );
          }
        );

      }

      updateVideoUI();

    }
  );


  videoVolume.addEventListener(
    'input',
    () => {

      const volume =
        parseFloat(
          videoVolume.value
        );

      backgroundVideo.volume =
        volume;

      if (volume > 0) {

        backgroundVideo.muted =
          false;

      } else {

        backgroundVideo.muted =
          true;

      }

      updateVideoUI();

    }
  );


  /*
   * Initial video volume is 50%.
   * It starts muted until the user
   * clicks the start screen.
   */

  backgroundVideo.volume = 0.50;

  videoVolume.value = 0.50;

  backgroundVideo.muted = true;

  updateVideoUI();


  /* =========================
     CURSOR
  ========================= */

  const cursor =
    document.querySelector(
      '.custom-cursor'
    );

  const isTouchDevice =
    window.matchMedia(
      '(pointer: coarse)'
    ).matches;


  if (isTouchDevice) {

    document.body.classList.add(
      'touch-device'
    );

    document.addEventListener(
      'touchstart',
      e => {

        const touch =
          e.touches[0];

        cursor.style.left =
          touch.clientX + 'px';

        cursor.style.top =
          touch.clientY + 'px';

        cursor.style.display =
          'block';

      }
    );

    document.addEventListener(
      'touchmove',
      e => {

        const touch =
          e.touches[0];

        cursor.style.left =
          touch.clientX + 'px';

        cursor.style.top =
          touch.clientY + 'px';

        cursor.style.display =
          'block';

      }
    );

    document.addEventListener(
      'touchend',
      () => {

        cursor.style.display =
          'none';

      }
    );

  } else {

    document.addEventListener(
      'mousemove',
      e => {

        cursor.style.left =
          e.clientX + 'px';

        cursor.style.top =
          e.clientY + 'px';

        cursor.style.display =
          'block';

      }
    );

    document.addEventListener(
      'mousedown',
      () => {

        cursor.style.transform =
          'scale(0.8) translate(-50%, -50%)';

      }
    );

    document.addEventListener(
      'mouseup',
      () => {

        cursor.style.transform =
          'scale(1) translate(-50%, -50%)';

      }
    );

  }


  /* =========================
     START SCREEN
  ========================= */

  const startMessage =
    'click to enter...';

  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;


  function typeWriterStart() {

    if (
      startIndex <
      startMessage.length
    ) {

      startTextContent =
        startMessage.slice(
          0,
          startIndex + 1
        );

      startIndex++;

    }

    startText.textContent =
      startTextContent +
      (
        startCursorVisible
          ? '|'
          : ' '
      );

    setTimeout(
      typeWriterStart,
      100
    );
  }


  setInterval(
    () => {

      startCursorVisible =
        !startCursorVisible;

      startText.textContent =
        startTextContent +
        (
          startCursorVisible
            ? '|'
            : ' '
        );

    },
    500
  );


  /* =========================
     VISITOR COUNTER
  ========================= */

  function initializeVisitorCounter() {

    let totalVisitors =
      localStorage.getItem(
        'totalVisitorCount'
      );

    if (!totalVisitors) {

      totalVisitors = 921234;

      localStorage.setItem(
        'totalVisitorCount',
        totalVisitors
      );

    } else {

      totalVisitors =
        parseInt(
          totalVisitors
        );

    }


    const hasVisited =
      localStorage.getItem(
        'hasVisited'
      );


    if (!hasVisited) {

      totalVisitors++;

      localStorage.setItem(
        'totalVisitorCount',
        totalVisitors
      );

      localStorage.setItem(
        'hasVisited',
        'true'
      );

    }


    if (visitorCount) {

      visitorCount.textContent =
        totalVisitors.toLocaleString();

    }

  }


  initializeVisitorCounter();


  /* =========================
     ENTER SITE
========================= */

  let siteEntered = false;


  function enterSite() {

    if (siteEntered) return;

    siteEntered = true;

    /*
     * This click counts as user interaction,
     * so browsers allow audio to start.
     */

    hasUserInteracted = true;


    /* =========================
       START MUSIC AT 25%
    ========================= */

    musicPlayer.volume = 0.25;

    musicVolume.value = 0.25;

    musicPlayer.play()
      .then(() => {

        musicToggle.textContent =
          'Ⅱ';

        updateMusicUI();

      })
      .catch(err => {

        console.error(
          'Failed to start music:',
          err
        );

      });


    /* =========================
       START VIDEO AT 50%
    ========================= */

    backgroundVideo.volume = 0.50;

    videoVolume.value = 0.50;

    backgroundVideo.muted = false;

    backgroundVideo.loop = true;

    backgroundVideo.play()
      .then(() => {

        updateVideoUI();

      })
      .catch(err => {

        console.error(
          'Failed to start video:',
          err
        );

      });


    /* =========================
       HIDE START SCREEN
    ========================= */

    gsap.to(
      startScreen,
      {
        opacity: 0,
        duration: 0.5,

        onComplete: () => {

          startScreen.classList.add(
            'hidden'
          );

        }

      }
    );


    /* =========================
       SHOW PROFILE
    ========================= */

    profileBlock.classList.remove(
      'hidden'
    );


    gsap.fromTo(
      profileBlock,

      {
        opacity: 0,
        y: -50
      },

      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out'
      }
    );


    typeWriterName();
    typeWriterBio();

  }


  startScreen.addEventListener(
    'click',
    enterSite
  );


  startScreen.addEventListener(
    'touchstart',
    e => {

      e.preventDefault();

      enterSite();

    }
  );


  /* =========================
     NAME TYPEWRITER
  ========================= */

  const name =
    'VOLTAGE';

  let nameText = '';
  let nameIndex = 0;
  let isNameDeleting = false;
  let nameCursorVisible = true;
  let nameStarted = false;


  function typeWriterName() {

    if (nameStarted) return;

    nameStarted = true;


    function type() {

      if (
        !isNameDeleting &&
        nameIndex < name.length
      ) {

        nameText =
          name.slice(
            0,
            nameIndex + 1
          );

        nameIndex++;

      }

      else if (
        isNameDeleting &&
        nameIndex > 0
      ) {

        nameText =
          name.slice(
            0,
            nameIndex - 1
          );

        nameIndex--;

      }

      else if (
        nameIndex === name.length
      ) {

        isNameDeleting =
          true;

        setTimeout(
          type,
          10000
        );

        return;

      }

      else if (
        nameIndex === 0
      ) {

        isNameDeleting =
          false;

      }


      profileName.textContent =
        nameText +
        (
          nameCursorVisible
            ? '|'
            : ' '
        );


      if (
        Math.random() < 0.1
      ) {

        profileName.classList.add(
          'glitch'
        );

        setTimeout(
          () => {
            profileName.classList.remove(
              'glitch'
            );
          },
          200
        );

      }


      setTimeout(
        type,
        isNameDeleting
          ? 150
          : 300
      );

    }


    type();

  }


  setInterval(
    () => {

      nameCursorVisible =
        !nameCursorVisible;

      profileName.textContent =
        nameText +
        (
          nameCursorVisible
            ? '|'
            : ' '
        );

    },
    500
  );


  /* =========================
     BIO TYPEWRITER
  ========================= */

  const bioMessages = [
    'Management is my passion.',
    '"Hello, World!"'
  ];

  let bioText = '';
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;
  let bioStarted = false;


  function typeWriterBio() {

    if (bioStarted) return;

    bioStarted = true;


    function type() {

      const currentMessage =
        bioMessages[bioMessageIndex];


      if (
        !isBioDeleting &&
        bioIndex <
        currentMessage.length
      ) {

        bioText =
          currentMessage.slice(
            0,
            bioIndex + 1
          );

        bioIndex++;

      }

      else if (
        isBioDeleting &&
        bioIndex > 0
      ) {

        bioText =
          currentMessage.slice(
            0,
            bioIndex - 1
          );

        bioIndex--;

      }

      else if (
        bioIndex ===
        currentMessage.length
      ) {

        isBioDeleting =
          true;

        setTimeout(
          type,
          2000
        );

        return;

      }

      else if (
        bioIndex === 0 &&
        isBioDeleting
      ) {

        isBioDeleting =
          false;

        bioMessageIndex =
          (
            bioMessageIndex + 1
          ) %
          bioMessages.length;

      }


      profileBio.textContent =
        bioText +
        (
          bioCursorVisible
            ? '|'
            : ' '
        );


      if (
        Math.random() < 0.1
      ) {

        profileBio.classList.add(
          'glitch'
        );

        setTimeout(
          () => {
            profileBio.classList.remove(
              'glitch'
            );
          },
          200
        );

      }


      setTimeout(
        type,
        isBioDeleting
          ? 75
          : 150
      );

    }


    type();

  }


  setInterval(
    () => {

      bioCursorVisible =
        !bioCursorVisible;

      profileBio.textContent =
        bioText +
        (
          bioCursorVisible
            ? '|'
            : ' '
        );

    },
    500
  );


  /* =========================
     THEME ELEMENTS
  ========================= */

  const homeButton =
    document.getElementById(
      'home-theme'
    );

  const hackerButton =
    document.getElementById(
      'hacker-theme'
    );

  const rainButton =
    document.getElementById(
      'rain-theme'
    );

  const animeButton =
    document.getElementById(
      'anime-theme'
    );

  const carButton =
    document.getElementById(
      'car-theme'
    );


  /* =========================
     THEME SWITCHING
  ========================= */

  function switchTheme(
    videoSrc,
    themeClass,
    overlay = null,
    overlayOverProfile = false
  ) {

    let primaryColor;


    switch (themeClass) {

      case 'home-theme':
        primaryColor = '#00CED1';
        break;

      case 'hacker-theme':
        primaryColor = '#22C55E';
        break;

      case 'rain-theme':
        primaryColor = '#1E3A8A';
        break;

      case 'anime-theme':
        primaryColor = '#DC2626';
        break;

      case 'car-theme':
        primaryColor = '#EAB308';
        break;

      default:
        primaryColor = '#00CED1';

    }


    document.documentElement.style.setProperty(
      '--primary-color',
      primaryColor
    );


    gsap.to(
      backgroundVideo,
      {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',

        onComplete: () => {

          const wasMuted =
            backgroundVideo.muted;

          const currentVolume =
            backgroundVideo.volume;


          backgroundVideo.src =
            videoSrc;

          backgroundVideo.loop =
            true;


          /*
           * Preserve video audio settings
           * when changing themes.
           */

          backgroundVideo.muted =
            wasMuted;

          backgroundVideo.volume =
            currentVolume;

          backgroundVideo.load();

          backgroundVideo.play()
            .catch(err => {

              console.error(
                'Failed to play theme video:',
                err
              );

            });


          document.body.classList.remove(
            'home-theme',
            'hacker-theme',
            'rain-theme',
            'anime-theme',
            'car-theme'
          );


          document.body.classList.add(
            themeClass
          );


          hackerOverlay.classList.add(
            'hidden'
          );

          snowOverlay.classList.add(
            'hidden'
          );


          profileBlock.style.zIndex =
            overlayOverProfile
              ? 10
              : 20;


          if (overlay) {

            overlay.classList.remove(
              'hidden'
            );

          }


          if (
            themeClass ===
            'hacker-theme'
          ) {

            resultsButtonContainer.classList.remove(
              'hidden'
            );

          } else {

            resultsButtonContainer.classList.add(
              'hidden'
            );

            profileBlock.classList.remove(
              'hidden'
            );

            gsap.to(
              profileBlock,
              {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
              }
            );

          }


          gsap.to(
            backgroundVideo,
            {
              opacity: 1,
              duration: 0.5,
              ease: 'power2.out',

              onComplete: () => {

                profileContainer.classList.remove(
                  'fast-orbit'
                );

                profileContainer.classList.remove(
                  'orbit'
                );

                void profileContainer.offsetWidth;

                profileContainer.classList.add(
                  'orbit'
                );

                updateVideoUI();

              }

            }
          );

        }

      }
    );

  }


  /* =========================
     THEME BUTTONS
  ========================= */

  homeButton.addEventListener(
    'click',
    () => {

      switchTheme(
        'assets/background.mp4',
        'home-theme'
      );

    }
  );


  hackerButton.addEventListener(
    'click',
    () => {

      switchTheme(
        'assets/hacker_background.mp4',
        'hacker-theme',
        hackerOverlay,
        false
      );

    }
  );


  rainButton.addEventListener(
    'click',
    () => {

      switchTheme(
        'assets/rain_background.mov',
        'rain-theme',
        snowOverlay,
        true
      );

    }
  );


  animeButton.addEventListener(
    'click',
    () => {

      switchTheme(
        'assets/anime_background.mp4',
        'anime-theme'
      );

    }
  );


  carButton.addEventListener(
    'click',
    () => {

      switchTheme(
        'assets/car_background.mp4',
        'car-theme'
      );

    }
  );


  /* =========================
     PROFILE TILT
  ========================= */

  function handleTilt(
    e,
    element
  ) {

    const rect =
      element.getBoundingClientRect();

    const centerX =
      rect.left +
      rect.width / 2;

    const centerY =
      rect.top +
      rect.height / 2;


    const mouseX =
      e.clientX - centerX;

    const mouseY =
      e.clientY - centerY;

    const maxTilt = 15;

    const tiltX =
      (mouseY / rect.height) *
      maxTilt;

    const tiltY =
      -(mouseX / rect.width) *
      maxTilt;


    gsap.to(
      element,
      {
        rotationX: tiltX,
        rotationY: tiltY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      }
    );

  }


  profileBlock.addEventListener(
    'mousemove',
    e => {

      handleTilt(
        e,
        profileBlock
      );

    }
  );


  profileBlock.addEventListener(
    'mouseleave',
    () => {

      gsap.to(
        profileBlock,
        {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: 'power2.out'
        }
      );

    }
  );


  /* =========================
     PROFILE IMAGE
  ========================= */

  profilePicture.addEventListener(
    'mouseenter',
    () => {

      glitchOverlay.style.opacity =
        '1';

      setTimeout(
        () => {

          glitchOverlay.style.opacity =
            '0';

        },
        500
      );

    }
  );


  function profileOrbit() {

    profileContainer.classList.remove(
      'fast-orbit'
    );

    profileContainer.classList.remove(
      'orbit'
    );

    void profileContainer.offsetWidth;

    profileContainer.classList.add(
      'fast-orbit'
    );


    setTimeout(
      () => {

        profileContainer.classList.remove(
          'fast-orbit'
        );

        void profileContainer.offsetWidth;

        profileContainer.classList.add(
          'orbit'
        );

      },
      500
    );

  }


  profilePicture.addEventListener(
    'click',
    profileOrbit
  );


  profilePicture.addEventListener(
    'touchstart',
    e => {

      e.preventDefault();

      profileOrbit();

    }
  );


  /* =========================
     FINAL INITIALIZATION
  ========================= */

  typeWriterStart();

});
