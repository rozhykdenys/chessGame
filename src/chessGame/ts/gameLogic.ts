import { Board, IBoard } from "./chessBoard"; 

interface IGame {
    board: IBoard;
}

class Game implements IGame {
    board;

    constructor() {
        this.board = new Board();
    }
}

export default Game;
