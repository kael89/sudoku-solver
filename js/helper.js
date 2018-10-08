/**
 * Removes a specified item from an array 
 * 
 * @param {Array} arr 
 * @param {Object} value 
 * @return {Mixed} The removed item on success, undefined on failure
 */
function removeItem(arr, item) {
    var index = arr.indexOf(item);
    if (index === -1) {
        return undefined;
    }

    return arr.splice(index, 1);
}

/**
 * Converts a specified integer to a alphanumeric character
 * 1 = 'a', 2 = 'b' etc
 * 
 * @param {Integer} int
 * @param {Boolean} uppercase If true, the result will be an uppercase character. Default: false
 */
function intToChar(int, uppercase) {
    var asciiForAlpha = uppercase ? 65 : 96;
    return String.fromCharCode(asciiForAlpha + int)
}

Element.prototype.replaceChildren = function (newElement) {
    this.innerHTML = '';
    this.appendChild(newElement);
}

Element.prototype.addClass = function (className) {
    this.classList.add(className);
}

Element.prototype.removeClass = function (className) {
    this.classList.remove(className);
}
