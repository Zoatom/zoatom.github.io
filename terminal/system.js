let animationSpeed
let lineSpacing

let time = 0
let previousTime = 0
let deltaTime = 1/60
function onupdate(){}
function frame(currentTime){
    requestAnimationFrame(frame)
    !currentTime? currentTime = 0:
    time = currentTime / 1000
    deltaTime = time - previousTime
    previousTime = time

    onupdate()
}
frame(0)

function loadFont(name, path) {
    // create a new font
    let newFont = new FontFace(name, "url('" + path + "')")
    // load the font, then add it to the document
    newFont.load().then(function (font) {
        document.fonts.add(font)
    })
}
loadFont("pixelFont", "terminal/04b03extraModed.ttf")