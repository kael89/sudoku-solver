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
