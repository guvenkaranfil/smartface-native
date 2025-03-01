/*globals requireClass*/
const View = require('../view');

const NativeProgressBar = requireClass("android.widget.ProgressBar");
const NativePorterDuff = requireClass("android.graphics.PorterDuff");
const AndroidConfig = require("../../util/Android/androidconfig");

ActivityIndicator.prototype = Object.create(View.prototype);

ActivityIndicator.Events = { ...View.Events };

function ActivityIndicator(params) {
    if (!this.nativeObject) {
        this.nativeObject = new NativeProgressBar(AndroidConfig.activity);
    }

    View.call(this);

    this.nativeObject.setIndeterminate(true);

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}
ActivityIndicator.prototype.__color = null;

Object.defineProperties(ActivityIndicator.prototype, {
    'color': {
        get: function () {
            return this.__color;
        },
        set: function (color) {
            if (this.__color !== color) {
                this.__color = color;
                this.nativeObject.getIndeterminateDrawable().setColorFilter(this.__color.nativeObject, NativePorterDuff.Mode.SRC_IN);
            }
        },
        enumerable: true
    }
});

ActivityIndicator.prototype.toString = function () {
    return 'ActivityIndicator';
};

ActivityIndicator.iOS = require("./ios");
ActivityIndicator.iOS.Type = {};

module.exports = ActivityIndicator;