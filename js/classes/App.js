function App() {
    var sudokuElementId = 'sudoku';

    this.create = function () {
        this.resetSudoku();
        this.addEventListeners();
    }

    this.resetSudoku = function () {
        this.sudoku = new SudokuElement();
        this.sudoku.render(sudokuElementId);
    }

    this.addEventListeners = function () {
        var self = this;
        document.getElementById('solve').addEventListener('click', function() {
            self.solveSudoku();
        });
        document.getElementById('clear').addEventListener('click', function() {
            self.resetSudoku();
        });
    }

    this.getSudoku = function () {
        return this.sudoku;
    }

    this.solveSudoku = function() {
        if (!this.sudoku.isValid()) {
            window.alert('Invalid values found. Please correct them before trying to solve the Sudoku.');
            return;
        }

        solvedSudoku = new SudokuSolver(this.sudoku).solve();
        if (!solvedSudoku) {
            window.alert('Error: could not solve the provided Sudoku');
            return;
        }

        this.copyCellValues(solvedSudoku, this.sudoku);
        this.sudoku.refresh();
    }

    this.copyCellValues = function (sourceSudoku, targetSudoku) {
        var newVal;
        for (var i = 1; i <= 9; i++) {
            for (var j = 1; j <= 9; j++) {
                newVal = sourceSudoku.getCell(i, j).getVal();
                targetSudoku.getCell(i, j).setVal(newVal);
            }
        }
    }

    this.create();
}
