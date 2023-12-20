document.addEventListener('keypress', onKeyPress)

const KeyToSound = {
    'a': document.querySelector('#s1'),
    's': document.querySelector('#s2'),
    'd': document.querySelector('#s3'),
    'f': document.querySelector('#s4'),
    'g': document.querySelector('#s5'),
    'h': document.querySelector('#s6'),
    'j': document.querySelector('#s7'),
    'k': document.querySelector('#s8'),
    'l': document.querySelector('#s9'),
}

const channels = {
    1: [],
    2: [],
    3: [],
    4: [],
}

let currentChannel = 1

//Przechowuje w sesji 
const savedChannels = JSON.parse(sessionStorage.getItem("channels"))  

if(savedChannels){
    Object.keys(savedChannels).forEach(channel=>{
        channels[channel]=savedChannels[channel]})
}

function onKeyPress(event) {
    const pressedKey = event.key.toLowerCase()
    const sound = KeyToSound[pressedKey]
    if(sound){
        playSound(sound)
        recordSound(pressedKey, sound.src)
    }
    else if (pressedKey == "r"){
        currentChannel = (currentChannel % 4) + 1
    }
    else if (pressedKey == "p"){
        playRecordedSounds(currentChannel)
    }
    else if (pressedKey == "o"){
        playRecordedSoundsAll()
    }
}

function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}

function recordSound(key, soundSrc){
    channels[currentChannel].push({key,soundSrc})
    saveChannelsToSessitonStorage()
}

function saveChannelsToSessitonStorage(){
     sessionStorage.setItem(channels, JSON.stringify(channels))
}

function playRecordedSounds(channel) {
    channels[channel].forEach(({soundSrc}, index) => {setTimeout(()=>{
        const sound = new Audio(soundSrc)
        playSound(sound)
        },100 * index)
    })
}

function playRecordedSoundsAll(){
    Object.keys(channels).forEach(channel=>(playRecordedSounds(parseInt(channel))))
}