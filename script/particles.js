export class Particle {
    constructor(game) {
        this.game = game
        this.x = this.game.bird.x + 10
        this.y = this.game.bird.y + this.game.bird.height/2
        this.size = Math.random() * 10 + 10
        this.speedY = (Math.random() * 1) - 0.5
        this.speedX = Math.random()
        this.color = 'rgba(0,0,0,0.2)'
    }
    update() {
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY
        this.size *= 0.95
    }
    draw(context) {
        context.save()
        context.fillStyle = this.color
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.fill()
        context.restore()
    }
}