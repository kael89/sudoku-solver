function calculateSqrNumber(row, col) {
    // Make row, col zero indexed
    row--;
    col--;
    var horizontalTier = Math.floor(row / 3);
    var verticalTier = Math.floor(col / 3) + 1;

    return 3 * horizontalTier + verticalTier;
}

// For a given position in the table, returns the coordinates (row, column)
// of the top left cell of the containing square
function calculateSqrStartCoordinates(sqrNumber) {
    // Make sqrNumber zero indexed
    sqrNumber--;
    var horizontalTier = Math.floor(sqrNumber / 3);
    var verticalTier = sqrNumber % 3;

    var row = 3 * horizontalTier + 1;
    var col = 3 * verticalTier + 1;
    return [row, col]
}
