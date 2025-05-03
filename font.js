let bodyElem = document.getElementById("body")
let fontBtn = document.getElementById("font-btn")
let pixelFontBoolean = false

fontBtn.addEventListener("click", function() {
    if (pixelFontBoolean) {
        bodyElem.classList.remove("pixel-font")
        bodyElem.classList.add("rubik-font")
        pixelFontBoolean = false
    } else {
        bodyElem.classList.remove("rubik-font")
        bodyElem.classList.add("pixel-font")
        pixelFontBoolean = true
    }
})