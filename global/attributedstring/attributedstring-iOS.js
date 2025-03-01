const Font = require('../../ui/font');
const Color = require('../../ui/color');

const AttributedString = function(params) {

    var self = this;

    self.ios = {};
    self.android = {};

    var _string = "";
    Object.defineProperty(self, 'string', {
        get: function() {
            return _string;
        },
        set: function(value) {
            _string = value;
        },
        enumerable: true
    });

    var _font = Font.create(Font.DEFAULT, 14, Font.NORMAL);
    Object.defineProperty(self, 'font', {
        get: function() {
            return _font;
        },
        set: function(value) {
            _font = value;
        },
        enumerable: true
    });

    var _foregroundColor = Color.BLACK;
    Object.defineProperty(self, 'foregroundColor', {
        get: function() {
            return _foregroundColor;
        },
        set: function(value) {
            _foregroundColor = value;
        },
        enumerable: true
    });

    var _underline = false;
    Object.defineProperty(self, 'underline', {
        get: function() {
            return _underline;
        },
        set: function(value) {
            _underline = value;
        },
        enumerable: true
    });

    var _strikethrough = false;
    Object.defineProperty(self, 'strikethrough', {
        get: function() {
            return _strikethrough;
        },
        set: function(value) {
            _strikethrough = value;
        },
        enumerable: true
    });

    var _underlineColor = self.foregroundColor;
    Object.defineProperty(self.ios, 'underlineColor', {
        get: function() {
            return _underlineColor;
        },
        set: function(value) {
            _underlineColor = value;
        },
        enumerable: true
    });

    var _strikethroughColor = self.foregroundColor;
    Object.defineProperty(self.ios, 'strikethroughColor', {
        get: function() {
            return _strikethroughColor;
        },
        set: function(value) {
            _strikethroughColor = value;
        },
        enumerable: true
    });

    var _backgroundColor = Color.TRANSPARENT;
    Object.defineProperty(self, 'backgroundColor', {
        get: function() {
            return _backgroundColor;
        },
        set: function(value) {
            _backgroundColor = value;
        },
        enumerable: true
    });

    var _link = undefined;
    Object.defineProperty(self, 'link', {
        get: function() {
            return _link;
        },
        set: function(value) {
            _link = value;
        },
        enumerable: true
    });

    function setParams(params) {
        for (var param in params) {
            if (param === "ios" || param === "android") {
                setOSSpecificParams.call(this, params[param], param);
            } else {
                this[param] = params[param];
            }
        }
    }

    function setOSSpecificParams(params, key) {
        for (var param in params) {
            this[key][param] = params[param];
        }
    }

    setParams.call(this, params);
};

module.exports = AttributedString;