const Player = function Player(piece, board) {
  this.piece = piece;
  this.board = board;

  this.play = function play(x, y) {
    if (this.board[x][y] === null) {
      this.board[x][y] = this.piece;
      return true;
    }
    return false;
  };
};

const Game = function Game() {
  this.board = [[null, null, null],
                [null, null, null],
                [null, null, null]];
  this.players = [new Player('X', this.board), new Player('O', this.board)];
  this.turn = 0;
  this.won = false;
  this.GAMESIZE = 3;

  this.changeTurn = function changeTurn() {
    this.turn ^= 1;
  };

  this.play = function play(x, y) {
    if (this.won) {
      return false;
    }
    const currentPlayer = this.players[this.turn];
    const currentPiece = currentPlayer.piece;
    if (currentPlayer.play(x, y)) {
      if (this.checkWin(currentPiece)) {
        $('#message').append(`Player ${currentPiece} wins!`);
        this.won = true;
      } else {
        this.changeTurn();
      }
      return currentPiece;
    }
    return false;
  };

  this.possibleWin = function possibleWin(startRow, startCol, stepRow, stepCol) {
    let row = startRow;
    let col = startCol;
    let squares = [];
    for (let i = 0; i < this.GAMESIZE; i++) {
      squares.push(this.board[row][col]);
      row += stepRow;
      col += stepCol;
    }
    return squares;
  };

  this.checkPossible = function checkPossible(squares, piece) {
    return squares.every(square => (square === piece));
  };

  this.checkWin = function checkWin(piece) {
    for (let i = 0; i < this.GAMESIZE; i++) {
      const row = this.possibleWin(i, 0, 0, 1);
      const col = this.possibleWin(0, i, 1, 0);
      if (this.checkPossible(row, piece) || this.checkPossible(col, piece)) {
        return true;
      }
    }
    const diag1 = this.possibleWin(0, 0, 1, 1);
    const diag2 = this.possibleWin(0, this.GAMESIZE - 1, 1, -1);
    return (this.checkPossible(diag1, piece) || this.checkPossible(diag2, piece));
  };
};
