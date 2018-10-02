function Cell(val, row, col) {
    this.create = function () {
        this.resetAvailVals();
        this.setVal(val);
        this.row = row;
        this.col = col;
        this.initSqrStartCoordinates(row, col);
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
        if (val >= 1 && val <= 9) {
            // TODO does it cause problems with invalid numbers ( > 9)?
            this.val = val;
            this.availVals = [];
        }
    }

    this.getVal = function () {
        return this.val;
    }

    this.hasVal = function () {
        return this.val !== undefined;
    }

    this.getRow = function (row) {
        return this.row;
    }

    this.getCol = function (col) {
        return this.col;
    }

    this.setAvailVals = function (availVals) {
        this.availVals = availVals;
    }

    this.getAvailVals = function () {
        return this.availVals;
    }

    // Removes a given number from the available cell values
    this.excludeVal = function (val) {
        this.removeItem(this.availVals, val);
    }

    // Returns the number of available values
    this.availValsCount = function () {
        return this.availVals.length;
    }

    // Returns the first number that is available for the cell, or 0 is there is none
    this.getNextAvailVal = function () {
        return (this.availValsCount() > 0) ? this.availVals[0] : 0;
    }

    this.initSqrStartCoordinates = function (row, col) {
        var horizontalTier = Math.floor((row - 1) / 3);
        this.sqrStartRow = 3 * horizontalTier + 1;

        var verticalTier = Math.floor((col - 1) / 3) + 1;
        this.sqrStartCol = 3 * verticalTier + 1;
    }

    this.getSqrStartRow = function () {
        return this.sqrStartRow;
    }

    this.getSqrStartCol = function () {
        return this.sqrStartCol;
    }

    this.create();
}
