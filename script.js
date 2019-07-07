let doorImage1 = document.getElementById('door1');
let doorImage2 = document.getElementById('door2');
let doorImage3 = document.getElementById('door3');
let doorImages = [doorImage1, doorImage2, doorImage3];
let startButton = document.getElementById('start');
let winCountElement = document.getElementById('win-count');
let lossCountElement = document.getElementById('loss-count');

let botDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg"
let beachDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg"
let spaceDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg"
let closedDoorPath = "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg"

let numClosedDoors = 3;
let winCount = 0;
let lossCount = 0;
let gameIsOver = false;

let openDoor1;
let openDoor2;
let openDoor3;

const isBot = (door) => {
    if (door.src === botDoorPath) {
        return true
    } else {
        return false
    }
}


const isClicked = (door) => {
    if (door.src === closedDoorPath) {
        return false
    } else {
        return true
    }
}


const playDoor = (door) => {
    numClosedDoors--;
    if (numClosedDoors === 0) {
        gameOver('win')
        winCount++;
        winCountElement.innerHTML = winCount;
    } else if (isBot(door) === true) {
        gameOver('lose')
        lossCount++;
        lossCountElement.innerHTML = lossCount;
    }
}


const randomChoreDoorGenerator = () => {
    const choreDoor = Math.floor(Math.random() * numClosedDoors);
    if (choreDoor === 0) {
        openDoor1 = botDoorPath;
        openDoor2 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else if (choreDoor === 1) {
        openDoor2 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor3 = spaceDoorPath;
    } else {
        openDoor3 = botDoorPath;
        openDoor1 = beachDoorPath;
        openDoor2 = spaceDoorPath;
    }
}


randomChoreDoorGenerator();

door1.onclick = () => {
    if (!isClicked(doorImage1) && !gameIsOver) {
        doorImage1.src = openDoor1;
        playDoor(doorImage1);
    }
}


door2.onclick = () => {
    if (!isClicked(doorImage2) && !gameIsOver) {
        doorImage2.src = openDoor2;
        playDoor(doorImage2);
    }
}


door3.onclick = () => {
    if (!isClicked(doorImage3) && !gameIsOver) {
        doorImage3.src = openDoor3;
        playDoor(doorImage3);
    }
}


startButton.onclick = () => {
    if (gameIsOver) {
        startRound()
    }
}


const startRound = () => {
    for (i = 0; i < doorImages.length; i++) {
        doorImages[i].src = closedDoorPath;
    }
    numClosedDoors = 3;
    startButton.innerHTML = "Good Luck!";
    gameIsOver = false;
    randomChoreDoorGenerator()
}


const gameOver = (status) => {
    if (status === "win") {
        startButton.innerHTML = "You Win! Play Again?";
    } else {
        startButton.innerHTML = "Game Over. Play Again?";
    }
    gameIsOver = true;
}