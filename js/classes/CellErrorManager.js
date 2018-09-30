function CellErrorManager() {
    this.create = function () {
        this.initErrors();
    }

    this.initErrors = function () {
        this.errors = [];
        for (var i = 0; i <= 9; i++) {
            this.errors[i] = [];
            for (var j = 0; j <= 9; j++) {
                this.errors[i][j] = (i > 0 && j > 0) ? [] : null;
            }
        }
    }

    this.hasCellErrors = function (row, col) {
        return this.errors[row][col].length;
    }

    this.addErrors = function (cell, errorCells) {
        this.errors[cell.getRow()][cell.getCol()] = errorCells;
        cell.addError();

        var currentCell;
        for (var i = 0; i < errorCells.length; i++) {
            currentCell = errorCells[i];
            this.errors[currentCell.getRow()][currentCell.getCol()].push(cell);
            currentCell.addError();
        }
    }

    this.removeErrors = function (cell) {
        var errorCells = this.errors[cell.getRow()][cell.getCol()];

        var currentCell;
        var currentErrors;
        for (var i = 0; i < errorCells.length; i++) {
            currentCell = errorCells[i];
            currentErrors = this.errors[currentCell.getRow()][currentCell.getCol()];

            currentErrors.splice(currentErrors.indexOf(cell), 1);
            if (!currentErrors.length) {
                this.removeError(currentCell);
            }
        }

        this.removeError(cell);
    }

    this.removeError = function (cell) {
        cell.removeError();
        this.errors[cell.getRow()][cell.getCol()] = [];
    }

    this.updateErrors = function (cell, errorCells) {
        if (errorCells.length) {
            this.addErrors(cell, errorCells);
        } else {
            this.removeErrors(cell);
        }
    }

    this.create();
}
