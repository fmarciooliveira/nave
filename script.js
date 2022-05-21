//shoot.png
const yourShip = document.querySelector('#player-shooter')
const playArea = document.querySelector('#main-play-area')
const aliensImg = [
  'img/monster-1.png',
  'img/monster-2.png',
  'img/monster-3.png'
]

//movimento e tiro da nave
function flyShip(event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault()
    moveUp()
  } else if (event.key === 'ArrowDown') {
    event.preventDefault()
    moveDown()
  } else if (event.key === ' ') {
    event.preventDefault()
    fireLaser()
  }
}

//movimento para cima
function moveUp() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
  if (topPosition === '0px') {
    return
  } else {
    let position = parseInt(topPosition)
    position -= 25
    yourShip.style.top = position.toString() + 'px'
  }
}

//movimento para baixo
function moveDown() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue('top')
  if (topPosition === '500px') {
    return
  } else {
    let position = parseInt(topPosition)
    position += 25
    //    document.getElementById('player-shooter').style.top = '100px'
    yourShip.style.top = position.toString() + 'px'
    //    alert('${position}px ' + position.toString())
  }
}

//funcionalidade de tiro
function fireLaser() {
  let laser = createLaserElement()
  playArea.appendChild(laser)
  moveLaser(laser)
}

function createLaserElement() {
  let xPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('left'))
  let yPosition = parseInt(getComputedStyle(yourShip).getPropertyValue('top'))
  let newLaser = document.createElement('img')
  newLaser.src = 'img/tiro.png'
  newLaser.classList.add('laser')
  newLaser.style.position = 'relative'
  newLaser.style.height = '10px'
  newLaser.style.left = xPosition.toString() + 'px'
  newLaser.style.top = (yPosition - 20).toString() + 'px'
  return newLaser
}

function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left)
    let aliens = document.querySelectorAll('.alien')

    aliens.forEach(alien => {
      if (checkLaserCollision(laser, alien)) {
        alien.src = 'img/explosao.png'
        alien.classList.remove('alien')
        alien.classList.add('dead-alien')
        //createAliens()
      }
    })

    if (xPosition >= 500) {
      laser.remove()
    } else {
      laser.style.left = (xPosition + 8).toString() + 'px'
    }
  }, 10)
}

function createAliens() {
  let newAlien = document.createElement('img')
  let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]
  newAlien.src = alienSprite
  newAlien.classList.add('alien')
  newAlien.classList.add('alien-transition')
  newAlien.style.position = 'relative'
  newAlien.style.left = '400px'
  let number = parseInt(Math.random() * 500)
  newAlien.style.top = number.toString() + 'px'
  newAlien.style.height = '60px'

  playArea.appendChild(newAlien)
  moveAlien(newAlien)
  //alert(number.toString() + 'px')
}

function moveAlien(alien) {
  let moveAlienInterval = setInterval(() => {
    let xPosition = parseInt(
      window.getComputedStyle(alien).getPropertyValue('left')
    )
    if (xPosition <= 50) {
      if (Array.from(alien.classList).includes('dead-alien')) {
        alien.remove
      } else {
        //gameOver();
      }
    } else {
      alien.style.left = (xPosition - 50).toString() + 'px'
    }
  }, 3)
}

function checkLaserCollision(laser, alien) {
  let laserTop = parseInt(laser.style.top)
  let laserLeft = parseInt(laser.style.left)
  let laserBottom = parseInt(laser.style.bottom)
  let alienTop = parseInt(alien.style.top)
  let alienLeft = parseInt(alien.style.left)
  let alienBottom = parseInt(alien.style.bottom)

  if (laserLeft <= 600 && laserLeft + 40 >= alienLeft) {
    if (laserTop + 40 >= alienTop && laserTop <= alienTop + 70) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

function playGame() {
  //startButton.style.display = 'none'
  window.addEventListener('keydown', flyShip)
  alienInterval = setInterval(() => {
    createAliens()
  }, 2000)
}

playGame()
