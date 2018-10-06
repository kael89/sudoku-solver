function SudokuValidator() { }

SudokuValidator.getCellsToCheck = function (sudoku, cell) {
    var row = cell.getRow();
    var col = cell.getCol();
    var cellsToCheck = [];
    var currentCell;

    // Add same row cells
    for (var j = 1; j <= 9; j++) {
        currentCell = sudoku.getCell(row, j);
        if (currentCell.hasVal() && j !== col) {
            cellsToCheck.push(currentCell);
        }
    }

    // Add same column cells
    for (var i = 1; i <= 9; i++) {
        currentCell = sudoku.getCell(i, col);
        if (currentCell.hasVal() && i !== row) {
            cellsToCheck.push(currentCell);
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
            currentCell = sudoku.getCell(i, j);
            if (currentCell.hasVal() && j !== col) {
                cellsToCheck.push(sudoku.getCell(i, j));
            }
        }
    }

    return cellsToCheck;
}

SudokuValidator.validate = function (sudoku, cell) {
    var invalidCells = SudokuValidator.getInvalidCells(sudoku, cell, true);
    return invalidCells.length === 0;
}

/**
 * Returns all cells from the provided Sudoku that are invalid in
 * conjunction with the provided cell
 * 
 * @param {Sudoku} sudoku 
 * @param {Cell} cell 
 * @param {Boolean} lazyMode Default: false
 */
SudokuValidator.getInvalidCells = function (sudoku, cell, lazyMode) {
    var errorCells = [];

    var val = cell.getVal();
    if (val === '' || val === undefined) {
        return errorCells;
    }
    if (val < 1 || val > 9) {
        return [cell];
    }

    if (lazyMode === undefined) {
        lazyMode = false;
    }

    var cellsToCheck = SudokuValidator.getCellsToCheck(sudoku, cell);

    for (var i = 0; i < cellsToCheck.length; i++) {
        if (val !== cellsToCheck[i].getVal()) {
            continue;
        }

        // Error cell found
        errorCells.push(cellsToCheck[i]);
        if (lazyMode) {
            break;
        }
    }

    return errorCells;
}
