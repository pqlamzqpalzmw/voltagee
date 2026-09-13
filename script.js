let hasUserInteracted = false;

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
   * VIDEO STARTS MUTED
   * This allows autoplay to work reliably.
   */
  backgroundVideo.muted = true;
  backgroundVideo.volume = 0.5;

  backgroundVideo.play().catch(err => {
    console.log(
      'Background video waiting for user interaction:',
      err
    );
  });

  /*
   * MUSIC STARTS PAUSED
   */
  if (musicPlayer) {
    musicPlayer.volume = 0.5;
    musicPlayer.pause();
  }
}


document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     ELEMENTS
  ========================= */

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

  const resumeBlock =
    document.getElementById('resume-block');

  const profilePicture =
    document.querySelector('.profile-picture');

  const profileContainer =
    document.querySelector('.profile-container');

  const socialIcons =
    document.querySelectorAll('.social-icon');

  const badges =
    document.querySelectorAll('.badge');

  const glitchOverlay =
    document.querySelector('.glitch-overlay');

  const hackerOverlay =
    document.getElementById('hacker-overlay');

  const snowOverlay =
    document.getElementById('snow-overlay');

  const resultsButtonContainer =
    document.getElementById('results-button-container');

  const resultsButton =
    document.getElementById('results-theme');

  const resultsHint =
    document.getElementById('results-hint');


  /* =========================
     MEDIA CONTROLS
  ========================= */

  const musicToggle =
    document.getElementById('music-toggle');

  const musicVolume =
    document.getElementById('music-volume');

  const musicStatus =
    document.getElementById('music-status');

  const videoMute =
    document.getElementById('video-mute');

  const videoVolume =
    document.getElementById('video-volume');

  const videoStatus =
    document.getElementById('video-status');


  /*
   * MUSIC
   */

  musicPlayer.volume =
    parseFloat(musicVolume.value);

  function updateMusicUI() {

    if (musicPlayer.paused) {

      musicToggle.textContent = '▶';

    } else {

      musicToggle.textContent = 'Ⅱ';

    }

    musicStatus.textContent =
      Math.round(musicPlayer.volume * 100) + '%';
  }


  musicToggle.addEventListener('click', () => {

    hasUserInteracted = true;

    if (musicPlayer.paused) {

      musicPlayer.play().catch(err => {

        console.error(
          'Could not start music:',
          err
        );

      });

    } else {

      musicPlayer.pause();

    }

    updateMusicUI();
  });


  musicVolume.addEventListener('input', () => {

    const volume =
      parseFloat(musicVolume.value);

    musicPlayer.volume = volume;

    musicStatus.textContent =
      Math.round(volume * 100) + '%';

  });


  musicPlayer.addEventListener(
    'play',
    updateMusicUI
  );

  musicPlayer.addEventListener(
    'pause',
    updateMusicUI
  );


  /*
   * VIDEO MUTE
   */

  videoMute.addEventListener('click', () => {

    hasUserInteracted = true;

    backgroundVideo.muted =
      !backgroundVideo.muted;

    updateVideoUI();

    /*
     * If video was muted and is now unmuted,
     * make sure the video is playing.
     */
    if (!backgroundVideo.muted) {

      backgroundVideo.play().catch(err => {

        console.error(
          'Could not play video:',
          err
        );

      });

    }

  });


  /*
   * VIDEO VOLUME
   */

  videoVolume.addEventListener('input', () => {

    const volume =
      parseFloat(videoVolume.value);

    backgroundVideo.volume = volume;

    /*
     * Setting volume above zero should
     * automatically unmute the video.
     */
    if (volume > 0) {

      backgroundVideo.muted = false;

    } else {

      backgroundVideo.muted = true;

    }

    updateVideoUI();

  });


  function updateVideoUI() {

    if (
      backgroundVideo.muted ||
      backgroundVideo.volume === 0
    ) {

      videoMute.textContent = '🔇';

    } else {

      videoMute.textContent = '🔊';

    }

    videoStatus.textContent =
      Math.round(
        backgroundVideo.volume * 100
      ) + '%';
  }


  /*
   * INITIAL MEDIA UI
   */

  backgroundVideo.volume =
    parseFloat(videoVolume.value);

  /*
   * Keep autoplay muted.
   * User can click the speaker to enable it.
   */
  backgroundVideo.muted = true;

  updateMusicUI();
  updateVideoUI();


  /* =========================
     CURSOR
  ========================= */

  const cursor =
    document.querySelector('.custom-cursor');

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
      (e) => {

        const touch = e.touches[0];

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
      (e) => {

        const touch = e.touches[0];

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
      (e) => {

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


  setInterval(() => {

    startCursorVisible =
      !startCursorVisible;

    startText.textContent =
      startTextContent +
      (
        startCursorVisible
          ? '|'
          : ' '
      );

  }, 500);


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
        parseInt(totalVisitors);

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


    visitorCount.textContent =
      totalVisitors.toLocaleString();

  }


  initializeVisitorCounter();


  /* =========================
     ENTER SITE
  ========================= */

  function enterSite() {

    hasUserInteracted = true;

    startScreen.classList.add(
      'hidden'
    );

    /*
     * Video stays muted when entering.
     * User can manually unmute it.
     */
    backgroundVideo.muted = true;

    backgroundVideo.volume =
      parseFloat(videoVolume.value);

    backgroundVideo.loop = true;

    backgroundVideo.play().catch(
      err => {
        console.error(
          'Failed to play video:',
          err
        );
      }
    );


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
        ease: 'power2.out',

        onComplete: () => {

          profileContainer.classList.add(
            'orbit'
          );

        }
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
    (e) => {

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


  function typeWriterName() {

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

      isNameDeleting = true;

      setTimeout(
        typeWriterName,
        10000
      );

      return;

    }

    else if (
      nameIndex === 0
    ) {

      isNameDeleting = false;

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

      setTimeout(() => {

        profileName.classList.remove(
          'glitch'
        );

      }, 200);

    }


    setTimeout(
      typeWriterName,
      isNameDeleting
        ? 150
        : 300
    );

  }


  setInterval(() => {

    nameCursorVisible =
      !nameCursorVisible;

    profileName.textContent =
      nameText +
      (
        nameCursorVisible
          ? '|'
          : ' '
      );

  }, 500);


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


  function typeWriterBio() {

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

      isBioDeleting = true;

      setTimeout(
        typeWriterBio,
        2000
      );

      return;

    }

    else if (
      bioIndex === 0 &&
      isBioDeleting
    ) {

      isBioDeleting = false;

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

      setTimeout(() => {

        profileBio.classList.remove(
          'glitch'
        );

      }, 200);

    }


    setTimeout(
      typeWriterBio,
      isBioDeleting
        ? 75
        : 150
    );

  }


  setInterval(() => {

    bioCursorVisible =
      !bioCursorVisible;

    profileBio.textContent =
      bioText +
      (
        bioCursorVisible
          ? '|'
          : ' '
      );

  }, 500);


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

          /*
           * Save the user's current
           * video audio settings.
           */
          const wasMuted =
            backgroundVideo.muted;

          const currentVolume =
            backgroundVideo.volume;


          backgroundVideo.src =
            videoSrc;

          backgroundVideo.loop =
            true;


          /*
           * IMPORTANT:
           * Do NOT force unmute here.
           * Theme changes preserve
           * the user's mute state.
           */
          backgroundVideo.muted =
            wasMuted;

          backgroundVideo.volume =
            currentVolume;


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

          }

          else {

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


    let clientX;
    let clientY;


    if (
      e.type ===
      'touchmove'
    ) {

      clientX =
        e.touches[0].clientX;

      clientY =
        e.touches[0].clientY;

    }

    else {

      clientX =
        e.clientX;

      clientY =
        e.clientY;

    }


    const mouseX =
      clientX - centerX;

    const mouseY =
      clientY - centerY;


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
    (e) => {

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

      setTimeout(() => {

        glitchOverlay.style.opacity =
          '0';

      }, 500);

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


    setTimeout(() => {

      profileContainer.classList.remove(
        'fast-orbit'
      );

      void profileContainer.offsetWidth;

      profileContainer.classList.add(
        'orbit'
      );

    }, 500);

  }


  profilePicture.addEventListener(
    'click',
    profileOrbit
  );


  profilePicture.addEventListener(
    'touchstart',
    (e) => {

      e.preventDefault();

      profileOrbit();

    }
  );


  /* =========================
     RESUME
  ========================= */

  const resumeButton =
    document.getElementById(
      'view-resume-btn'
    );


  resumeButton.addEventListener(
    'click',
    () => {

      /*
       * Resume is handled by the
       * existing inline button,
       * so no extra functionality
       * is needed here.
       */

    }
  );


  /* =========================
     FINAL INITIALIZATION
  ========================= */

  typeWriterStart();

});
