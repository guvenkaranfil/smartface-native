const View = require('../view');
const Color = require("nf-core/ui/color");
const TextAlignment = require("nf-core/ui/textalignment");
const TypeUtil = require("nf-core/util/type");
const extend = require('js-base/core/extend');
const AndroidUnitConverter = require("nf-core/util/Android/unitconverter.js");

const NativeTextView = requireClass("android.widget.TextView");
const NativeHtml = requireClass("android.text.Html");
const NativeR = requireClass("android.R");
const NativeColorStateList = requireClass("android.content.res.ColorStateList");

const DEFAULT_COLOR = Color.BLACK;
        
const Label = extend(View)(
    function (_super, params) {
        var self = this;
        var textAlignmentInitial;
        var viewNativeDefaultTextAlignment;
        var activity = Android.getActivity();
        
        // Is Label Check
        if(!self.nativeObject){
            self.nativeObject = new NativeTextView(activity);
            textAlignmentInitial = TextAlignment.MIDLEFT;
            // Gravity.CENTER_VERTICAL | Gravity.LEFT
            self.nativeObject.setGravity(16 | 3);
            viewNativeDefaultTextAlignment = 16 | 3;
            
        }
        else{
            textAlignmentInitial = TextAlignment.MIDCENTER;
            // Gravity.CENTER
            self.nativeObject.setGravity(17);
            viewNativeDefaultTextAlignment = 17;
        }
        _super(this);

        Object.defineProperty(this, 'htmlText', {
            get: function() {
                var text = self.nativeObject.getText();
                if(text){
                    var htmlText = NativeHtml.toHtml(text);
                    return htmlText.toString();
                }
                else{
                    return "";
                }
                
            }, 
            set: function(htmlText) {
                var htmlTextNative = NativeHtml.fromHtml(htmlText);
                self.nativeObject.setText(htmlTextNative);
            },
            enumerable: true
        });

        var fontInitial;
        Object.defineProperty(this, 'font', {
            get: function() {
                return fontInitial;
            },
            set: function(font) {
                if(font){
                    fontInitial = font;
                    self.nativeObject.setTypeface(font.nativeObject);
                    if(font.size && TypeUtil.isNumeric(font.size))
                       self.nativeObject.setTextSize(AndroidUnitConverter.dpToPixel(activity,font.size));
                    }
            },
            enumerable: true
        });

        Object.defineProperty(this, 'multiline', {
            get: function() {
                return self.nativeObject.getLineCount() != 1;
            },
            set: function(multiline) {
                self.nativeObject.setSingleLine(!multiline);
            },
            enumerable: true
        });

        // @todo property returns CharSquence object not string. Caused by issue AND-2508
        Object.defineProperty(this, 'text', {
            get: function() {
                return self.nativeObject.getText();
            },
            set: function(text) {
                self.nativeObject.setText(text);
                // @todo this will cause performance issues in feature. Must be replaced.
                self.nativeObject.requestLayout();
            },
            enumerable: true
        });
        
        
        Object.defineProperty(this, 'textAlignment', {
            get: function() {
                return textAlignmentInitial;
            },
            set: function(textAlignment) {
                textAlignmentInitial = textAlignment;
                var alignment = viewNativeDefaultTextAlignment;
                switch(textAlignment){
                    case TextAlignment.TOPLEFT:
                        // Gravity.TOP | Gravity.LEFT
                        alignment = 48 | 3;
                        break;
                    case TextAlignment.TOPCENTER:
                        // Gravity.TOP | Gravity.CENTER_HORIZONTAL
                        alignment = 48 | 1;
                        break;
                    case TextAlignment.TOPRIGHT:
                        // Gravity.TOP | Gravity.RIGHT
                        alignment = 48 | 5;
                        break;
                    case TextAlignment.MIDLEFT:
                        // Gravity.CENTER_VERTICAL | Gravity.LEFT
                        alignment = 16 | 3;
                        break;
                    case TextAlignment.MIDCENTER:
                        // Gravity.CENTER
                        alignment = 17;
                        break;
                    case TextAlignment.MIDRIGHT:
                        // Gravity.CENTER_VERTICAL | Gravity.RIGHT
                        alignment = 16 | 5;
                        break;
                    case TextAlignment.BOTTOMLEFT:
                        // Gravity.BOTTOM | Gravity.LEFT
                        alignment = 80 | 3;
                        break;
                    case TextAlignment.BOTTOMCENTER:
                        // Gravity.BOTTOM | Gravity.CENTER_HORIZONTAL
                        alignment = 80 | 1;
                        break;
                    case TextAlignment.BOTTOMRIGHT:
                        // Gravity.BOTTOM | Gravity.RIGHT
                        alignment = 80 | 5;
                        break;                   
                }
                self.nativeObject.setGravity(alignment);
            },
            enumerable: true
        });

        var _textColor = Color.BLACK;
        Object.defineProperty(this, 'textColor', {
            get: function() {
                if(typeof(_textColor) === "number") {
                    return self.nativeObject.getCurrentTextColor();
                }
                return _textColor;
            },
            set: function(textColor) {
                _textColor = textColor;
                if(typeof(textColor) === "number") {
                    self.nativeObject.setTextColor(textColor);
                }
                else {
                    var textColorStateListDrawable = createColorStateList(textColor);
                    self.nativeObject.setTextColor(textColorStateListDrawable);
                }
            },
            enumerable: true
        });

        Object.defineProperty(this, 'showScrollBar', {
            get: function() {
                return self.nativeObject.isVerticalScrollBarEnabled();
            },
            set: function(showScrollBar) {
                self.nativeObject.setVerticalScrollBarEnabled(showScrollBar);
            },
            enumerable: true
        });
        
        function createColorStateList(textColors) {
            var statesSet = [];
            var colorsSets = [];
            if(textColors.normal){
                statesSet.push(View.State.STATE_NORMAL);
                colorsSets.push(textColors.normal);
            }
            if(textColors.disabled){
                statesSet.push(View.State.STATE_DISABLED);
                colorsSets.push(textColors.disabled);
            }
            if(textColors.selected){
                statesSet.push(View.State.STATE_SELECTED);
                colorsSets.push(textColors.selected);
            }
            if(textColors.pressed){
                statesSet.push(View.State.STATE_PRESSED);
                colorsSets.push(textColors.pressed);
            }
            if(textColors.focused){
                statesSet.push(View.State.STATE_FOCUSED);
                colorsSets.push(textColors.focused);
            }
            return (new NativeColorStateList (statesSet, colorsSets));
        }
        
        // Assign parameters given in constructor
        if (params) {
            for (var param in params) {
                this[param] = params[param];
            }
        }
    }
);

module.exports = Label;