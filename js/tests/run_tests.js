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
    var elCells = document.getElementById('sudoku').getElementsByTagName('input');

    var k = 0;
    var currentVal;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            currentVal = testCase.in[i][j];
            if (currentVal) {
                elCells[k].value = currentVal;
                elCells[k].dispatchEvent(new Event('change'));
            }

            k++;
        }
    }

    document.getElementById('solve').click();

    var k = 0;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (elCells[k].value !== testCase.out[i][j].toString()) {
                return false;
            }
            k++;
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
