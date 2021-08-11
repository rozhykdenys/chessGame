export type TChessType = 'Pawn' | 'Rook' | 'Knight' | 'Bishop' | 'King' | 'Queen';
export type TSide = 'black' | 'white';

export interface IFigure {
    id: number;
    item: TChessType;
    side: TSide;
    x: number;
    y: number;
    image?: HTMLImageElement;
    stepsArray?: IStep[];
    draw?(x: number, y: number): void;
    recalcStepsArray?(x: number, y: number): void;
}

export interface IStep {
    x: number;
    y: number;
    item?: IFigure;
}
