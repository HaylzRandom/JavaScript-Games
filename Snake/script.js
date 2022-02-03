document.addEventListener('DOMContentLoaded', () => {
	const squares = document.querySelectorAll('.grid div');
	const scoreDisplay = document.querySelector('span');
	const startBtn = document.querySelector('.start');

	const width = 10;
	let currentIndex = 0; // 1st div in grid
	let appleIndex = 0; // 1st div in grid
	let currentSnake = [2, 1, 0]; // Div in grid 2 = Head of Snake, 1 = Body of Snake, 0 = Tail of Snake
	let direction = 1;
	let score = 0;
	let speed = 0.9;
	let intervalTime = 0;
	let interval = 0;

	// To start and restart game
	function startGame() {
		currentSnake.forEach((index) => squares[index].classList.remove('snake'));
		squares[appleIndex].classList.remove('apple');
		clearInterval(interval);
		score = 0;
		randomApple();
		direction = 1;
		scoreDisplay.innerText = score;
		intervalTime = 1000;
		currentSnake = [2, 1, 0];
		currentIndex = 0;
		currentSnake.forEach((index) => squares[index].classList.add('snake'));
		interval = setInterval(moveOutcomes, intervalTime);
	}

	// Deals with all outcomes of snake
	function moveOutcomes() {
		// snake hitting border or hitting itself
		if (
			(currentSnake[0] + width >= width * width && direction === width) || // If snake hits bottom wall
			(currentSnake[0] % width === width - 1 && direction === 1) || // If snake hits right wall
			(currentSnake[0] % width === 0 && direction === -1) || // If snake hits left wall
			(currentSnake[0] - width < 0 && direction === -width) || // If snake hits top wall
			squares[currentSnake[0] + direction].classList.contains('snake') // If snake hits itself
		) {
			alert('Game Over! Click Start to try again!');
			return clearInterval(interval); // Will clear interval if any of above statements are true
		}

		const tail = currentSnake.pop();
		squares[tail].classList.remove('snake');
		currentSnake.unshift(currentSnake[0] + direction);

		// snake eating apple
		if (squares[currentSnake[0]].classList.contains('apple')) {
			squares[currentSnake[0]].classList.remove('apple');
			squares[tail].classList.add('snake');
			currentSnake.push(tail);
			randomApple();
			score++;
			scoreDisplay.textContent = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutcomes, intervalTime);
		}

		squares[currentSnake[0]].classList.add('snake');
	}

	// Generates new apple once apple eaten or game started
	function randomApple() {
		do {
			appleIndex = Math.floor(Math.random() * squares.length);
		} while (squares[appleIndex].classList.contains('snake'));

		squares[appleIndex].classList.add('apple');
	}

	// assign functions to keycodes
	function control(e) {
		squares[currentIndex].classList.remove('snake'); // Will remove class of snake from all squares
		console.log('key pressed ' + e.keyCode);

		switch (e.code) {
			case 'ArrowRight':
				direction = 1; // If right arrow pressed, snake will move right one
				break;
			case 'ArrowUp':
				direction = -width; // If up arrow pressed, snake will go back ten divs with the appearance of moving 'up'
				break;
			case 'ArrowLeft':
				direction = -1; // If left arrow pressed, snake will move left one
				break;
			case 'ArrowDown':
				direction = +width; // If down arrow pressed, snake will go forward 10 divs with the appearance of moving 'down'
				break;
		}
	}

	document.addEventListener('keydown', control);
	startBtn.addEventListener('click', startGame);
});
