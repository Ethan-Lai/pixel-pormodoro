let statsContainer = document.getElementById("stats-container")
let displayStatsBtn = document.getElementById("display-stats-btn")
let displayStatsBoolean = true

var timeStudied = document.getElementById("time-studied")
var timeOnBreak = document.getElementById("time-on-break")
var timeProcrastinated = document.getElementById("time-procrastinated")
var timeEfficiency = document.getElementById("time-efficiency")

var pauseSessionBtn = document.getElementById("pause-session-btn")
var stopSessionBtn = document.getElementById("stop-session-btn")

var sessionActive = false

let statsTimer
let timeStudiedValue = 0
let timeOnBreakValue = 0
let timeProcrastinatedValue = 0

timeStudied.textContent = displayStatsTime(timeStudiedValue)
timeOnBreak.textContent = displayStatsTime(timeOnBreakValue)
timeProcrastinated.textContent = displayStatsTime(timeProcrastinatedValue)
timeEfficiency.textContent = calculateEfficiency(timeStudiedValue, timeOnBreakValue, timeProcrastinatedValue)

displayStatsBtn.addEventListener("click", function() {
    if (displayStatsBoolean) {
        statsContainer.style.display = "none"
        displayStatsBoolean = false
    } else {
        statsContainer.style.display = "flex"
        displayStatsBoolean = true
    }
})

pauseSessionBtn.addEventListener("click", function() {
    // Session not active, want to start
    if (sessionActive) {
        clearInterval(statsTimer)
        clearInterval(timer)
        sessionActive = false
        isPaused = true
        startPauseBtn.textContent = "Start"
    }
})

stopSessionBtn.addEventListener("click", function() {
    clearInterval(statsTimer)
    stopTime()
    sessionActive = false
    timeStudiedValue = 0
    timeOnBreakValue = 0
    timeProcrastinatedValue = 0
    
    timeStudied.textContent = displayStatsTime(timeStudiedValue)
    timeOnBreak.textContent = displayStatsTime(timeOnBreakValue)
    timeProcrastinated.textContent = displayStatsTime(timeProcrastinatedValue)
    timeEfficiency.textContent = calculateEfficiency(timeStudiedValue, timeOnBreakValue, timeProcrastinatedValue)
})

function displayStatsTime(seconds) {
    let hours = Math.floor(seconds / 3600)
    let minutes = Math.floor((seconds % 3600) / 60)
    let displaySeconds = seconds % 60

    if (hours > 0) {
        return`${String(hours)}h:${String(minutes).padStart(2, "0")}m`
    } else if (minutes > 0 ) {
        return`${String(minutes)}m ${String(displaySeconds)}s`
    } else {
        return `${String(displaySeconds)}s`
    }
}

function calculateEfficiency(timeStudied, timeOnBreak, timeProcrastinated) {
    let pomodoroTime = timeStudied + timeOnBreak;
    let totalTime = pomodoroTime + timeProcrastinated;
    
    if (totalTime === 0) {
        return "100%"
    }
    
    let efficiency = Math.floor((pomodoroTime / totalTime) * 100)
    return `${efficiency}%`
}

function updateStatsTimers() {
    statsTimer = setInterval(() => {
        if (sessionActive && isPaused === false) {
            if (String(timeType) === "Pomodoro") {
                timeStudiedValue++
            } else if (String(timeType) === "Short Break" || String(timeType) === "Long Break") {
                timeOnBreakValue++
            }
        } else if (sessionActive && isPaused) {
            timeProcrastinatedValue++
        }

        timeStudied.textContent = displayStatsTime(timeStudiedValue)
        timeOnBreak.textContent = displayStatsTime(timeOnBreakValue)
        timeProcrastinated.textContent = displayStatsTime(timeProcrastinatedValue)
        timeEfficiency.textContent = calculateEfficiency(timeStudiedValue, timeOnBreakValue, timeProcrastinatedValue)
    }, 1000)
}