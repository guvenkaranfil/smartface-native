const NativeTextView = requireClass('android.widget.TextView');
const NativeView = requireClass('android.view.View');

const AndroidConverter = require("./unitconverter");
const AndroidConfig = require("./androidconfig.js");
const { COMPLEX_UNIT_DIP } = require("./typevalue.js");

function SizeCalculator(context) {};

SizeCalculator.calculateStringSize = function(params) {
    let text = params.text,
        maxWidth = params.maxWidth,
        textSize = params.textSize,
        typeface = params.typeface && params.typeface.nativeObject;

    let nativeTextView;
    if (typeof text !== 'object') {
        nativeTextView = new NativeTextView(AndroidConfig.activity);
        typeface && nativeTextView.setTypeface(typeface);
        nativeTextView.setText(text, NativeTextView.BufferType.SPANNABLE);
        textSize !== undefined && nativeTextView.setTextSize(COMPLEX_UNIT_DIP, textSize); //setTextSize's unit is SP by default
    }
    else {
        nativeTextView = text.nativeObject;
    }

    let widthMeasureSpec = NativeView.MeasureSpec.makeMeasureSpec(AndroidConverter.dpToPixel(maxWidth), NativeView.MeasureSpec.AT_MOST);
    let heightMeasureSpec = NativeView.MeasureSpec.makeMeasureSpec(0, NativeView.MeasureSpec.UNSPECIFIED);
    nativeTextView.measure(widthMeasureSpec, heightMeasureSpec);
    return {
        height: AndroidConverter.pixelToDp(nativeTextView.getMeasuredHeight()),
        width: AndroidConverter.pixelToDp(nativeTextView.getMeasuredWidth())
    }
}

module.exports = SizeCalculator;
