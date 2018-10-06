function CellElement(row, col, val) {
    this.create = function () {
        Cell.call(this, row, col, val)
        this.isUserInput = false;
        this.observers = [];
    }

    this.createElement = function () {
        // Create element
        this.el = document.createElement('input');
        this.el.setAttribute('type', 'number');
        this.el.setAttribute('min', 1);
        this.el.setAttribute('max', 9);

        // Add event listeners
        var self = this;
        this.el.addEventListener('focus', function () {
            self.gainsFocus();
        })
        this.el.addEventListener('blur', function () {
            self.losesFocus();
        })
        // TODO check if event is correct for value change
        this.el.addEventListener('change', function () {
            self.setVal(self.el.value);
            self.notifyObservers();
        })
    }

    this.render = function (elContainer) {
        this.createElement();
        elContainer.replaceChildren(this.el);
        this.refresh();
    }

    this.refresh = function () {
        if (this.val) {
            this.el.setAttribute('value', this.val);
        }

        var method = this.isUserInput ? 'addClass' : 'removeClass';
        this.el[method]('user-input');
    }

    this.gainsFocus = function () {
        this.isUserInput = true;
        this.refresh();
        this.el.addClass('user-input');
    }

    this.losesFocus = function () {
        if (!this.hasVal()) {
            this.isUserInput = false;
            this.refresh();
        }
    }

    this.getElement = function () {
        return this.el;
    }

    this.addError = function () {
        this.el.addClass('wrong-input');
    }

    this.removeError = function () {
        this.el.removeClass('wrong-input');
    }

    this.update = function (hasError) {
        if (hasError) {
            this.addError();
        } else {
            this.removeError();
        }
    }

    this.registerObserver = function (observer) {
        this.observers.push(observer);
    }

    this.removeObserver = function (observer) {
        removeItem(this.observers, observer);
    }

    this.notifyObservers = function () {
        for (var i = 0; i < this.observers.length; i++) {
            this.observers[i].update(this);
        }
    }

    this.create();
}

CellElement.prototype = new Cell();
