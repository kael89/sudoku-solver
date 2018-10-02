print('Running tests...');
printHr();

var resultMsg;
var testCount = testCases.length;

var allPassed = true;
var index;
for (var i = 0; i < testCount; i++) {
    if (runTestCase(testCases[i])) {
        resultMsg = 'Success';
    } else {
        resultMsg = 'Failure';
        allPassed = false;
    }

    index = i + 1;
    print('Test ' + index + '/' + testCount + ': ' + resultMsg);
}

var resultMsg = allPassed ? 'All tests passed!' : 'At least one test failed...';
printHr();
print(resultMsg);

/*** Functions ***/
function print(message) {
    console.log(message);
}

// Printa a horizontal rule
function printHr() {
    print('-------------------------');
}

function runTestCase(testCase) {
    var sudoku = new Sudoku();

    var cell;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            // Test cases indices start from 0, while class indices start from 1
            cell = new Cell(testCase.in[i][j], i + 1, j + 1);
            sudoku.setCell(cell);
        }
    }
    sudoku.log();

    var solver = new SudokuSolver(sudoku);
    var solvedSudoku = solver.solve();
    if (!solvedSudoku) {
        return false;
    }

    var currentCell;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            currentCell = solvedSudoku.getCell(i + 1, j + 1);
            if (!currentCell || currentCell.getVal() !== testCase.out[i][j]) {
                return false;
            }
        }
    }

    return true;
}
