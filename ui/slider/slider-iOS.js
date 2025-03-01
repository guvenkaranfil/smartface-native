const View = require('../view');

const UIControlEvents = require("../../util").UIControlEvents;
const Color = require("../../ui/color");
const Events = require('./events');
const { EventEmitterCreator } = require("../../core/eventemitter");
Slider.Events = {...View.Events, ...Events};
const SliderState = {
    normal: 0,
    disabled: 1,
    selected: 2,
    pressed: 3,
    focused: 4 // #available(iOS 9.0, *)
};

// const Slider = extend(View)(
Slider.prototype = Object.create(View.prototype);
function Slider(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UISlider();
    }

    View.apply(this);

    //defaults
    self.nativeObject.minimumTrackTintColor = Color.DARKGRAY.nativeObject;
    self.nativeObject.maximumTrackTintColor = Color.GREEN.nativeObject;
    self.nativeObject.minimumValue = 0;
    self.nativeObject.maximumValue = 100;

    Object.defineProperty(self, 'enabled', {
        get: function() {
            return self.nativeObject.setEnabled;
        },
        set: function(value) {
            self.nativeObject.setEnabled = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'thumbColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.thumbTintColor
            });
        },
        set: function(value) {
            self.nativeObject.thumbTintColor = value.nativeObject;
        },
        enumerable: true
    });

    var _thumbImage;
    Object.defineProperty(self, 'thumbImage', {
        get: function() {
            return _thumbImage;
        },
        set: function(image) {
            _thumbImage = image;
            self.nativeObject.setThumbImage(image.nativeObject, SliderState.normal);
            self.nativeObject.setThumbImage(image.nativeObject, SliderState.pressed);
        },
        enumerable: true
    });

    Object.defineProperty(self, 'minTrackColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.minimumTrackTintColor
            });
        },
        set: function(value) {
            self.nativeObject.minimumTrackTintColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'maxTrackColor', {
        get: function() {
            return new Color({
                color: self.nativeObject.maximumTrackTintColor
            });
        },
        set: function(value) {
            self.nativeObject.maximumTrackTintColor = value.nativeObject;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'minValue', {
        get: function() {
            return self.nativeObject.minimumValue;
        },
        set: function(value) {
            self.nativeObject.minimumValue = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'maxValue', {
        get: function() {
            return self.nativeObject.maximumValue;
        },
        set: function(value) {
            self.nativeObject.maximumValue = value;
        },
        enumerable: true
    });


    Object.defineProperty(self, 'value', {
        get: function() {
            return self.nativeObject.value;
        },
        set: function(value) {
            self.nativeObject.value = value;
        },
        enumerable: true
    });

    var _onValueChange;
    Object.defineProperty(self, 'onValueChange', {
        get: function() {
            return _onValueChange;
        },
        set: function(value) {
            _onValueChange = value.bind(this);
            self.nativeObject.addJSTarget(handleValueChange, UIControlEvents.valueChanged);
        },
        enumerable: true
    });

    const EventFunctions = {
		[Events.ValueChange]: function () {
			_onValueChange = (state) => {
				this.emitter.emit(Events.ValueChange, state);
			};
            self.nativeObject.addJSTarget(handleValueChange, UIControlEvents.valueChanged);
		},
	};
    EventEmitterCreator(this, EventFunctions);

    var _value = 0;

    function handleValueChange() {
        var intValue = Math.round(self.value);
        self.nativeObject.setValueAnimated(intValue, false);
        if (_value !== intValue) {
            _value = intValue;
            if (typeof self.onValueChange === "function") {
                self.onValueChange();
            }
        }
    }

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

module.exports = Slider;