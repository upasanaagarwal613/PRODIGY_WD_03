let board=["","","","","","","","",""];
let currentPlayer="X";
let gameActive=false;
let xScore=0;
let oScore=0;
let totalRounds=3;
let roundsPlayed=0;

const boardDiv=document.getElementById("board");
const statusDiv=document.getElementById("status");

document.getElementById("roundSelect").addEventListener("change",e=>{
  document.getElementById("customRounds").style.display =
  e.target.value==="custom"?"inline-block":"none";
});

function startMatch(){
  const val=document.getElementById("roundSelect").value;

  totalRounds = val==="custom"
    ? parseInt(document.getElementById("customRounds").value)||3
    : parseInt(val);

  xScore=0;
  oScore=0;
  roundsPlayed=0;
  gameActive=true;
  currentPlayer="X";

  updateScore();
  resetBoard();

  statusDiv.textContent="Player X's turn";
}

function drawBoard(){
  boardDiv.innerHTML="";
  board.forEach((cell,i)=>{
    const div=document.createElement("div");
    div.className="cell";
    div.textContent=cell;
    div.onclick=()=>move(i);
    boardDiv.appendChild(div);
  });
}

function move(i){
  if(!gameActive || board[i]) return;

  board[i]=currentPlayer;
  drawBoard();

  const winCombo=checkWin();
  if(winCombo){
    highlight(winCombo);
    winRound(currentPlayer);
    return;
  }

  if(board.every(c=>c)){
    roundsPlayed++;
    statusDiv.textContent="Round Draw!";
    setTimeout(resetBoard,1200);
    return;
  }

  currentPlayer=currentPlayer==="X"?"O":"X";
  statusDiv.textContent=`Player ${currentPlayer}'s turn`;
}

const wins=[
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

function checkWin(){
  for(let combo of wins){
    if(combo.every(i=>board[i] && board[i]===board[combo[0]]))
      return combo;
  }
  return null;
}

function highlight(combo){
  const cells=document.querySelectorAll(".cell");
  combo.forEach(i=>cells[i].classList.add("highlight"));
}

function winRound(player){
  roundsPlayed++;

  if(player==="X") xScore++;
  else oScore++;

  updateScore();

  if(roundsPlayed === totalRounds){
    declareWinner();
    return;
  }

  statusDiv.textContent=`Player ${player} wins round!`;
  setTimeout(resetBoard,1200);
}

function declareWinner(){
  if(xScore>oScore)
    statusDiv.textContent="🏆 Player X Wins Match!";
  else if(oScore>xScore)
    statusDiv.textContent="🏆 Player O Wins Match!";
  else
    statusDiv.textContent="Match Draw!";

  gameActive=false;
}

function resetBoard(){
  board=["","","","","","","","",""];
  currentPlayer="X";
  drawBoard();
  if(gameActive)
  statusDiv.textContent="Player X's turn";
}

function updateScore(){
  document.getElementById("xScore").textContent=xScore;
  document.getElementById("oScore").textContent=oScore;
}

function resetMatch(){
  xScore=0;
  oScore=0;
  roundsPlayed=0;
  gameActive=false;
  updateScore();
  resetBoard();
  statusDiv.textContent="Match reset. Start again!";
}

drawBoard();
