/***Main Program***/
// TODO refactor to not use var list
// TODO remove console.logs
// TODO create automated test checking

var elSolveBtn,
    elClearBtn,
    sudoku;

elSolveBtn = document.getElementById("solve");
elClearBtn = document.getElementById("clear");
sudoku = new SudokuElement('sudoku');

// TODO remove
//Test cases of different levels are included in js/test-cases.js
//Uncommenting the next line is an easy way of using a test case::
//sudoku = getTestCase(4);

elSolveBtn.addEventListener("click", function() {
    solveSudoku(sudoku)
});
elClearBtn.addEventListener("click", function() {
    clearSudoku(sudoku)
});

/***Functions***/

function solveSudoku(sudoku) {
    var alertMsg,
        s;

    s = (sudoku.errsExist() > 1 ? "s" : "");
    alertMsg = "Error" + s + " found.\n" +
            "Please correct the error" + s + " before trying to solve the Sudoku."
    sudoku.consoleOut();
    console.log("---Solve---");
    while (!(sudoku = sudoku.solve())) {
        alert(alertMsg);
    }
    sudoku.print();
    sudoku.consoleOut();
}

function clearSudoku(sudoku) {
    var userInputs,
        i;

    userInputs = document.querySelectorAll("input.usr-input");
    for (var i = 0; i < userInputs.length; i++) {
        userInputs[i].removeAttribute("class");
    }

    sudoku.reset();
    sudoku.print();
}
