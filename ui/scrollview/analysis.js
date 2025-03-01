/**
 * @class UI.ScrollView
 * @extends UI.ViewGroup
 * @since 0.1
 *
 * ScrollView enables user to view pages with large content exceeding screen size via scroll action.
 * ScrollView can have only one child layout. The layout should be added if there are child views more 
 * than one.
 *    
 *     @example
 *     const FlexLayout = require('@smartface/native/ui/flexlayout');
 *     const ScrollView = require('@smartface/native/ui/scrollview');
 *     const Button = require('@smartface/native/ui/button');
 *     const Color = require('@smartface/native/ui/color');
 *
 *     var scrollView = new ScrollView({
 *        flexGrow: 1,
 *        backgroundColor: Color.GREEN,
 *        alignSelf: FlexLayout.AlignSelf.STRETCH
 *     });
 *     scrollView.layout.height = 2000;
 *     scrollView.layout.backgroundColor = Color.RED;
 *     scrollView.layout.alignItems = FlexLayout.AlignItems.CENTER;
 *     var buttonTop = new Button({
 *       height: 100,
 *       width: 100,
 *       top:10,
 *       text: "Scroll to 1100",
 *       backgroundColor: Color.BLUE,
 *       onPress: function(){
 *           scrollView.scrollToCoordinate(1100);
 *       }
 *     });
 *     var buttonBottom = new Button({
 *       height: 100,
 *       width: 100,
 *       top: 1000,
 *       text: "Scroll to 10",
 *       backgroundColor: Color.BLUE,
 *       onPress: function(){
 *           scrollView.scrollToCoordinate(10);
 *       }
 *     });
 *     scrollView.layout.addChild(buttonTop);
 *     scrollView.layout.addChild(buttonBottom);
 */
function ScrollView() { }

/**
 * Gets/sets over-scroll mode for this view.
 *
 * @property {UI.Android.OverScrollMode} [overScrollMode = UI.Android.OverScrollMode.ALWAYS]
 * @android
 * @since 3.0.2
 */
ScrollView.prototype.overScrollMode = UI.Android.OverScrollMode.ALWAYS;

/**
 * Gets/sets the alignment of the scrollview. If alignment is HORIZONTAL, the ScrollView 
 * will scroll horizontally, otherwise will scroll vertically. 
 * It must be set as constructor parameter. This property cannot be set after the object is initialized.
 *
 * @property {UI.ScrollView.Align} [align = UI.ScrollView.Align.VERTICAL]
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
ScrollView.prototype.align = UI.ScrollView.Align.VERTICAL;

/**
 * Gets layout of the ScrollView. Use this property to add a child to the ScrollView instead of {@link ScrollView#addChild}
 *
 * @property {UI.FlexLayout} [layout = UI.FlexLayout]
 * @android
 * @ios
 * @readonly
 * @since 1.1.10
 */
ScrollView.prototype.layout = UI.FlexLayout;

/**
 * Gets/sets the visibility of the scrollbar.
 *
 * @property {Boolean} [scrollBarEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
ScrollView.prototype.scrollBarEnabled = true;

/**
 * Scrollview layout size will be calculated by device automatically when autoSizeEnabled is true. To do the automatic calculation, you need to set scrollview.autoSizeEnabled property true and need to call scrollview.layout.applyLayout() function after every change.
 *
 * @property {Boolean} [autoSizeEnabled = false]
 * @android
 * @ios
 * @since 3.0.2
 */
ScrollView.prototype.autoSizeEnabled = false;

/**
 * If the value of this property is YES , scrolling is enabled, and if it is NO , scrolling is disabled. The default is YES.
 *
 * @property {Boolean} [scrollEnabled = true]
 * @ios
 * @since 3.1.3
 */
ScrollView.prototype.scrollEnabled = false;

/**
 * Sets/Gets the bounce effect when scrolling.
 *
 * @property {Boolean} bounces
 * @ios
 * @since 3.2.1
 */
ScrollView.prototype.bounces = true;

/**
 * The behavior for determining the adjusted content offsets.
 *
 * @property {UI.iOS.ContentInsetAdjustment} [contentInsetAdjustmentBehavior = UI.iOS.ContentInsetAdjustment.NEVER]
 * @ios
 * @since 4.0.0
 */
ScrollView.prototype.contentInsetAdjustmentBehavior = UI.iOS.ContentInsetAdjustment.NEVER;

/**
 * Immediately scrolls to the edge set.
 *
 * @method scrollToEdge
 * @android
 * @ios
 * @param {UI.ScrollView.Edge} edge
 * @since 0.1
 */
ScrollView.prototype.scrollToEdge = function () { };

/**
 * Immediately scrolls to the given coordinate. Coordinate is X position for horizontal alignment and
 * Y position for vertical alignment.
 *
 * @method scrollToCoordinate
 * @android
 * @ios
 * @param {Number} coordinate
 * @since 0.1
 */
ScrollView.prototype.scrollToCoordinate = function (coordinate) { };



/**
 * Gets contentOffset of the ScrollView.
 * 
 * @property contentOffset
 * @android
 * @ios
 * @readonly
 * @return {Object}
 * @return {Number} return.x
 * @return {Number} return.y
 * @since 1.1.13
 */
ScrollView.prototype.contentOffset = {};

/**
 * This event is called when a ScrollView is scrolled.
 * For better performance, don't set any callback if does not
 * necessary.
 *
 * @event onScroll
 * @deprecated
 * @param {Object} params
 * @param {Object} params.translation
 * @param {Number} params.translation.x
 * @param {Number} params.translation.y
 * @param {Object} params.contentOffset
 * @param {Number} params.contentOffset.x
 * @param {Number} params.contentOffset.y
 * @android
 * @ios
 * @since 1.1.13
 */
ScrollView.prototype.onScroll = function onScroll() { };

/**
 * This event is called when the scroll view is about to start scrolling the content.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @event onScrollBeginDragging
 * @deprecated
 * @ios
 * @since 3.2.1
 */
ScrollView.prototype.onScrollBeginDragging = function (contentOffset) { };

/**
 * This event is called when the scroll view is starting to decelerate the scrolling movement.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @event onScrollBeginDecelerating
 * @deprecated
 * @ios
 * @since 3.2.1
 */
ScrollView.prototype.onScrollBeginDecelerating = function (contentOffset) { };

/**
 * This event is called when the scroll view has ended decelerating the scrolling movement.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @event onScrollEndDecelerating
 * @ios
 * @since 3.2.1
 */
ScrollView.prototype.onScrollEndDecelerating = function (contentOffset) { };

/**
 * This event is called when dragging ended in the scroll view.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @param {Boolean} decelerate
 * @event onScrollEndDraggingWillDecelerate
 * @deprecated
 * @ios
 * @since 3.2.1
 */
ScrollView.prototype.onScrollEndDraggingWillDecelerate = function (contentOffset, decelerate) { };

/**
 * This event is called when the user finishes scrolling the content.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @param {Object} velocity
 * @param {Number} velocity.x
 * @param {Number} velocity.y
 * @param {Object} targetContentOffset
 * @param {Number} targetContentOffset.x
 * @param {Number} targetContentOffset.y
 * @event onScrollEndDraggingWithVelocityTargetContentOffset
 * @deprecated
 * @ios
 * @since 3.2.1
 */
ScrollView.prototype.onScrollEndDraggingWithVelocityTargetContentOffset = function (contentOffset, velocity, targetContentOffset) { };


/**
 * This event is called when a ScrollView is scrolled.
 * For better performance, don't set any callback if does not
 * necessary.
 *
 * @event onScroll
 * @param {Object} params
 * @param {Object} params.translation
 * @param {Number} params.translation.x
 * @param {Number} params.translation.y
 * @param {Object} params.contentOffset
 * @param {Number} params.contentOffset.x
 * @param {Number} params.contentOffset.y
 * @android
 * @ios
 * @since 1.1.13
 */
ScrollView.Events.Scroll = "scroll";

/**
 * This event is called when the scroll view is about to start scrolling the content.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @event onScrollBeginDragging
 * @ios
 * @since 3.2.1
 */
ScrollView.Events.ScrollBeginDragging = "scrollBeginDragging";

/**
 * This event is called when the scroll view is starting to decelerate the scrolling movement.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @event onScrollBeginDecelerating
 * @ios
 * @since 3.2.1
 */
ScrollView.Events.ScrollBeginDecelerating = "scrollBeginDecelerating";

/**
 * This event is called when the scroll view has ended decelerating the scrolling movement.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @event onScrollEndDecelerating
 * @ios
 * @since 3.2.1
 */
ScrollView.Events.ScrollEndDecelerating = "scrollEndDecelerating";

/**
 * This event is called when dragging ended in the scroll view.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @param {Boolean} decelerate
 * @event onScrollEndDraggingWillDecelerate
 * @ios
 * @since 3.2.1
 */
ScrollView.Events.ScrollEndDraggingWillDecelerate = "scrollEndDraggingWillDecelerate";

/**
 * This event is called when the user finishes scrolling the content.
 * 
 * @param {Object} contentOffset
 * @param {Number} contentOffset.x
 * @param {Number} contentOffset.y
 * @param {Object} velocity
 * @param {Number} velocity.x
 * @param {Number} velocity.y
 * @param {Object} targetContentOffset
 * @param {Number} targetContentOffset.x
 * @param {Number} targetContentOffset.y
 * @event onScrollEndDraggingWithVelocityTargetContentOffset
 * @ios
 * @since 3.2.1
 */
ScrollView.Events.ScrollEndDraggingWithVelocityTargetContentOffset = "scrollEndDraggingWithVelocityTargetContentOffset";

/**
 * @enum UI.ScrollView.Edge
 * @static
 * @readonly
 * @since 0.1
 *
 * Indicates where to scroll.
 *
 */
const ScrollViewEdge = {};

/**
 * Indicates left edge of the ScrollView
 * 
 * @property {String} [LEFT = 'left']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.LEFT = 'left';

/**
 * Indicates top edge of the ScrollView
 * 
 * @property {String} [TOP = 'top']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.TOP = 'top';

/**
 * Indicates right edge of the ScrollView
 * 
 * @property {String} [RIGHT = 'right']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.RIGHT = 'right';

/**
 * Indicates bottom edge of the ScrollView
 * 
 * @property {String} [BOTTOM = 'bottom']
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
ScrollViewEdge.BOTTOM = 'bottom';

module.exports = ScrollView;