var Player = function(piece, board) {
    this.piece = piece;
    this.board = board;

    this.play = function (x, y) {
        if (this.board[x][y] == null) {
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

    this.checkWin = function (currentPiece) {
        for (var i = 0; i < 3; i++) {
            if (this.checkRow(currentPiece, i)
                || this.checkColumn(currentPiece, i)) {
                return true;
            }
        }
        if (this.checkDiagonals(currentPiece)) {
            return true;
        }
        return false;
    };

    this.checkRow = function (currentPiece, row) {
        for (var i = 0; i < 3; i++) {
            if (this.board[row][i] != currentPiece) {
                return false;
            }
        }
        return true;
    };

    this.checkColumn = function (currentPiece, column) {
        for (var i = 0; i < 3; i++) {
            if (this.board[i][column] != currentPiece) {
                return false;
            }
        }
        return true;
    };

    this.checkDiagonals = function (currentPiece) {
        return (this.checkDiagonal1(currentPiece)
                || this.checkDiagonal2(currentPiece));
    };

    this.checkDiagonal1 = function (currentPiece) {
        for (var i = 0; i < 3; i++) {
            if (this.board[i][i] != currentPiece) {
                return false;
            }
        }
        return true;
    };

    this.checkDiagonal2 = function (currentPiece) {
        for (i = 0; i < 3; i++) {
            if (this.board[i][2 - i] != currentPiece) {
                return false;
            }
        }
        return true;
    };

}
