let timer;
let currentStation = 1;
const totalStations = 12;
let currentGroup = '';

// Start Group Function
function startGroup(group) {
    currentGroup = group;
    document.getElementById('homePage').classList.remove('active');
    generateStations(group);
    document.getElementById(`${group}_station1`).classList.add('active');
    startTimer(group);
}

// Generate Stations for Each Group (A-E)
function generateStations(group) {
    const stationContainer = document.getElementById('stationContainer');
    stationContainer.innerHTML = ''; // Clear previous stations if any

    for (let i = 1; i <= totalStations; i++) {
        const stationDiv = document.createElement('div');
        stationDiv.id = `${group}_station${i}`;
        stationDiv.classList.add('station', `station${i}`);
        stationDiv.innerHTML = `
            <h2>Station ${i} - Group ${group}</h2>
            <div class="timer" id="timerDisplay${i}">Time: 6:00</div>
            <p>${i === 1 ? `
                <strong>QUESTIONS:</strong><br>
                1) What is cubital fossa?<br>
                2) What is femur?<br>
                3) What is Volkman canal?<br>
                4) What is the nerve supply of serratus anterior?<br>
                5) What is brachial plexus?
            ` : (i === 2 ? `
                <img src="https://imgur.com/A3aMoCM.jpg" alt="Identify the marked labels">
                <p>Identify the marked labels in the image above.</p>
            ` : `Station ${i}`)}</p>
            <button onclick="skipStation('${group}')">${i === totalStations ? 'Finish' : 'Skip'}</button>
        `;
        stationContainer.appendChild(stationDiv);
    }
}

// Start Timer for Each Station
function startTimer(group) {
    let seconds = 360; // 6 minutes timer
    clearInterval(timer);
    timer = setInterval(() => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        document.getElementById(`timerDisplay${currentStation}`).innerHTML = `Time: ${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        seconds--;

        if (seconds < 0) {
            changeStation(group);
        }
    }, 1000);
}

// Change to Next Station After 6 Minutes
function changeStation(group) {
    const currentDiv = document.getElementById(`${group}_station${currentStation}`);
    if (currentDiv) currentDiv.classList.remove('active');

    currentStation++;
    if (currentStation <= totalStations) {
        document.getElementById(`${group}_station${currentStation}`).classList.add('active');
        startTimer(group);
        playBell();
    } else {
        endViva();
    }
}

// Skip Current Station and Go to the Next One
function skipStation(group) {
    changeStation(group);
}

// Play Bell Sound After Each Station Change
function playBell() {
    const bell = new Audio("https://www.soundjay.com/button/beep-07.mp3");
    bell.play();
}

// End the Viva and Go Back to Home Page
function endViva() {
    clearInterval(timer);
    currentStation = 1;
    document.getElementById('homePage').classList.add('active');
    document.getElementById('stationContainer').innerHTML = ''; // Clear all stations
}
