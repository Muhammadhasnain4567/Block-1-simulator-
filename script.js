let currentStation = 0;
let timer;
const stations = document.querySelectorAll('.station');

function startViva() {
  document.querySelector('button').style.display = 'none';
  startStation(0);
}

function startStation(stationIndex) {
  if (stationIndex < stations.length) {
    stations[currentStation]?.classList.remove('active');
    currentStation = stationIndex;
    stations[currentStation].classList.add('active');
    startTimer();
  }
}

function startTimer() {
  let timeLeft = 360; // 6 minutes in seconds
  document.getElementById('timer').innerHTML = `Time Left: 6:00`;
  clearInterval(timer);
  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('timer').innerHTML = `Time Left: ${minutes}:${seconds}`;
    if (timeLeft === 0) {
      clearInterval(timer);
      playBell();
      startStation(currentStation + 1);
    }
    timeLeft--;
  }, 1000);
}

function skipStation(index) {
  if (index - 1 === currentStation) {
    clearInterval(timer);
    playBell();
    startStation(index);
  }
}

function playBell() {
  const audio = new Audio('https://www.soundjay.com/button/beep-07.wav'); // Sample bell sound URL
  audio.play();
}
