import { desk } from "../Board/Board";
import { TChessType, TSide, IFigure, IStep } from "./IFigure";

export class Figure implements IFigure {
    id: number;
    side: TSide;
    item: TChessType;
    image: HTMLImageElement;
    x: number;
    y: number;
    stepsArray: IStep[];
    constructor({id, side, item, x, y} : IFigure) {
        this.id = id;
        this.side = side;
        this.item = item;
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = `./src/img/chess-icons/${this.side}-${this.item}.svg`;
        this.stepsArray = [
            { x: this.x, y: this.y }
        ]
    }
    draw(x: number, y: number): void {
        const centerX: number = x + 7;
        const centerY: number = y + 7;
        return desk.ctx.drawImage(this.image, centerX, centerY);
    }
    recalcStepsArray(x: number, y: number) {
        this.stepsArray = [
            { x, y }
        ]
    }
}
