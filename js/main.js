/***Main Program***/

var elSudoku,
	elSolveBtn,
	elClearBtn,
	sudoku;

elSudoku = document.getElementById("sudoku");
elSolveBtn = document.getElementById("solve");
elClearBtn = document.getElementById("clear");
sudoku = new Sudoku();
//Test cases of different levels are included in js/test-cases.js
//Uncommenting the next line is an easy way of using a test case::
//sudoku = getTestCase(4);

createSudoku();
createButtons();
setOpentipStyle();
elSolveBtn.addEventListener("click", function() { solveSudoku(sudoku) });
elClearBtn.addEventListener("click", function() { clearSudoku(sudoku) });

/***Functions***/

function solveSudoku(sudoku) {
	sudoku.consoleOut();
	console.log("---Solve---");
	while (!(sudoku = sudoku.solve()))
		alert("Error(s) found in your Sudoku.\n" +
			"Please correct the error(s) before solving the Sudoku");
	sudoku.print();
	sudoku.consoleOut();
}

function clearSudoku(sudoku) {
	var userInputs,
		i;

	userInputs = document.querySelectorAll("input.usr-input");
	console.log(userInputs.length);
	for (i = 0; i < userInputs.length; i++)
		userInputs[i].removeAttribute("class");

	sudoku.reset();
	sudoku.print();
}

function createSudoku() {
	var elRow,
		elCell,
		elInput,
		dataTag;

	for (i = 1; i <= 9; i++) {
		elRow = document.createElement("tr");
		for (j = 1; j <= 9; j++) {
			elCell = document.createElement("td");
			dataTag = "data-row='" + i + "' data-col='" + j + "'";
			elCell.innerHTML = 
				"<input " + dataTag + " type='number' min='1' max='9'>";

			elInput = elCell.firstChild;
			elInput.addEventListener("blur", function() {
				sudoku.setCell(this);
				setDefaultInputStyle(this);
			});
			elInput.addEventListener("focus", function() { 
				setUserInputStyle(this);
			});

			elRow.appendChild(elCell);
		}

		elSudoku.appendChild(elRow);
	}
}

function createButtons() {
	var elParent;

	elParent = elSolveBtn.parentNode;
	// elParent.style.textAlign = "center";
}

function setOpentipStyle() {
	Opentip.styles.sudokuError = {
	 target: true,
	 tipJoint: "bottom left",
	 background: "#ff4949",
	}
}

function setUserInputStyle(elCell) {
	elCell.className = "usr-input";
}

function setDefaultInputStyle(elCell) {
	if (!elCell.value)
		elCell.removeAttribute("class");
}