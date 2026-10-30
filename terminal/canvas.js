const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")
canvas.size = (innerWidth < innerHeight? innerWidth: innerHeight) - 16
canvas.dpr = 3

canvas.clear = function(){
    canvas.width = canvas.size * canvas.dpr
    canvas.height = canvas.size * canvas.dpr
    canvas.style.width = `${canvas.size}px`
    canvas.style.height = `${canvas.size}px`
    ctx.resetTransform()
    ctx.scale(canvas.dpr, canvas.dpr)
    canvas.style.imageRendering = "pixelated"
    ctx.imageSmoothingEnabled = false
}
canvas.clear()