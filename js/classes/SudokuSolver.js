function SudokuSolver(sudoku) {
    this.create = function () {
        this.sudoku = sudoku;
        this.assumedCell = null;
    }

    this.getCell = function (row, col) {
        return this.sudoku.getCell(row, col);
    }

    /**
     * Applies the Sudoku rules to each undefined cell:
     * No duplicate values in the same row, column and square
     * 
     * @param {Cell} cell 
     */
    this.applyRules = function (cell) {
        var val = cell.getVal();
        var row = cell.getRow();
        var col = cell.getCol();

        // Exclude from the same row
        for (var j = 1; j <= 9; j++) {
            this.excludeVal(this.getCell(row, j), val);
        }

        // Exclude from the same column
        for (var i = 1; i <= 9; i++) {
            this.excludeVal(this.getCell(i, col), val);
        }

        // Exclude from the same square
        var sqrStartRow = cell.getSqrStartRow();
        var sqrStartCol = cell.getSqrStartCol();
        for (i = sqrStartRow; i <= sqrStartRow + 2; i++) {
            for (j = sqrStartCol; j <= sqrStartCol + 2; j++) {
                this.excludeVal(this.getCell(i, j), val);
            }
        }
    }

    this.excludeVal = function (cell, val) {
        cell.excludeVal(val);
        if (cell.getAvailValsCount() === 1) {
            cell.setVal(cell.getNextAvailVal());
            this.applyRules(cell);
        }
    }

    this.clone = function () {
        return new SudokuSolver(this.sudoku.clone());
    }

    this.createNewVariation = function () {
        var newSolver = this.clone();
        newSolver.makeCellAssumtion();
        return newSolver;
    }

    /**
     * Returns the cell with the minimum count of available values, in order to assume its value
     */
    this.findCellToAssume = function () {
        var minCount = 10;

        var assumedCell;
        var currentCell;
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                currentCell = this.getCells(i, j);
                if (currentCell.hasVal()) {
                    continue;
                }

                count = currentCell.getAvailValsCount();
                if (count < minCount) {
                    assumedCell = currentCell;
                    minCount = count;
                }
            }
        }

        return assumedCell;
    }

    this.makeCellAssumtion = function () {
        this.assumedCell = this.findCellToAssume();
        var assumedVal = this.assumedCell.getNextAvailVal();
        this.assumedCell.setVal(assumedVal);
    }

    this.rejectCellAssumption = function (assumedCell) {
        var originalCell = this.getCell(assumedCell.getRow(), assumedCell.getCol());
        originalCell.excludeVal(assumedCell.getVal());
    }

    /**
     * Solution strategy:
     * 1. Apply Sudoku rules to eliminate available values on empty cells
     * 2. Assume TODO continue
     */
    this.solve = function () {
        // Apply rules to all cells
        for (var i = 1; i <=9; i++) {
            for (var j = 1; j <= 9; j++) {
                this.applyRules(this.getCell(i, j));
            }
        }
        this.sudoku.log();
        console.log('$$$$$$$$$$$$$$$')
        // If Sudoku got filled and is valid, return it; else stop solving it (has invalid cells)
        if (this.sudoku.isFull()) {
            console.log('is full')
            console.log('is valid:' + this.sudoku.isValid())
            return this.sudoku.isValid() ? this.sudoku : null;
        }

        var newSolver;
        var newSudoku;
        do {
            if (newSudoku) {
                // If a variation was created and it was not fully solved, it means
                // a wrong assumption was made by it, so reject it
                this.rejectCellAssumption(newSudoku.assumedCell);
            }

            newSolver = this.createNewVariation();
            newSudoku = newSolver.solve();
        } while (!newSudoku);

        return newSudoku;
    }

    this.create();
}
