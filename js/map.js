import { MazeGenerator } from "./mazeGenerator.js";
import * as constants from "./constants.js";

export class Map {
  constructor() {
    this.mapData = new MazeGenerator().generate();
  }
  update() {}

  draw(ctx) {
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        const field = this.mapData[y * 10 + x];
        if (field === constants.TILE_WALL) {
          ctx.fillStyle = "black";
        } else if (field === constants.TILE_START) {
          ctx.fillStyle = "yellow";
        } else if (field === constants.TILE_END) {
          ctx.fillStyle = "blue";
        } else {
          ctx.fillStyle = "white";
        }
        ctx.fillRect(x * constants.TILE_SIZE, y * constants.TILE_SIZE, constants.TILE_SIZE, constants.TILE_SIZE);
      }
    }
  }

  isPositionColliding(x,y){
    const field = this.mapData[~~(y/constants.TILE_SIZE) * 10 + ~~(x/constants.TILE_SIZE)];
    if(field === constants.TILE_WALL){
        return true;
    }
    return false;
  }
  isPositionEndTile(x,y){
    const field = this.mapData[~~(y/constants.TILE_SIZE) * 10 + ~~(x/constants.TILE_SIZE)];
    if(field === constants.TILE_END){
        return true;
    }
    return false;
  }
}

// 0 1 2
// 3 4 5
// 6 7 8
