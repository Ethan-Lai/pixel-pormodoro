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
var titleDisplay = document.getElementById("browser-title")

titleDisplay.textContent = displayTimeTitle()

let musicBtn = document.getElementById("music-audio")
let rainBtn = document.getElementById("rain-audio")
let musicBoolean = false
let rainBoolean = false

var timeDoneAudio = new Audio("./audio/minecraft_xp.mp3")
var musicAudio = new Audio("./audio/persona_5_beneath_the_mask.mp3")
var rainAudio = new Audio("./audio/rain_noises.mp3")

var musicVolumeBtn = document.getElementById("music-volume")
var rainVolumeBtn = document.getElementById("rain-volume")

musicAudio.volume = musicVolumeBtn.value
rainAudio.volume = rainVolumeBtn.value

//NOTE: Update BTNs & TIMEs later to create more DRY approach
pomodoroBtn.addEventListener("click", function() {
    minutes = pomodoroTime.value
    timeDisplay.textContent = displayTime()
    titleDisplay.textContent = displayTimeTitle()
    timeType = pomodoroBtn.textContent
    stopTime()
})

pomodoroTime.addEventListener("change", function() {
    if (pomodoroTime.value < 1) {
        pomodoroTime.value = 1
        minutes = pomodoroTime.value
    } else if (pomodoroTime.value > 60) {
        pomodoroTime.value = 60
        minutes = pomodoroTime.value
    } else {
        minutes = pomodoroTime.value
    }
    timeDisplay.textContent = displayTime()
    titleDisplay.textContent = displayTimeTitle()
    userPomodoroTime = minutes
    stopTime()
})

shortBreakBtn.addEventListener("click", function() {
    minutes = shortBreakTime.value
    timeDisplay.textContent = displayTime()
    titleDisplay.textContent = displayTimeTitle()
    timeType = shortBreakBtn.textContent
    stopTime()
})

shortBreakTime.addEventListener("change", function() {
    if (shortBreakTime.value < 1) {
        shortBreakTime.value = 1
        minutes = shortBreakTime.value
    } else if (shortBreakTime.value > 60) {
        shortBreakTime.value = 60
        minutes = shortBreakTime.value
    } else {
        minutes = shortBreakTime.value
    }
    timeDisplay.textContent = displayTime()
    titleDisplay.textContent = displayTimeTitle()
    userShortBreakTime = minutes
    stopTime()
})

longBreakBtn.addEventListener("click", function() {
    minutes = longBreakTime.value
    timeDisplay.textContent = displayTime()
    titleDisplay.textContent = displayTimeTitle()
    timeType = longBreakBtn.textContent
    stopTime()
})

longBreakTime.addEventListener("change", function() {
    if (longBreakTime.value < 1) {
        longBreakTime.value = 1
        minutes = longBreakTime.value
    } else if (longBreakTime.value > 60) {
        longBreakTime.value = 60
        minutes = longBreakTime.value
    } else {
        minutes = longBreakTime.value
    }
    timeDisplay.textContent = displayTime()
    titleDisplay.textContent = displayTimeTitle()
    userLongBreakTime = minutes
    stopTime()
})

// Display time with spaces in between
function displayTime() {
    return `${String(minutes).split("").join(" ")} : ${String(seconds).padStart(2, "0").split("").join(" ")}`
}

function displayTimeTitle() {
    return`${String(minutes)}:${String(seconds).padStart(2, "0")}`
}

startPauseBtn.addEventListener("click", function() {
    if (isPaused) {
        startTimer()
        sessionActive = true
        startPauseBtn.textContent = "Pause"
        isPaused = false
    } else {
        clearInterval(timer)
        startPauseBtn.textContent = "Start"
        isPaused = true
    }
})

function startTimer() {
    if (!sessionActive) {
        updateStatsTimers()
        sessionActive = true
    }
    timer = setInterval(() => {
        if (seconds > 0) {
            seconds--
        } else if (seconds <= 0) {
            minutes--
            seconds = 59
        }

        // Timer reaches 0
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
        titleDisplay.textContent = displayTimeTitle()
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
    titleDisplay.textContent = displayTimeTitle()
    clearInterval(timer)
    isPaused = true
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

musicVolumeBtn.addEventListener("change", function() {
    let volume = musicVolumeBtn.value
    musicAudio.volume = volume
})

rainVolumeBtn.addEventListener("change", function() {
    let volume = rainVolumeBtn.value
    rainAudio.volume = volume
})