// SubTask1

const board = document.getElementById("board");
const cells = document.getElementsByClassName("cell");
const msg = document.getElementById("msg");
const players = ["X", "O"];
const restartButton = document.querySelector("#restartButton")
let current = 0

enableEventListener()

// add event listeners to each cell
function enableEventListener(){
  Array.from(cells).forEach(cell => {
    cell.addEventListener('click', handleCellClick)
  })
}

// removing event listener when there is a win or tie so that the cells dont work 
function disableEventListener() {
  Array.from(cells).forEach(cell => {
    cell.removeEventListener('click', handleCellClick)
  })
}

function handleCellClick(event) {
  // Handle Cell Clicking Functionality
  const cell = event.target
  if (cell.innerHTML === '') {
    cell.innerHTML = players[current]

    if (checkWin(current) === true) {
      msg.innerHTML = `${players[current]} wins!`
      restartButton.value = `Play Again?`
      disableEventListener()
      return
    }

    if (checkTie()) {
      msg.innerHTML = `It's a Tie!`
      restartButton.value = `Play Again?`
      disableEventListener()
      return
    }

    current = (current+1)%2
    msg.innerHTML = `${players[current]}'s turn!` 
  }
  else {
    alert('Move somewhere else!')
  }
}

// SubTask2
const winningCombinations = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function checkWin(current) {
  // // Check Winning conditions
  // new info: return statement does not break the forEach loop
  for (let i = 0; i < winningCombinations.length; i++){
    const [a,b,c] = winningCombinations[i]
    if (players[current] === cells[a].textContent && players[current] === cells[b].textContent && players[current] === cells[c].textContent){
      return true
    }
  }
  return false
}

function checkTie() {
  // Check Tie conditions
  // agar koi bhi khali hai toh abhi tie nahi hua
  for(let i = 0; i < cells.length; i++) {
    if(cells[i].textContent === '') {
        return false;
    }
  }
  return true
}

// SubTask3
function restart() {
  // Restart Game Functionality
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerHTML = ''
    current = 0;
    msg.innerHTML = `X's turn!`
    console.clear()
    enableEventListener()
  }
}
