text.write('              ### ### ### ### ### ###', colors.title)
text.write('              ½## #½# #½# ½#½ #½# ###', colors.title)
text.write('              #½½ #½# ### ½#½ #½# ###', colors.title)
text.write('              ### ### #½# ½#½ ### #½#', colors.title)
text.write('              ')
text.write('½         Personal Projects I Felt Like Sharing', colors.command)
text.write('              ')
text.write('Type "help" to get a list of valid commands')

let mode = "command"

let totalLines = 0
function onupdate(){
    canvas.clear()
    ctx.translate(0, Math.min(0, -(totalLines + 1) * fontSize + canvas.size))

    text.update()
    let lineIndex = text.render()
    
    inputLine.text = inputLine.text.slice(0, inputLine.text.length - 1)
    Math.floor(time * 2) % 2 == 0? inputLine.text += "|": inputLine.text += " "
    
    let inputLines = getLines(inputLine.text, canvas.size - padding * 2)
    inputLines.forEach(function(line, index){
        ctx.fillStyle = inputLine.color.hex
        ctx.fillText(line, padding, padding + (lineIndex + index) * fontSize)
    })
    totalLines = lineIndex + inputLines.length

    canvas.style.backgroundColor = colors.background.hex
}