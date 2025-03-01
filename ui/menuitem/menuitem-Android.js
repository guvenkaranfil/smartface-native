/*globals requireClass*/
const Color = require("../color");
const TypeUtil = require("../../util/type");
const Exception = require("../../util/exception");

const NativeSpannable = requireClass("android.text.Spanned");
const NativeColorSpan = requireClass("android.text.style.ForegroundColorSpan");
const NativeSpannableStringBuilder = requireClass("android.text.SpannableStringBuilder");
const {
    EventEmitterCreator
} = require("../../core/eventemitter");

const Events = require('./events');
MenuItem.Events = { ...Events };

function MenuItem(params) {
    this.android = {};
    this.ios = {};
    this.android.titleSpanned;

    var _title;
    var _titleColor;
    var _onSelected;

    const EventFunctions = {
        [Events.Selected]: function () {
            _onSelected = (state) => {
                this.emitter.emit(Events.Selected, state);
            }
        }
    }

    EventEmitterCreator(this, EventFunctions);

    Object.defineProperties(this, {
        'title': {
            get: function () {
                return _title;
            },
            set: function (title) {
                if (!TypeUtil.isString(title)) {
                    throw new TypeError(Exception.TypeError.STRING);
                }
                _title = title;
            },
            enumerable: true
        },
        'onSelected': {
            get: function () {
                return _onSelected;
            },
            set: function (callback) {
                if (!TypeUtil.isFunction(callback)) {
                    throw new TypeError(Exception.TypeError.FUNCTION);
                }
                _onSelected = callback;
            },
            enumerable: true
        },
        'toString': {
            value: function () {
                return 'MenuItem';
            },
            enumerable: true,
            configurable: true
        }
    });

    Object.defineProperties(this.android, {
        'titleColor': {
            get: function () {
                return _titleColor;
            },
            set: function (color) {
                if (color instanceof Color) {
                    _titleColor = color;
                }
            },
            enumerable: true
        },
        'spanTitle': {
            value: function () {
                var spannableStringBuilder = new NativeSpannableStringBuilder("");
                if (_title) {
                    spannableStringBuilder = new NativeSpannableStringBuilder(_title);
                    if (_titleColor) {
                        var colorSpan = new NativeColorSpan(_titleColor.nativeObject);
                        spannableStringBuilder.setSpan(colorSpan, 0, _title.length, NativeSpannable.SPAN_INCLUSIVE_INCLUSIVE);
                        return spannableStringBuilder;
                    }
                }
                return spannableStringBuilder;
            }
        }
    });

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

MenuItem.ios = {
    Style: {
        DEFAULT: 0,
        CANCEL: 1,
        DESTRUCTIVE: 2
    }
};

module.exports = MenuItem;