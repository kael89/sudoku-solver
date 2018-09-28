function calculateSqrNumber(row, col) {
    // Make row, col zero indexed
    row--;
    col--;
    var horizontalTier = Math.floor(row / 3);
    var verticalTier = Math.floor(col / 3) + 1;

    return 3 * horizontalTier + verticalTier;
}

function calculateSqrStartCoordinates(sqrNumber) {
    // Make sqrNumber zero indexed
    sqrNumber--;
    var horizontalTier = Math.floor(sqrNumber / 3);
    var verticalTier = sqrNumber % 3;

    var row = 3 * horizontalTier + 1;
    var col = 3 * verticalTier + 1;
    return [row, col]
}

// For a given position in the table, returns the coordinates (row, column)
// of the top left cell of the containing square
function calculateSqrStartCoordinates2(row, col) {
    var rowStart;
    var colStart;
    
    if (row < 4) {
        rowStart = 1;
    } else if (row < 7) {
        rowStart = 4;
    } else {
        rowStart = 7;
    }
    
    if (col < 4) {
        colStart = 1;
    } else if (col < 7) {
        colStart = 4;
    } else {
        colStart = 7;
    }
    
    return [rowStart, colStart];
}


