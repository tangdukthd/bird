export class InputHandler {
    constructor(game) {
        this.game = game
        this.keys = []
        window.addEventListener('keydown', e => {
            if(e.code === 'Space' && this.keys.indexOf(e.key) === -1 && !this.game.gameOver) {
                // this.keys.push(e.key)
                this.keys.push('fly')
            } else if(e.key === 'Enter' && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key)
                if(this.game.gameOver) {
                    this.game.restart()
                }
            } else if(e.key === 'd')
                this.game.debug = !this.game.debug
        })
        window.addEventListener('keyup', e => {
            if( e.code === 'Space') { 
                this.keys.splice(this.keys.indexOf('fly'), 1)
            }
        })
        window.addEventListener('keyup', e => {
            if(e.key === 'Enter') { 
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
        })
        window.addEventListener('touchstart', e => {
            if(!this.game.gameOver)
                this.keys.push('fly')
            this.touchY = e.changedTouches[0].pageY
        })
        window.addEventListener('touchmove', e => {
            if(e.changedTouches[0].pageY - this.touchY > 100 && this.keys.indexOf('Enter') === -1) {
                if(this.game.notStartedYet)
                    this.keys.push('Enter')
                else if (this.game.gameOver)
                    this.game.restart()
            }
        })
        window.addEventListener('touchend', e => {
            this.keys.splice(this.keys.indexOf('fly'), 1)
            this.keys.splice(this.keys.indexOf('Enter'), 1)
        })
    }
}