function SudokuSolver() {
    this.create = function () { }

    // Applies the basic Sudoku rules to each undefined cell:
    // No duplicate values in the same row, column and square
    // Returns true in case there were changes in cell values, and false otherwise
    // TODO refactor to use cell?
    this.applyRules = function (row, col) {
        var cell = this.getCell(row, col);
        var val = cell.getVal();

        // Exclude from the same row
        var currentCell;
        for (var j = 1; j <= 9; j++) {
            currentCell = new Cell(row, j);
            this.excludeVal(cell, val);
        }

        // Exclude from the same column
        for (var i = 1; i <= 9; i++) {
            currentCell = new Cell(i, col);
            this.excludeVal(cell, val);
        }

        // Exclude from the same square
        var sqrStartRow = cell.getSqrStartRow();
        var sqrStartCol = scell.getSqrStartCol();
        for (i = sqrStartRow; i <= sqrStartRow + 2; i++) {
            for (j = sqrStartCol; j <= sqrStartCol + 2; j++) {
                this.excludeVal(cell, i, j);
            }
        }
    }

    this.excludeVal = function (cell, val) {
        cell.excludeVal(val);
        if (cell.availValsCount() === 1) {
            var newVal = cell.getNextAvailVal();
            // TODO move to cell?
            setCellVal(newVal, row, col);
        }
    }

    // Returns an array ("cell[3]") with the position and value of the next
    // available cell. We pick the first available value of the first cell with
    // the minimum number of available values in the Sudoku
    this.assumeVal = function () {
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
                        cell[2] = this.cells[i][j].getNextAvailVal();
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

    // TODO input params ? what for?
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
                // TODO create new validator instaed of sudoku
                newSudoku = new Sudoku(this.cells).solve(val, row, col);
                

                newCell = this.findAvailVal();
                row = newCell[0];
                col = newCell[1];
                val = newCell[2];

                this.excludeVal(val, row, col);
            }
        } while (!newSudoku);

        return newSudoku;
    }

    this.create();
}
