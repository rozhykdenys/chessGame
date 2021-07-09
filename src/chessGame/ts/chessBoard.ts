const canvas = document.getElementById('chessBoard-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const cell: Array<IBoard> = [];

interface IBoard {
    x: number,
    y: number,
    show(): void,
}

function createCell(x: number, y: number, color: string): void {
    cell.push({
        x,
        y,
        show(){
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, 100, 100);
        },
    });
}

function createCells(): void {
    let cellColor;
    const darkCell = '#b48866';
    const lightCell = '#efd9b7';

    for(let x = 0; x < 8; x++){
        for(let y = 0; y < 8; y++){
            if((x + y) % 2 === 0){
                cellColor = lightCell;
            } else {
                cellColor = darkCell;
            }
            createCell(x * 100, y * 100, cellColor);
        }
    }
}

function makeBoard(): void {
    for (let i = 0; i < 64; i++){
        cell[i].show();
    }
}

export function showBoard(): void {
    createCells();
    makeBoard();
}
