print('Running tests...');
printHr();

var resultMsg;
var testCount = testCases.length;

var allPassed = true;
for (var i = 0; i < testCount; i++) {
    if (runTestCase(testCases[i])) {
        resultMsg = 'Success';
    } else {
        resultMsg = 'Failure';
        allPassed = false;
    }

    print('Test 1/' + testCount + ': ' + resultMsg);
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
    sudoku = new Sudoku();

    var cell;
    for (var i = 0; i < 9; i ++) {
        for (var j = 0; j < 9; j++) {
            // Test cases indices start from 0, while class indices start from 1
            // TODO propably overwriting same space in memory
            // TODO ensure that 0 cells are ignored
            cell = new Cell(testCase.in[i][j], i + 1, j + 1);
            sudoku.setCell(cell);
        }
    }

    var solvedSudoku = sudoku.solve();
    for (var i = 0; i < 9; i ++) {
        for (var j = 0; j < 9; j++) {
            if (solvedSudoku.getCell(i + 1, j + 1) !== testCase.out[i][j]) {
                return false;
            }
        }
    }

    return true;
}
