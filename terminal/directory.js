class Directory{
    constructor(name = "", description = "", command = function(){write(this.name)}, subDirectories = [], visible = true){
        this.name = name
        this.call = command
        this.subDirectories = subDirectories
        this.description = description
        this.visible = visible
        this.validParams = []
    }
    goTo(){
        currentDirectory = this
        let line = new Line(this.name + " <-")
        line.colorMap.set(0, primaryColor)
        line.colorMap.set(this.name.length, textColor)
        writeLine(line)
    }
    getClosestCommand(word){
        let closestDist = Infinity
        let closestDir
        this.subDirectories.forEach(function(command){
            let dist = getStringDifference(command.name, word)
            if (dist < closestDist){
                closestDist = dist
                closestDir = command
            }
        })
        return {dir: closestDir, dist: closestDist}
    }
    findDirectoryByName(name){
        return this.subDirectories.find(function(dir){
            return dir.name == name
        })
    }
}

function askConfirmation(question){
    let spaces = spacesNeededToCenter("You're about to leave the terminal")
    writeText(spaces+"You're about to leave the terminal")
    spaces = spacesNeededToCenter(question)
    writeText(spaces+question)
    spaces = spacesNeededToCenter("CONFIRM or DENY")
    writeText(spaces+"CONFIRM or DENY")
}

// init Main
let currentDirectory
const main = new Directory("home", "Takes you back to the main directory", function(){
    currentDirectory = main
    let line = new Line("|<-")
    line.colorMap.set(0, primaryColor)
    line.colorMap.set(1, textColor)
    writeLine(line)
})
main.call()

const clear = new Directory("clear", "Clears the terminal", function(){
    main.call()
    text.splice(0, text.length)
    offset = 0
})

const help = new Directory("help", "Lists valid commands (local commands chage based on where you are)", function(scope, commenting){
    scope = getClosestInList(scope, ["global", "local", "false"])
    commenting = getClosestInList(commenting, ["noComment", "false", "true"])
    if (commenting == "noComment") commenting = "false"
    if (commenting == "true") commenting = undefined
    if (scope == "false" || scope == "noComment"){
        scope = undefined
        commenting = "false"
    }
    let help = function(dir){
        let text
        if (commenting == "false"){
            text = dir.name
        }else{
            text = dir.name + " : " + dir.description
        }
        let line = new Line(text)
        line.colorMap.set(0, secondaryColor)
        line.colorMap.set(dir.name.length, textColor)
        if (dir.visible) writeLine(line)
    }
    if (scope == "global" || scope == undefined){
        if(scope == undefined) writeText("Global commands:", primaryColor)
        global.subDirectories.forEach(help)
        if(scope == undefined) writeText("")
    }
    if (scope == "local" || scope == undefined){
        if(scope == undefined) writeText("Local commands:", primaryColor)
        currentDirectory.subDirectories.forEach(help)
    }
    
    if (scope == undefined && commenting != "false"){
        writeText("")
        writeText("Oh, and you can scroll up and down like normal")
        writeText("... with the mouse wheel")
    }
    })
help.validParams = ["local", "global", "true", "false"]

// init Global and global directories –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const global = new Directory("global", "", function(){})
global.subDirectories = [
    main,
    help,
    new Directory("math", "Evaluates a simple expression", function(...args){
        let expression = args.join("")
        let result
        try{
            result = eval(expression)
        }catch{}
        if (result) {
            writeText(result)
        }else{
            writeText("Invalid math expression", errorColor)
        }
    }),
    clear,
    new Directory("Zoatom", "", function(){
        let lines = [
            "Zoatom here", "Yes?", "That's me!",
            "You called", "Hi", "Yeah",
        ]
        let line = lines[Math.floor(Math.random() * lines.length)]
        writeText(line)
    }, [], false),
]

const helloDir = new Directory("hello", 'Gives you a little "About Me" text', function(){
    writeText("")
    writeText("Hi, I'm Zoatom, the creator and owner of this website.")
    writeText("I'm " + Math.floor((Date.now() - Date.parse("March 26, 2006")) / 31556952000) + " years old, form Norway, and wear glasses.")
    writeText("")
    writeText(`I made this thing because I thought it would be a cool project. And I already had a website,
but it was the most boring thing imaginable, so I'm glad to have upgraded.`)
    writeText("")
    writeText(`The plan with this website is to have a place to show some of the projects I have finished. That's what I used the old one for at least.
I have a couple of new ideas for what I could add, so I'm hyped for that. I just hope I have the motivation for them.`)
    writeText("")
    writeText("Sadly I can already tell this website is going to be hard to maintain :( I might have to redo it.. again... this is my third atempt on this spesific version")
    writeText("")
    writeText("Anyway, eh... I like programming, in case you can't tell, I like drawing, painting, blender, cola, photography, anime, manga, Konosuba and One Piece.")
    writeText(`Currently I'm working on an unnamed game at Perchance Productions... yes that's a real company you can look it up (please look it up, this is an ad) 
I'm one of the artists there. I've mainly done 3D work so far.`)
    writeText("")
    writeText("I could go on for longer but I have to end it somewhere")
    writeText("Have.. eh... fun?... on my website..")
    writeText("")
    main.call()
})

const printTitle = new Directory("title", "Prints the big ZOATOM title", function(){
    let spaces = spacesNeededToCenter("### ### ### ### ### ###")
    text.splice(text.length - 1, 1)
    writeText('')
    writeText(spaces+'### ### ### ### ### ###', primaryColor)
    writeText(spaces+'½## #½# #½# ½#½ #½# ###', primaryColor)
    writeText(spaces+'#½½ #½# ### ½#½ #½# ###', primaryColor)
    writeText(spaces+'### ### #½# ½#½ ### #½#', primaryColor)
    writeText('')
    let subText = "-- Personal Projects I Felt Like Sharing --"
    spaces = spacesNeededToCenter(subText)
    writeText(spaces+subText, secondaryColor)
    writeText('')
})

const darkMode = new Directory("darkMode", "Turns on dark mode", function(){
    backgroundColor.color = darkBlue.color
    textColor.color = white.color
    errorColor.color = red.color
    commandColor.color = yellow.color
    primaryColor.color = green.color
    secondaryColor.color = orange.color
    localStorage.setItem("theme", "dark")

    let options = [
        'Dark mode',
        '"Going dark"',
    ]
    writeText(options[Math.floor(Math.random() * options.length)])
})

const lightMode = new Directory("lightMode", "Turns on light mode", function(){
    backgroundColor.color = white.color
    textColor.color = black.color
    errorColor.color = red.color
    commandColor.color = orange.color
    primaryColor.color = darkGreen.color
    secondaryColor.color = brown.color
    localStorage.setItem("theme", "light")

    let options = [
        'Light mode',
        '"Turning on the light"',
    ]
    writeText(options[Math.floor(Math.random() * options.length)])
})

const superDarkMode = new Directory("superDarkMode", "What do you think?", function(){
    backgroundColor.color = black.color
    textColor.color = purple.color
    errorColor.color = darkPurple.color
    commandColor.color = brown.color
    primaryColor.color = darkGray.color
    secondaryColor.color = gray.color
    localStorage.setItem("theme", "super dark")

    let options = [
        `Super Dark mode`,
        'Can you even see anything in here?',
    ]
    writeText(options[Math.floor(Math.random() * options.length)])
})

const animSpeedDir = new Directory("animationSpeed", "Change the typing animation speed", function(speed){
    speed = Number(speed)
    if (speed == 0){
        writeText("Bro...", errorColor)
        writeText("Give me something to work with here", errorColor)
        writeText(`Write "animationSpeed 1.0" or something`, errorColor)
        let line = new Line(`Btw, it's at ${animationSpeed} rn`)
        line.colorMap.set(0, errorColor)
        line.colorMap.set(13, textColor)
        line.colorMap.set(13 + animationSpeed.toString().length, errorColor)
        writeLine(line)
    }else if (!isFinite(speed)){
        writeText("I'd appreciate it if it was an actual number", errorColor)
    }else{
        if (speed < 0){
            writeText("Didn't imagine I would have to implement a text length cap at 0", secondaryColor)
        }
        animationSpeed = speed
        localStorage.setItem("animation speed", animationSpeed)
        let line = new Line(`Setting animation speed to ${animationSpeed}`)
        line.colorMap.set(27, secondaryColor)
        writeLine(line)
    }
})

const lineSpaceDir = new Directory("lineSpacing", "Change the line spacing", function(space){
    space = Number(space)
    if (space <= 0){
        writeText("...", errorColor)
        writeText("Give me something to work with here", errorColor)
        writeText(`Write "lineSpacing 1.0" or something`, errorColor)
        let line = new Line(`Btw, it's at ${lineSpacing} rn`)
        line.colorMap.set(0, errorColor)
        line.colorMap.set(13, textColor)
        line.colorMap.set(13 + lineSpacing.toString().length, errorColor)
        writeLine(line)
    }else if (!isFinite(space)){
        writeText("I'd appreciate it if it was an actual number", errorColor)
    }else{
        if (space > 3){
            writeText("Personally I think thats a bit much, but ok...", secondaryColor)
        }
        lineSpacing = space
        localStorage.setItem("line spacing", lineSpacing)
        let line = new Line(`Setting line spacing to ${lineSpacing}`)
        line.colorMap.set(24, secondaryColor)
        writeLine(line)
    }
})

const marginDir = new Directory("margin", "Change the size of the margin", function(size){
    size = Number(size)
    if (size < 0){
        writeText("...", errorColor)
        writeText("Give me something to work with here", errorColor)
        writeText(`Write "margin 1.0" or something`, errorColor)
        let line = new Line(`Btw, it's at ${margin} rn`)
        line.colorMap.set(0, errorColor)
        line.colorMap.set(13, textColor)
        line.colorMap.set(13 + margin.toString().length, errorColor)
        writeLine(line)
    }else if (!isFinite(size)){
        writeText("I'd appreciate it if it was an actual number", errorColor)
    }else{
        if (size > 64){
            writeText("Personally I think thats a bit much, but ok...", secondaryColor)
        }
        margin = size
        localStorage.setItem("margin", margin)
        let line = new Line(`Setting margin to ${margin}`)
        line.colorMap.set(18, secondaryColor)
        writeLine(line)
    }
})

const paddingDir = new Directory("padding", "Change the size of the padding", function(size){
    size = Number(size)
    if (size < 0){
        writeText("...", errorColor)
        writeText("Give me something to work with here", errorColor)
        writeText(`Write "padding 1.0" or something`, errorColor)
        let line = new Line(`Btw, it's at ${padding} rn`)
        line.colorMap.set(0, errorColor)
        line.colorMap.set(13, textColor)
        line.colorMap.set(13 + padding.toString().length, errorColor)
        writeLine(line)
    }else if (!isFinite(size)){
        writeText("I'd appreciate it if it was an actual number", errorColor)
    }else{
        if (size > 64){
            writeText("Personally I think thats a bit much, but ok...", secondaryColor
            )
        }
        padding = size
        localStorage.setItem("padding", padding)
        let line = new Line(`Setting padding to ${padding}`)
        line.colorMap.set(18, secondaryColor)
        writeLine(line)
    }
})

// programs direcotry –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const programsDir = new Directory("programming", "Lists and gives access to the programs I've published here", function(){
    this.goTo()
    writeText("Choose a program to try!")
    help.call("local", "false")
}, [
    new Directory("pi", "A program that calculates many digits of pi", function(){
        currentDirectory = this
        askConfirmation("Do you want to see the pi program")
    }, [
        new Directory("confirm", "Do you confirm", function(){location.href = "pi.html"}),
        new Directory("deny", "Do you deny", function(){programsDir.goTo()})
    ]),
    new Directory("boids", "A program that simulates boids", function(){
        currentDirectory = this
        askConfirmation("Do you want to see the boids")
    }, [
        new Directory("confirm", "Do you confirm", function(){location.href = "boid.html"}),
        new Directory("deny", "Do you deny", function(){programsDir.goTo()})
    ]),
    new Directory("projects", "", function(){projectsDir.goTo()}, [], false),
    new Directory("art", "", function(){artDir.goTo()}, [], false),
])

// art directory ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const artDir = new Directory("art", "List and gives access to different collections of art(subjective) I've made", function(){
        this.goTo()
        writeText("Chose a collection")
        writeText("...")
        writeText("..or not...")
        writeText("...yeh, I've got nothing in here...")
        writeText("my bad")
        help.call("local", "false")
    },[
        new Directory("projects", "", function(){projectsDir.goTo()}, [], false),
        new Directory("programming", "", function(){programsDir.goTo()}, [], false),
    ])

// define projects ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
const projectsDir = new Directory("projects", "Where I publish my personal projects", function(){
    this.goTo()
    writeText("What kind of stuff do you want to see?")
    help.call("local", "false")
},[
    programsDir,
    artDir,
])

// define main directories ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
main.subDirectories = [
    helloDir,
    new Directory("Hi", "", helloDir.call, [], false),
    projectsDir,
    printTitle,
]
global.subDirectories.push(
    new Directory("settings", "Gives access to the settings", function(){
    this.goTo()
    writeText("Customize to your liking")
    writeText("")
    help.call("local")
},[
    new Directory("reset", "Reverts all changes. -> YOU CAN ALSO RESET SETTINGS BY PRESSING ESC AT ALL TIMES <- this website is breakable...", function(){
        darkMode.call()
        animSpeedDir.call(1)
        lineSpaceDir.call(1.25)
        marginDir.call(16)
        paddingDir.call(16)
        localStorage.clear()
    }),
    darkMode,
    lightMode,
    superDarkMode,
    animSpeedDir,
    lineSpaceDir,
    marginDir,
    paddingDir,
]))