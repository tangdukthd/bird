const imageArray = [
    document.getElementById('bf1'),
    document.getElementById('bf2'),
    document.getElementById('bf3'),
    document.getElementById('bf4'),
    document.getElementById('bf5'),
    document.getElementById('bf6'),
    document.getElementById('bf7'),
    document.getElementById('bf8'),
    document.getElementById('dead'),
]

export class Bird {
    constructor(game) {
        this.game = game
        this.width = 70
        this.height = 70
        this.x = 100
        this.y = this.game.height - this.height - this.game.groundMargin - 30
        this.vy = 0
        this.weight = 0.5
        this.image = imageArray
        this.bfImage = 5
        this.maxbfImage = 7
        this.fps = 60
        this.frameInteval = 1000/this.fps
        this.frameTimer = 0
    }
    update(input, deltaTime) {
        if(this.y > this.game.height - this.game.groundMargin - 30) {
            this.y = this.game.height - this.game.groundMargin - 30
            this.vy = 0
        } else {
            this.vy += this.weight
            this.vy *= 0.9
            this.y += this.vy
        }
        if(this.y < 0) {
            this.y = 0
            this.vy = 0
        }
        if(input[0] === 'fly')
            this.flap(deltaTime)
        else
            this.bfImage = 5
        if(this.game.gameOver)
            this.bfImage = 8
    }
    draw(context) {
        if(this.game.debug) {
            context.fillStyle = 'black'
            context.strokeRect(this.x + 15, this.y, this.width - 23, this.height - 20)
        }
        if(this.game.gameOver) {
            context.drawImage(this.image[this.bfImage], 0, 150, 150, 150, this.x, this.y, this.width, this.height)
        } else
            context.drawImage(this.image[this.bfImage], this.x, this.y, this.width, this.height)
    }
    flap(deltaTime) {
        this.vy -= 2
        if(this.frameTimer > this.frameInteval) {
            this.frameTimer = 0
            if(this.bfImage < this.maxbfImage)
                this.bfImage++
            else
                this.bfImage = 0
        } else {
            this.frameTimer += deltaTime
        }
    }
    checkCollision() {
        this.game.obstacles.forEach(obstacle => {
            if(((this.x + this.width - 23 >= obstacle.x && this.x + 15 <= obstacle.x + obstacle.width - 5) && (this.y < obstacle.hTop)) || ((this.x + this.width -5 >= obstacle.x && this.x + 15 <= obstacle.x + obstacle.width - 23) && (this.y + this.height - 20 > this.game.height - obstacle.hBottom + 10))) {
                    this.game.gameOver = true
            }
        });
    }
    restart() {
        this.y = this.game.height - this.height - this.game.groundMargin - 30
        this.bfImage = 5
    }
}

                // this.game.bird.x < obstacle.x + obstacle.width &&
                // this.game.bird.x + this.game.bird.width > obstacle.x && 
                // ((this.game.bird.y < 0 + obstacle.hTop && this.game.bird.y + this.game.bird.height > 0) || (this.game.bird.y > this.game.height - obstacle.hBottom && 
                // this.game.bird.y + this.game.bird.height < this.game.height))