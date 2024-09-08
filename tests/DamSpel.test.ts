import { DamSpel, Position } from '../src/DamSpel';

describe('DamSpel', () => {
    let game: DamSpel;

    beforeEach(() => {
        game = new DamSpel();
    });

    test('should initialize a 10x10 board with pieces in correct positions', () => {
        const board = game.getBoard();
        expect(board.length).toBe(10);
        expect(board[0].filter((cell) => cell === 'ZWART').length).toBe(5); // Black pieces in row 0
        expect(board[9].filter((cell) => cell === 'WIT').length).toBe(5); // White pieces in row 9
    });

    test('should allow valid diagonal moves for white pieces', () => {
        const moveResult = game.movePiece({ row: 6, col: 1 }, { row: 5, col: 2 });
        expect(moveResult).toBe(true);
        expect(game.getBoard()[5][2]).toBe('WIT');
        expect(game.getBoard()[6][1]).toBe(null);
    });

    test('should not be able to move back', () => {
        const invalidMoveResult = game.movePiece({ row: 6, col: 1 }, { row: 4, col: 2 });
        expect(invalidMoveResult).toBe(false);
        expect(game.getBoard()[6][1]).toBe('WIT'); // Piece didn't move
    });

    test('should switch players after a valid move', () => {
        game.movePiece({ row: 6, col: 1 }, { row: 5, col: 2 });
        expect(game.getCurrentPlayer()).toBe('Z'); // Black’s turn after White’s move
    });

    test('should prevent moving opponent’s pieces', () => {
        game.movePiece({ row: 6, col: 1 }, { row: 5, col: 2 }); // White moves
        const invalidMove = game.movePiece({ row: 2, col: 1 }, { row: 3, col: 2 }); // White tries again
        expect(invalidMove).toBe(false);
        expect(game.getCurrentPlayer()).toBe('ZWART'); // Still Black's turn
    });

    test('should hit the other side when the opportunity arises', () => {
        expect(game.getCurrentPlayer()).toBe('WIT');
        expect(game.movePiece({ row: 6, col:3 }, { row: 5, col: 4})).toBe(true);
        expect(game.getCurrentPlayer()).toBe('ZWART');
        expect(game.movePiece({ row: 3, col:0 }, { row: 4, col: 1})).toBe(true);
        expect(game.getCurrentPlayer()).toBe('WIT');
        expect(game.movePiece({ row: 5, col:4 }, { row: 4, col: 5})).toBe(true);
        expect(game.getCurrentPlayer()).toBe('ZWART');
        expect(game.movePiece({ row: 4, col:1 }, { row: 5, col: 0})).toBe(true);
        console.log(game.getBoard())
    })
});
