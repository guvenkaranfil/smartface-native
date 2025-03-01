
const View = require('../../ui/view');
const Color = require("../../ui/color");
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
Picker.Events = { ...Events };
Picker.Events = { ...View.Events, ...Events };

Picker.prototype = Object.create(View.prototype);
function Picker(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UIPickerView();
    }

    View.call(this);

    Object.defineProperty(this, 'items', {
        get: function () {
            return self.nativeObject.items;
        },
        set: function (items) {
            self.nativeObject.items = items;
            self.nativeObject.reloadAllComponents();
        },
        enumerable: true
    });

    var _currentIndex = 0;
    Object.defineProperty(this, 'currentIndex', {
        get: function () {
            return _currentIndex;
        },
        set: function (currentIndex) {
            _currentIndex = currentIndex;
            var defaultComponentIndex = 0; // sf-core does not support multi components.
            self.nativeObject.selectRowInComponentAnimated(_currentIndex, defaultComponentIndex, true);
        },
        enumerable: true
    });

    var _onSelectedCallback;
    Object.defineProperty(this, 'onSelected', {
        get: function () {
            return _onSelectedCallback;
        },
        set: function (onSelected) {
            _onSelectedCallback = onSelected;
        },
        enumerable: true
    });

    const EventFunctions = {
        [Events.Selected]: function() {
            _onSelectedCallback = function (state) {
                self.emitter.emit(Events.Selected, state);
            } 
        }
    }

    EventEmitterCreator(this, EventFunctions);

    //////////////////////////////////////////////////////
    // UIPickerViewDataSource
    var _component = 1;
    self.pickerDataSource = new __SF_UIPickerViewDataSource();
    self.pickerDataSource.numberOfComponents = function () {
        return _component;
    };
    self.pickerDataSource.numberOfRowsInComponent = function (component) {
        return self.items.length;
    };
    self.nativeObject.dataSource = self.pickerDataSource;

    //////////////////////////////////////////////////////
    // UIPickerViewDelegate
    self.pickerDelegate = new __SF_UIPickerViewDelegate();
    self.pickerDelegate.titleForRow = function (e) {
        return self.items[e.row];
    };
    self.pickerDelegate.didSelectRow = function (e) {
        _currentIndex = e.row;
        if (typeof _onSelectedCallback === "function") {
            _onSelectedCallback(e.row);
        }
    };
    self.nativeObject.delegate = self.pickerDelegate;

    this.ios = {};
    this.android = {};

    Object.defineProperty(this, 'textColor', {
        get: function () {
            if (self.nativeObject.textColor === undefined) {
                return undefined;
            }
            return new Color({
                color: self.nativeObject.textColor
            });
        },
        set: function (color) {
            if (color) {
                self.nativeObject.textColor = color.nativeObject;
            } else {
                self.nativeObject.textColor = undefined;
            }
            self.nativeObject.reloadAllComponents();
        },
        enumerable: true
    });

    Object.defineProperty(this, 'dialogBackgroundColor', {
        get: function () {
            return new Color({
                color: self.nativeObject.dialogBackgroundColor
            });
        },
        set: function (color) {
            self.nativeObject.dialogBackgroundColor = color.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(this.ios, 'dialogLineColor', {
        get: function () {
            return new Color({
                color: self.nativeObject.dialogLineColor
            });
        },
        set: function (color) {
            self.nativeObject.dialogLineColor = color.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(this.ios, 'rowHeight', {
        get: function () {
            return self.nativeObject.delegate.rowHeight;
        },
        set: function (onSelected) {
            self.nativeObject.delegate.rowHeight = onSelected;
        },
        enumerable: true
    });

    var _title;
    Object.defineProperty(this, 'title', {
        get: function () {
            return _title;
        },
        set: function (value) {
            _title = value;
        },
        enumerable: true
    });

    var _titleColor;
    Object.defineProperty(this, 'titleColor', {
        get: function () {
            return _titleColor;
        },
        set: function (value) {
            _titleColor = value;
        },
        enumerable: true
    });

    var _titleFont;
    Object.defineProperty(this, 'titleFont', {
        get: function () {
            return _titleFont;
        },
        set: function (value) {
            _titleFont = value;
        },
        enumerable: true
    });

    var _cancelColor;
    Object.defineProperty(this, 'cancelColor', {
        get: function () {
            return _cancelColor;
        },
        set: function (value) {
            _cancelColor = value;
        },
        enumerable: true
    });

    var _cancelHighlightedColor;
    Object.defineProperty(this.ios, 'cancelHighlightedColor', {
        get: function () {
            return _cancelHighlightedColor;
        },
        set: function (value) {
            _cancelHighlightedColor = value;
        },
        enumerable: true
    });

    var _cancelFont;
    Object.defineProperty(this, 'cancelFont', {
        get: function () {
            return _cancelFont;
        },
        set: function (value) {
            _cancelFont = value;
        },
        enumerable: true
    });

    var _okColor;
    Object.defineProperty(this, 'okColor', {
        get: function () {
            return _okColor;
        },
        set: function (value) {
            _okColor = value;
        },
        enumerable: true
    });

    var _okHighlightedColor;
    Object.defineProperty(this.ios, 'okHighlightedColor', {
        get: function () {
            return _okHighlightedColor;
        },
        set: function (value) {
            _okHighlightedColor = value;
        },
        enumerable: true
    });

    var _okFont;
    Object.defineProperty(this, 'okFont', {
        get: function () {
            return _okFont;
        },
        set: function (value) {
            _okFont = value;
        },
        enumerable: true
    });

    var _okText;
    Object.defineProperty(this, 'okText', {
        get: function () {
            return _okText;
        },
        set: function (value) {
            _okText = value;
        },
        enumerable: true
    });

    var _cancelText;
    Object.defineProperty(this, 'cancelText', {
        get: function () {
            return _cancelText;
        },
        set: function (value) {
            _cancelText = value;
        },
        enumerable: true
    });

    self.show = function (ok, cancel) {
        var okFunc = function (e) {
            if (typeof ok === "function") {
                ok({
                    index: e.index
                });
            }
        };
        var cancelFunc = function (e) {
            if (typeof cancel === "function") {
                cancel();
            }
        };

        self.nativeObject.show(self.nativeObject,
            (self.title === undefined) ? "" : self.title,
            cancelFunc,
            okFunc,
            self.titleColor ? self.titleColor.nativeObject : undefined,
            self.titleFont ? self.titleFont : undefined,
            self.cancelColor ? self.cancelColor.nativeObject : undefined,
            self.ios.cancelHighlightedColor ? self.ios.cancelHighlightedColor.nativeObject : undefined,
            self.cancelFont ? self.cancelFont : undefined,
            self.okColor ? self.okColor.nativeObject : undefined,
            self.ios.okHighlightedColor ? self.ios.okHighlightedColor.nativeObject : undefined,
            self.okFont ? self.okFont : undefined,
            self.okText ? self.okText : undefined,
            self.cancelText ? self.cancelText : undefined
        );
    }
    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Picker;