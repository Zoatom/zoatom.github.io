let mode = localStorage.getItem("theme")
if (mode == null) {
    darkMode.call()
}else{
    switch(mode){
        case "dark": darkMode.call(); break
        case "light": lightMode.call(); break
        case "super dark": superDarkMode.call(); break
    }
}
let offset
let offsetLock = true
clear.call()

let loading = true

animationSpeed = Number(localStorage.getItem("animation speed"))
if(animationSpeed == null) animationSpeed = 1
lineSpacing = Number(localStorage.getItem("line spacing"))
if(lineSpacing == null) lineSpacing = 1.2


let lineCount = 0
function onupdate(){
    canvas.clear()
    let lowerBorder = lineCount - (maxWidth / fontSize / lineSpacing) + 2
    if (offset > lowerBorder){
        offset = lowerBorder
        offsetLock = true
    }
    fontSize = canvas.size / 32
    maxWidth = canvas.size - margin * 2

    if(offsetLock) offset = lowerBorder
    offset = Math.max(offset, 0)
    ctx.translate(margin, margin -Math.floor(offset) * fontSize * lineSpacing)
    text.maxLength += animationSpeed * (60 * deltaTime)
    text.maxLength = Math.min(text.getTotalLength(), text.maxLength)
    text.maxLength = Math.max(0, text.maxLength)
    lineCount = text.render(lineCount)
    inputLine.render(lineCount)
    inputLine.animate()

    // startup
    let fonts = [...document.fonts.values()]
    if (fonts.length > 0 && loading){
        loading = false
        printTitle.call()
        writeText('Type "help" to get a list of valid commands')
    }
}

document.onwheel = function(wheel){
    offset += wheel.deltaY / (fontSize * lineSpacing)
    if (wheel.deltaY < 0) offsetLock = false
}