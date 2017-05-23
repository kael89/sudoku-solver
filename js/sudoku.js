var elSudoku,
	elSolveBtn,
	sudoku;

elSudoku = document.getElementById("sudoku");
elSolveBtn = document.getElementById("solve");
sudoku = new Sudoku();
//Test cases of different levels are included in js/test-cases.js
//Uncommenting the next line is an easy way of using a test case::
//sudoku = getTestCase(4);

createSudoku();
createSolveBtn();
setOpentipStyle();
elSolveBtn.addEventListener("click", function() { solveSudoku(sudoku) });

/*********************/
/***Sudoku Solving***/
/********************/

function solveSudoku(sudoku) {
	sudoku.consoleOut();
	console.log("---Solve---");
	sudoku = sudoku.solve();
	sudoku.print();
	sudoku.consoleOut();
}

/*************/
/***Objects***/
/*************/

/***Cell Object***/
function Cell(value, availValues) {
	var 
		//Value of the cell
		val,
		//Boolean array stating whether a number is available for the given cell. 
		//For example, if availVals[2] == false, then 2 is not an available value
		availVals;

	create();

	function create() {
		var i;

		availVals = [];

		!value ? val = null : val = value

		for (i = 1; i <= 9; i++)
			!availValues ? availVals[i] = true : availVals[i] = availValues[i];
	}

	this.set = function(newVal) {
		val = newVal;
		availVals = null;
	}

	this.getVal = function() {
		return val;
	}

	this.getAvailVals = function() {
		return availVals;
	}

	//Excludes a given number from the available cell values
	this.exclude = function(num) {
		availVals[num] = false;
	}

	//Returns the number of available values
	this.availValsCount = function() {
		var count,
			i;

		count = 0;

		if (availVals) {
			for (i = 1; i <= 9; i++)
				if (availVals[i])
					count++;
		}

		return count;
	}

	//Returns the first number that is available for the cell, or 0 is there is 
	//none
	this.firstAvailVal = function() {
		var i;

		for (i = 1; i <= 9; i++)
			if (availVals[i])
				return i;

		return 0;
	}

	//(Testing) Prints out current cell values 
	this.test = function() {
		val ? console.log(val) : console.log(availVals);
	}
}


/***Sudoku Object***/
function Sudoku(cellsIn) {
	var cells,
		i,
		j;

	create();

	function create() {
		var valIn,
			availValsIn;

		cells = [];

		for (i = 1; i <= 9; i++) {
			cells[i] = [];
			for (j = 1; j <= 9; j++ ) {
				if (cellsIn) {
					valIn	= cellsIn[i][j].getVal();
					availValsIn = cellsIn[i][j].getAvailVals();
					cells[i][j] = new Cell(valIn, availValsIn);
				}
				else
					cells[i][j] = new Cell();			
			}
		}
	}

	this.setCell = function(elCell) {
		var val,
			errTooltip;

		val = elCell.value;
		row = elCell.dataset.row;
		col = elCell.dataset.col;

		if (!val)
			return;

		if (!checkRow(val, row, col)) {
			errTooltip = new Opentip(elCell, 
				"<span class='err-tooltip'>Row error</span>",
				{ style: "sudokuError" });
			errTooltip.show();
		} else if (!checkCol(val, row, col))	{
			errTooltip = new Opentip(elCell, 
				"<span class='err-tooltip'>Column error</span>",
				{ style: "sudokuError" });
			errTooltip.show();
		}	else if (!checkSqr(val, row, col))	{
			errTooltip = new Opentip(elCell, 
				"<span class='err-tooltip'>Square error</span>",
				{ style: "sudokuError" });
			errTooltip.show();
		}	else (checkRow(val, row, col))
			setVal(val, row, col);
	}

	//Checks whether value "val" already exists in the given row
	function checkRow(val, row, col) {
		var j;

		for (j = 1; j <= 9; j++) {
			if (val === cells[row][j].getVal() && j !== col)
				return false;
		}

		return true;
	}

	//Checks whether value "val" already exists in the given column
	function checkCol(val, row, col) {
		var j;

		for (i = 1; i <= 9; i++) {
			if (val === cells[i][col].getVal() && i !== row)
				return false;
		}

		return true;
	}

	//Checks whether value "val" already exists in the containing square
	function checkSqr(val, row, col) {
		var sqrStart,
			rowStart,
			colStart,
			i,
			j;

		sqrStart = getSqrStart(row, col);
		rowStart = sqrStart[0];
		colStart = sqrStart[1];

		for (i = rowStart; i <= rowStart + 2; i++)
			for (j = colStart; j <= colStart + 2; j++)
				if (val === cells[i][j].getVal() && (i!== row || j !== col))
					return false;

		return true;
	}

	//For a given position in the table, returns the coordinates (row, column)
	// of the top left cell of the containing square
	function getSqrStart(row, col) {
		var sqrNum,
			rowStart,
			colStart,
			limits,

		limits = [];

		if (row < 4)
			rowStart = 1;
		else if (row < 7)
			rowStart = 4;
		else
			rowStart = 7;

		if (col < 4)
			colStart = 1;
		else if (col < 7)
			colStart = 4;
		else
			colStart = 7;

		limits[0] = rowStart;
		limits[1] = colStart;
		return limits;
	}

	function setVal(val, row, col) {
		cells[row][col].set(val);
		applyRules(row, col);
	}

	//Applies the basic Sudoku rules to each undefined cell:
	// a) No duplicate values in the same row
	// b) No duolicate values in the same column
	// c) No duplicate values in the same square
	//Returns true in case there were changes in cell values, and false otherwise
	function applyRules(row, col) {
		var val,
			sqrStart,
			rowStart,
			colStart,
			i,
			j;

		val = cells[row][col].getVal();
		sqrStart = getSqrStart(row, col);
		rowStart = sqrStart[0];
		colStart = sqrStart[1];

		//Exclude given value from the available values of other cells in the
		//same row.
		for (j = 1; j <= 9; j++)
			exclude(val, row, j);

		//Exclude given value from the available values of other cells in the
		//same column. 
		for (i = 1; i <= 9; i++)
			exclude(val, i, col);

		//Exclude given value from the available values of other cells in the
		//same row
		for (i = rowStart; i <= rowStart + 2; i++)
			for (j = colStart; j <= colStart + 2; j++)
				exclude(val, i, j);
	}

	function exclude(val, row, col) {
		var cell,
			newVal;

		cell = cells[row][col];
		if (cell.getVal())
			return;

		cell.exclude(val);
		if (cell.availValsCount() === 1) {
			newVal = cell.firstAvailVal();
			setVal(newVal, row, col);
		}
	}

	//Returns an array ("cell[3]") with the position and value of the next
	//available cell. We pick the first available value of the first cell with
	//the minimum number of available values in the Sudoku
	function findAvailVal() {
		var count,
			cell,
			min,
			i,
			j;


		cell = [];
		min = 10;

		for (i = 1; i<= 9; i++)
			for (j = 1; j <= 9; j++)
				if (!cells[i][j].getVal()) {
					count = cells[i][j].availValsCount();
					if (count === 0)
						return cell;
					else if (count < min) {
						min = count;
						cell[0] = i;
						cell[1] = j;
						cell[2] = cells[i][j].firstAvailVal();
					}
				}

		return cell;
	}

	function checkRules() {
		var rules,
			val,
			i,
			j;

		for (i = 1; i <= 9; i++)
			for (j = 1; j <= 9; j++) {
				val = cells[i][j].getVal();
				if (val && (!checkRow(val, i, j) || !checkCol(val, i, j) || 
					!checkSqr(val, i, j)))
					return false;
			}

		return true;
	}

	function filled() {
		var i,
			j;

		for (i = 1; i <= 9; i++)
			for (j = 1; j <= 9; j++)
				if (!cells[i][j].getVal())
					return false;

		return true;
	}

	//Main function that handles all the tasks required for the Sudoku to be
	//solved.
	this.solve = function(val, row, col) {
		var newCell,
			tempCell,
			newSudoku,
			row,
			col,
			i,
			j;

		if (!val) {
			for (i = 1; i <= 9; i++)
				for (j = 1; j <= 9; j++)
					if (cells[i][j].getVal())
						applyRules(i, j);
		}
		else
			setVal(val, row, col);

		do {
			if (!checkRules())
				return null;
			else if (filled())
				return this;
			else {
				newCell = findAvailVal();
				row = newCell[0];
				col = newCell[1];
				val = newCell[2];

				newSudoku = new Sudoku(cells).solve(val, row, col);
				exclude(val, row, col);		
			}
		} while (!newSudoku);

		return newSudoku;
}

	this.print = function() {
		var elCell,
			query,
			i,
			j;

		for (i = 1; i <= 9; i++)
			for (j = 1; j <= 9; j++) {
				query = "input[data-row='" + i + "'][data-col='" + j + "']";
				elCell = document.querySelector(query);
				elCell.value = cells[i][j].getVal();
			}
	}

	//(Debugging) Prints the current Sudoku in the console
	this.consoleOut = function() {
		var val,
			str,
			i,
			j;

		console.log("Sudoku:");

		for (i = 1; i <= 9; i++) {
			//Line numbering, using lowercase chars (a - i)
			str = "(" + String.fromCharCode(96 + i) + ")  ";

			for (j = 1; j <= 9; j++) {
				if (val = cells[i][j].getVal())
					str += val + "  ";
				else
					str += "   ";

				if (j === 3 || j === 6)
					str += "|  "
			}			
			console.log(str);

			if (i === 3 || i === 6)
				console.log("    --------------------------------");

		}

		console.log("");
	}

	//(Testing) Sets the Sudoku values !!!DRY?
	this.setFromArray = function(arr) {
		var val,
			i,
			j;

		for (i = 1; i <= 9; i++)
			for (j = 1; j <= 9; j++)	{
				if (val = arr[i][j]) {
					if (!checkRow(val, i, j)) {
						console.log("Row error with number " + val + " at row " + i);
						return;
					}
					if (!checkCol(val, i, j)) {
						console.log("Column error with number " + val + " at column " + j);
						return;
					}
					if (!checkSqr(val, i, j)) {
						console.log("Square error with number " + val + " at (" + row + 
							", " + col + ")");
						return;
					}
					cells[i][j] = new Cell(val);
				}
				else
					cells[i][j] = new Cell();
			}
 	}

 	//(Testing) Prints out cell value in the fiven row, column
 	this.testCell = function(row, col) {
 		console.log("Row: " + row + ", Column: " + col);
 		cells[row][col].test();
 	}


 	//(Testing) Prints out cell values in the given row
 	this.testRow = function(row) {
 		var j;

 		console.log("Row " + row);
 		for (j = 1; j <= 9; j++)
			cells[row][j].test();
	}

 	//(Testing) Prints out cell values in the given column
	this.testColumn = function(col) {
 		var i;

 		console.log("Column " + col);
 		for (i = 1; i <= 9; i++)
			cells[i][col].test();
	}
}


/**********************/
/***DOM Manipulation***/
/**********************/

function createSudoku() {
	var elRow,
		elCell,
		dataTag;

	for (i = 1; i <= 9; i++) {
		elRow = document.createElement("tr");
		for (j = 1; j <= 9; j++) {
			elCell = document.createElement("td");
			dataTag = "data-row='" + i + "' data-col='" + j + "'";
			elCell.innerHTML = 
				"<input " + dataTag + " type='number' min='1' max='9'>";
			elCell.firstChild.addEventListener("blur", function() { 
				sudoku.setCell(this) 
			});
			elRow.appendChild(elCell);
		}

		elSudoku.appendChild(elRow);
	}
}

function createSolveBtn() {
	var elParent;

	elParent = elSolveBtn.parentNode;
	elParent.style.width = elSudoku.offsetWidth + "px";
	elParent.style.textAlign = "center";
}

function setOpentipStyle() {

	Opentip.styles.sudokuError = {
	 target: true,
	 tipJoint: "bottom left",
	 background: "#ff4949",
	}
}