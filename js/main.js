/***Main Program***/
// TODO remove console.logs
// TODO create automated test checking

var elSolveBtn = document.getElementById('solve');
var elClearBtn = document.getElementById('clear');
var sudoku = new SudokuElement('sudoku');

// TODO remove
// Test cases of different levels are included in js/test-cases.js
// Uncommenting the next line is an easy way of using a test case::
// sudoku = getTestCase(4);

elSolveBtn.addEventListener('click', function() {
    solveSudoku(sudoku)
});
elClearBtn.addEventListener('click', function() {
    clearSudoku(sudoku)
});

/*** Functions ***/
function solveSudoku(sudoku) {
    var s = (sudoku.errsExist() > 1 ? 's' : '');
    var alertMsg = 'Error' + s + ' found.\nPlease correct the error' + s + ' before trying to solve the Sudoku.';

    while (!(sudoku = sudoku.solve())) {
        alert(alertMsg);
    }
    sudoku.print();
}

function clearSudoku(sudoku) {
    // TODO refactor to use CellElement.removeError();
    var userInputs = document.querySelectorAll('input.usr-input');
    for (var i = 0; i < userInputs.length; i++) {
        userInputs[i].removeAttribute('class');
    }

    sudoku.reset();
    sudoku.print();
}
