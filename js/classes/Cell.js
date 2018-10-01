function Cell(val, row, col, availValues) {
    // TODO remove input params, use setters instead
    // TODO refactor to use this
    // Boolean array stating whether a number is available for the given cell. 
    var availVals;

    this.create = function () {
        this.setVal(val);
        this.row = row;
        this.col = col;
        this.sqrNumber = calculateSqrNumber(row, col);

        /*
        // TODO check
        for (var i = 1; i <= 9; i++) {
            !availValues ? availVals[i] = true : availVals[i] = availValues[i];
        }
        */
    }

    this.setVal = function (val) {
        if (val >= 1 && val <= 9) {
            // TODO does it cause problems with invalid numbers ( > 9)?
            this.val = val;
            availVals = [];
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
        return availVals;
    }

    this.getSqrNumber = function () {
        return this.sqrNumber;
    }

    // Excludes a given number from the available cell values
    this.exclude = function (num) {
        availVals[num] = false;
    }

    // Returns the number of available values
    this.availValsCount = function () {
        var count = 0;

        if (!availVals) {
            return count;
        }

        for (var i = 1; i <= 9; i++) {
            if (availVals[i]) {
                count++;
            }
        }

        return count;
    }

    // Returns the first number that is available for the cell, or 0 is there is none
    this.firstAvailVal = function () {
        for (var i = 1; i <= 9; i++) {
            if (availVals[i]) {
                return i;
            }
        }

        return 0;
    }

    // TODO remove testing functions
    // (Testing) Prints out current cell values 
    this.test = function () {
        this.val ? console.log(this.val) : console.log(availVals);
    }

    this.create();
}
