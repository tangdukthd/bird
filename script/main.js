import { Background } from './background.js'
import { Bird } from './bird.js'
import { InputHandler } from './input.js'
import { Particle } from './particles.js'
import {  Obstacle } from './obstructies.js'
import {  UI } from './ui.js'

window.addEventListener('load', function() {
    document.getElementById('loading').style.display = 'none'
    const fullScreenButton = this.document.getElementById('fullScreenButton')
    const canvas = document.getElementById('canvas1')
    canvas.style.display = 'block'
    const ctx = canvas.getContext('2d')
    canvas.width = 1280
    canvas.height = 720

    class Game {
        constructor(width, height) {
            this.width = width
            this.height = height
            this.groundMargin = 130
            this.speed = 0
            this.maxSpeed = 3
            this.debug = false
            this.background = new Background(this)
            this.bird = new Bird(this)
            this.input = new InputHandler(this)
            this.ui = new UI(this)
            this.obstacles = []
            this.particles = []
            this.maxParticles = 100
            this.obstacleAppearanceTime = 0
            this.counterOAT = 0
            this.score = 0
            this.gameOver = false
            this.notStartedYet = true
        }
        update(deltaTime) {
            if(this.gameOver) {
                this.speed = 0
            }
            this.background.update()
            this.bird.update(this.input.keys, deltaTime)
            this.maxSpeed = 3 + this.score/20
            if((this.input.keys.indexOf('Enter') > -1) && ((this.notStartedYet === true) || this.gameOver)) {
                this.notStartedYet = false
                this.speed = this.maxSpeed
            }
            if(this.speed > 0) {
                this.addObstructie(deltaTime)
                this.particles.unshift(new Particle(this))
            }
            this.particles.forEach((particle) => {
                particle.update()
            })
            if(this.particles.length > this.maxParticles) {
                this.particles.length = this.maxParticles
            }
            this.bird.checkCollision()
        }
        draw(context) {
            this.background.draw(context)
            this.bird.draw(context)
            this.particles.forEach(particle => {
                particle.draw(context)
            })
            this.obstacles.forEach(obstacle => {
                obstacle.draw(context)
            })
            this.ui.draw(context)
        }
        addObstructie(deltaTime) {
            this.obstacleAppearanceTime = 2000 - this.score/5
            if(this.counterOAT >= this.obstacleAppearanceTime) {
                this.obstacles.unshift(new Obstacle(this))
                this.counterOAT = 0
            } else {
                this.counterOAT += deltaTime
            }
            this.obstacles.forEach(obstacle => {
                obstacle.update()
            })
            this.obstacles = this.obstacles.filter(obstacle => !obstacle.markedForDeletion)
        }
        restart() {
            this.gameOver = false
            this.background.restart()
            this.bird.restart()
            this.score = 0
            this.obstacles = []
            this.particles = []
            this.obstacleAppearanceTime = 0
            this.counterOAT = 0
            this.maxSpeed = 3
            this.speed = this.maxSpeed
        }
    }

    function toggleFullScreen() {
        if(!document.fullscreenElement) {
            canvas.requestFullscreen().catch(err => {
                alert(`Error, can't anable full-screen mode: ${err.message}`)
            })
        } else {
            document.exitFullscreen()
        }
    }
    fullScreenButton.addEventListener('click', toggleFullScreen)

    const game = new Game(canvas.width, canvas.height)
    let lastTime = 0

    function animate(timeStamp) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const deltaTime = timeStamp - lastTime
        lastTime = timeStamp
        game.update(deltaTime)
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate(0)
})