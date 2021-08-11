import { Figure } from "../Figure";
import { IFigure, IStep } from "../IFigure";

export class Pawn extends Figure {
    white: string = 'white';
    stepsArray: IStep[] = [
        { x: this.x, y: this.y },
        this.side === this.white? { x: this.x + 1, y: this.y } : { x: this.x - 1, y: this.y }
    ]
    constructor(f : IFigure) {
        super(f);
    }
    recalcStepsArray(x: number, y: number) {
        this.stepsArray = [
            { x, y },
            this.side === this.white? { x: x + 1, y } : { x: x - 1, y },
        ]
    }
}
