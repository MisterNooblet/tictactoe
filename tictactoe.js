const boxes = document.querySelectorAll('td');
const boxesArr = Array.from(boxes)
const p1scoretxt = document.querySelector('#p1score')
const p2scoretxt = document.querySelector('#p2score')
const resetBtn = document.querySelector('button');
const p1active = document.querySelector('#p1active')
const p2active = document.querySelector('#p2active')
let player = 1;
let moves = 0;
let p1score = 0;
let p2score = 0;
let x = 'X'
let o = 'O'
let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]


function genListeners() {// generates an event listener for each grid of the board
    boxes.forEach(element => {
        element.addEventListener('click', function () {
            if (player == 1 && this.style.backgroundColor !== 'blue' && this.style.backgroundColor !== 'red') {
                let i = boxesArr.indexOf(this)
                this.style.backgroundColor = 'blue'
                this.innerText = 'X'
                player = 0
                moves++;
                board[i] = 'X'
                p1active.classList.toggle('active')
                p2active.classList.toggle('active')
                checkWinner(x, 'Player 1')
            } else if (player == 0 && this.style.backgroundColor !== 'blue' && this.style.backgroundColor !== 'red') {
                let i = boxesArr.indexOf(this)
                this.style.backgroundColor = 'red'
                this.innerText = 'O'
                player = 1
                moves++;
                board[i] = 'O'
                p1active.classList.toggle('active')
                p2active.classList.toggle('active')
                checkWinner(o, 'Player 2')
            }
        })
    });
}
// checks if conditions are met by comparing to the board array.
//EX:
// [ X O X
//   X O X
//   X 0 0
//  ]
//////////////////////////////////////
function checkWinner(p, pname) {
    let playername = pname
    if (board[0] == p && board[1] == p && board[2] == p && moves > 1 || board[3] == p && board[4] == p && board[5] == p && moves > 1 || board[6] == p && board[7] == p && board[8] == p && moves > 1) {

        addScore(playername)
    } else if (board[0] == p && board[3] == p && board[6] == p && moves > 1 || board[1] == p && board[4] == p && board[7] == p && moves > 1 || board[2] == p && board[5] == p && board[8] == p && moves > 1) {

        addScore(playername)
        respawn()
    } else if (board[0] == p && board[4] == p && board[8] == p && moves > 1 || board[2] == p && board[4] == p && board[6] == p && moves > 1) {

        addScore(playername)
        respawn()
    } else if (moves == 9) {

        respawn()
    }
}

function addScore(player) { // Adds score to the winning player , called from checkWinner function
    if (player == 'Player 1') {
        p1score++;
        p1scoretxt.innerHTML = `Score: ${p1score}`
        celebration('Player 1')
        setTimeout(respawn, 2000)
    } else if (player == 'Player 2') {
        p2score++;
        p2scoretxt.innerHTML = `Score: ${p2score}`
        celebration('Player 2')
        setTimeout(respawn, 2000)
    }

}

function respawn() { // resets the board to default state and resets the moves counter variable back to 0
    board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    boxes.forEach(element => {
        element.style.backgroundColor = ''
        element.innerText = ''
    });
    moves = 0;
}

function celebration(player) {
    let i = 0;
    function myLoop() {
        setTimeout(function () {
            if (i < 9 && player == 'Player 2') {
                boxes[i].style.backgroundColor = 'red'
                boxes[i].innerText = 'O'
                i++;
                myLoop();
            }
            if (i < 9 && player == 'Player 1') {
                boxes[i].style.backgroundColor = 'blue'
                boxes[i].innerText = 'X'
                i++;
                myLoop();
            }
        }, 200)
    }

    myLoop();
}

resetBtn.addEventListener('click', function () { //hard resets the board and score of players
    p1score = 0;
    p2score = 0;
    p1scoretxt.innerHTML = `Score: 0`
    p2scoretxt.innerHTML = `Score: 0`
    respawn()
})
genListeners() // initiates the event listeners generation.