const Page = require('../../ui/page');
const FlexLayout = require('../../ui/flexlayout');
const Color = require('../../ui/color');
const Events = require('./events');
const { EventEmitterCreator } = require('../../core/eventemitter');
SliderDrawer.Events = {...Page.Events, ...Events};


const SLIDER_DRAWER_STATE = {
    CLOSE: 0,
    DRAGGING: 1,
    OPEN: 2
};

SliderDrawer.prototype = Object.create(Page.prototype);
function SliderDrawer(params) {
    var self = this;

    var _position = 0;
    var _enabled = true;
    var _drawerWidth = 100;

    if (!self.nativeObject) {
        self.nativeObject = __SF_SliderDrawer.new();
        self.nativeObject.position = _position;
        self.nativeObject.state = 0;
        self.nativeObject.enabled = _enabled;
    }

    Page.call(self);

    self.pageView = new FlexLayout({
        backgroundColor: Color.WHITE
    });
    self.pageView.nativeObject.frame = __SF_UIScreen.mainScreen().bounds;

    self.nativeObject.onViewLoad = function() {
        return self.pageView.nativeObject;
    };

    self.nativeObject.onViewLayoutSubviews = function() {
        self.pageView.nativeObject.frame = {
            x: self.drawerPosition ? __SF_UIScreen.mainScreen().bounds.width - self.pageView.nativeObject.frame.width : 0,
            y: 0,
            height: __SF_UIScreen.mainScreen().bounds.height,
            width: self.width
        };

        self.pageView.left = self.pageView.nativeObject.frame.x;
        self.pageView.top = self.pageView.nativeObject.frame.y;
        self.pageView.width = self.pageView.nativeObject.frame.width;
        self.pageView.height = self.pageView.nativeObject.frame.height;

        self.pageView.applyLayout();
    };

    Object.defineProperties(this, {
        'backgroundColor': {
            get: function() {
                return self.pageView.backgroundColor;
            },
            set: function(value) {
                self.pageView.backgroundColor = value;
            },
            enumerable: true
        },
        'drawerPosition': {
            get: function() {
                return _position;
            },
            set: function(position) {
                _position = position;
                self.nativeObject.position = _position;
            },
            enumerable: true
        },
        'state': {
            get: function() {
                var state = self.nativeObject.state;
                switch (state) {
                    case SLIDER_DRAWER_STATE.OPEN:
                        return SliderDrawer.State.OPEN;
                        break;
                    case SLIDER_DRAWER_STATE.CLOSE:
                        return SliderDrawer.State.CLOSED;
                        break;
                    case SLIDER_DRAWER_STATE.DRAGGING:
                        return SliderDrawer.State.DRAGGED;
                        break;
                    default:
                        return -1;
                }
            },
            enumerable: true
        },
        'enabled': {
            get: function() {
                return _enabled;
            },
            set: function(enabled) {
                _enabled = enabled;
                self.nativeObject.enabled = _enabled;
            },
            enumerable: true
        },
        'width': {
            get: function() {
                return _drawerWidth;
            },
            set: function(width) {
                _drawerWidth = width;
                self.pageView.nativeObject.frame = {
                    x: self.pageView.nativeObject.frame.x,
                    y: self.pageView.nativeObject.frame.y,
                    height: self.pageView.nativeObject.frame.height,
                    width: _drawerWidth
                };
                self.pageView.width = _drawerWidth;
            },
            enumerable: true,
            configurable: true
        },
        'onDrag': {
            get: function() {
                return self.nativeObject.onDrag;
            },
            set: function(callback) {
                if (typeof callback === "function") {
                    self.nativeObject.onDrag = callback;
                }
            },
            enumerable: true
        }
    });

    Object.defineProperty(self, 'onShow', {
        get: function() {
            return self.nativeObject.onShow;
        },
        set: function(value) {
            self.nativeObject.onShow = (function() {
                __SF_UIView.animation(0, 0, function() {
                    self.layout.nativeObject.endEditing(true);
                }, {});
                if (value instanceof Function) {
                    value.call(this, this.__pendingParameters);
                    delete this.__pendingParameters;
                }
            }).bind(this);
        },
        enumerable: true,
        configurable: true
    });

    const EventFunctions = {
        [Events.Show]: function() {
            self.onShow = (state) => {
                self.emitter.emit(Events.Show, state);
            } 
        }
        //onLoad and onHide comes from the page
    }
    
    EventEmitterCreator(this, EventFunctions);

    self.onShow = function(e) {};

    this.show = function() {
        self.nativeObject.show();
    };

    this.hide = function() {
        self.nativeObject.hide();
    };

    // Assign parameters given in constructor
    if (params) {
        for (var param in params) {
            this[param] = params[param];
        }
    }
}

SliderDrawer.Position = {};
Object.defineProperties(SliderDrawer.Position, {
    'LEFT': {
        value: 0,
        writable: false
    },
    'RIGHT': {
        value: 1,
        writable: false
    }
});

SliderDrawer.State = require("./sliderdrawer-state");

module.exports = SliderDrawer;