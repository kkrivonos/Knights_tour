// --- CODE SECTION START ---
// This is a chessboard class that is used to draw the chessboard
class Chessboard {
  constructor(size) {
    this.size = size; // The size of the chessboard (e.g., 5x5)
  }
}

// This class is responsible for the knight's tour calculation
class KnightTour {
  constructor(chessboard) {
    this.chessboard = chessboard;
    // All possible moves a knight can make (in L-shape)
    this.moves = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ];
    this.iterations = 0; // Counter for the number of iterations
    this.roundTrip = false; // value to set whether the Knight should return to its starting position
    this.first_x = 0; // Initial position x
    this.first_y = 0; // Initial position y
  }

  // Function to check if a move is inside the board and not yet visited
  isSafe(x, y, board) {
    return (
      x >= 0 &&
      y >= 0 &&
      x < this.chessboard.size &&
      y < this.chessboard.size &&
      board[x][y] === -1
    );
  }

  // Function to get the number of valid moves from the given position
  getDegree(x, y, board) {
    let count = 0;
    for (let i = 0; i < this.moves.length; i++) {
      const next_x = x + this.moves[i][0];
      const next_y = y + this.moves[i][1];
      if (this.isSafe(next_x, next_y, board)) {
        count++;
      }
    }
    return count;
  }

  // The main function that uses Warnsdorf's rule to solve the problem
  solveKTUtil(x, y, movei, board) {
    let next_x, next_y;

    if (movei === 1) {
      this.iterations++; // Increment the iteration counter on first iteration
      // Remember initial position
      this.first_x = x;
      this.first_y = y;
    }

    // If movei equals the number of squares, tour is complete
    if (movei === this.chessboard.size * this.chessboard.size) {
      if (this.roundTrip) {
        // Check if we can return to the starting position
        for (let i = 0; i < this.moves.length; i++) {
          if (
            this.first_x === x + this.moves[i][0] &&
            this.first_y === y + this.moves[i][1]
          ) {
            return true;
          }
        }
        return false;
      } else {
        return true;
      }
    }

    // Get the next move with the least number of onward moves
    const nextMoves = [];
    for (let k = 0; k < this.moves.length; k++) {
      next_x = x + this.moves[k][0];
      next_y = y + this.moves[k][1];
      if (this.isSafe(next_x, next_y, board)) {
        const degree = this.getDegree(next_x, next_y, board);
        nextMoves.push({ x: next_x, y: next_y, degree: degree });
      }
    }
    nextMoves.sort((a, b) => a.degree - b.degree);

    // Try all possible moves from the current position
    for (const move of nextMoves) {
      board[move.x][move.y] = movei;
      //console.log('board[move.x][move.y]: '+board[move.x][move.y]);
      // Recursively check if this move leads to a solution
      if (this.solveKTUtil(move.x, move.y, movei + 1, board)) {
        this.iterations++;
        return true;
      } else {
        board[move.x][move.y] = -1; // Backtrack if it doesn't lead to a solution
      }
    }
    return false;
  }

  // Function to solve the Knight's Tour starting from (x, y)
  solveKnightTour(x, y) {
    this.iterations = 0; // Reset the iteration counter

    //console.log('x:'+x+' y:'+y);

    // Create a 2D array to represent the board and initialize all cells to -1
    const board = Array.from({ length: this.chessboard.size }, () =>
      Array(this.chessboard.size).fill(-1)
    );

    // Start the tour from the given initial position
    board[x][y] = 0;
    console.log(
      "Starting position: " +
        `${String.fromCharCode(65 + x)}${this.chessboard.size - y}`
    );

    // Try to solve the tour starting from (x, y)
    if (!this.solveKTUtil(x, y, 1, board)) return false;

    // If the tour is complete, format the result to return cell keys
    const result = [];
    for (let i = 0; i < this.chessboard.size; i++) {
      for (let j = 0; j < this.chessboard.size; j++) {
        result[board[j][i]] = `${String.fromCharCode(65 + j)}${
          this.chessboard.size - i
        }`;
      }
    }

    return result;
  }
}

// --- CODING SECTION END ---

/**
 * This section is responsible for rendering the chessboard.
 * This can be left untouched, but if there could be some improvements
 * made, go for it. But don't forget to comment what was changed.
 *
 * Clicking on cell will kick off the `solveKnightTour()` function
 * and print out the result. Now when clicking it always returns the
 * hardcoded result of `solveKnightTour()` function.
 *
 * (You are always free to change result rendering for your custom output.)
 */
class ChessboardRenderer {
  /**
   * For faster processing chessboard with 5x5 dementions
   * are more than enough for this practice.
   */
  static CHESSBOARD_SIZE = 5;
  /**
   * Renders the full board
   */

  static render() {
    const chessboardElement = document.getElementById("chessboard");
    chessboardElement.innerHTML = "";

    // Create and attach column letters row on top of the chessboard
    const colLabelRowTop = document.createElement("tr");
    colLabelRowTop.innerHTML = '<td class="column-label"></td>';
    for (let x = 0; x < ChessboardRenderer.CHESSBOARD_SIZE; x++) {
      const colLabelCell = document.createElement("td");
      colLabelCell.textContent = String.fromCharCode(65 + x);
      colLabelRowTop.appendChild(colLabelCell);
    }
    chessboardElement.appendChild(colLabelRowTop);

    for (let y = 0; y < ChessboardRenderer.CHESSBOARD_SIZE; y++) {
      const row = document.createElement("tr");
      // create and attach row number on the left side of the chessboard
      const numberLabelCellLeft = document.createElement("td");
      numberLabelCellLeft.className = "row-label";
      numberLabelCellLeft.textContent = ChessboardRenderer.CHESSBOARD_SIZE - y;
      row.appendChild(numberLabelCellLeft);
      for (let x = 0; x < ChessboardRenderer.CHESSBOARD_SIZE; x++) {
        // create and attach cell element
        const cell = document.createElement("td");
        cell.id = `${String.fromCharCode(65 + x)}${
          ChessboardRenderer.CHESSBOARD_SIZE - y
        }`;
        cell.className = (y + x) % 2 === 0 ? "light" : "dark";
        cell.addEventListener("click", () => this.onCellClick(x, y));
        row.appendChild(cell);
      }
      // create and attach row number on the right side of the chessboard
      const numberLabelCellRight = document.createElement("td");
      numberLabelCellRight.className = "row-label";
      numberLabelCellRight.textContent = ChessboardRenderer.CHESSBOARD_SIZE - y;
      row.appendChild(numberLabelCellRight);
      // append generated cells row
      chessboardElement.appendChild(row);
    }
    // create and attach column letters row at the bottom of the chessboard
    const colLabelRowBottom = document.createElement("tr");
    colLabelRowBottom.innerHTML = '<td class="column-label"></td>';
    for (let x = 0; x < ChessboardRenderer.CHESSBOARD_SIZE; x++) {
      const colLabelCell = document.createElement("td");
      colLabelCell.textContent = String.fromCharCode(65 + x);
      colLabelRowBottom.appendChild(colLabelCell);
    }
    chessboardElement.appendChild(colLabelRowBottom);
  }
  /**
   * Handles on cell click even to start Knight's Tour calculation
   */
  static onCellClick(x, y) {
    ChessboardRenderer.render();
    const chessboard = new Chessboard(ChessboardRenderer.CHESSBOARD_SIZE);
    const knightTour = new KnightTour(chessboard);
    new Promise((resolve, reject) => {
      const result = knightTour.solveKnightTour(x, y);
      return result ? resolve(result) : reject();
    })
      .then((result) => {
        console.log(`Number of iterations: ${knightTour.iterations}`); // Log the number of iterations
        const chessboardElement = document.getElementById("chessboard");
        if (result instanceof Array) {
          result.forEach((key, idx) => {
            // find by cell key and attach step number following the result
            const cellElement = document.getElementById(key);
            if (cellElement) {
              // crete element with step to display
              const keyTextElement = document.createElement("span");
              keyTextElement.textContent = idx + 1;
              cellElement.appendChild(keyTextElement);
            }
          });
        }
        // create and attach result output at the bottom of chessboard
        const row = document.createElement("tr");
        const resultElement = document.createElement("td");
        resultElement.colSpan = ChessboardRenderer.CHESSBOARD_SIZE + 2;
        resultElement.textContent =
          result instanceof Array
            ? result.map((key, idx) => `${idx + 1}. ${key}`).join("; ")
            : result;
        row.appendChild(resultElement);
        chessboardElement.appendChild(row);
      })
      .catch(() => {
        console.log(`Number of iterations: ${knightTour.iterations}`); // Log the number of iterations on failure
        const chessboardElement = document.getElementById("chessboard");
        // create and attach result output at the bottom of chessboard
        const row = document.createElement("tr");
        const resultElement = document.createElement("td");
        resultElement.colSpan = ChessboardRenderer.CHESSBOARD_SIZE + 2;
        resultElement.textContent = `Not completed`;
        row.appendChild(resultElement);
        chessboardElement.appendChild(row);
      });
  }
}
ChessboardRenderer.render();
