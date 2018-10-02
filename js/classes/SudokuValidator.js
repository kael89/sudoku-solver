function SudokuValidator() { }

SudokuValidator.getCellsToCheck = function (sudoku, cell) {
    var row = cell.getRow();
    var col = cell.getCol();
    var cellsToCheck = [];

    // Add same row cells
    for (var j = 1; j <= 9; j++) {
        if (j !== col) {
            cellsToCheck.push(sudoku.getCell(row, j));
        }
    }

    // Add same column cells
    for (var i = 1; i <= 9; i++) {
        if (i !== row) {
            cellsToCheck.push(sudoku.getCell(i, col))
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
                cellsToCheck.push(sudoku.getCell(i, j));
            }
        }
    }

    return cellsToCheck;
}

/**
 * Returns all cells from the provided Sudoku that are invalid in
 * conjuction with the provided cell
 * 
 * @param {Sudoku} sudoku 
 * @param {Cell} cell 
 * @param {Boolean} lazyMode 
 */
SudokuValidator.getInvalidCells = function (sudoku, cell, lazyMode) {
    var val = cell.getVal();
    if (val < 1 || val > 9) {
        return [cell];
    }
    var lazyMode = (lazyMode === undefined || lazyMode == true); // default: true

    var cellsToCheck = SudokuValidator.getCellsToCheck(sudoku, cell);
    var errorCells = [];

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
