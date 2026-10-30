class Command{
    constructor(name = "", command = function(){text.write(this.name + ": " + this.description)}){
        this.name = name
        this.call = command
    }
    calculateDistance(input){
        input = input.toLowerCase()
        let ogInput = input
        let maxDist = 1
        let distance = 0
        for (let i = 0; i < this.name.length; i++){
            let funcLetter = this.name.at(i)
            for(let j = 0; j < input.length; j++){
                let inputLetter = input.at(j)
                if (funcLetter == inputLetter){
                    input = input.slice(0, j) + "#" + input.slice(j + 1, input.length)
                    distance += Math.min(Math.abs(i - j), maxDist)
                }
            }
        }
        input = input.replaceAll("#", "")
        distance += input.length * (maxDist + 1)
        distance /= ogInput.length - input.length
        return distance
    }
}

const commands = [
    new Command("help", function(){
        text.write('"help" : Lists valid commands')
        text.write('"clear" : Clears the terminal')
        text.write('"hello" : Gives a self introduction')
        text.write("")
        text.write('"programs" : Lists the different programs I have published here')
        text.write('"art" : Lists the different art works I have published here')
        text.write("")
        text.write("light : Turns on light mode")
        text.write("dark : Turns on dark mode")
        text.write("super dark : What do you think...")
    }),
    new Command("clear", function(){
        text.splice(0, text.length)
    }),
    new Command("hello", function(){
        text.write("Hi")
        text.write("I'm Zoatom")
        text.write("I'm " + Math.floor((Date.now() - Date.parse("March 26, 2006")) / 31556952000) + " years old")
        text.write("This is my website, where I put some of the things I make, mostly programs and art")
    }),
    new Command("programs", function(){
        text.write("pi : a pi calculator")
        text.write("boids : a boids simulation")
    }),
    new Command("art", function(){
        text.write("eh.. idk...")
        text.write("...does the tilte count?")
        text.write("")
        text.write('              ### ### ### ### ### ###', colors.title)
        text.write('              ½## #½# #½# ½#½ #½# ###', colors.title)
        text.write('              #½½ #½# ### ½#½ #½# ###', colors.title)
        text.write('              ### ### #½# ½#½ ### #½#', colors.title)
        text.write("")
    }),
    new Command("pi", function(){
        location.href = "pi.html"
    }),
    new Command("boids", function(){
        location.href = "boid.html"
    }),
    new Command("zoatom", function(){
        text.write("Zoatom here")
    }),
    new Command("dark", function(){
        let options = [
            '"Jarvis, activate dark mode"',
            'Dark mode, activated',
            '"Going dark"',
        ]
        text.write(options[Math.floor(Math.random() * options.length)])

        colors.text.hex = colors.white.hex
        colors.background.hex = colors.darkBlue.hex
        colors.error.hex = colors.red.hex
        colors.command.hex = colors.yellow.hex
        colors.title.hex = colors.green.hex
    }),
    new Command("light", function(){
        let options = [
            '"Jarvis, activate light mode"',
            'Light mode, activated',
        ]
        text.write(options[Math.floor(Math.random() * options.length)])

        colors.text.hex = colors.black.hex
        colors.background.hex = colors.white.hex
        colors.error.hex = colors.red.hex
        colors.command.hex = colors.orange.hex
        colors.title.hex = colors.darkGreen.hex
    }),
    new Command("super dark", function(){
        let options = [
            'Can you even see anything in here',
            `"Jarvis... what's it like being dead"`,
        ]
        text.write(options[Math.floor(Math.random() * options.length)])

        colors.text.hex = colors.purple.hex
        colors.background.hex = colors.black.hex
        colors.error.hex = colors.darkPurple.hex
        colors.command.hex = colors.brown.hex
        colors.title.hex = colors.darkGray.hex
    }),
]

commands.check = function(input){
    let closedDistance = Infinity
    this.closestIndex = undefined
    this.forEach(function(command, index){
        let dist = command.calculateDistance(input)
        if (dist < closedDistance){
            closedDistance = dist
            commands.closestIndex = index
        }
    })
    if (closedDistance <= 2){
        return true
    }else{
        return false
    }
}
commands.call = function(){
    this[this.closestIndex].call()
}