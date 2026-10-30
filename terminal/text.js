class Line{
    constructor(text, color){
        this.text = text
        this.color = color
    }
}

let animationSpeed = 1
const padding = 16
let fontSize = canvas.size / 32

const text = []
const inputLine = new Line(" ", colors.text)

text.write = function(text = "", color = colors.text){
    this.push(new Line(text, color))
}

text.getTotalLength = function(){
    let length = 0
    this.forEach(function(line){
        length += line.text.length
    })
    return length
}

text.maxCharacters = 0
text.update = function(){
    text.maxCharacters += animationSpeed
    text.maxCharacters = Math.min(text.maxCharacters, text.getTotalLength())
}

text.render = function(){
    ctx.font = `${fontSize}px pixelFont`
    ctx.textBaseline = "top"
    let characterCount = 0
    let l = 0
    
    this.forEach(function(line){
        ctx.fillStyle = line.color.hex
        renderedText = line.text
        if (characterCount + renderedText.length < text.maxCharacters){
            characterCount += renderedText.length
        }else{
            renderedText = renderedText.slice(0, Math.floor(text.maxCharacters - characterCount))
            characterCount = text.maxCharacters
        }
        let lines = getLines(renderedText, canvas.size - padding * 2)
        lines.forEach(function(line){
            ctx.fillText(line, padding, padding + (l) * fontSize)
            l++
        })
    })
    return l
}

function getLines(text, maxWidth) {
    let words = text.split(" ")
    let lines = []
    
    let newLine = words[0]
    for (let i = 1; i < words.length; i++) {
        let segment = " " + words[i]
        
        let length = ctx.measureText(newLine + segment).width
        if (length < maxWidth) {
            newLine += segment
        } else {
            lines.push(newLine)
            newLine = words[i]
        }
    }
    lines.push(newLine)
    
    return lines
}

addEventListener("keydown", function(key){
    key = key.key
    switch (key){
        case "Backspace":
            inputLine.text = inputLine.text.slice(0, inputLine.text.length - 2)
            inputLine.text += " "
            break
        case "Enter":
            if (inputLine.text.length < 2) break
            let isValid = commands.check(inputLine.text)
            let color
            isValid? color = colors.command: color = colors.text
            text.write(inputLine.text.slice(0, inputLine.text.length - 1), color)
            text.maxCharacters = text.getTotalLength()
            inputLine.text = " "
            isValid? commands.call(): text.write("Invalid command", colors.error)
            break
    }
    if (key.length > 1) return
    inputLine.text = inputLine.text.slice(0, inputLine.text.length - 1)
    inputLine.text += key + " "
})