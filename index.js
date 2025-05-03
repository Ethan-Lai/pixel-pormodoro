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

let musicBtn = document.getElementById("music-audio")
let rainBtn = document.getElementById("rain-audio")
let musicBoolean = false
let rainBoolean = false

var timeDoneAudio = new Audio("./audio/minecraft_xp.mp3")
var musicAudio = new Audio("./audio/persona_5_beneath_the_mask.mp3")
var rainAudio = new Audio("./audio/rain_noises.mp3")

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
            seconds = 2
        }

        if (seconds <= 0 && minutes <= 0) {
            if (String(timeType) === "Pomodoro") {
                stopTime()
                timeDoneAudio.play()
            } else if (String(timeType) === "Short Break") {
                stopTime()
                timeDoneAudio.play()
            } else if (String(timeType) === "Long Break") {
                stopTime()
                timeDoneAudio.play()
            }
        }
        timeDisplay.textContent = displayTime()
    }, 1000)
}


function stopTime() {
    if (String(timeType) === "Pomodoro") {
        minutes = userPomodoroTime
    } else if (String(timeType) === "Short Break") {
        minutes = userShortBreakTime
    } else if (String(timeType) === "Long Break") {
        minutes = userLongBreakTime
    }
    seconds = 0
    timeDisplay.textContent = displayTime()
    clearInterval(timer)
    isPaused = false
    startPauseBtn.textContent = "Start"
}

musicBtn.addEventListener("click", function() {
    if (musicBoolean) {
        musicAudio.pause()
        musicAudio.currentTime = 0
        musicBoolean = false
    } else {
        musicAudio.play()
        musicBoolean = true
    }
})

rainBtn.addEventListener("click", function() {
    if (rainBoolean) {
        rainAudio.pause()
        rainAudio.currentTime = 0
        rainBoolean = false
    } else {
        rainAudio.play()
        rainBoolean = true
    }
})

musicAudio.addEventListener("ended", function() {
    musicAudio.play()
})

rainAudio.addEventListener("ended", function() {
    rainAudio.play()
})