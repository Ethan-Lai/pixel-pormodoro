let pomodoroBtn = document.getElementById("pomodoro-btn")
let shortBreakBtn = document.getElementById("short-break-btn")
let longBreakBtn = document.getElementById("long-break-btn")
let pomodoroTime = document.getElementById("pomodoro-time")
let shortBreakTime = document.getElementById("short-break-time")
let longBreakTime = document.getElementById("long-break-time")

var minutes = pomodoroTime.value
var seconds = "00"
var timeDisplay = document.getElementById("time-display")

//NOTE: Update BTNs & TIMEs later to create more DRY approach
pomodoroBtn.addEventListener("click", function() {
    minutes = pomodoroTime.value
    timeDisplay.textContent = displayTime()
})

pomodoroTime.addEventListener("change", function() {
    minutes = pomodoroTime.value
    timeDisplay.textContent = displayTime()
})

shortBreakBtn.addEventListener("click", function() {
    minutes = shortBreakTime.value
    timeDisplay.textContent = displayTime()
})

shortBreakTime.addEventListener("change", function() {
    minutes = shortBreakTime.value
    timeDisplay.textContent = displayTime()
})

longBreakBtn.addEventListener("click", function() {
    minutes = longBreakTime.value
    timeDisplay.textContent = displayTime()
})

longBreakTime.addEventListener("change", function() {
    minutes = longBreakTime.value
    timeDisplay.textContent = displayTime()
})

function displayTime() {
    let timeString = ""

    // Space out minutes
    for (let i = 0; i < minutes.length; i++) {
        timeString += minutes[i] + " "
    }
    timeString += ": "

    // Space out seconds
    for (let i = 0; i < seconds.length; i++) {
        timeString += seconds[i] + " "
    }

    return timeString
}