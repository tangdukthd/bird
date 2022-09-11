export class Obstacle {
    constructor(game) {
        this.game = game
        this.hTop = Math.random() * this.game.height/2.5 + 20
        this.hBottom = this.game.height - (this.hTop + this.game.bird.height + 50 + Math.random() * ((200 - this.game.score/2) || 50))
        this.x = this.game.width
        this.width = 100
        this.image = document.getElementById('obstacle')
        this.counter = false
        this.markedForDeletion = false
    }
    draw(context) {
        if(this.game.debug) {
            context.fillStyle = 'black'
            context.strokeRect(this.x, 0, this.width - 5, this.hTop)
            context.strokeRect(this.x, this.game.height - this.hBottom + 10, this.width - 5, this.hBottom - 10)
        }
        context.drawImage(
            this.image,
            0,
            811 - this.hTop,
            this.width,
            this.hTop, 
            this.x, 
            0, 
            this.width, 
            this.hTop)
        context.drawImage(
            this.image,
            0,
            0,
            this.width,
            this.hBottom, 
            this.x,
            this.game.height - this.hBottom, 
            this.width, 
            this.hBottom)
    }
    update() {
        if(this.x + this.width < 0)
            this.markedForDeletion = true
        this.x -= this.game.speed
        if(!this.counter && this.x < this.game.bird.x) {
            this.game.score++
            this.counter = true
        }
    }
}