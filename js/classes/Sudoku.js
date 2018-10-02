function Sudoku() {
    this.create = function () {
        this.cells = [];
        for (var i = 0; i <= 9; i++) {
            this.cells[i] = [];
            for (var j = 0; j <= 9; j++) {
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
        var invalidCells;
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                invalidCells = SudokuValidator.getInvalidCells(this, this.cells[i][j]);
                if (invalidCells.length) {
                    return false;
                }
            }
        }

        return true;
    }

    this.clone = function () {
        var newSudoku = new Sudoku();

        var newCell;
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <=9; j++) {
                newCell = this.cells[i][j].clone();
                newSudoku.setCell(newCell);
            }
        }

        return newSudoku;
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
