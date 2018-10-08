function Sudoku() {
    this.create = function () {
        this.cells = [];
        for (var i = 0; i <= 9; i++) {
            this.cells[i] = [];
            for (var j = 0; j <= 9; j++) {
                this.cells[i][j] = (i > 0 && j > 0) ? new Cell(i, j) : null;
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

    this.isFull = function () {
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                if (!this.getCell(i, j).getVal()) {
                    return false;
                }
            }
        }

        return true;
    }

    this.isValid = function () {
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                if (!SudokuValidator.validate(this, this.cells[i][j])) {
                    return false;
                }
            }
        }

        return true;
    }

    this.clone = function () {
        var newSudoku = new Sudoku();

        var newCell;
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <=9; j++) {
                newCell = this.cells[i][j].clone();
                newSudoku.setCell(newCell);
            }
        }

        return newSudoku;
    }

    // Prints the current Sudoku in the console
    this.log = function () {
        var val;
        var str;

        console.log('Sudoku:');
        for (var i = 1; i <= 9; i++) {
            // Line numbering, using lowercase chars (a - i)
            str = '(' + intToChar(i) + ')  ';

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
