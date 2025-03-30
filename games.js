import { initializeGamesSection } from './game-management.js';
import { GAME_IMPLEMENTATIONS } from './game-implementations.js';

export const CLASSIC_GAMES = [
    {
        title: 'Snake',
        description: 'The classic Nokia phone game that defined mobile gaming',
        type: 'HTML5',
        embedCode: `
            <div id="snake-container"></div>
            <script type="module">
                import { GAME_IMPLEMENTATIONS } from './scripts/game-implementations.js';
                GAME_IMPLEMENTATIONS.createSnakeGame('snake-container');
            </script>
        `
    },
    {
        title: 'Tetris',
        description: 'The legendary block-stacking puzzle game',
        type: 'HTML5',
        embedCode: `
            <canvas id="tetris-game" width="300" height="600" style="border:3px solid #1E90FF; background-color: black;"></canvas>
            <script>
                const canvas = document.getElementById('tetris-game');
                const ctx = canvas.getContext('2d');
                const ROWS = 20;
                const COLS = 10;
                const BLOCK_SIZE = 30;

                const SHAPES = [
                    [[1,1,1,1]],
                    [[1,1],[1,1]],
                    [[1,1,1],[0,1,0]],
                    [[1,1,1],[1,0,0]],
                    [[1,1,1],[0,0,1]],
                    [[1,1,0],[0,1,1]],
                    [[0,1,1],[1,1,0]]
                ];

                let board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
                let currentPiece = null;
                let currentPosition = {x: 0, y: 0};

                function drawBoard() {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    for (let row = 0; row < ROWS; row++) {
                        for (let col = 0; col < COLS; col++) {
                            if (board[row][col]) {
                                ctx.fillStyle = '#1E90FF';
                                ctx.fillRect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE - 1, BLOCK_SIZE - 1);
                            }
                        }
                    }
                }

                function drawPiece() {
                    if (!currentPiece) return;
                    
                    currentPiece.forEach((row, dy) => {
                        row.forEach((value, dx) => {
                            if (value) {
                                ctx.fillStyle = 'green';
                                ctx.fillRect(
                                    (currentPosition.x + dx) * BLOCK_SIZE, 
                                    (currentPosition.y + dy) * BLOCK_SIZE, 
                                    BLOCK_SIZE - 1, 
                                    BLOCK_SIZE - 1
                                );
                            }
                        });
                    });
                }

                function newPiece() {
                    currentPiece = SHAPES[Math.floor(Math.random() * SHAPES.length)];
                    currentPosition = {x: Math.floor(COLS / 2) - Math.floor(currentPiece[0].length / 2), y: 0};
                }

                function moveDown() {
                    currentPosition.y++;
                    if (collision()) {
                        currentPosition.y--;
                        mergePiece();
                        newPiece();
                    }
                }

                function collision() {
                    for (let row = 0; row < currentPiece.length; row++) {
                        for (let col = 0; col < currentPiece[row].length; col++) {
                            if (
                                currentPiece[row][col] &&
                                (currentPosition.y + row >= ROWS ||
                                currentPosition.x + col < 0 ||
                                currentPosition.x + col >= COLS ||
                                board[currentPosition.y + row][currentPosition.x + col])
                            ) {
                                return true;
                            }
                        }
                    }
                    return false;
                }

                function mergePiece() {
                    currentPiece.forEach((row, dy) => {
                        row.forEach((value, dx) => {
                            if (value) {
                                board[currentPosition.y + dy][currentPosition.x + dx] = 1;
                            }
                        });
                    });
                }

                function gameLoop() {
                    drawBoard();
                    drawPiece();
                    moveDown();
                }

                document.addEventListener('keydown', (e) => {
                    switch(e.key) {
                        case 'ArrowLeft': 
                            currentPosition.x--;
                            if (collision()) currentPosition.x++;
                            break;
                        case 'ArrowRight': 
                            currentPosition.x++;
                            if (collision()) currentPosition.x--;
                            break;
                        case 'ArrowDown': 
                            moveDown();
                            break;
                    }
                });

                newPiece();
                setInterval(gameLoop, 500);
            </script>
        `
    },
    {
        title: 'Minesweeper',
        description: 'The classic Windows game of strategic mine-clearing',
        type: 'HTML5',
        embedCode: `
            <div id="minesweeper" style="display:inline-block; border:3px solid #FF00FF; background-color: #C0C0C0; padding: 10px;"></div>
            <script>
                const minesweeperContainer = document.getElementById('minesweeper');
                const ROWS = 10;
                const COLS = 10;
                const MINES = 15;

                let board = [];
                let revealed = [];
                let gameOver = false;

                function createBoard() {
                    // Initialize board with zeros
                    board = Array(ROWS).fill().map(() => Array(COLS).fill(0));
                    revealed = Array(ROWS).fill().map(() => Array(COLS).fill(false));

                    // Place mines randomly
                    let minesPlaced = 0;
                    while (minesPlaced < MINES) {
                        const row = Math.floor(Math.random() * ROWS);
                        const col = Math.floor(Math.random() * COLS);
                        if (board[row][col] !== -1) {
                            board[row][col] = -1;
                            minesPlaced++;
                        }
                    }

                    // Calculate neighboring mine counts
                    for (let r = 0; r < ROWS; r++) {
                        for (let c = 0; c < COLS; c++) {
                            if (board[r][c] !== -1) {
                                board[r][c] = countNeighborMines(r, c);
                            }
                        }
                    }
                }

                function countNeighborMines(row, col) {
                    let count = 0;
                    for (let r = -1; r <= 1; r++) {
                        for (let c = -1; c <= 1; c++) {
                            const newRow = row + r;
                            const newCol = col + c;
                            if (
                                newRow >= 0 && newRow < ROWS && 
                                newCol >= 0 && newCol < COLS &&
                                board[newRow][newCol] === -1
                            ) {
                                count++;
                            }
                        }
                    }
                    return count;
                }

                function renderBoard() {
                    minesweeperContainer.innerHTML = '';
                    for (let r = 0; r < ROWS; r++) {
                        const rowDiv = document.createElement('div');
                        rowDiv.style.display = 'flex';
                        for (let c = 0; c < COLS; c++) {
                            const cell = document.createElement('div');
                            cell.style.width = '30px';
                            cell.style.height = '30px';
                            cell.style.border = '1px solid #808080';
                            cell.style.display = 'flex';
                            cell.style.justifyContent = 'center';
                            cell.style.alignItems = 'center';
                            cell.style.backgroundColor = '#C0C0C0';
                            cell.dataset.row = r;
                            cell.dataset.col = c;

                            if (revealed[r][c]) {
                                cell.style.backgroundColor = '#FFFFFF';
                                if (board[r][c] === -1) {
                                    cell.textContent = '💣';
                                    cell.style.backgroundColor = 'red';
                                } else if (board[r][c] > 0) {
                                    cell.textContent = board[r][c];
                                    cell.style.color = ['blue','green','red','purple','maroon','turquoise','black','gray'][board[r][c]-1];
                                }
                            }

                            cell.addEventListener('click', () => revealCell(r, c));
                            rowDiv.appendChild(cell);
                        }
                        minesweeperContainer.appendChild(rowDiv);
                    }
                }

                function revealCell(row, col) {
                    if (gameOver || revealed[row][col]) return;

                    revealed[row][col] = true;

                    if (board[row][col] === -1) {
                        gameOver = true;
                        alert('Game Over! You hit a mine!');
                    } else if (board[row][col] === 0) {
                        // Reveal neighboring cells if zero
                        for (let r = -1; r <= 1; r++) {
                            for (let c = -1; c <= 1; c++) {
                                const newRow = row + r;
                                const newCol = col + c;
                                if (
                                    newRow >= 0 && newRow < ROWS && 
                                    newCol >= 0 && newCol < COLS &&
                                    !revealed[newRow][newCol]
                                ) {
                                    revealCell(newRow, newCol);
                                }
                            }
                        }
                    }

                    renderBoard();
                }

                createBoard();
                renderBoard();
            </script>
        `
    },
    {
        title: 'Pong',
        description: 'The classic arcade table tennis simulation',
        type: 'HTML5',
        embedCode: `
            <canvas id="pong-game" width="600" height="400" style="border:3px solid #00FF00; background-color: black;"></canvas>
            <script>
                const canvas = document.getElementById('pong-game');
                const ctx = canvas.getContext('2d');

                const PADDLE_WIDTH = 10;
                const PADDLE_HEIGHT = 100;
                const BALL_SIZE = 10;

                let leftPaddle = {y: canvas.height / 2 - PADDLE_HEIGHT / 2};
                let rightPaddle = {y: canvas.height / 2 - PADDLE_HEIGHT / 2};
                let ball = {
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    dx: 5,
                    dy: 5
                };

                function drawPaddles() {
                    ctx.fillStyle = '#00FF00';
                    ctx.fillRect(0, leftPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
                    ctx.fillRect(canvas.width - PADDLE_WIDTH, rightPaddle.y, PADDLE_WIDTH, PADDLE_HEIGHT);
                }

                function drawBall() {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(ball.x, ball.y, BALL_SIZE, BALL_SIZE);
                }

                function moveBall() {
                    ball.x += ball.dx;
                    ball.y += ball.dy;

                    // Ball collision with top/bottom
                    if (ball.y <= 0 || ball.y + BALL_SIZE >= canvas.height) {
                        ball.dy *= -1;
                    }

                    // Ball collision with paddles
                    if (
                        (ball.x <= PADDLE_WIDTH && 
                         ball.y >= leftPaddle.y && 
                         ball.y <= leftPaddle.y + PADDLE_HEIGHT) ||
                        (ball.x + BALL_SIZE >= canvas.width - PADDLE_WIDTH && 
                         ball.y >= rightPaddle.y && 
                         ball.y <= rightPaddle.y + PADDLE_HEIGHT)
                    ) {
                        ball.dx *= -1;
                    }

                    // Reset ball if it goes out of bounds
                    if (ball.x <= 0 || ball.x >= canvas.width) {
                        ball.x = canvas.width / 2;
                        ball.y = canvas.height / 2;
                    }
                }

                function gameLoop() {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                    
                    drawPaddles();
                    drawBall();
                    moveBall();
                }

                // AI paddles
                function movePaddles() {
                    // Simple AI that follows the ball
                    if (leftPaddle.y + PADDLE_HEIGHT / 2 < ball.y) {
                        leftPaddle.y += 4;
                    } else {
                        leftPaddle.y -= 4;
                    }

                    if (rightPaddle.y + PADDLE_HEIGHT / 2 < ball.y) {
                        rightPaddle.y += 4;
                    } else {
                        rightPaddle.y -= 4;
                    }

                    // Keep paddles within canvas
                    leftPaddle.y = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, leftPaddle.y));
                    rightPaddle.y = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, rightPaddle.y));
                }

                // Game loop
                setInterval(() => {
                    movePaddles();
                    gameLoop();
                }, 50);
            </script>
        `
    },
    {
        title: 'Memory Match',
        description: 'The classic memory card matching game',
        type: 'HTML5',
        embedCode: `
            <div id="memory-game" style="display: flex; flex-wrap: wrap; width: 400px; margin: 0 auto;"></div>
            <script>
                const memoryGame = document.getElementById('memory-game');
                const CARD_PAIRS = 8;
                const CARD_COLORS = [
                    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
                    '#FF00FF', '#00FFFF', '#FFA500', '#800080'
                ];

                let cards = [];
                let flippedCards = [];
                let matchedPairs = 0;

                function createCards() {
                    const cardPairs = [...CARD_COLORS, ...CARD_COLORS];
                    cardPairs.sort(() => Math.random() - 0.5);

                    cardPairs.forEach((color, index) => {
                        const card = document.createElement('div');
                        card.style.width = '80px';
                        card.style.height = '80px';
                        card.style.margin = '5px';
                        card.style.backgroundColor = 'gray';
                        card.style.cursor = 'pointer';
                        card.dataset.color = color;
                        card.dataset.matched = 'false';

                        card.addEventListener('click', () => flipCard(card));
                        memoryGame.appendChild(card);
                        cards.push(card);
                    });
                }

                function flipCard(card) {
                    if (
                        flippedCards.length >= 2 || 
                        card.dataset.matched === 'true' || 
                        flippedCards.includes(card)
                    ) return;

                    card.style.backgroundColor = card.dataset.color;
                    flippedCards.push(card);

                    if (flippedCards.length === 2) {
                        setTimeout(checkMatch, 1000);
                    }
                }

                function checkMatch() {
                    const [card1, card2] = flippedCards;

                    if (card1.dataset.color === card2.dataset.color) {
                        card1.dataset.matched = 'true';
                        card2.dataset.matched = 'true';
                        matchedPairs++;

                        if (matchedPairs === CARD_PAIRS) {
                            alert('Congratulations! You won!');
                        }
                    } else {
                        card1.style.backgroundColor = 'gray';
                        card2.style.backgroundColor = 'gray';
                    }

                    flippedCards = [];
                }

                createCards();
            </script>
        `
    },
    {
        title: 'Hangman',
        description: 'The classic word-guessing game',
        type: 'HTML5',
        embedCode: `
            <div id="hangman-game" style="text-align: center; color: #00FF00;">
                <h2>Hangman</h2>
                <div id="word-display"></div>
                <div id="hangman-drawing"></div>
                <div id="guesses"></div>
                <input type="text" id="letter-input" maxlength="1" style="width: 50px;">
                <button onclick="guessLetter()">Guess</button>
            </div>
            <script>
                const WORDS = [
                    'INTERNET', 'COMPUTER', 'WEBSITE', 'BROWSER', 
                    'NETWORK', 'SERVER', 'PYTHON', 'JAVASCRIPT'
                ];

                let currentWord = '';
                let guessedWord = [];
                let incorrectGuesses = 0;
                const MAX_GUESSES = 6;

                function initGame() {
                    currentWord = WORDS[Math.floor(Math.random() * WORDS.length)];
                    guessedWord = Array(currentWord.length).fill('_');
                    incorrectGuesses = 0;
                    updateDisplay();
                }

                function updateDisplay() {
                    const wordDisplay = document.getElementById('word-display');
                    const guessesDiv = document.getElementById('guesses');
                    
                    wordDisplay.textContent = guessedWord.join(' ');
                    guessesDiv.textContent = `Incorrect Guesses: ${incorrectGuesses}/${MAX_GUESSES}`;
                }

                function guessLetter() {
                    const letterInput = document.getElementById('letter-input');
                    const guess = letterInput.value.toUpperCase();
                    letterInput.value = '';

                    if (!guess || guess.length !== 1) return;

                    if (currentWord.includes(guess)) {
                        for (let i = 0; i < currentWord.length; i++) {
                            if (currentWord[i] === guess) {
                                guessedWord[i] = guess;
                            }
                        }
                    } else {
                        incorrectGuesses++;
                    }

                    updateDisplay();
                    checkGameStatus();
                }

                function checkGameStatus() {
                    if (guessedWord.join('') === currentWord) {
                        alert('Congratulations! You won!');
                        initGame();
                    } else if (incorrectGuesses >= MAX_GUESSES) {
                        alert(`Game Over! The word was ${currentWord}`);
                        initGame();
                    }
                }

                initGame();
            </script>
        `
    }
];

document.addEventListener('DOMContentLoaded', () => {
    initializeGamesSection(CLASSIC_GAMES, 'games');
});

export default CLASSIC_GAMES;