const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

/*the size of the canvas*/
canvas.width = 1280
canvas.height = 720

c.fillRect(0, 0, canvas.width, canvas.height)

/*each characters fall down at 0.8*/
const falling = 0.8

/*created the player*/
class teHunt {
    constructor({position, velocity, color = 'purple'}) {
        this.position = position
        this.velocity= velocity
        this.width = 50
        this.height = 150
        this.lastMovement
        this.attackMove = {
            position: this.position,
            width: 100,
            height: 50
        }
        this.color = color
        this.hitBox
    }
    terrorist(){
        /*characters*/
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.width, this.height)

        /*attack*/
        c.fillStyle = 'red'
        c.fillRect(this.attackMove.position.x, this.attackMove.position.y, this.attackMove.width, this.attackMove.height)
    }

    update() {
        this.terrorist()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        /*making the characters stay above the canvas*/
        if (this.position.y + this.height + this.velocity.y >= canvas.height){
            this.velocity.y = 0
        }else this.velocity.y += falling
    }
    dmg(){
        this.hitBox = true
        setTimeout(() => {
            this.hitBox = false
        }, 100)
    }
}

/*created the first player's position*/
const twitch = new teHunt({
    position: {
    x:0,
    y:580
},
    velocity: {
        x:0,
        y:0
    }
})

/*created the second player position*/
const jager = new teHunt({
    position: {
    x:1230,
    y:580
},
    velocity: {
        x:0,
        y:0
    },
    color: 'pink'
})

/*doesn't cancel's a character's movement when lifting a key*/
const doesntCancelMovement = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    ArrowRight: {
        pressed:false
    },
    ArrowLeft: {
        pressed:false
    }
}



/*Constantly updating the animation*/
function movement() {
    window.requestAnimationFrame(movement)
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    twitch.update()
    jager.update()

    /*player one movement*/
    twitch.velocity.x = 0
    if (doesntCancelMovement.a.pressed && twitch.lastMovement === 'a') {
        twitch.velocity.x = -3
    } else if (doesntCancelMovement.d.pressed && twitch.lastMovement === 'd') {
        twitch.velocity.x = 3
    }

    /*player two movement*/
    jager.velocity.x = 0
    if (doesntCancelMovement.ArrowLeft.pressed && jager.lastMovement === 'ArrowLeft') {
        jager.velocity.x = -3
    } else if (doesntCancelMovement.ArrowRight.pressed && jager.lastMovement === 'ArrowRight') {
        jager.velocity.x = 3
    }

    /*attacking*/
    if (twitch.attackMove.position.x + twitch.attackMove.width >= jager.position.x &&
         twitch.attackMove.position.x <= jager.position.x + jager.width &&
          twitch.attackMove.position.y + twitch.attackMove.height >= jager.position.y &&
          twitch.attackMove.position.y <= jager.position.y + jager.height &&
          player.hitBox) {
            player.hitBox = false
    }
}

/*when pressing down on an key, the character moves at a velocity of 1 px*/
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        /*player one*/
        case 'd':
            doesntCancelMovement.d.pressed = true
            twitch.lastMovement = 'd'
            break
        case 'a':
            doesntCancelMovement.a.pressed = true
            twitch.lastMovement = 'a'
            break
        case 'w':
            twitch.velocity.y = -15
            break
        case 'e':
            player.hitBox()
            break
        /*player two*/
        case 'ArrowRight':
            doesntCancelMovement.ArrowRight.pressed = true
            jager.lastMovement = 'ArrowRight'
            break
        case 'ArrowLeft':
            doesntCancelMovement.ArrowLeft.pressed = true
            jager.lastMovement = 'ArrowLeft'
            break
        case 'ArrowUp':
            jager.velocity.y = -15
            break
    }
    console.log(event.key)
})

/*when lefting up from the key, the character stops moving*/
window.addEventListener('keyup', (event) => {
    /*first player's key*/
    switch (event.key) {
        case 'd':
            doesntCancelMovement.d.pressed = false
            break
        case 'a':
            doesntCancelMovement.a.pressed = false
            break
    }
    /*second player's key*/
    switch (event.key) {
        case 'ArrowRight':
            doesntCancelMovement.ArrowRight.pressed = false
            break
        case 'ArrowLeft':
            doesntCancelMovement.ArrowLeft.pressed = false
            break
    }

    console.log(event.key)
})

console.log(twitch)
movement()
