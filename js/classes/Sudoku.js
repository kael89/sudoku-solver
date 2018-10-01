// TODO refactor to use setter for cellsIns, valIn, availValsIn
function Sudoku(cellsIn) {
    this.create = function () {
        var valIn;
        var availValsIn;

        this.validator = new SudokuValidator(this);

        this.cells = [];
        for (var i = 0; i <= 9; i++) {
            this.cells[i] = [];
            for (var j = 0; j <= 9; j++) {
                // TODO refactor below
                // valIn = cellsIn[i][j].getVal();
                // availValsIn = cellsIn[i][j].getAvailVals();
                // cells[i][j] = new Cell(valIn, availValsIn);
                this.cells[i][j] = (i > 0 && j > 0) ? new Cell() : null;
            }
        }
    }

    this.setCell = function (cell) {
        var row = cell.getRow();
        var col = cell.getCol();
        this.cells[row][col] = cell;
    }

    this.getCell = function (row, col) {
        return this.cells[row][col];
    }

    this.getCells = function () {
        return this.cells;
    }

    // TODO refactor to use Cell object
    function setCellVal(val, row, col) {
        this.cells[row][col].setVal(val);
        applyRules(row, col);
    }

    this.reset = function () {
        create();
    }

    this.validate = function (cell) {
        return this.validator.validate(cell);
    }

    this.errsExist = function () {
        return errors;
    }

    // Applies the basic Sudoku rules to each undefined cell:
    // a) No duplicate values in the same row
    // b) No duolicate values in the same column
    // c) No duplicate values in the same square
    // Returns true in case there were changes in cell values, and false otherwise
    function applyRules(row, col) {
        var val = this.cells[row][col].getVal();
        var sqrStart = getSqrStart(row, col);
        var rowStart = sqrStart[0];
        var colStart = sqrStart[1];

        // Exclude given value from the available values of other cells in the
        // same row.
        for (var j = 1; j <= 9; j++) {
            exclude(val, row, j);
        }

        // Exclude given value from the available values of other cells in the
        // same column. 
        for (var i = 1; i <= 9; i++) {
            exclude(val, i, col);
        }

        // Exclude given value from the available values of other cells in the
        // same row
        for (i = rowStart; i <= rowStart + 2; i++) {
            for (j = colStart; j <= colStart + 2; j++) {
                exclude(val, i, j);
            }
        }
    }

    function exclude(val, row, col) {
        var cell = this.cells[row][col];
        if (cell.getVal()) {
            return;
        }

        cell.exclude(val);
        if (cell.availValsCount() === 1) {
            var newVal = cell.firstAvailVal();
            setCellVal(newVal, row, col);
        }
    }

    // Returns an array ("cell[3]") with the position and value of the next
    // available cell. We pick the first available value of the first cell with
    // the minimum number of available values in the Sudoku
    function findAvailVal() {
        var count;
        var cell = [];
        var min = 10;

        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                if (!this.cells[i][j].getVal()) {
                    count = this.cells[i][j].availValsCount();
                    if (count === 0) {
                        return cell;
                    }
                    else if (count < min) {
                        min = count;
                        cell[0] = i;
                        cell[1] = j;
                        cell[2] = this.cells[i][j].firstAvailVal();
                    }
                }
            }
        }

        return cell;
    }

    function checkRules() {
        var val;
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                val = this.cells[i][j].getVal();
                if (val && (!validateRow(val, i, j) || !validateCol(val, i, j) || !validateSqr(val, i, j))) {
                    return false;
                }
            }
        }

        return true;
    }

    function filled() {
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                if (!this.cells[i][j].getVal()) {
                    return false;
                }
            }
        }

        return true;
    }

    // Main function that handles all the tasks required for the Sudoku to be
    // solved.
    this.solve = function (val, row, col) {
        // TODO delete variable definitions below ?
        var row;
        var col;

        if (!val) {
            if (this.errsExist()) {
                return null;
            }

            for (var i = 1; i <= 9; i++) {
                for (var j = 1; j <= 9; j++) {
                    if (this.cells[i][j].getVal()) {
                        applyRules(i, j);
                    }
                }
            }
        }
        else {
            setCellVal(val, row, col);
        }

        var newCell;
        var newSudoku;
        do {
            if (!checkRules()) {
                return null;
            } else if (filled()) {
                return this;
            } else {
                newCell = findAvailVal();
                row = newCell[0];
                col = newCell[1];
                val = newCell[2];

                newSudoku = new Sudoku(this.cells).solve(val, row, col);
                exclude(val, row, col);
            }
        } while (!newSudoku);

        return newSudoku;
    }

    this.print = function () {
        var elCell,
            query;

        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                query = 'input[data-row="' + i + '"][data-col="' + j + '"]';
                elCell = document.querySelector(query);
                elCell.value = this.cells[i][j].getVal();
            }
        }
    }

    // TODO move
    // (Debugging) Prints the current Sudoku in the console
    this.consoleOut = function () {
        var val;
        var str;

        console.log('Sudoku:');

        for (var i = 1; i <= 9; i++) {
            // Line numbering, using lowercase chars (a - i)
            str = '(' + String.fromCharCode(96 + i) + ')  ';

            for (var j = 1; j <= 9; j++) {
                if (val = this.cells[i][j].getVal()) {
                    str += val + '  ';
                } else {
                    str += '   ';
                }

                if (j === 3 || j === 6) {
                    str += '|  '
                }
            }
            console.log(str);

            if (i === 3 || i === 6) {
                console.log('    --------------------------------');
            }

        }

        console.log('');
    }

    // (Testing) Sets the Sudoku values TODO DRY?
    this.setFromArray = function (arr) {
        var val;
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                if (val = arr[i][j]) {
                    if (!validateRow(val, i, j)) {
                        console.log('Row error with number ' + val + ' at row ' + i);
                        return;
                    }
                    if (!validateCol(val, i, j)) {
                        console.log('Column error with number ' + val + ' at column ' + j);
                        return;
                    }
                    if (!validateSqr(val, i, j)) {
                        console.log('Square error with number ' + val + ' at (' + row + ', ' + col + ')');
                        return;
                    }
                    this.cells[i][j] = new Cell(val);
                }
                else {
                    this.cells[i][j] = new Cell();
                }
            }
        }
    }

    // (Testing) Prints out cell value in the given row, column
    this.testCell = function (row, col) {
        console.log('Row: ' + row + ', Column: ' + col);
        this.cells[row][col].test();
    }


    // (Testing) Prints out cell values in the given row
    this.testRow = function (row) {
        console.log('Row ' + row);
        for (var j = 1; j <= 9; j++) {
            this.cells[row][j].test();
        }
    }

    // (Testing) Prints out cell values in the given column
    this.testColumn = function (col) {
        console.log('Column ' + col);
        for (var i = 1; i <= 9; i++) {
            this.cells[i][col].test();
        }
    }

    this.create();
}
