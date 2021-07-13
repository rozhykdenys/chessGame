import { IPieces, Piece, Colors } from "./piece";

export class King extends Piece implements IPieces {
    constructor(column: number, row: number, color: Colors){
        super(column, row, color);
        this.move = false;
    }
}
