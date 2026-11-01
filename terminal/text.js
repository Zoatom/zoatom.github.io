let fontSize
let maxWidth

class Line{
    constructor(text = ""){
        this.text = text.toString()
        this.colorMap = new Map()
        this.colorMap.set(0, textColor)
    }
    render(lineCount = 0, cutoff = Infinity){
        let renderedText = this.text.toString()
        if(renderedText.length > cutoff){
            renderedText = renderedText.slice(0, cutoff + 1)
        }
        let spaceLength = ctx.measureText(" ").width
        let words = renderedText.split(" ")
        let letterIndex = 0
        let x = 0
        let length = 0
        let i = 0
        let emergency = 0
        while(i < words.length && emergency < 200){
            length += ctx.measureText(words[i]).width
            words[i] += " "
            if (length <= maxWidth){
                for(let j = 0; j < words[i].length; j++){
                    let color = this.colorMap.get(letterIndex)
                    if (color) ctx.fillStyle = color.color
                    let char = renderedText[letterIndex]
                    if (char != undefined){
                        ctx.fillText(char, x, lineCount * fontSize * lineSpacing)
                        x += ctx.measureText(char).width
                        letterIndex++
                    }
                }
                length += spaceLength
            }else{
                length = 0
                x = 0
                lineCount++
                words[i] = words[i].slice(0, words[i].length - 1)
                i--
            }
            i++
            emergency++
        }
        return lineCount
    }
}

const text = []
text.maxLength = 0

function spacesNeededToCenter(text){
    let spaceLength = ctx.measureText(" ").width
    let textWidth = ctx.measureText(text).width
    let amount = Math.floor((maxWidth - textWidth) / 2 / spaceLength)
    let spaces = ""
    for(let i = 0; i < amount; i++){
        spaces += " "
    }
    return spaces
}

function writeText(text, color = textColor){
    let newLine = new Line(text)
    newLine.colorMap.set(0, color)
    writeLine(newLine)
}
function writeLine(line){
    text.push(line)
}

text.getTotalLength = function(){
    let length = 0
    this.forEach(function(line){
        length += line.text.toString().length
    })
    return length
}

text.render = function(){
    ctx.font = fontSize + "px pixelFont"
    ctx.textBaseline = "top"
    let lineCount = 0
    let charCount = 0
    this.forEach(function(line){
        charCount += line.text.length
        let cutoff = Infinity
        let rest = charCount - text.maxLength
        if (rest > 0){
            cutoff = line.text.length - rest
            charCount -= rest - 1
        }
        lineCount = line.render(lineCount, cutoff)
        if (cutoff >= 0) {
            lineCount++
        }
    })
    return lineCount
}