function onupdate(){}
let time = 0
let previousTime = 0
let deltaTime = 1/60
function frame(currentTime){
    requestAnimationFrame(frame)
    !currentTime? currentTime = 0:
    time = currentTime / 1000
    deltaTime = time - previousTime
    previousTime = time

    onupdate()
}
frame()

function loadFont(name, path) {
    // create a new font
    let newFont = new FontFace(name, "url('" + path + "')")
    // load the font, then add it to the document
    newFont.load().then(function (font) {
        document.fonts.add(font)
    })
}
loadFont("pixelFont", "terminal/04b03extraModed.ttf")

class Color{
    constructor(hex){
        this.hex = hex
    }
}

const colors = {
    black: new Color("black"),
    darkBlue: new Color("#1d2b53"),
    darkPurple: new Color("#7e2553"),
    darkGreen: new Color("#008751"),
    brown: new Color("#ab5236"),
    darkGray: new Color("#5f574f"),
    gray: new Color("#c2c3c7"),
    white: new Color("#fff1e8"),
    red: new Color("#ff004d"),
    orange: new Color("#ffa300"),
    yellow: new Color("#ffec27"),
    green: new Color("#00e436"),
    blue: new Color("#29adff"),
    purple: new Color("#83769c"),
    pink: new Color("#ff77a8"),
    peach: new Color("#peach"),
    text: new Color(),
    background: new Color(),
    error: new Color(),
    command: new Color(),
    title: new Color(),
}
colors.text.hex = colors.white.hex
colors.background.hex = colors.darkBlue.hex
colors.error.hex = colors.red.hex
colors.command.hex = colors.yellow.hex
colors.title.hex = colors.green.hex

addEventListener("touchstart", function(){
    navigator.virtualKeyboard.show()
})