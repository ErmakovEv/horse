let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerWidth;



let currX = 10;
let currY = 10;

let cellX = 10;
let cellY = 10;

function drawBoard() {
    ctx.fillStyle = "#777";
    ctx.fillRect( 50, 50, 900, 900);
    ctx.rect(99, 99, 802, 802);
    ctx.clearRect(100,100,800,800);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#fff';
    ctx.stroke();

    for(let i = 1; i < 9; ++i) {
        for(let j = 1; j < 9; ++j) {
            const sq = new Path2D();
            sq.rect(100 * i, 100 * j, 100, 100);
            if((i + j) % 2) {
                ctx.fillStyle = "#777";
            }
            else{
                ctx.fillStyle = "#fff";
            }
            ctx.fill(sq);
        }
    }
}

drawBoard();


let flag = false;;
canvas.addEventListener('mousemove', function(e) {

    cellX = Math.floor(e.clientX/100);
    cellY = Math.floor(e.clientY/100);
    if  (
        ((currX != cellX) || (currY != cellY)) && 
        (((cellX < 9) && (cellY < 9)) && ((cellX > 0) && (cellY > 0))) && 
        ((cellX != horseX) || (cellY != horseY)) &&
        ((cellX != preyX) || (cellY != preyY))
        ) 
    {
        const sq = new Path2D();
        sq.rect(100 * cellX, 100 * cellY, 100, 100);
        ctx.fillStyle = "#111";
        ctx.fill(sq);
        if(flag) {
            currX = 10;
            currY = 10;
            flag = false;
        }
        else {
            const sqPrev = new Path2D();
            sqPrev.rect(100 * currX, 100 * currY, 100, 100);
            ctx.fillStyle = ((currX + currY) % 2 ) ? "#777" : "#fff";
            ctx.fill(sqPrev);
            currX = cellX;
            currY = cellY;
        }
    }
})

let ptr_click = 0;
let horseX = 10;
let horseY = 10;
let preyX = 10;
let preyY = 10;


function horseDraw(x, y) {
    console.log(111)
    const sqPrev = new Path2D();
    sqPrev.rect(100 * x, 100 * y, 100, 100);
    ctx.fillStyle = ((x + y) % 2 ) ? "#777" : "#fff";
    ctx.fill(sqPrev);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = '3';
    ctx.save();
    ctx.translate(20 + (100 * x), 10 + (100 * y));
    ctx.scale(.15, .15);
    let path = new Path2D("M19 272.5l40.62 18C63.78 292.3 68.25 293.3 72.72 293.3c4 0 8.001-.7543 11.78-2.289l12.75-5.125c9.125-3.625 16-11.12 18.75-20.5L125.2 234.8C127 227.9 131.5 222.2 137.9 219.1L160 208v50.38C160 276.5 149.6 293.1 133.4 301.2L76.25 329.9C49.12 343.5 32 371.1 32 401.5V416h319.9l-.0417-192c0-105.1-85.83-192-191.8-192H12C5.375 32 0 37.38 0 44c0 2.625 .625 5.25 1.75 7.625L16 80L7 89C2.5 93.5 0 99.62 0 106V243.2C0 255.9 7.5 267.4 19 272.5zM52 128C63 128 72 137 72 148S63 168 52 168S32 159 32 148S41 128 52 128zM336 448H47.1C21.49 448 0 469.5 0 495.1C0 504.8 7.163 512 16 512h352c8.837 0 16-7.163 16-16C384 469.5 362.5 448 336 448z");
    ctx.fillStyle = "#111";
    ctx.fill(path)
    ctx.stroke(path)
    ctx.restore();
    horseX = x;
    horseY = y;
}

function preyDraw(x, y, text) {
    console.log(222)
    const sqPrev = new Path2D();
    sqPrev.rect(100 * x, 100 * y, 100, 100);
    ctx.fillStyle = ((x + y) % 2 ) ? "#777" : "#fff";
    ctx.fill(sqPrev);
    ctx.font = "48px serif";
    ctx.strokeText(text, 100 * x + 40, 100 * y + 65);
    preyX = x;
    preyY = y;
}

window.addEventListener('mousedown', (e)=>{
    ptr_click++;
    if(ptr_click === 1) {
        horseDraw(cellX, cellY);
        flag = true;

    }

    if(ptr_click === 2) {
        let ans = horse(horseX - 1, horseY - 1, cellX - 1, cellY - 1);
        preyDraw(cellX, cellY, ans);
        flag = true;
    }

    if(ptr_click === 3) {
        ptr_click = 0;
        ctx.clearRect(0, 0 , canvas.width, canvas.height);
        drawBoard();
    }
})

function creatMap(x, y, ptr, board) {
    if((x - 2 >= 0) && (y + 1 < 8)) {
        if(board[x - 2][y + 1] > ptr) {
            board[x - 2][y + 1] = ptr;
        }
    }
    if(x - 1 >= 0 && y + 2 < 8) {
        if(board[x - 1][y + 2] > ptr) {
            board[x - 1][y + 2] = ptr;
        }
    }
    if(x + 1 < 8 && y + 2 < 8) {
        if(board[x + 1][y + 2] > ptr) {
            board[x + 1][y + 2] = ptr;
        }
    }
    if(x + 2 < 8 && y + 1 < 8) {
        if(board[x + 2][y + 1] > ptr) {
            board[x + 2][y + 1] = ptr;
        }
    }
    if(x + 2 < 8 && y - 1 >= 0) {
        if(board[x + 2][y - 1] > ptr) {
            board[x + 2][y - 1] = ptr;
        }
    }
    if(x + 1 < 8 && y - 2 >= 0) {
        if(board[x + 1][y - 2] > ptr) {
            board[x + 1][y - 2] = ptr;
        }
    }
    if(x - 1 >= 0 && y - 2 >= 0) {
        if(board[x - 1][y - 2] > ptr) {
            board[x - 1][y - 2] = ptr;
        }
    }
    if(x - 2 >= 0 && y - 1 >= 0) {
        if(board[x - 2][y - 1] > ptr) {
            board[x - 2][y - 1] = ptr;
        }
    }
}

function horse(x, y, X, Y) {
    console.log("!!!")
    let board = [
        [10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10, 10, 10],
    ]
    ptr = 1;
    let flag = true;
    creatMap(x, y, ptr, board);
    while(flag) {
        flag = false;
        for(let i = 0; i < board.length; ++i) {
            for (let j = 0; j < board[i].length; ++j) {
                if (board[i][j] === ptr) {
                    creatMap(i, j, ptr + 1, board);
                    flag = true;
                }
            }
        }
        ptr++;
    }
    return board[X][Y];
}

