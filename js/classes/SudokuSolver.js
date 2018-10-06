function SudokuSolver(sudoku) {
    this.create = function () {
        this.sudoku = sudoku;
        this.assumedCell = null;
    }

    this.getCell = function (row, col) {
        return this.sudoku.getCell(row, col);
    }

    /**
     * Applies Sudoku rules to each undefined cell
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

    this.isOriginalVariation = function () {
        return (this.assumedCell !== null);
    }

    this.createNewVariation = function () {
        var newSolver = this.clone();
        newSolver.makeCellAssumption();
        return newSolver;
    }

    this.makeCellAssumption = function () {
        var assumedCell = this.findCellToAssume();
        assumedCell.setVal(assumedCell.getNextAvailVal());
        this.assumedCell = assumedCell;

        this.applyRules(assumedCell);
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
                currentCell = this.getCell(i, j);
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

    this.rejectCellAssumption = function (assumedCell) {
        var originalCell = this.getCell(assumedCell.getRow(), assumedCell.getCol());
        this.excludeVal(originalCell, assumedCell.getVal());
    }

    /**
     * Solution strategy
     * ------------------
     * 1. Apply Sudoku rules to eliminate available values on empty cells
     * 2. If empty cells still exist, make assumptions for their values
     * 3. If the assumed values lead to a invalid Sudoku, reject them and continue
     *    with new assumptions
     * 4. Repeat steps 1-3 till the Sudoku is filled with valid values
     */
    this.solve = function () {
        // If this is the original variation, apply rules to all cells
        // If not there is no reason 
        if (this.isOriginalVariation()) {
            for (var i = 1; i <=9; i++) {
                for (var j = 1; j <= 9; j++) {
                    this.applyRules(this.getCell(i, j));
                }
            }
        }

        if (!this.sudoku.isValid()) {
            // Sudoku is not valid, stop solving it
            return null;
        } else if (this.sudoku.isFull()) {
            // Sudoku is full and valid, return it
            return this.sudoku;
        }

        var newSolver;
        var newSudoku;
        do {
            if (newSolver) {
                // If a variation was created and it was not fully solved, it means
                // a wrong assumption was made by it, so reject it
                this.rejectCellAssumption(newSolver.assumedCell);
                if (this.sudoku.isFull()) {
                    return this.sudoku.isValid() ? this.sudoku : null;
                }
            }

            newSolver = this.createNewVariation();
            newSudoku = newSolver.solve();
        } while (!newSudoku);

        return newSudoku;
    }

    this.create();
}
