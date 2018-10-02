function App() {
    this.create = function () {
        this.resetSudoku();
        this.addEventListeners();
    }

    this.resetSudoku = function () {
        this.sudoku = new SudokuElement();
        this.renderSudoku();
    }

    this.renderSudoku = function () {
        this.sudoku.render('sudoku');
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

    this.solveSudoku = function() {
        if (!this.sudoku.isValid()) {
            window.alert('Invalid values found. Please correct them before trying to solve the Sudoku.');
            return;
        }
    
        var solvedSudoku = new SudokuSolver(this.sudoku).solve();
        if (!solvedSudoku) {
            window.alert('Error: could not solve the provided Sudoku');
        }

        // TODO copy values to SudokuElement
        this.sudoku = solvedSudoku;
        this.renderSudoku();
    }

    this.create();
}
