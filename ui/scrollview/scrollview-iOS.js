const ViewGroup = require('../viewgroup');
const ScrollViewAlign = require("../../ui/scrollview/scrollview-align");
const ScrollViewEdge = require("../../ui/scrollview/scrollview-edge");
const FlexLayout = require('../../ui/flexlayout');
const Color = require('../../ui/color');
const UIScrollViewInheritance = require('../../util').UIScrollViewInheritance;
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
ScrollView.Events = {...ViewGroup.Events, ...Events};

const ScrollType = {
    vertical: 0,
    horizontal: 1
};
ScrollView.prototype = Object.create(ViewGroup.prototype)
function ScrollView(params) {
    var self = this;

    if (!self.nativeObject) {
        self.nativeObject = new __SF_UIScrollView();
        self.contentLayout = new FlexLayout();
        self.contentLayout.nativeObject.addFrameObserver();
        self.contentLayout.nativeObject.frameObserveHandler = function(e) {
            if (!self.autoSizeEnabled) {
                self.changeContentSize(e.frame);
            }
            if (typeof self.gradientColorFrameObserver === 'function') {
                self.gradientColorFrameObserver(e);
            }
        };
        var _frame = {};
        self.nativeObject.addFrameObserver();
        self.nativeObject.frameObserveHandler = function(e) {
            if ((JSON.stringify(_frame) != JSON.stringify(e.frame))) {
                _frame = e.frame;
                self.layout.applyLayout();
            }
        };
        self.nativeObject.addSubview(self.contentLayout.nativeObject);
    }

    ViewGroup.call(this);

    UIScrollViewInheritance.addPropertiesAndMethods.call(this);

    Object.defineProperty(self, 'layout', {
        get: function() {
            return self.contentLayout;
        },
        enumerable: true
    });

    var isLTR = (__SF_UIView.viewAppearanceSemanticContentAttribute() == 0) ? (__SF_UIApplication.sharedApplication().userInterfaceLayoutDirection == 0) : (__SF_UIView.viewAppearanceSemanticContentAttribute() == 3);
    if (!isLTR) {
        self.flipHorizontally();
        self.layout.onViewAddedInnerCallback = function(view) {
            view.flipHorizontally();
        };
        self.layout.onViewRemovedInnerCallback = function(view) {
            view.flipHorizontally();
        };
    }

    self.layout.applyLayout = function() {
        __SF_Dispatch.mainAsync(function() {
            if (self.autoSizeEnabled) {
                self.layout.width = self.nativeObject.frame.width;
                self.layout.height = self.nativeObject.frame.height;
            }

            self.layout.nativeObject.yoga.applyLayoutPreservingOrigin(false);
            if (self.autoSizeEnabled) {
                var rect = {
                    x: 0,
                    y: 0,
                    width: self.nativeObject.frame.width,
                    height: self.nativeObject.frame.height
                };
                var subviews = self.layout.nativeObject.subviews;
                var widthAffectingView;
                var heightAffectingView;
                for (var i = 0; i < subviews.length; i++) {
                    var frame = subviews[i].frame;
                    rect.x = frame.x < rect.x ? frame.x : rect.x;
                    rect.y = frame.y < rect.y ? frame.y : rect.y;
                    var width = frame.x < 0 ? frame.width : frame.x + frame.width;
                    if (width > rect.width) {
                        rect.width = width;
                        widthAffectingView = subviews[i];
                    }
                    var height = frame.y < 0 ? frame.height : frame.y + frame.height;
                    if (height > rect.height) {
                        rect.height = height;
                        heightAffectingView = subviews[i];
                    }
                }

                if (_align === ScrollType.horizontal) {
                    //// PADDING CHECK ///////
                    if (isNumber(self.layout.paddingRight)) {
                        rect.width = rect.width + self.layout.paddingRight;
                    } else if (isNumber(self.layout.padding)) {
                        rect.width = rect.width + self.layout.padding;
                    }
                    ///////////////////////////

                    //// MARGIN CHECK /////////
                    if (widthAffectingView && isNumber(widthAffectingView.yoga.getYGValueForKey("marginLeft"))) {
                        rect.width = rect.width + widthAffectingView.yoga.getYGValueForKey("marginLeft");
                    } else if (widthAffectingView && isNumber(widthAffectingView.yoga.getYGValueForKey("margin"))) {
                        rect.width = rect.width + widthAffectingView.yoga.getYGValueForKey("margin");
                    }
                    rect.height = self.nativeObject.frame.height;
                    /////////////////////////////
                } else {
                    //// PADDING CHECK ///////
                    if (isNumber(self.layout.paddingBottom)) {
                        rect.height = rect.height + self.layout.paddingBottom;
                    } else if (isNumber(self.layout.padding)) {
                        rect.height = rect.height + self.layout.padding;
                    }
                    ///////////////////////////

                    //// MARGIN CHECK /////////
                    if (heightAffectingView && isNumber(heightAffectingView.yoga.getYGValueForKey("marginBottom"))) {
                        rect.height = rect.height + heightAffectingView.yoga.getYGValueForKey("marginBottom");
                    } else if (heightAffectingView && isNumber(heightAffectingView.yoga.getYGValueForKey("margin"))) {
                        rect.height = rect.height + heightAffectingView.yoga.getYGValueForKey("margin");
                    }
                    ///////////////////////////
                    rect.width = self.nativeObject.frame.width;

                }

                self.layout.width = rect.width;
                self.layout.height = rect.height;
                self.layout.nativeObject.yoga.applyLayoutPreservingOrigin(false);

                self.changeContentSize(rect);
            }
        });
    };

    function isNumber(value) {
        if (!isNaN(value) && typeof value === 'number') {
            return true;
        }
        return false;
    };

    var _autoSizeEnabled = false;
    Object.defineProperty(self, 'autoSizeEnabled', {
        get: function() {
            return _autoSizeEnabled;
        },
        set: function(value) {
            _autoSizeEnabled = value;
        },
        enumerable: true
    });

    Object.defineProperty(self, 'onScroll', {
        set: function(value) {
            self.nativeObject.didScroll = value;
        },
        enumerable: true
    });

    Object.defineProperty(self.ios, 'scrollEnabled', {
        get: function() {
            return self.nativeObject.valueForKey("scrollEnabled");
        },
        set: function(value) {
            self.nativeObject.setValueForKey(value, "scrollEnabled");
        },
        enumerable: true
    });

    Object.defineProperty(self.layout, 'backgroundColor', {
        get: function() {
            return new Color({
                color: self.layout.nativeObject.backgroundColor
            });
        },
        set: function(value) {
            if (value.nativeObject.constructor.name === "CAGradientLayer") {
                if (!self.gradientColor) {
                    self.gradientColorFrameObserver = function(e) {
                        if (self.layout.nativeObject.frame.width === 0 || self.layout.nativeObject.frame.height === 0) {
                            return;
                        }
                        self.gradientColor.frame = e.frame;
                        self.layout.nativeObject.backgroundColor = self.gradientColor.layerToColor();
                    }
                }
                self.gradientColor = value.nativeObject;
                if (self.layout.nativeObject.frame.width === 0 || self.layout.nativeObject.frame.height === 0) {
                    return;
                }
                self.gradientColor.frame = self.layout.nativeObject.frame;
                self.layout.nativeObject.backgroundColor = self.gradientColor.layerToColor();
            } else {
                if (self.gradientColor) {
                    self.gradientColorFrameObserver = undefined;
                    self.gradientColor = undefined;
                }
                self.layout.nativeObject.backgroundColor = value.nativeObject;
            }
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(self, 'scrollBarEnabled', {
        get: function() {
            return self.nativeObject.showsHorizontalScrollIndicator;
        },
        set: function(value) {
            self.nativeObject.showsHorizontalScrollIndicator = value;
            self.nativeObject.showsVerticalScrollIndicator = value;
        },
        enumerable: true
    });

    const EventFunctions = {
        [Events.Scroll]: function() {
            self.nativeObject.didScroll = (state) => {
                this.emitter.emit(Events.Scroll, state);
            } 
        },
        [Events.ScrollBeginDecelerating]: function() {
            const onScrollBeginDeceleratingHandler = (scrollView) => {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                this.emitter.emit(Events.ScrollBeginDecelerating, contentOffset)
            };
            self.nativeObject.onScrollBeginDecelerating = onScrollBeginDeceleratingHandler;
        },
        [Events.ScrollBeginDragging]: function() {
            const onScrollBeginDraggingHandler = (scrollView) => {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                this.emitter.emit(Events.ScrollBeginDragging, contentOffset)
            };
            self.nativeObject.onScrollViewWillBeginDragging = onScrollBeginDraggingHandler;
        },
        [Events.ScrollEndDecelerating]: function() {
            const onScrollEndDeceleratingHandler = (scrollView) => {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                this.emitter.emit(Events.ScrollEndDecelerating, contentOffset)
            };
            self.nativeObject.onScrollEndDecelerating = onScrollEndDeceleratingHandler;
        },
        [Events.ScrollEndDraggingWillDecelerate]: function() {
            const onScrollEndDraggingWillDecelerateHandler = (scrollView, decelerate) => {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                this.emitter.emit(Events.ScrollEndDraggingWillDecelerate, contentOffset)

            };
            self.nativeObject.onScrollViewDidEndDraggingWillDecelerate = onScrollEndDraggingWillDecelerateHandler;
        },
        [Events.ScrollEndDraggingWithVelocityTargetContentOffset]: function() {
            const onScrollEndDraggingWithVelocityTargetContentOffsetHandler = (scrollView, velocity, targetContentOffset) => {
                const contentOffset = {
                    x: scrollView.contentOffset.x + scrollView.contentInsetDictionary.left,
                    y: scrollView.contentOffset.y + scrollView.contentInsetDictionary.top
                };
                targetContentOffset.x += +scrollView.contentInsetDictionary.left;
                targetContentOffset.y += +scrollView.contentInsetDictionary.top;
                this.emitter.emit(Events.ScrollEndDraggingWithVelocityTargetContentOffset, contentOffset, velocity, targetContentOffset);
            };
            self.nativeObject.onScrollViewWillEndDraggingWithVelocityTargetContentOffset = onScrollEndDraggingWithVelocityTargetContentOffsetHandler;
        }
    }

    EventEmitterCreator(this, EventFunctions);

    var _align = ScrollType.vertical;
    Object.defineProperty(self, 'align', {
        get: function() {
            if (_align === ScrollType.horizontal) {
                return ScrollViewAlign.HORIZONTAL;
            } else {
                return ScrollViewAlign.VERTICAL;
            }

        },
        set: function(value) {
            if (value === ScrollViewAlign.HORIZONTAL) {
                _align = ScrollType.horizontal;
            } else {
                _align = ScrollType.vertical;
            }
            if (!self.autoSizeEnabled) {
                self.changeContentSize(self.layout.nativeObject.frame);
            }
        },
        enumerable: true
    });

    self.scrollToEdge = function(edge) {
        if (_align === ScrollType.horizontal) {
            if (edge === ScrollViewEdge.LEFT) {
                self.nativeObject.setContentOffsetAnimated({
                    x: 0,
                    y: 0
                }, true);
            } else if (edge === ScrollViewEdge.RIGHT) {
                self.nativeObject.scrollToRight();
            }
        } else if (_align === ScrollType.vertical) {
            if (edge === ScrollViewEdge.TOP) {
                self.nativeObject.setContentOffsetAnimated({
                    x: 0,
                    y: 0
                }, true);
            } else if (edge === ScrollViewEdge.BOTTOM) {
                self.nativeObject.scrollToBottom();
            }
        }
    };

    self.scrollToCoordinate = function(coordinate) {
        if (_align === ScrollType.horizontal) {
            self.nativeObject.setContentOffsetAnimated({
                x: coordinate,
                y: 0
            }, true);
        } else if (_align === ScrollType.vertical) {
            self.nativeObject.setContentOffsetAnimated({
                x: 0,
                y: coordinate
            }, true);
        }
    };

    self.changeContentSize = function(frame) {
        if (_align === ScrollType.vertical) {
            self.nativeObject.contentSize = {
                width: 0,
                height: frame.height
            };
        } else {
            self.nativeObject.contentSize = {
                width: frame.width,
                height: 0
            };
        }
    };

    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

Object.defineProperties(ScrollView, {
    'Align': {
        value: require('./scrollview-align'),
        enumerable: true
    },
    'Edge': {
        value: require('./scrollview-edge'),
        enumerable: true
    }
});

module.exports = ScrollView;