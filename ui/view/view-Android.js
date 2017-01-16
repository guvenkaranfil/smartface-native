const TypeUtil = require("sf-core/util/type");
const Style = require('sf-core/ui/style');

const NativeView = requireClass("android.view.View");
const NativeColorDrawable = requireClass("android.graphics.drawable.ColorDrawable");
const NativeGradientDrawable = requireClass("android.graphics.drawable.GradientDrawable");
const NativeLayerDrawable = requireClass("android.graphics.drawable.LayerDrawable");
const NativeColor = requireClass("android.graphics.Color");
const NativeMotionEvent = requireClass("android.view.MotionEvent");
const NativeAbsoluteLayout = requireClass("android.widget.AbsoluteLayout");
const NativeRelativeLayout = requireClass("android.widget.RelativeLayout");
const NativeLinearLayout = requireClass("android.widget.LinearLayout");

function View(params) {
    var self = this;
    if(!self.nativeObject){
        self.nativeObject = new NativeView(Android.getActivity());
    }
    
    var backgroundColorInitial = 0xFFFFFFFF;
    var backgroundColorDrawable = new NativeColorDrawable(backgroundColorInitial);
    //var borderDrawable = android.graphics.drawable.ShapeDrawable();
    var borderDrawable = new NativeGradientDrawable();

    var layerDrawable = new NativeLayerDrawable([backgroundColorDrawable,backgroundColorDrawable]);
    layerDrawable.setId(0,0);
    layerDrawable.setId(1,1);
    layerDrawable.setDrawableByLayerId(0,backgroundColorDrawable);
    layerDrawable.setDrawableByLayerId(1,borderDrawable);
    self.nativeObject.setBackground(layerDrawable);

    Object.defineProperty(this, 'alpha', {
        get: function() {
            return self.nativeObject.getAlpha();
        },
        set: function(alpha) {
            self.nativeObject.setAlpha(alpha);
        },
        enumerable: true
    });
    
    Object.defineProperty(this, 'backgroundColor', {
        get: function() {
            return backgroundColorDrawable.getColor();
        },
        set: function(backgroundColor) {
            var colorParam = backgroundColor;
            if(!TypeUtil.isNumeric(backgroundColor)){
                colorParam = NativeColor.parseColor(backgroundColor);
            }
            backgroundColorDrawable.setColor(colorParam);
            setBackground(0);
        },
        enumerable: true
     });

    // LayoutParams.WRAP_CONTENT = -2
    var heightInitial = -2;
    Object.defineProperty(this, 'height', {
        get: function() {
            return self.nativeObject.getHeight();
        },
        set: function(height) {
            heightInitial = height;
            self.invalidatePosition();
        },
        enumerable: true
    });

    var idInitial = NativeView.generateViewId();
    self.nativeObject.setId(idInitial);
    Object.defineProperty(this, 'id', {
        get: function() {
            return self.nativeObject.getId();
        },
        set: function(id) {
            self.nativeObject.setId(id);
        },
        enumerable: true
     });
    
    var leftInitial = 0;
    Object.defineProperty(this, 'left', {
        get: function() {
            return self.nativeObject.getLeft();
        },
        set: function(left) {
            leftInitial = left;
            self.invalidatePosition();
        },
        enumerable: true
     });

    var topInitial = 0;
    Object.defineProperty(this, 'top', {
        get: function() {
            return self.nativeObject.getTop();
        },
        set: function(top) {
            topInitial = top;
            self.invalidatePosition();
        },
        enumerable: true
     });

    Object.defineProperty(this, 'visible', {
        get: function() {
            // View.VISIBLE is 0
            return self.nativeObject.getVisibility() == 0;
        },
        set: function(visible) {
            if(visible)
                // View.VISIBLE is 0
                self.nativeObject.setVisibility(0);
            else
                // View.VISIBLE is 4
                self.nativeObject.setVisibility(4);
        },
        enumerable: true
    });

    var widthInitial = -2;
    Object.defineProperty(this, 'width', {
        get: function() {
            return self.nativeObject.getWidth();
        },
        set: function(width) {
            widthInitial = width;
            self.invalidatePosition();
        },
        enumerable: true
     });

    this.getPosition = function(){
        return  {
            width: self.width, 
            height: self.height, 
            top: self.top, 
            left: self.left
        }; 
    };

    this.getInitialPosition = function(){
        return  {
            width: widthInitial,
            height: heightInitial,
            top: topInitial,
            left: leftInitial
        };
    };

    this.setPosition = function(position){
        widthInitial = position.width ? position.width : widthInitial;
        heightInitial = position.height ? position.height : heightInitial;
        topInitial = position.top ? position.top : topInitial;
        leftInitial = position.left ? position.left : leftInitial;
        self.invalidatePosition();

    }

    this.touchEnabled = true;
    Object.defineProperty(this, 'onTouch', {
        get: function() {
            return self.onTouchCallback;
        },
        set: function(onTouch) {
            self.onTouchCallback = onTouch;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'onTouchEnded', {
        get: function() {
            return self.onTouchEndedCallback;
        },
        set: function(onTouchEnded) {
            self.onTouchEndedCallback = onTouchEnded;
        },
        enumerable: true
    });
    
    self.nativeObject.setOnTouchListener(NativeView.OnTouchListener.implement({
        onTouch: function(view, event) {
            if(self.touchEnabled){
                if (event.getAction() == NativeMotionEvent.ACTION_UP) {
                    self.onTouchEndedCallback && self.onTouchEndedCallback();
                } else {
                    self.onTouchCallback && self.onTouchCallback();
                }
            }
            return false;
        }
    }));
      
    var styleInitial = new Style({borderColor:"#00000000",borderWidth:0});
    Object.defineProperty(this, 'style', {
        get: function() {
            return styleInitial;
        },
        set: function(style) {
            styleInitial = style;
            applyStyle();
            style.addChangeHandler(function(propertyName, value){
                applyStyle();
            });
        },
        enumerable: true
    });

    Object.defineProperty(this, 'padding', {
        get: function() {
            return {
                left: self.nativeObject.getPaddingLeft(),
                top: self.nativeObject.getPaddingTop(),
                right: self.nativeObject.getPaddingRight(),
                bottom: self.nativeObject.getPaddingBottom() };
        },
        set: function(padding) {
            var paddingLeft = padding.left ? padding.left : 0;
            var paddingTop = padding.top ? padding.top : 0;
            var paddingRight = padding.right ? padding.right : 0;
            var paddingBottom = padding.bottom ? padding.bottom : 0;
            self.nativeObject.setPadding(paddingLeft,paddingTop,paddingRight,paddingBottom);
        },
        enumerable: true
    });

    this.bringToFront = function(){
        self.nativeObject.bringToFront();
    };

    this.getParent = function(){
        return self.parent ? self.parent : null;
    };

    this.invalidatePosition = function(parentWidth, parentHeight){
        setLayoutParam(parentWidth, parentHeight);
//        if( (TypeUtil.isNumeric(widthInitial) &&  TypeUtil.isNumeric(heightInitial) && TypeUtil.isNumeric(leftInitial) && TypeUtil.isNumeric(topInitial)) || self.parent){
//        }
    };

    // Using from ViewGroup
    this.getInitialPosition = function(){
        return  {
            width: widthInitial,
            height: heightInitial,
            top: topInitial,
            left: leftInitial
        };
    };

    // @todo no ENUM support
    function applyStyle(){
        var borderColor = styleInitial.borderColor;
        if(!TypeUtil.isNumeric(styleInitial.borderColor)){
            borderColor = NativeColor.parseColor(styleInitial.borderColor);;
        }
        // android.graphics.Color.TRANSPARENT=0
        borderDrawable.setColor(0);
        borderDrawable.setStroke(styleInitial.borderWidth, borderColor);
        // var strokePaint = borderDrawable.getPaint();
        // strokePaint.setAntiAlias (true);

        // if (styleInitial.borderWidth > 0) {
        //     strokePaint.setStrokeWidth (styleInitial.borderWidth);
        //     strokePaint.setColor (borderColor);
        //     //strokePaint.setStyle (android.graphics.Paint.Style.STROKE);

        // } else {
        //     var backgroundColorCurrent = self.backgroundColorDrawable.getColor();
        //     strokePaint.setColor (backgroundColorCurrent);
        //     //strokePaint.setStyle (android.graphics.Paint.Style.STROKE);
        //     strokePaint.setAlpha (0);
        // }
        setBackground(1);
    }

    // @todo Need check for performance
    function setLayoutParam(parentWidth, parentHeight){
        // This method call is all layout params is number of view added to parent
        var leftPosition;
        var topPosition;
        var height;
        var width;

        if(!TypeUtil.isNumeric(leftInitial)){
            leftPosition = (parentWidth ? parentWidth : (self.parent ? self.parent.width : 0) )* (parseInt(leftInitial.replace("%")))/100
        }
        else{
            leftPosition = leftInitial;
        }

        if(!TypeUtil.isNumeric(topInitial)){
            topPosition = (parentHeight ? parentHeight : (self.parent ? self.parent.height : 0) )* (parseInt(topInitial.replace("%")))/100
        }
        else{
            topPosition = topInitial;
        }

        if(!TypeUtil.isNumeric(heightInitial)){
            height = (parentHeight ? parentHeight : (self.parent ? self.parent.height : 0) )* (parseInt(heightInitial.replace("%")))/100
        }
        else{
            height = heightInitial;
        }

        if(!TypeUtil.isNumeric(widthInitial)){
            width = (parentWidth ? parentWidth : (self.parent ? self.parent.width : 0) )* (parseInt(widthInitial.replace("%")))/100
        }
        else{
            width = widthInitial;
        }

        var layoutParams;
        if(self.parent){
            if(self.parent.nativeObject.toString().indexOf("Relative") !== -1){
                // @todo Will change after implementation of RelativeLayout
                layoutParams = new NativeRelativeLayout.LayoutParams(width,height);
            }
            else if(self.parent.nativeObject.toString().indexOf("Linear") !== -1){
                // @todo Will change after implementation of LinearLayout. Default weight is %100 percentage
                layoutParams = new NativeLinearLayout.LayoutParams(width,height,100);
            }
            else if(self.parent.nativeObject.toString().indexOf("Absolute") !== -1){
                layoutParams = new NativeAbsoluteLayout.LayoutParams(width,height,leftPosition,topPosition);
            }
            else{
                // Our page's root layout is AbsoluteLayout.
                layoutParams = new NativeAbsoluteLayout.LayoutParams(width,height,leftPosition,topPosition);
            }
        }
        else{
            // Our page's root layout is AbsoluteLayout.
            layoutParams = new NativeAbsoluteLayout.LayoutParams(width,height,leftPosition,topPosition);
        }
        self.nativeObject.setLayoutParams(layoutParams);

        // invalidating child positions
        var id = self.id;
        if(self.childViews){
            for(var childViewKey in self.childViews){
                // passing calculated height and width to child view
                self.childViews[childViewKey].invalidatePosition(width, height);
            }
        }
    }

    function setBackground(layerIndex){
        switch (layerIndex){
            case 0: 
                layerDrawable.setDrawableByLayerId(0,backgroundColorDrawable);
                break;
            case 1:
                layerDrawable.setDrawableByLayerId(1,borderDrawable);
        }
        self.nativeObject.setBackground(layerDrawable);
    }


    
}

module.exports = View;