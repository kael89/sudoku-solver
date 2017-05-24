/***Cell Object***/
function Cell(value, availValues) {
	var 
		//Value of the cell
		val,
		//Boolean array stating whether a number is available for the given cell. 
		//For example, if availVals[2] == false, then 2 is not an available value
		availVals;

	create();

	function create() {
		var i;

		availVals = [];

		!value ? val = null : val = value

		for (i = 1; i <= 9; i++)
			!availValues ? availVals[i] = true : availVals[i] = availValues[i];
	}

	this.set = function(newVal) {
		val = newVal;
		availVals = null;
	}

	this.getVal = function() {
		return val;
	}

	this.getAvailVals = function() {
		return availVals;
	}

	//Excludes a given number from the available cell values
	this.exclude = function(num) {
		availVals[num] = false;
	}

	//Returns the number of available values
	this.availValsCount = function() {
		var count,
			i;

		count = 0;

		if (availVals) {
			for (i = 1; i <= 9; i++)
				if (availVals[i])
					count++;
		}

		return count;
	}

	//Returns the first number that is available for the cell, or 0 is there is 
	//none
	this.firstAvailVal = function() {
		var i;

		for (i = 1; i <= 9; i++)
			if (availVals[i])
				return i;

		return 0;
	}

	//(Testing) Prints out current cell values 
	this.test = function() {
		val ? console.log(val) : console.log(availVals);
	}
}