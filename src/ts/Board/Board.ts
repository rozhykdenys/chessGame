import { saveData } from "../API/rest/games";
import { dictionary } from "../dictionary/dictionary";
import { CHESS_ITEMS } from "../Figure/CHESS_ITEMS";
import { Figure } from "../Figure/Figure";
import { IFigure, IStep } from "../Figure/IFigure";
import { Bishop } from "../Figure/Items/Bishop";
import { King } from "../Figure/Items/King";
import { Knight } from "../Figure/Items/Knight";
import { Pawn } from "../Figure/Items/Pawn";
import { Queen } from "../Figure/Items/Queen";
import { Rook } from "../Figure/Items/Rook";

export class Board {
    board: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    history: HTMLOutputElement;
    squareSize: number = 60;
    letters: string[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    numbers: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
    white: string = '#f6f6f6';
    black: string = '#444';
    green: string = '#2ad400';
    figures: IFigure[];
    redrawArray: IStep[];
    currentGame: IFigure[];
    saveDataBtn: HTMLButtonElement;
    constructor() {
        this.board = document.getElementById('board') as HTMLCanvasElement;
        this.ctx = this.board.getContext('2d');
        this.history = document.getElementById('history') as HTMLOutputElement;
        this.history.value = localStorage.getItem('history') || '';
        this.saveDataBtn = document.getElementById('saveData') as HTMLButtonElement;
        this.board.onclick = (e) => this.clickHandler(e);
        this.currentGame = JSON.parse(localStorage.getItem('currentGame'));
        this.saveDataBtn.onclick = () => saveData(this.currentGame || this.figures);
    }
    clickHandler(e: MouseEvent): void {
        const squareCoords: ClientRect = this.board.getBoundingClientRect();
        const coordX: number = e.clientX - squareCoords.left;
        const coordY: number = e.clientY - squareCoords.top;
        const clickedColumn: number = Math.trunc(coordX / this.squareSize);
        const clickedRow: number = Math.trunc(coordY / this.squareSize);

        for (const f of this.figures) {
            if (f.x === clickedRow && f.y === clickedColumn) {
                this.board.draggable = true;
                this.board.ondragstart = (e) => e.dataTransfer.setDragImage(f.image, this.squareSize / 2, this.squareSize / 2);
                this.board.ondrag = (e) => {
                    f.stepsArray.forEach((step: IStep) => {
                        step.item = this.figures.find((f: IFigure) => f.x === step.x && f.y === step.y);
                        (step.item && step.item.side !== f.side) || !step.item ? this.addHighlight(step.x, step.y) : null;
                    });
                    this.redrawArray = f.stepsArray;
                }
                this.board.ondragend = (e) => {
                    this.redrawSquare(f.x, f.y);

                    const squareCoords: ClientRect = this.board.getBoundingClientRect();
                    const dragCoordX: number = Math.trunc((e.clientX - squareCoords.left) / this.squareSize);
                    const dragCoordY: number = Math.trunc((e.clientY - squareCoords.top) / this.squareSize);

                    f.x = dragCoordY;
                    f.y = dragCoordX;

                    const correctStep: IStep = f.stepsArray.find((step: IStep) => step.x === f.x && step.y === f.y);

                    this.stepValidation(correctStep, f);
                    this.redrawArray && this.redrawArray.slice(1).forEach((step: IStep) => this.redrawSquare(step.x, step.y, step.item && step.item.image));
                    f.recalcStepsArray(f.x, f.y);
                    this.redrawSquare(f.x, f.y, f.image);
                    this.saveHistory();
                    this.board.draggable = false;
                    this.checkVictory(f);
                };
            };
        }
    }
    checkVictory(figure: IFigure): void {
        // Hardcode of the victory condition because King stands still -> @TODO Make dynamic condition
        const victoryCondition: IStep = figure.stepsArray.find(step => (step.x === 7 && step.y === 3 && figure.side === 'white') ||
        (step.x === 0 && step.y === 3 && figure.side === 'black'));

        if (victoryCondition) {
            alert(dictionary.victoryPhrase);
            this.figures.length = 0;
            this.history.value = '';
            this.saveHistory();
        }
    }
    saveHistory(): void {
        localStorage.setItem('history', this.history.value);
        localStorage.setItem('currentGame', JSON.stringify(this.figures));
    }
    stepValidation(correctStep: IStep, f: IFigure): void {
        if (!correctStep || (correctStep.item && correctStep.item.side === f.side)) {
            f.x = f.stepsArray[0].x;
            f.y = f.stepsArray[0].y;
        } else if (correctStep.item && correctStep.item.side !== f.side) {
            const killedItemIndex: number = this.figures.findIndex(figure => figure.id === correctStep.item.id);

            this.figures[killedItemIndex] = {
                id: this.figures[killedItemIndex].id,
                item: null,
                side: null,
                x: null,
                y: null
            };
            this.history.value += `${this.letters[f.y]}${this.numbers[f.x]} | `;
        } else {
            this.history.value += `${this.letters[f.y]}${this.numbers[f.x]} | `;
        }
    }
    redrawSquare(x: number, y: number, image?: HTMLImageElement): void {
        const redrawSquareX: number = y * this.squareSize;
        const redrawSquareY: number = x * this.squareSize;
        const redrawCenteredX: number = redrawSquareX + 7;
        const redrawCenteredY: number = redrawSquareY + 7;

        this.ctx.clearRect(redrawSquareX, redrawSquareY, this.squareSize, this.squareSize);
        this.ctx.fillStyle = ((x + y) % 2 === 0) ? this.white : this.black;
        this.ctx.fillRect(redrawSquareX, redrawSquareY, this.squareSize, this.squareSize);
        image && this.ctx.drawImage(image, redrawCenteredX, redrawCenteredY);
    }
    addHighlight(x: number, y: number): void {
        this.ctx.strokeStyle = this.green;
        this.ctx.lineWidth = 5;

        const squareX: number = y * this.squareSize + (this.ctx.lineWidth / 2);
        const squareY: number = x * this.squareSize + (this.ctx.lineWidth / 2);
        const highlightSize: number = this.squareSize - this.ctx.lineWidth;

        this.ctx.strokeRect(squareX, squareY, highlightSize, highlightSize);
    }
    draw(): void {
        for (let row: number = 0; row < this.numbers.length; row++) {
            for (let col: number = 0; col < this.letters.length; col++) {
                this.ctx.fillStyle = ((row + col) % 2 === 0) ? this.white : this.black;

                const x: number = col * this.squareSize;
                const y: number = row * this.squareSize;

                this.ctx.fillRect(x, y, this.squareSize, this.squareSize);
                this.drawFigures(row, col, x, y);
            }
        }
    }
    drawFigures(row: number, col: number, x: number, y: number): void {
        if (this.currentGame) {
            this.getPrevGameInfo();
        }
        this.createFigures();
        for (const f of this.figures) {
            f.image.onload = () => row === f.x && col === f.y ? f.draw(x, y) : null;
        }
    }
    getPrevGameInfo(): void {
        for (const item of this.currentGame) {
            for (const figure of CHESS_ITEMS) {
                if (figure.id === item.id) {
                    figure.x = item.x;
                    figure.y = item.y;
                }
            }
        }
    }
    createFigures(): void {
        this.figures = CHESS_ITEMS.map((f: IFigure) => {
            switch(f.item) {
                case 'Knight': return new Knight(f);
                case 'Pawn': return new Pawn(f);
                case 'Rook': return new Rook(f);
                case 'Bishop': return new Bishop(f);
                case 'King': return new King(f);
                case 'Queen': return new Queen(f);
                default: return new Figure(f);
            }
        });
    }
}

export const desk = new Board();
