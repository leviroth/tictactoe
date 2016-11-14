var Player = function(piece, board) {
    this.piece = piece;
    this.board = board;

    this.play = function (x, y) {
        if (this.board[x][y] === null) {
            this.board[x][y] = this.piece;
            return true;
        }
        return false;
    };
};

var Game = function () {
    this.board = [[null, null, null],
                  [null, null, null],
                  [null, null, null]];
    this.players = [new Player("X", this.board), new Player("O", this.board)];
    this.turn = 0;
    this.won = false;
    this.GAMESIZE = 3;

    this.changeTurn = function () {
        this.turn ^= 1;
    };

    this.play = function (x, y) {
        if (this.won) {
            return false;
        }
        var currentPlayer = this.players[this.turn];
        var currentPiece = currentPlayer.piece;
        if (currentPlayer.play(x, y)) {
            if (this.checkWin(currentPiece)) {
                $('#message').append("Player " + currentPiece + " wins!");
                this.won = true;
            } else {
                this.changeTurn();
            }
            return currentPiece;
        }
        return false;
    };

    this.possibleWin = function (startRow, startCol, stepRow, stepCol) {
        var row = startRow;
        var col = startCol;
        var squares = [];
        for (var i = 0; i < this.GAMESIZE; i++) {
            squares.push(this.board[row][col]);
            row += stepRow;
            col += stepCol;
        }
        return squares;
    };

    this.checkPossible = function (squares, piece) {
        return squares.every(function (square) {
            return square === piece;
        });
    };

    this.checkWin = function (piece) {
        for (var i = 0; i < this.GAMESIZE; i++) {
            var row = this.possibleWin(i, 0, 0, 1);
            var col = this.possibleWin(0, i, 1, 0);
            if (this.checkPossible(row, piece) || this.checkPossible(col, piece)) {
                return true;
            }
        }
        var diag1 = this.possibleWin(0, 0, 1, 1);
        var diag2 = this.possibleWin(0, this.GAMESIZE - 1, 1, -1);
        return (this.checkPossible(diag1, piece) || this.checkPossible(diag2, piece));
    };
};
