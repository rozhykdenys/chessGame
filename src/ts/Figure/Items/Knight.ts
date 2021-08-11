import { Figure } from "../Figure";
import { IFigure, IStep } from "../IFigure";

export class Knight extends Figure {
    stepsArray: IStep[] = [
        { x: this.x, y: this.y },
        { x: this.x + 2, y: this.y + 1 },
        { x: this.x + 2, y: this.y - 1 },
        { x: this.x + 1, y: this.y + 2 },
        { x: this.x + 1, y: this.y - 2 },
        { x: this.x - 1, y: this.y + 2 },
        { x: this.x - 1, y: this.y - 2 },
        { x: this.x - 2, y: this.y + 1 },
        { x: this.x - 2, y: this.y - 1 },
    ]
    constructor(f : IFigure) {
        super(f);
    }
    recalcStepsArray(x: number, y: number) {
        this.stepsArray = [
            { x, y },
            { x: x + 2, y: y + 1 },
            { x: x + 2, y: y - 1 },
            { x: x + 1, y: y + 2 },
            { x: x + 1, y: y - 2 },
            { x: x - 1, y: y + 2 },
            { x: x - 1, y: y - 2 },
            { x: x - 2, y: y + 1 },
            { x: x - 2, y: y - 1 },
        ]
    }
}
