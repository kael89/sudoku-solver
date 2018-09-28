function CellErrorManager() {
    this.create = function () {
        this.initErrors();
    }

    this.initErrors = function () {
        this.errors = [];
        for (var i = 1; i <= 9; i++) {
            this.errors[i] = [];
            for (var j = 1; j <= 9; j++) {
                this.errors[i][j] = [];
            }
        }
    }

    this.hasCellErrors = function (row, col) {
        return this.errors[row][col].length;
    }

    this.addErrors = function (cell, errorCells) {
        this.errors[cell.getRow()][cell.getCol()] = errorCells;

        cell.addError();
        for (var i = 0; i < errorCells.length; i++) {
            errorCells[i].addError();
        }
    }

    this.removeErrors = function (cell) {
        var errorCells = this.errors[cell.getRow()][cell.getCol()];

        var currentCell;
        var currentErrors;
        for (var i = 0; i < errorCells.length; i++) {
            currentCell = errorCells[i];
            currentErrors = this.errors[currentCell.getRow()][currentCell.getCol()];
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
