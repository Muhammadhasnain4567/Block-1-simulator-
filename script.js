document.addEventListener("DOMContentLoaded", () => {
    const stationContainer = document.getElementById("stationContainer");
    const bellSound = document.getElementById("bellSound");
    const stationCount = 12;

    // Generate stations dynamically
    for (let i = 1; i <= stationCount; i++) {
        const station = document.createElement("div");
        station.classList.add("station");
        station.innerHTML = `
            <h2>Station ${i}</h2>
            <div class="station-content" contenteditable="true">
                Add your content here...
            </div>
            <input type="file" accept="image/*" onchange="handleImageUpload(event, ${i})">
            <img id="stationImg${i}" style="display:none;">
            <div class="timer" id="timer${i}">06:00</div>
        `;
        stationContainer.appendChild(station);
    }
});

// Timer management
let timers = [];
let currentStation = 0;
const initialTime = 6 * 60; // 6 minutes in seconds

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function startSequentialTimers() {
    currentStation = 0;
    startTimerForStation(currentStation);
}

function startTimerForStation(index) {
    if (index >= 12) return; // Stop if all stations are done

    const timerElement = document.getElementById(`timer${index + 1}`);
    timers[index] = {
        timeLeft: initialTime,
        interval: setInterval(() => {
            timers[index].timeLeft--;
            timerElement.textContent = formatTime(timers[index].timeLeft);
            if (timers[index].timeLeft <= 0) {
                clearInterval(timers[index].interval);
                bellSound.play();
                timerElement.textContent = "Time's Up!";
                startTimerForStation(index + 1); // Move to the next station
            }
        }, 1000),
    };
}

function resetAllTimers() {
    timers.forEach((timer) => clearInterval(timer?.interval));
    timers = [];
    for (let i = 1; i <= 12; i++) {
        document.getElementById(`timer${i}`).textContent = "06:00";
    }
}

// Handle Image Upload
function handleImageUpload(event, stationId) {
    const file = event.target.files[0];
    const imgElement = document.getElementById(`stationImg${stationId}`);
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            imgElement.src = e.target.result;
            imgElement.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        imgElement.style.display = 'none';
    }
}
