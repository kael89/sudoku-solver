function SudokuElement(id) {
    this.create = function() {
        this.createElement(id);
        this.validator = new SudokuValidator(this, false);
        this.errorManager = new CellErrorManager();
    }

    this.createElement = function (id) {
        this.el = document.getElementById(id);
        for (var i = 1; i <= 9; i++) {
            this.el.appendChild(this.createRow(i));
        }
    }

    this.createRow = function (row) {
        var elRow = document.createElement('tr');

        var elCellContainer;
        var cell;
        for (var j = 1; j <= 9; j++) {
            // Add new cell object
            cell = this.createCell(row, j);
            this.setCell(cell, row, j);

            // Append cell element
            elCellContainer = this.createCellContainer();
            elCellContainer.appendChild(cell.getElement());
            elRow.appendChild(elCellContainer);
        }

        return elRow;
    }

    this.createCell = function (row, col) {
        var cell = new CellElement(row, col);
        cell.registerObserver(this);
        return cell;
    }

    this.createCellContainer = function () {
        return document.createElement('td');
    }

    this.update = function (obj) {
        if (obj instanceof CellElement) {
            this.updateErrors(obj, this.validate(obj));
        }
    }

    this.updateErrors = function (cell, errorCells) {
        this.errorManager.updateErrors(cell, errorCells);
    }

    this.create();
}

SudokuElement.prototype = new Sudoku();
