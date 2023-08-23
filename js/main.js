import { Player } from './player.js';
import { InputHandler } from './inputHandler.js';
import{ Map } from './map.js';

window.addEventListener('load', function(){
    const canvas = this.document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    canvas.height = 500;
    canvas.width = 500;

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.resetGame();
        }
        resetGame(){
            this.inputHandler = new InputHandler();
            this.player = new Player(this);
            this.map = new Map();
        }
        update(){
            this.player.update();
            if(this.map.isPositionColliding(this.player.x, this.player.y) || this.player.hasPlayerCrossedOwnLine)
            {
                alert('game lost');
                this.resetGame();
            }
            if(this.map.isPositionEndTile(this.player.x, this.player.y))
            {
                alert('game won');
                this.resetGame();
            }

        }
        draw(){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            this.map.draw(ctx);
            this.player.draw(ctx);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    function animate(){
        game.update();
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();

});