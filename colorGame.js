var result = document.querySelector("#result");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#rgbDisplay");
var h1bgColor = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");
var numOfSquares = 6;
var colors = [];
var colorPicked;
colorDisplay.textContent = colorPicked;

setupModes();
setupSquares();
reset();

resetButton.addEventListener("click", function() {
	reset();
});

function setupModes() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (var i = 0; i < modeButtons.length; i++) { //removes all selected button first 
				modeButtons[i].classList.remove("selected");
			} //before selecting one
			this.classList.add("selected");
			if (this.textContent === "Easy") { //figures out how many squares to show
				numOfSquares = 3;
			} else if (this.textContent === "Hard") {
				numOfSquares = 6;
			}
		});
	}
};

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i]; //add initial colors to squares
		squares[i].addEventListener("click", function() { //add click listeners to squares
			var colorClicked = this.style.backgroundColor;
			if (colorClicked === colorPicked) {
				result.textContent = "Correct!";
				resetButton.textContent = "Play Again?";
				h1bgColor.style.backgroundColor = colorPicked;
				colorChanger(colorClicked);
			} else {
				this.style.backgroundColor = "#232323";
				result.textContent = "Try again :(";
			}
		});
	}
};

function colorChanger(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(colors) {
	var randomRGB = Math.floor(Math.random() * (colors.length));
	return colors[randomRGB];
}

function generateRandomRGB(numOfColors) {
	var arr = [];
	for (var i = 0; i < numOfColors; i++) {
		var r = Math.floor(Math.random() * (255 + 1));
		var g = Math.floor(Math.random() * (255 + 1));
		var b = Math.floor(Math.random() * (255 + 1));
		var rgb = "rgb(" + r + ", " + g + ", " + b + ")";
		arr.push(rgb);
	}
	return arr;
}

function reset() {
	h1bgColor.style.backgroundColor = "steelblue";
	colors = generateRandomRGB(numOfSquares);
	colorPicked = pickColor(colors);
	colorDisplay.textContent = colorPicked;
	resetButton.textContent = "New Colors";
	result.textContent = "";
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i]; //add initial colors to squares
		if (numOfSquares === 3) {
			squares[i + 3].style.display = "none";
		} else if (numOfSquares === 6) {
			squares[i].style.display = "block";
		}
	}
}