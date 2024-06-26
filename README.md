# Knight's Tour

A simple web application to visualize the Knight's Tour problem on a chessboard. The Knight's Tour is a classic algorithmic problem in which the goal is to move a knight to every square on a chessboard exactly once.

## Project Structure

knights-tour/
│
├── index.html
├── scripts.js
├── styles.css
└── README.md

- **index.html**: The main HTML file that renders the chessboard and links to the JavaScript and CSS files.
- **scripts.js**: The JavaScript file that contains the logic for rendering the chessboard and solving the Knight's Tour problem.
- **styles.css**: The CSS file that contains the styles for the chessboard.
- **README.md**: This file, containing information about the project.

## Getting Started

### Prerequisites

To run this project locally, you need a web browser. For an optimal experience, you can use a simple HTTP server, especially if you plan to expand or modify the project.

### Running Locally

#### Directly in a Browser

1. Clone or download this repository.
2. Open the `knights-tour` folder.
3. Double-click on `index.html` to open it in your default web browser.

#### Using a Local Server

##### Using Python's HTTP Server

If you have Python installed, you can use its built-in HTTP server. Open a terminal and navigate to the `knights-tour` directory, then run:

For Python 3.x:

```sh
python -m http.server
```

For Python 2.x:

```sh
python -m SimpleHTTPServer
```

This will start a local server on port 8000. Open your browser and navigate to http://localhost:8000.

##### Using Node.js (http-server)

If you have Node.js installed, you can use the http-server package. First, install http-server globally by running:

```sh
npm install -g http-server
```

Then, navigate to your project directory in the terminal and start the server:

```sh
http-server
```

This will start a local server, typically on port 8080. Open your browser and navigate to http://localhost:8080.

## Usage

Open the application in your web browser.
Click on any cell on the chessboard to start the Knight's Tour from that position.
The knight will move through the board, attempting to visit every square exactly once. If successful, the path will be displayed on the board. If unsuccessful, `Not completed` informational message will appear.

## Project Details

### Classes and Functions

#### Chessboard

    constructor(size): Initializes the chessboard with the given size.

#### KnightTour

    constructor(chessboard): Initializes the Knight's Tour with the given chessboard.
    isSafe(x, y, board): Checks if the move is within the board and not yet visited.
    getDegree(x, y, board): Gets the number of valid moves from the given position.
    solveKTUtil(x, y, movei, board): Uses backtracking to solve the Knight's Tour problem
    solveKnightTour(x, y): Solves the Knight's Tour starting from position (x, y).

#### ChessboardRenderer

    CHESSBOARD_SIZE: Static property defining the size of the chessboard.
    render(): Renders the chessboard in the DOM.
    onCellClick(x, y): Handles the click event on a cell, initiates the Knight's Tour from the clicked position.

## New features

    Closed Tour Toggle: A checkbox to determine if the knight should return to the starting position at the end of the tour
    Chessboard Size Control: An input field to set the size of the chessboard, along with an "Apply" button to re-render the chessboard with the new size.
