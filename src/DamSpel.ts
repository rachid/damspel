export type Piece = 'ZWART' | 'WIT' | null;
export type Position = { row: number; col: number };

export class DamSpel {
    private board: Piece[][];
    private currentPlayer: Piece;

    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'WIT'; // White starts
    }

    // Initialiseren 10x10 bord
    initializeBoard(): Piece[][] {
        const board: Piece[][] = Array.from({ length: 10 }, () => Array(10).fill(null));

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 10; col++) {
                if ((row + col) % 2 !== 0) board[row][col] = 'ZWART'; // Black pieces
            }
        }

        for (let row = 6; row < 10; row++) {
            for (let col = 0; col < 10; col++) {
                if ((row + col) % 2 !== 0) board[row][col] = 'WIT'; // White pieces
            }
        }

        return board;
    }

    getBoard(): Piece[][] {
        return this.board;
    }

    getCurrentPlayer(): Piece {
        return this.currentPlayer;
    }

    movePiece(from: Position, to: Position): boolean {
        const piece = this.board[from.row][from.col];

        if (!piece) {
            console.log('Empty square selected');
            return false; // Can't move an empty square
        }
        if (piece !== this.currentPlayer) {
            console.log('This is the opponents piece');
            return false; // Can't move opponent's piece
        }

        if (this.isValidMove(from, to)) {
            this.board[to.row][to.col] = piece;
            this.board[from.row][from.col] = null;
            this.switchPlayer();
            console.info(`Now it's ${this.getCurrentPlayer()}s turn.`)
            return true;
        }

        return false;
    }

    private switchPlayer(): void {
        this.currentPlayer = this.currentPlayer === 'WIT' ? 'ZWART' : 'WIT';
    }

    // Voor het vinden van gemiste verplichte slagkans
    private hasMissedHits(): boolean {
        return false;
    }

    private isValidMove(from: Position, to: Position): boolean {
        const piece = this.board[from.row][from.col];
        if (!piece) return false;

        const rowDiff = to.row - from.row;
        const colDiff = Math.abs(to.col - from.col);

        // max 1 hokje diagonaal vooruit
        if (colDiff === 1 && ((piece === 'WIT' && rowDiff === -1) || (piece === 'ZWART' && rowDiff === 1))) {
            return this.board[to.row][to.col] === null;
        }

        return false;
    }
}
