interface ICell {
    x: number,
    y: number,
    show(): void,
    ctx: CanvasRenderingContext2D
}

export interface IBoard {
  ctx: CanvasRenderingContext2D,
  cell: Array<ICell>;
  canvas: HTMLCanvasElement,
  createCell(x: number, y: number, ctx: CanvasRenderingContext2D, color: string): void,
  createCells(): void,
  show(): void,
  makeBoard(): void 
 }

export class Board implements IBoard {
canvas= document.getElementById('chessBoard-canvas') as HTMLCanvasElement;
ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
cell: Array<ICell> = [];

constructor() {
  this.makeBoard();
}

createCell(x: number, y: number, ctx = this.ctx, color: string): void {
  this.cell.push({
    x,
    y,
    ctx,
    show() {
      this.ctx.fillStyle = color;
      this.ctx.fillRect(this.x, this.y, 100, 100);
    },
  });
}

createCells(): void {
  let cellColor;
  const darkCell = '#b48866';
  const lightCell = '#efd9b7';

  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if ((x + y) % 2 === 0) {
        cellColor = lightCell;
      } else {
        cellColor = darkCell;
      }
      this.createCell(x * 100, y * 100, this.ctx, cellColor);
    }
  }
}

show(): void {
    for (let i = 0; i < 64; i++){
        this.cell[i].show();
    }
}

makeBoard(): void {
    this.createCells();
    this.show();
    }
}
