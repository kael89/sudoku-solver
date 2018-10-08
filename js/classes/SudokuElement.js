function SudokuElement() {
    this.create = function() {
        Sudoku.call(this);
        this.errorManager = new CellErrorManager();
    }

    this.createRow = function (row) {
        var elRow = document.createElement('tr');

        var elCellContainer;
        var cell;
        for (var j = 1; j <= 9; j++) {
            // Create cell container
            elCellContainer = this.createCellContainer();
            elRow.appendChild(elCellContainer);

            // Add new cell
            cell = this.createCell(row, j);
            cell.render(elCellContainer);
            this.setCell(cell);
        }

        return elRow;
    }

    this.createCell = function (row, col) {
        var cell = new CellElement(row, col, this.cells[row][col].getVal());
        cell.registerObserver(this);
        return cell;
    }

    this.createCellContainer = function () {
        return document.createElement('td');
    }

    this.render = function (containerId) {
        this.el = document.createElement('table');
        for (var i = 1; i <= 9; i++) {
            this.el.appendChild(this.createRow(i));
        }

        var elContainer = document.getElementById(containerId);
        elContainer.replaceChildren(this.el);
    }

    this.refresh = function () {
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                this.cells[i][j].refresh();
            }
        }
    }

    this.update = function (obj) {
        if (obj instanceof CellElement) {
            this.validateCell(obj);
        }
    }

    this.validateCell = function (cell) {
        var elCell = cell.getElement();

        if (elCell.value < 1 || elCell.value > 9) {
            window.alert('Values must be between 1 and 9');
            elCell.value = '';
            return;
        }

        var invalidCells = SudokuValidator.getInvalidCells(this, cell);
        this.errorManager.updateErrors(cell, invalidCells);
    }

    this.create();
}

SudokuElement.prototype = new Sudoku();
