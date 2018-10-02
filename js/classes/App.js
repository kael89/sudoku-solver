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
        var alertMsg;
        while (!this.sudoku.isValid()) {
            alertMsg = 'Invalid values found. Please correct them before trying to solve the Sudoku.';
            window.alert(alertMsg);
        }
    
        var solvedSudoku = new SudokuSolver(this.sudoku).solve();
        if (solvedSudoku) {
            // TODO copy values to SudokuElement
            this.sudoku = solvedSudoku;
            this.renderSudoku();
        } else {
            alertMsg = 'Error: could not solve the provided Sudoku';
            window.alert(alertMsg);
        }
    }

    this.create();
}
