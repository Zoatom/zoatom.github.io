const canvas = document.querySelector("canvas")
const ctx = canvas.getContext("2d")

let padding = Number(localStorage.getItem("padding"))
if(!isFinite(padding)) padding = 16
let margin = Number(localStorage.getItem("margin"))
if(!isFinite(margin)) margin = 16

canvas.clear = function(scalar = 3){
    canvas.size = Math.min(innerWidth, innerHeight)
    canvas.size -= padding * 2

    canvas.width = canvas.size * scalar
    canvas.height = canvas.size * scalar
    canvas.style.width = canvas.size
    canvas.style.height = canvas.size


    canvas.style.backgroundColor = backgroundColor.color

    ctx.resetTransform()
    ctx.scale(scalar, scalar)
}

canvas.clear()