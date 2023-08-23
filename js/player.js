export class Player {
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 5 * 50 - 25;
    this.speed = 0.5;
    this.direction = this.lastDirection = "right";
    this.positionChanges = [this.getPosition()];
    this.lastPos = this.getPosition();
    this.hasPlayerCrossedOwnLine = false;
  }

  getPosition() {
    return { x: Math.ceil(this.x), y: Math.ceil(this.y) };
  }
  
  checkSnakeRuleBroken(visitedPositions) {
    // Create a Set to keep track of visited positions
    const visitedSet = new Set();
    
    for (let i = 0; i < visitedPositions.length; i++) {
      const { x, y } = visitedPositions[i];
      const position = `${x},${y}`; // Create a unique string key for the position
      
      if (visitedSet.has(position)) {
        // Snake has crossed itself except at the tail
        return true;
      }
      
      visitedSet.add(position);
    }
    
    return false; // Snake rule is not broken
  }

  update() {
   

    const currentPos = this.getPosition();

    if(currentPos.x != this.lastPos.x || currentPos.y != this.lastPos.y ){
        this.positionChanges.push(currentPos);
        this.lastPos = currentPos;
    }

    if (this.checkSnakeRuleBroken(this.positionChanges)) {
        this.hasPlayerCrossedOwnLine = true;
        console.log(this.lastPos);
    }

    if (this.game.inputHandler.keys.includes("w")) {
      this.direction = "up";
    } else if (this.game.inputHandler.keys.includes("a")) {
      this.direction = "left";
    } else if (this.game.inputHandler.keys.includes("s")) {
      this.direction = "down";
    } else if (this.game.inputHandler.keys.includes("d")) {
      this.direction = "right";
    }

    if (this.x > this.game.width) {
      this.x = this.game.width;
    }

    if (this.x < 0) {
      this.x = 0;
    }

    if (this.y > this.game.height) {
      this.y = this.game.height;
    }

    if (this.y < 0) {
      this.y = 0;
    }

    if (this.direction === "right") {
      this.x += this.speed;
    } else if (this.direction === "left") {
      this.x -= this.speed;
    } else if (this.direction === "down") {
      this.y += this.speed;
    } else if (this.direction === "up") {
      this.y -= this.speed;
    }
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    this.positionChanges.forEach((posxy) => {
      ctx.lineTo(posxy.x, posxy.y);
    });
    ctx.lineTo(this.x, this.y);
    ctx.stroke();
  }
}
