function SudokuValidator(sudoku, lazyMode) {
    this.create = function () {
        this.sudoku = sudoku;
        this.lazyMode = (lazyMode === undefined || lazyMode == true); // default: true
    }

    this.isLazyModeEnabled = function () {
        return this.lazyMode;
    }

    this.getCell = function (row, col) {
        return this.sudoku.getCell(row, col);
    }

    this.getCellsToCheck = function (cell) {
        var row = cell.getRow();
        var col = cell.getCol();
        var cellsToCheck = [];

        // Add same row cells
        for (var j = 1; j <= 9; j++) {
            if (j !== col) {
                cellsToCheck.push(this.getCell(row, j));
            }
        }

        // Add same column cells
        for (var i = 1; i <= 9; i++) {
            if (i !== row) {
                cellsToCheck.push(this.getCell(i, col))
            }
        }

        // Add same square cells. Ignore cells already added before (same row or column)
        var sqrStartRow = cell.getSqrStartRow();
        var sqrStartCol = cell.getSqrStartCol();
        for (i = sqrStartRow; i <= sqrStartRow + 2; i++) {
            if (i === row) {
                continue;
            }

            for (j = sqrStartCol; j <= sqrStartCol + 2; j++) {
                if (j !== col) {
                    cellsToCheck.push(this.getCell(i, j));
                }
            }
        }

        return cellsToCheck;
    }

    this.validate = function (cell) {
        var val = cell.getVal();
        if (val < 1 || val > 9) {
            return [cell];
        }

        var cellsToCheck = this.getCellsToCheck(cell);
        var errorCells = [];

        for (var i = 0; i < cellsToCheck.length; i++) {
            if (val !== cellsToCheck[i].getVal()) {
                continue;
            }

            // Error cell found
            errorCells.push(cellsToCheck[i]);
            if (this.isLazyModeEnabled()) {
                break;
            }
        }

        return errorCells;
    }

    this.create();
}
