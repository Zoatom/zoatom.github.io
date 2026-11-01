const inputLine = new Line(" ")
inputLine.animate = function(){
    let text = this.text
    this.text = text.slice(0, text.length - 1)
    if (Math.floor(time * 2) % 2 == 0){
        this.text += "|"
    }else{
        this.text += " "
    }
}

const correctionThreshold = 0.5
inputLine.tokenize = function(){
    let words = this.text.split(" ")
    let newWords = []

    let letterCount = 0
    let globalClosest = global.getClosestCommand(words[0])
    let localClosest = currentDirectory.getClosestCommand(words[0])
    let closest
    globalClosest.dist < localClosest.dist? closest = globalClosest: closest = localClosest
    if (closest.dist <= correctionThreshold){
        newWords.push(closest.dir.name)
        inputLine.colorMap.set(letterCount, commandColor)
        inputLine.colorMap.set(letterCount + closest.dir.name.length, textColor)
    }else{
        newWords.push(words[0])
    }
    letterCount += newWords[newWords.length - 1].length + 1
    for(let i = 1; i < words.length; i++){
        let word = words[i]
        if (closest.dir.validParams.length > 0){
            word = getClosestInList(word, closest.dir.validParams)
        }
        newWords.push(word)
    }

    // rebuild
    this.text = ""
    newWords.forEach(function(word){
        inputLine.text += word + " "
    })
    return newWords
}

inputLine.call = function(tokens){
    let command = currentDirectory.findDirectoryByName(tokens[0])
    if (command == undefined) command = global.findDirectoryByName(tokens[0])
    if(!command) {
        writeText("Invalid command", red)
        return
    }
    tokens.shift()
    command.call.apply(command, tokens)
}

addEventListener("keydown", function(key){
    key = key.key
    switch(key){
        case "Backspace":
            inputLine.text = inputLine.text.slice(0, inputLine.text.length - 2)
            inputLine.text += " "
            break
        case " ":
            inputLine.text = inputLine.text.slice(0, inputLine.text.length - 1)
            inputLine.tokenize()
            inputLine.text += " "
            return
        case "Enter":
            inputLine.text = inputLine.text.slice(0, inputLine.text.length - 1)
            let tokens = inputLine.tokenize()
            let newLine = new Line(inputLine.text)
            inputLine.colorMap.forEach(function(color, char){
                newLine.colorMap.set(char, color)
            })
            writeLine(newLine)
            inputLine.colorMap.clear()
            inputLine.colorMap.set(0, textColor)
            inputLine.text = " "
            text.maxLength = text.getTotalLength()

            inputLine.call(tokens)
            break
        case "Escape":
            global.findDirectoryByName("settings").findDirectoryByName("reset").call()
            break
    }
    if (key.length > 1) return
    inputLine.text = inputLine.text.slice(0, inputLine.text.length - 1)
    inputLine.text += key
    inputLine.text += " "
})