// notatnik z zajęć

const main = document.querySelector('main')
const slides = document.querySelector('.slides')
const dot = document.querySelector('#dot1')
dot.style.backgroundColor = "black"

let licznik = 0
let position = 0;
let intervalRef = setInterval(
    () => {
        slide();
    },
    5000
)


const leftButton = document.querySelector('#left')
const rightButton = document.querySelector('#right')

leftButton.addEventListener("click", ()=> {
    if (licznik == 0) {
        position = -3000
        licznik = 5
    } else {
        position += 600
        licznik--
    }
    slides.style.transform = `translate(${position}px)`
    const dotBtn = document.querySelector(`#dot${licznik + 1}`)
    dotBtn.style.backgroundColor = "black"
    restartInterval()
    clearDots()
})

rightButton.addEventListener("click", ()=> {
    if (licznik == 5) {
        position = 0
        licznik = 0
    } else {
        position -= 600
        licznik++
    }
    slides.style.transform = `translate(${position}px)`
    const dotBtn = document.querySelector(`#dot${licznik + 1}`)
    dotBtn.style.backgroundColor = "black"
    restartInterval()
    clearDots()
})

let run = true;
slides.addEventListener("click", ()=> {
    if (run){
        clearInterval(intervalRef)
        run = false
    } else {
        intervalRef = setInterval(()=> {
            slide()
        },5000 )
        run = true
    }
})

for (let i = 1; i < 7; i++) {
    const dotButton = document.querySelector(`#dot${i}`)
    dotButton.addEventListener("click", ()=> {
        slides.style.transform = `translate(${(i-1)*-600}px)`
        position = (i-1)*-600
        licznik = i-1
        dotButton.style.backgroundColor = "black"
        clearDots()
        restartInterval()
    })
}

function slide() {
    if (licznik == 5) {

        licznik = 0;
        position = 0;
        slides.style.transform = `translate(${position}px)`
    } else {
        position -= 600;
        licznik++;
        slides.style.transform = `translate(${position}px)`
    }
    const nextDot = document.querySelector(`#dot${licznik + 1}`)
    nextDot.style.backgroundColor = "black"
    clearDots()
}

function clearDots() {
    for ( let dotPosition = 1; dotPosition < 7; dotPosition++) {
        if (dotPosition != licznik + 1) {
            const nextDot = document.querySelector(`#dot${dotPosition}`)
            nextDot.style.backgroundColor = "grey"
        }
    }
}

function restartInterval() {
    clearInterval(intervalRef)
    intervalRef = setInterval(()=>{
        slide()
    },5000)
}