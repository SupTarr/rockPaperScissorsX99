let playerOneMoveOneType;
let playerOneMoveTwoType;
let playerOneMoveThreeType;
let playerTwoMoveOneType;
let playerTwoMoveTwoType;
let playerTwoMoveThreeType;
let playerOneMoveOneValue;
let playerOneMoveTwoValue;
let playerOneMoveThreeValue;
let playerTwoMoveOneValue;
let playerTwoMoveTwoValue;
let playerTwoMoveThreeValue;

const isValidType = (moveType) => {
  return moveType === "rock" || moveType === "paper" || moveType === "scissors";
};

const isValidValue = (moveValue) => {
  return moveValue > 0 && moveValue < 100;
};

const setPlayerMoves = (
  player,
  moveOneType,
  moveOneValue,
  moveTwoType,
  moveTwoValue,
  moveThreeType,
  moveThreeValue
) => {
  if (
    !isValidType(moveOneType) ||
    !isValidValue(moveOneValue) ||
    !isValidType(moveTwoType) ||
    !isValidValue(moveTwoValue) ||
    !isValidType(moveThreeType) ||
    !isValidValue(moveThreeValue) ||
    moveOneValue + moveTwoValue + moveThreeValue > 99
  ) {
    return;
  }
  if (player === "Player One") {
    playerOneMoveOneType = moveOneType;
    playerOneMoveTwoType = moveTwoType;
    playerOneMoveThreeType = moveThreeType;
    playerOneMoveOneValue = moveOneValue;
    playerOneMoveTwoValue = moveTwoValue;
    playerOneMoveThreeValue = moveThreeValue;
  } else if (player === "Player Two") {
    playerTwoMoveOneType = moveOneType;
    playerTwoMoveTwoType = moveTwoType;
    playerTwoMoveThreeType = moveThreeType;
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeValue = moveThreeValue;
  }
};

const getMoveWinner = (
  moveOneType,
  moveOneValue,
  moveTwoType,
  moveTwoValue
) => {
  if (moveOneType === moveTwoType) {
    if (moveOneValue === moveTwoValue) {
      return "Tie";
    } else {
      return moveOneValue > moveTwoValue ? "Player One" : "Player Two";
    }
  } else {
    switch (moveOneType) {
      case "rock":
        return moveTwoType === "scissors" ? "Player One" : "Player Two";
      case "paper":
        return moveTwoType === "rock" ? "Player One" : "Player Two";
      case "scissors":
        return moveTwoType === "paper" ? "Player One" : "Player Two";
      default:
        return null;
    }
  }
};

const getRoundWinner = (round) => {
  if (
    !isValidType(playerOneMoveOneType) ||
    !isValidValue(playerOneMoveOneValue) ||
    !isValidType(playerTwoMoveOneType) ||
    !isValidValue(playerTwoMoveOneValue)
  ) {
    return null;
  }
  switch (round) {
    case 1:
      return getMoveWinner(
        playerOneMoveOneType,
        playerOneMoveOneValue,
        playerTwoMoveOneType,
        playerTwoMoveOneValue
      );
    case 2:
      return getMoveWinner(
        playerOneMoveTwoType,
        playerOneMoveTwoValue,
        playerTwoMoveTwoType,
        playerTwoMoveTwoValue
      );
    case 3:
      return getMoveWinner(
        playerOneMoveThreeType,
        playerOneMoveThreeValue,
        playerTwoMoveThreeType,
        playerTwoMoveThreeValue
      );
    default:
      return null;
  }
};

const getGameWinner = () => {
  if (
    !playerOneMoveOneType ||
    !playerOneMoveOneValue ||
    !playerOneMoveTwoType ||
    !playerOneMoveTwoValue ||
    !playerOneMoveThreeType ||
    !playerOneMoveThreeValue ||
    !playerTwoMoveOneType ||
    !playerTwoMoveOneValue ||
    !playerTwoMoveTwoType ||
    !playerTwoMoveTwoValue ||
    !playerTwoMoveThreeType ||
    !playerTwoMoveThreeValue
  ) {
    return null;
  }
  let playerOneWins = 0;
  let playerTwoWins = 0;
  for (let i = 1; i <= 3; i++) {
    let roundWinner = getRoundWinner(i);
    if (roundWinner === "Player One") {
      playerOneWins++;
    } else if (roundWinner === "Player Two") {
      playerTwoWins++;
    }
  }
  if (playerOneWins === playerTwoWins) {
    return "Tie";
  } else {
    return playerOneWins > playerTwoWins ? "Player One" : "Player Two";
  }
};

const setComputerMoves = () => {
  const moves = ["rock", "paper", "scissors"];
  const randomMove = () => {
    const randomIndex = Math.floor(Math.random() * 3);
    return moves[randomIndex];
  };
  playerTwoMoveOneType = randomMove();
  playerTwoMoveTwoType = randomMove();
  playerTwoMoveThreeType = randomMove();
  playerTwoMoveOneValue = Math.floor(Math.random() * 97) + 1;
  playerTwoMoveTwoValue =
    Math.floor(Math.random() * (98 - playerTwoMoveOneValue)) + 1;
  playerTwoMoveThreeValue = 99 - playerTwoMoveOneValue - playerTwoMoveTwoValue;
};
