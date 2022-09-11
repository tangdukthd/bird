export class UI {
    constructor(game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = 'Josefin Sans'
    }
    draw(context) {
        context.save()
        context.shadowOffsetX = -1
        context.shadowOffsetY = -1
        context.shadowColor = 'white'
        context.shadowBlur = 0
        context.font = this.fontSize * 0.8 + 'px ' + this.fontFamily
        context.textAlign = 'left'
        context.fillStyle = this.game.fontColor
        // score
        context.fillText('Score: ' + this.game.score, 20, 50)
        // game over messages
        if(this.game.gameOver) {
            context.textAlign = 'center'
            context.font = this.fontSize * 2 + 'px ' + this.fontFamily
            context.fillText('GAME OVER', this.game.width * 0.5, this.game.height * 0.5 - 20)
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
            context.fillText('Your score is: ' + this.game.score, this.game.width * 0.5, this.game.height * 0.5 + 20)
            context.fillText('Press ENTER (swipe down) to start again', this.game.width * 0.5, this.game.height * 0.5 + 50)
        }
        // game not started yet
        if(this.game.notStartedYet) {
            context.textAlign = 'center'
            context.font = this.fontSize * 1.4 + 'px ' + this.fontFamily
            context.fillText('Press ENTER (swipe down) to start', this.game.width * 0.5, this.game.height * 0.5)
            context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily
            context.fillText('press SPACEBAR (touch) to fly', this.game.width * 0.5, this.game.height * 0.5 + 40)
        }
        context.restore()
    }
}