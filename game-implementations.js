// Separate file for game implementations to reduce complexity in games.js

export const GAME_IMPLEMENTATIONS = {
    createSnakeGame: (containerId) => {
        const container = document.getElementById(containerId);
        const canvas = document.createElement('canvas');
        canvas.id = 'snake-game';
        canvas.width = 400;
        canvas.height = 400;
        canvas.style = 'border:3px solid #00FF00; background-color: black;';
        container.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        
        let snake = [{x: 200, y: 200}];
        let food = {x: 0, y: 0};
        let dx = 10;
        let dy = 0;
        let score = 0;

        function drawSnake() {
            ctx.fillStyle = '#00FF00';
            snake.forEach(segment => {
                ctx.fillRect(segment.x, segment.y, 10, 10);
            });
        }

        function drawFood() {
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, 10, 10);
        }

        function moveSnake() {
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                generateFood();
            } else {
                snake.pop();
            }
        }

        function generateFood() {
            food.x = Math.floor(Math.random() * 40) * 10;
            food.y = Math.floor(Math.random() * 40) * 10;
        }

        function clearCanvas() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function gameLoop() {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
        }

        document.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp': if (dy === 0) { dx = 0; dy = -10; } break;
                case 'ArrowDown': if (dy === 0) { dx = 0; dy = 10; } break;
                case 'ArrowLeft': if (dx === 0) { dx = -10; dy = 0; } break;
                case 'ArrowRight': if (dx === 0) { dx = 10; dy = 0; } break;
            }
        });

        generateFood();
        setInterval(gameLoop, 100);
    },

    createTetrisGame: (containerId) => {
        const container = document.getElementById(containerId);
        const canvas = document.createElement('canvas');
        canvas.id = 'tetris-game';
        canvas.width = 300;
        canvas.height = 600;
        canvas.style = 'border:3px solid #1E90FF; background-color: black;';
        container.appendChild(canvas);

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
    },

    // Other game implementations can be added here similarly
};