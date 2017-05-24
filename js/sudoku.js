/***Sudoku Object***/

function Sudoku(cellsIn) {
	var cells,
		errTooltips,
		i,
		j;

	create();

	function create() {
		var valIn,
			availValsIn;

		cells = [];
		errTooltips = [];

		for (i = 1; i <= 9; i++) {
			cells[i] = [];
			errTooltips[i] = [];
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

	this.reset = function() {
		var i,
			j;

		for (i = 1; i <= 9; i++)
			for (j = 1; j <= errTooltips[i].length; j++)
				if (errTooltips[i][j])
					deleteErrTooltip(i, j);

		create();
	}

	this.setCell = function(elCell) {
		var val;

		val = elCell.value;
		row = parseInt(elCell.dataset.row);
		col = parseInt(elCell.dataset.col);

		if (!val)
			return;
		else
			cells[row][col].set(val);

		if (!checkRow(val, row, col)) {
			createErrTooltip("Row error", elCell, row, col);
		} else if (!checkCol(val, row, col))	{
			createErrTooltip("Column error", elCell, row, col);
		}	else if (!checkSqr(val, row, col))	{
			createErrTooltip("Square error", elCell, row, col);
		}	else if (errTooltips[row][col])
				deleteErrTooltip(row, col);
	}

	function createErrTooltip(errText, elCell, row, col) {
		errTooltips[row][col] = new Opentip(elCell, 
			"<span class='err-tooltip'>" + errText + "</span>",
			{ style: "sudokuError", removeElementsOnHide: "true" });

		errTooltips[row][col].show();
						console.log(errTooltips[row][col]);
						console.log(Opentip.tips);
	}

	function deleteErrTooltip(row, col) {
				errTooltips[row][col].deactivate();
				errTooltips[row][col] = null;		
	}

	function errsExist() {
		var i,
			j;

		for (i = 1; i <= 9; i++)
			for (j = 1; j <= 9; j++)
				if (errTooltips[i][j])
					return true;

		return false;
	}

	//Checks whether value "val" already exists in the given row
	function checkRow(val, row, col) {
		var j;

		for (j = 1; j <= 9; j++)
			if (val === cells[row][j].getVal() && j !== col)
				return false;

		return true;
	}

	//Checks whether value "val" already exists in the given column
	function checkCol(val, row, col) {
		var j;

		for (i = 1; i <= 9; i++)
			if (val === cells[i][col].getVal() && i !== row)
				return false;

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
			if (errsExist())
				return null;

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