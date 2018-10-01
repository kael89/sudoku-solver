// TODO refactor to use setter for cellsIns, valIn, availValsIn
function Sudoku(cellsIn) {
    this.create = function () {
        var valIn;
        var availValsIn;

        this.validator = new SudokuValidator(this);
        this.solver = new SudokuSolver(this);

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

    // TODO refactor to use Cell object / SudokuSolver
    function setCellVal(val, row, col) {
        this.cells[row][col].setVal(val);
        applyRules(row, col);
    }

    this.errsExist = function () {
        return errors;
    }

    // TODO check if working
    this.reset = function () {
        create();
    }

    this.validate = function (cell) {
        return this.validator.validate(cell);
    }

    this.solve = function () {
        // TODO implement
        this.solver.solve();
    }

    this.print = function () {
        var elCell;
        var query;

        // TODO refactor to use elements
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

    /*** Testing ***/
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
