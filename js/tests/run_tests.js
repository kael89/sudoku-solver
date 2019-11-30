print('Running tests...');
printHr();

var allTestsPassed = runAllTestCases(testCases);
var resultMsg = allTestsPassed ? 'All tests passed!' : 'At least one test failed...';

printHr();
print(resultMsg);

/*** Functions ***/
function runAllTestCases(testCases) {
    var testCount = testCases.length;

    var allTestsPassed = true;
    var index;
    for (var i = 0; i < testCount; i++) {
        if (runTestCase(testCases[i])) {
            resultMsg = 'Success';
        } else {
            resultMsg = 'Failure';
            allTestsPassed = false;
        }

        index = i + 1;
        print('Test ' + index + '/' + testCount + ': ' + resultMsg);
    }

    return allTestsPassed;
}

function runTestCase(testCase) {
    var sudoku = new Sudoku();

    var currentCell;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            currentCell = new CellElement(i + 1, j + 1, testCase.in[i][j]);
            sudoku.setCell(currentCell);
        }
    }

    var solvedSudoku = new SudokuSolver(sudoku).solve();
    if (!solvedSudoku) {
        return false;
    }

    var currentCell;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            currentCell = solvedSudoku.getCell(i + 1, j + 1);
            if (currentCell.getVal() !== testCase.out[i][j]) {
                return false;
            }
        }
    }

    return true;
}

function print(message) {
    console.log(message);
}

// Print a horizontal rule
function printHr() {
    print('-----------------');
}
