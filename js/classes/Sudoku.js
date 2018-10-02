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
        this.create();
    }

    this.validate = function (cell) {
        return this.validator.validate(cell);
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

    // Prints the current Sudoku in the console
    this.log = function () {
        var val;
        var str;

        console.log('Sudoku:');
        for (var i = 1; i <= 9; i++) {
            // Line numbering, using lowercase chars (a - i)
            str = '(' + String.fromCharCode(96 + i) + ')  ';

            for (var j = 1; j <= 9; j++) {
                val = this.cells[i][j].getVal();
                str += val ? val + '  ' : '   ';

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

    this.create();
}
