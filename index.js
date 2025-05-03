let pomodoroBtn = document.getElementById("pomodoro-btn")
let shortBreakBtn = document.getElementById("short-break-btn")
let longBreakBtn = document.getElementById("long-break-btn")
let pomodoroTime = document.getElementById("pomodoro-time")
let shortBreakTime = document.getElementById("short-break-time")
let longBreakTime = document.getElementById("long-break-time")

let userPomodoroTime = pomodoroTime.value
let userShortBreakTime = shortBreakTime.value
let userLongBreakTime = longBreakTime.value

let startPauseBtn = document.getElementById("start-btn")
let timer;
let isPaused = true
let timeType = pomodoroBtn.textContent
var minutes = parseInt(pomodoroTime.value)
var seconds = 0
var timeDisplay = document.getElementById("time-display")

//NOTE: Update BTNs & TIMEs later to create more DRY approach
pomodoroBtn.addEventListener("click", function() {
    minutes = pomodoroTime.value
    timeDisplay.textContent = displayTime()
    timeType = pomodoroBtn.textContent
    stopTime()
})

pomodoroTime.addEventListener("change", function() {
    minutes = pomodoroTime.value
    timeDisplay.textContent = displayTime()
    userPomodoroTime = minutes
    stopTime()
})

shortBreakBtn.addEventListener("click", function() {
    minutes = shortBreakTime.value
    timeDisplay.textContent = displayTime()
    timeType = shortBreakBtn.textContent
    stopTime()
})

shortBreakTime.addEventListener("change", function() {
    minutes = shortBreakTime.value
    timeDisplay.textContent = displayTime()
    userShortBreakTime = minutes
    stopTime()
})

longBreakBtn.addEventListener("click", function() {
    minutes = longBreakTime.value
    timeDisplay.textContent = displayTime()
    timeType = longBreakBtn.textContent
    stopTime()
})

longBreakTime.addEventListener("change", function() {
    minutes = longBreakTime.value
    timeDisplay.textContent = displayTime()
    userLongBreakTime = minutes
    stopTime()
})

// Display time with spaces in between
function displayTime() {
    return `${String(minutes).split("").join(" ")} : ${String(seconds).padStart(2, "0").split("").join(" ")}`
}

startPauseBtn.addEventListener("click", function() {
    if (isPaused) {
        clearInterval(timer)
        startPauseBtn.textContent = "Start"
        isPaused = false
    } else {
        startTimer()
        startPauseBtn.textContent = "Pause"
        isPaused = true
    }
})

function startTimer() {
    timer = setInterval(() => {
        if (seconds > 0) {
            seconds--
        } else if (seconds <= 0) {
            minutes--
            seconds = 59
        }

        if (seconds <= 0 && minutes <= 0) {
            if (String(timeType) === "Pomodoro") {
                stopTime()
            } else if (String(timeType) === "Short Break") {
                stopTime()
            } else if (String(timeType) === "Long Break") {
                stopTime()
            }
        }
        timeDisplay.textContent = displayTime()
    }, 1000)
}


function stopTime() {
    seconds = 0
    timeDisplay.textContent = displayTime()
    clearInterval(timer)
    isPaused = false
    startPauseBtn.textContent = "Start"
}