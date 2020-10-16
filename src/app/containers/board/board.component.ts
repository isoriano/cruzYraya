import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  squares: any[];
  xIsNext: boolean;
  oScore = 0;
  xScore = 0;

  get player() {
    return this.xIsNext ? "x" : "o";
  }

  set winner(winner: string) {
    this._winner = winner;
    if (winner === null) {
      return;
    }
    if (winner === "x") {
      this.xScore = this.xScore + 1;
    } else {
      this.oScore = this.oScore + 1;
    }
  }

  get winner() {
    return this._winner;
  }

  private _winner: string;

  constructor() {}

  ngOnInit() {
    this.newGame();
  }

  makeMove(idx: number, autoMove: boolean) {
    if (this.winner || (this.player === "o" && !autoMove)) {
      return;
    }
    const tempPlayer = this.player;
    if (!this.squares[idx]) {
      this.squares.splice(idx, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
    if (!this.winner && tempPlayer === "x") {
      this.autoMove();
    }
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  private autoMove() {
    // TODO: Make the autoMove smart so it covers possible defeat scenarios
    const emptySquares = this.calculateEmpty();
    if (emptySquares.length === 0) {
      return;
    }
    const randomIndex = this.randomSquare(emptySquares.length);

    if (emptySquares[randomIndex] >= 0) {
      this.makeMove(emptySquares[randomIndex], true);
    }
  }

  private calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      const squareA = this.squares[a];
      if (
        squareA &&
        squareA === this.squares[b] &&
        squareA === this.squares[c]
      ) {
        return squareA;
      }
    }

    return null;
  }

  private calculateEmpty() {
    const empty = [];
    for (let index = 0; index < 9; index++) {
      if (this.squares[index] === null) {
        empty.push(index);
      }
    }

    return empty;
  }

  private randomSquare(max: number) {
    return Math.floor(Math.random() * max);
  }
}
