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
    4: []
}

let currentChannel = 1

const savedChannels = JSON.parse(sessionStorage.getItem('channels'))
if (savedChannels) {
    Object.keys(savedChannels).forEach(channel => {
        channels[channel] = savedChannels[channel]
    })
}

function onKeyPress(event) {
    const key = event.key.toLowerCase()
    const sound = KeyToSound[key]
    if (sound) {
        playSound(sound)
        recordSound(key, sound.src)
    } else if (key === 'r') {
        currentChannel = (currentChannel % 4) + 1
        console.log(`Aktualny kanał: ${currentChannel}`)
    } else if (key === 'p') {
        playRecordedSounds(currentChannel)
    } else if (key === 'o') {
        playRecordedSoundsAll()
    }
}

function playSound(sound) {
    sound.currentTime = 0
    sound.play()
}

function recordSound(key, soundSrc) {
    const currentTime = Date.now()
    channels[currentChannel].push({ key, soundSrc, timestamp: currentTime })
    saveChannelsToSessionStorage()
    console.log(currentTime)
}

function saveChannelsToSessionStorage() {
    sessionStorage.setItem(channels, JSON.stringify(channels))
}

function playRecordedSounds(channel, index = 0) {
    if (index < channels[channel].length) {
        const { soundSrc, timestamp } = channels[channel][index]

        setTimeout(() => {
            const sound = new Audio(soundSrc)
            playSound(sound)

            playRecordedSounds(channel, index + 1)
        }, index === 0 ? 0 : timestamp - channels[channel][index - 1].timestamp)
    }
}

function playRecordedSoundsAll() {
    Object.keys(channels).forEach(channel => {
        playRecordedSounds(parseInt(channel))
    })
}