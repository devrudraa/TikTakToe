//Making the necessary variables
const turnMusic = new Audio("static/ting.mp3");
const overMusic = new Audio("static/gameover.mp3");
const wonMusic = new Audio("static/gameWin.wav");
const MainInfo = document.querySelector('.MainInfo');
let scoreX = 0;
let scoreY = 0;
let boxes = document.querySelectorAll('.box');
let turn = 'X';
let wonTurn = "You";
let gameover = true;

//Making a function for changing the turn
const turnChange = () => {
    if (turn === 'X') {
        turn = 'O';
        wonTurn = 'Compute'
    }
    else {
        turn = 'X';
        wonTurn = 'You'
    }
}

// Checking if any one won or not
function won() {
    let boxtext = document.getElementsByClassName('boxText');
    let wins = [
        [0, 1, 2,   0, -5.5,   0],
        [3, 4, 5,   0,   0,   0],
        [6, 7, 8,   0,  5.5,   0],
        [0, 3, 6, -5.5,   0,  90],
        [1, 4, 7,   0,   0,  90],
        [2, 5, 8,  5.5,   0,  90],
        [0, 4, 8,   0,   0,  45],
        [2, 4, 6,   0,   0, -45],
    ]
    wins.forEach(e => {
        console.log(boxtext[e[0]].innerText);
        // console.log(e[]);
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "")) {
            console.log('Won' + turn)
            MainInfo.innerHTML = `<span class="turn">${turn}</span> Won!`;
            // document.querySelector('#dance').style.display = "block";
            $("#dance").show(500);
            gameover = false;
            document.querySelector("#line").style.transform = `translate(${e[3]}em, ${e[4]}em) rotate(${e[5]}deg)`
            document.querySelector("#line").style.width = "15em";
            wonMusic.play();
            if(turn === "X"){
                scoreX += 1;
                document.querySelector('.pointX').innerText = scoreX;
            }
            else{
                scoreY += 1;
                document.querySelector('.pointY').innerText = scoreY;
            }
        }
    })
}

//Game logic
Array.from(boxes).forEach(Element => {
    Element.addEventListener('click', (e) => {
        text = e['srcElement']['children'][0];
        if (text.innerText === "" && gameover) {
            text.innerText = turn;
            turnMusic.play();
            won();
            turnChange();
            MainInfo.innerHTML = `It's <span class="turn">${turn}</span> turn`;
        }
    })
})

// Computer turn 
function compTurn() {
    let rand;
    let boxtext = document.getElementsByClassName('boxText');
    // console.log(boxtext[0]);
    while (true) {
        rand = Math.floor((Math.random() * 8) + 0);
        // console.log(rand);
        if (boxtext[rand].innerText === "") {
            setTimeout(() => {
                boxtext[rand].innerText = turn;
                turnMusic.play();
                won();
                turnChange();
                MainInfo.innerHTML = `It's <span class="turn">${turn}</span> turn`;
            }, 500);
            break
        }
    }
}



function Reset() {
    let boxtext = document.getElementsByClassName('boxText');
    for (let i = 0; i < 9; i++) {
        boxtext[i].innerText = "";
    }
    gameover = true;
    MainInfo.innerHTML = `It's <span class="turn">X</span> turn`;
    // document.querySelector('#dance').style.display = "none";
    $("#dance").hide(500);
    turn = 'X';
    document.querySelector("#line").style.width = "0";
}