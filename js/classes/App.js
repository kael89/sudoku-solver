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
            self.solveSudoku(sudoku);
        });
        document.getElementById('clear').addEventListener('click', function() {
            self.resetSudoku();
        });
    }

    this.solveSudoku = function(sudoku) {
        var alertMsg;
        while (!sudoku.validate()) {
            var s = (sudoku.errsExist() > 1 ? 's' : '');
            alertMsg = 'Error' + s + ' found.\nPlease correct the error' + s + ' before trying to solve the Sudoku.';
            window.alert(alertMsg);
        }
    
        var solvedSudoku = solver.solve(sudoku);
        if (solvedSudoku) {
            this.sudoku = solvedSudoku;
            this.renderSudoku();
        } else {
            alertMsg = 'Error: could not solve the provided Sudoku';
            window.alert(alertMsg);
        }
    }

    this.create();
}
