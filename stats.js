let statsContainer = document.getElementById("stats-container")
let displayStatsBtn = document.getElementById("display-stats-btn")
let displayStatsBoolean = true

displayStatsBtn.addEventListener("click", function() {
    if (displayStatsBoolean) {
        statsContainer.style.display = "none"
        displayStatsBoolean = false
    } else {
        statsContainer.style.display = "flex"
        displayStatsBoolean = true
    }
})