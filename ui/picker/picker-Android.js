/*globals requireClass*/
const extend = require('js-base/core/extend');
const View = require('../view');
const TypeUtil = require('../../util/type');
const AndroidConfig = require("../../util/Android/androidconfig");

const NativeNumberPicker = requireClass("android.widget.NumberPicker");
const NativeFrameLayout = requireClass("android.widget.FrameLayout");
const NativeAlertDialog = requireClass("android.app.AlertDialog");
const NativeDialogInterface = requireClass("android.content.DialogInterface");

const Picker = extend(View)(
    function(_super, params) {
        var self = this;
        const activity = AndroidConfig.activity;
        if (!self.nativeObject) {
            self.nativeObject = new NativeNumberPicker(activity);
        }
        _super(this);

        this.ios = {};

        var _items = [];
        var _onSelected;
        Object.defineProperties(this, {
            'items': {
                get: function() {
                    return _items; // todo: Returns self.nativeObject.getDisplayValues()
                }, // after string problem is solved.
                set: function(items) {
                    _items = items;
                    setNumberPicker(this.nativeObject, _items);
                },
                enumerable: true
            },
            'currentIndex': {
                get: function() {
                    return self.nativeObject.getValue();
                },
                set: function(currentIndex) {
                    self.nativeObject.setValue(currentIndex);
                },
                enumerable: true
            },
            'onSelected': {
                get: function() {
                    return _onSelected;
                },
                set: function(onSelected) {
                    _onSelected = onSelected;
                },
                enumerable: true
            },
            'show': {
                value: function(done, cancel, titleText) {
                    var layout = addViewToLayout(this.nativeObject);

                    var cancelListener = NativeDialogInterface.OnClickListener.implement({
                        onClick: function(dialogInterface, i) {
                            if (cancel)
                                cancel();
                        }
                    });

                    var doneListener = NativeDialogInterface.OnClickListener.implement({
                        onClick: function(dialogInterface, i) {
                            if (done)
                                done({ index: self.currentIndex });
                        }
                    });
                    
                    const NativeRString = requireClass("android.R").string;
                    var builder = new NativeAlertDialog.Builder(AndroidConfig.activity);
                    builder = builder.setView(layout);
                    builder.setTitle(titleText || "");
                    builder = builder.setNegativeButton(NativeRString.cancel, cancelListener);
                    builder = builder.setPositiveButton(NativeRString.ok, doneListener);
                    builder.show();
                },
                enumerable: true
            },
            'android': {
                value: {},
                enumerable: true
            },
            'toString': {
                value: function() {
                    return 'Picker';
                },
                enumerable: true,
                configurable: true
            }
        });
        Object.defineProperty(this.android, 'enabled', {
            get: function() {
                return self.nativeObject.isEnabled();
            },
            set: function(value) {
                if (!TypeUtil.isBoolean(value)) {
                    throw new TypeError("Value should be boolean for enabled.");
                }
                self.nativeObject.setEnabled(value);
            },
            enumerable: true
        });

        if (!this.skipDefaults) {
            self.nativeObject.setOnScrollListener(NativeNumberPicker.OnScrollListener.implement({
                onScrollStateChange: function(picker, scrollState) {
                    if (scrollState === NativeNumberPicker.OnScrollListener.SCROLL_STATE_IDLE) {
                        if (_onSelected)
                            _onSelected(self.currentIndex);
                    }
                }
            }));
        }

        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

function setNumberPicker(nativeObject, _items) {
    if (_items.length > 0) {
        nativeObject.setDisplayedValues(null);
        nativeObject.setMaxValue(_items.length - 1);
        nativeObject.setMinValue(0);
        nativeObject.setDescendantFocusability(NativeNumberPicker.FOCUS_BLOCK_DESCENDANTS);
        var items = [];
        for (var item in _items) {
            items.push(_items[item]);
        }

        nativeObject.setDisplayedValues(array(items, "java.lang.String"));
        nativeObject.setWrapSelectorWheel(false);
    }
}

function addViewToLayout(nativeObject) {
    var layout = new NativeFrameLayout(AndroidConfig.activity);
    var parent = nativeObject.getParent();
    if (parent) {
        parent.removeView(nativeObject);
    }
    layout.addView(nativeObject, new NativeFrameLayout.LayoutParams(-1, // FrameLayout.LayoutParams.MATCH_PARENT
        -2, // FrameLayout.LayoutParams.WRAP_CONTENT
        17)); // Gravity.CENTER
    return layout;
}

module.exports = Picker;
