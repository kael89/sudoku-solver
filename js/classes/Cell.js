function Cell(row, col, val) {
    this.create = function () {
        this.setRow(row);
        this.setCol(col);
        this.resetAvailVals();
        this.setVal(val);
    }

    this.getRow = function (row) {
        return this.row;
    }

    this.setRow = function (row) {
        this.row = row;
        this.sqrStartRow = this.calculateSqrStart(row);
    }

    this.getCol = function (col) {
        return this.col;
    }

    this.setCol = function (col) {
        this.col = col;
        this.sqrStartCol = this.calculateSqrStart(col);
    }

    this.calculateSqrStart = function (lineNumber) {
        var tier = Math.floor((lineNumber - 1) / 3);
        return 3 * tier + 1;
    }

    this.resetAvailVals = function () {
        this.availVals = [];
        if (this.val) {
            return;
        }

        for (var i = 1; i <= 9; i++) {
            this.availVals.push(i);
        }
    }

    this.setVal = function (val) {
        val = parseInt(val);
        if (val >= 1 && val <= 9) {
            this.val = val;
            this.availVals = [];
        } else {
            this.val = undefined;
            this.resetAvailVals();
        }
    }

    this.getVal = function () {
        return this.val;
    }

    this.hasVal = function () {
        return this.val !== undefined;
    }

    // Removes a given number from the available cell values
    this.excludeVal = function (val) {
        removeItem(this.availVals, val);
    }

    // Returns the number of available values
    this.getAvailValsCount = function () {
        return this.availVals.length;
    }

    // Returns the first number that is available for the cell, or 0 is there is none
    this.getNextAvailVal = function () {
        return (this.getAvailValsCount() > 0) ? this.availVals[0] : 0;
    }

    this.getSqrStartRow = function () {
        return this.sqrStartRow;
    }

    this.getSqrStartCol = function () {
        return this.sqrStartCol;
    }

    this.clone = function () {
        var newCell = new Cell(this.row, this.col, this.val);
        newCell.availVals = this.availVals.slice();
        return newCell;
    }

    this.create();
}
