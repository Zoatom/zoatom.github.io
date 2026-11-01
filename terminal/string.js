// error tolerance
const offsetWeight = 0.1
const diffrenceWeight = 0.5

function getCharacterDistance(charA, charB, aOffset, bOffset){
    let aPos = qwertyMap.get(charA)
    if(!aPos) aPos = qwertyMap.get("fallback")
    let bPos = qwertyMap.get(charB)
    if(!bPos) bPos = qwertyMap.get("fallback")
    let dx = aPos.x - bPos.x
    let dy = aPos.y - bPos.y
    let dz = (aOffset - bOffset) * offsetWeight
    return Math.sqrt(dx*dx + dy*dy + dz*dz)
}

function getStringDifference(stringA = "", stringB = ""){
    // don't want to deal with upper and lower case
    if (stringA.length > stringB.length){
        let temp = stringA
        stringA = stringB
        stringB = temp
    }
    stringA = stringA.toLowerCase()
    stringB = stringB.toLowerCase()

    let totalDistance = 0
    for (let i = 0; i < stringA.length; i++){
        let closestDist = Infinity
        for(let j = 0; j < stringB.length; j++){
            let dist = getCharacterDistance(stringA[i], stringB[j], i, j)
            if (dist < closestDist){
                closestDist = dist
            }
        }
        totalDistance += closestDist
    }
    totalDistance += Math.abs(stringA.length - stringB.length) * diffrenceWeight
    return totalDistance / ((stringA.length + stringB.length) / 2)
}

function getClosestInList(string, list){
    if(string == undefined) return undefined
    if(string == "") return ""
    let closestDist = Infinity
    let closestItem
    list.forEach(function(item){
        let dist = getStringDifference(string, item)
        if (dist < closestDist){
            closestDist = dist
            closestItem = item
        }
    })
    return closestItem
}