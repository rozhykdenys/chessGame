export type Colors = 'white'| 'black'

export interface IPieces {
    column: number,
    row: number,
    color: Colors,
    move: boolean
}

export abstract class Piece implements IPieces {
    public move: boolean;

    constructor(public column: number, public row: number, public color: Colors){
        this.column = column;
        this.row = row;
        this.color = color;
        this.move = false;
    }
}
