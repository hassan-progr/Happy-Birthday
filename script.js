
  const SECRET_PASSWORD = "AyeshaKela"; // CHANGE THIS

  function unlock() {
    const input = document.getElementById("passwordInput").value;
    const error = document.getElementById("errorText");

    if (input === SECRET_PASSWORD) {
      document.getElementById("lockScreen").style.display = "none";
    } else {
      error.innerText = "❌ Wrong password, try again";
    }
  }



// Background Music - YOUR UPLOADED FILE
let bgMusic = new Audio('Isabel_LaRosa_-_Baby_i_m_yours_(mp3.pm).mp3');
bgMusic.loop = true;
bgMusic.volume = 0.6;

let musicPlaying = false;
const musicToggle = document.getElementById('musicToggle');

musicToggle.addEventListener('click', () => {
    if (musicPlaying) {
        bgMusic.pause();
        musicToggle.textContent = '🔇 Music OFF';
        musicPlaying = false;
    } else {
        bgMusic.play()
            .then(() => {
                musicToggle.textContent = '🎵 Music ON';
                musicPlaying = true;
            })
            .catch(e => {
                console.log('Music play error:', e);
                musicToggle.textContent = '❌ Click to Play';
            });
    }
});

// Sound effects using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(frequency, duration) {
    try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch(e) {
        console.log('Sound effect error:', e);
    }
}

function playHappySound() {
    playBeep(523.25, 0.2);
    setTimeout(() => playBeep(659.25, 0.2), 150);
    setTimeout(() => playBeep(783.99, 0.3), 300);
}

function playSadSound() {
    playBeep(392, 0.2);
    setTimeout(() => playBeep(349.23, 0.3), 150);
}

function playCelebration() {
    const notes = [523.25, 587.33, 659.25, 698.46, 783.99, 880, 987.77, 1046.50];
    notes.forEach((note, i) => {
        setTimeout(() => playBeep(note, 0.15), i * 100);
    });
}

window.onload = () => {
  const screen1 = document.getElementById('screen1');
  const screen2 = document.getElementById('screen2');
  const screen3 = document.getElementById('screen3');
  const screen4 = document.getElementById('screen4');
  const screenCake = document.getElementById('screenCake');
  const screenLetter = document.getElementById('screenLetter');
//   const screenQR = document.getElementById('screenQR');
//   const continueBtn = document.getElementById('continueBtn');
  const toLetter = document.getElementById('toLetter');
  const startBtn = document.getElementById('startBtn');
  const yesBtn = document.getElementById('yesBtn');
  const yesBtn2 = document.getElementById('yesBtn2');
  const noBtn = document.getElementById('noBtn');
  const runNo = document.getElementById('runNo');
  const toCake = document.getElementById('toCake');
  const cakeDiv = document.getElementById('cakeDiv');
  const cakeMessage = document.getElementById('cakeMessage');

  const noLines = [
    "You can't say no! 😏",
    "Click YES! 😤",
    "Catch me if you can! 😂",
    "Say yes already! 😜",
    "Nice try! 😎",
    "Give up! 🤣"
  ];

// Generate QR Code on page load
// const currentURL = window.location.href;
// new QRCode(document.getElementById("qrcode"), {
//   text: currentURL,
//   width: 200,
//   height: 200,
//   colorDark: "#ff1744",
//   colorLight: "#ffffff",
//   correctLevel: QRCode.CorrectLevel.H
// });

// Show QR screen first
// screen1.classList.add('hidden');
// screenQR.classList.remove('hidden');

// Continue from QR to Start
// continueBtn.addEventListener('click', () => {
//   screenQR.classList.add('hidden');
//   screen1.classList.remove('hidden');
// });

  // START
  startBtn.addEventListener('click', () => {
    // playHappySound();..............................
    
    // Auto-start music
    bgMusic.play()
        .then(() => {
            musicToggle.textContent = '🎵 Music ON';
            musicPlaying = true;
        })
        .catch(e => {
            console.log('Autoplay prevented - click music button');
            musicToggle.textContent = '🎵 Click to Play Music';
        });
    
    screen1.classList.add('hidden');
    screen2.classList.remove('hidden');
  });

  // YES BUTTONS
  yesBtn.addEventListener('click', () => {
    // playHappySound();............................
    screen2.classList.add('hidden');
    screen3.classList.add('hidden');
    screen4.classList.remove('hidden');
    createFloatingHearts();
  });

  yesBtn2.addEventListener('click', () => {
    // playHappySound();..............................
    screen2.classList.add('hidden');
    screen3.classList.add('hidden');
    screen4.classList.remove('hidden');
    createFloatingHearts();
  });

  // NO BUTTON
  noBtn.addEventListener('click', () => {
    // playSadSound();............................
    screen2.classList.add('hidden');
    screen3.classList.remove('hidden');
  });
  
  // RUNNING NO BUTTON
  function moveNo() {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 200 - 100;
    runNo.style.transform = `translate(${x}px, ${y}px)`;
    runNo.innerText = noLines[Math.floor(Math.random() * noLines.length)];
    // playSadSound();................................
  }

  runNo.addEventListener('mouseenter', moveNo);
  runNo.addEventListener('click', moveNo);

  // GALLERY -> CAKE
  toCake.addEventListener('click', () => {
    // playHappySound();.............................
    screen4.classList.add('hidden');
    screenCake.classList.remove('hidden');
  });

  // CAKE CLICK + CONFETTI
  // CAKE CLICK + CONFETTI
let cakeCut = false;
cakeDiv.addEventListener('click', () => {
  if (!cakeCut) {
    const img = cakeDiv.querySelector('img');
    if (img) {
      img.src = 'https://media1.tenor.com/m/NjiqSwYzh68AAAAC/birthday-happy-birthday.gif';
      img.onerror = function() {
        this.style.display='none';
        cakeDiv.innerHTML = '🎉';
      };
    } else {
      cakeDiv.innerHTML = '🎉';
    }
    cakeMessage.textContent = '🎊 Happy Birthday! 🎊';
    playCelebration();
    launchConfetti();
    createFloatingHearts();
    
    // Show the letter button after 2 seconds
    setTimeout(() => {
      toLetter.classList.remove('hidden');
    }, 2000);
    
    cakeCut = true;
  }
});

// LETTER BUTTON
toLetter.addEventListener('click', () => {
  screenCake.classList.add('hidden');
  screenLetter.classList.remove('hidden');
  createFloatingHearts();
});

const screenEnd = document.getElementById('screenEnd');
const finalBtn = document.getElementById('finalBtn');

// FINAL BUTTON
finalBtn.addEventListener('click', () => {
  screenLetter.classList.add('hidden');
  screenEnd.classList.remove('hidden');
  createFloatingHearts();
  launchConfetti();
});
  // CONFETTI FUNCTION
  function launchConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ff8800', '#ff0088', '#88ff00', '#0088ff'];
    for (let i = 0; i < 200; i++) {
      setTimeout(() => {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-20px';
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
      }, i * 15);
    }
  }

  // FLOATING HEARTS
  function createFloatingHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💗', '💘', '💝'];
    for (let i = 0; i < 30; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.classList.add('hearts');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.bottom = '-50px';
        heart.style.animationDuration = (Math.random() * 2 + 4) + 's';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 6000);
      }, i * 100);
    }
  }
};