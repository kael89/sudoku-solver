function SudokuSolver(sudoku) {
    this.create = function () {
        this.sudoku = sudoku;
    }

    // Applies the basic Sudoku rules to each undefined cell:
    // a) No duplicate values in the same row
    // b) No duolicate values in the same column
    // c) No duplicate values in the same square
    // Returns true in case there were changes in cell values, and false otherwise
    this.applyRules = function (row, col) {
        var val = this.cells[row][col].getVal();
        var sqrStart = getSqrStart(row, col);
        var rowStart = sqrStart[0];
        var colStart = sqrStart[1];

        // Exclude from the same row.
        for (var j = 1; j <= 9; j++) {
            this.exclude(val, row, j);
        }

        // Exclude from the same column. 
        for (var i = 1; i <= 9; i++) {
            this.exclude(val, i, col);
        }

        // Exclude from the same row square
        for (i = rowStart; i <= rowStart + 2; i++) {
            for (j = colStart; j <= colStart + 2; j++) {
                this.exclude(val, i, j);
            }
        }
    }

    this.exclude = function (val, row, col) {
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
    this.findAvailVal = function () {
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

    this.checkRules = function () {
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

    this.isFilled = function () {
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                if (!this.cells[i][j].getVal()) {
                    return false;
                }
            }
        }

        return true;
    }

    this.solve = function (val, row, col) {
        // TODO delete variable definitions below ?
        var row;
        var col;

        if (!val) {
            // TODO use from Sudoku ??
            if (this.errsExist()) {
                return null;
            }

            for (var i = 1; i <= 9; i++) {
                for (var j = 1; j <= 9; j++) {
                    if (this.cells[i][j].getVal()) {
                        this.applyRules(i, j);
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
            if (!this.checkRules()) {
                return null;
            } else if (this.isFilled()) {
                return this;
            } else {
                newCell = this.findAvailVal();
                row = newCell[0];
                col = newCell[1];
                val = newCell[2];

                newSudoku = new Sudoku(this.cells).solve(val, row, col);
                this.exclude(val, row, col);
            }
        } while (!newSudoku);

        return newSudoku;
    }

    this.create();
}
