/**
 * @class UI.RangeSlider
 * @since 4.1.5
 * @extends UI.View
 *
 * RangeSlider can be used to select a range value from a given min&max values by moving the two slider thumb on the track.
 *
 *     @example
 *     let myRangeSlider = new RangeSlider({
 *          height: 80,
 *          android: {
 *              thumbColor: Color.RED,
 *              thumbBorderColor: Color.BLUE,
 *              thumbBorderWidth: 1,
 *              outerTrackWeight: 20,
 *          },
 *          trackColor: Color.GREEN,
 *          outerTrackColor: Color.BLACK,
 *          trackWeight: 20,
 *          minValue: 0,
 *          maxValue: 100,
 *          snapStepSize : 2,
 *          onValueChange: (value) => {
 *              console.log("Value : " + value);
 *              }
 *      });     
 *   
 */

function RangeSlider(params) { }

/**
 * Gets/Sets size of the thumbs.
 *
 * @since 4.1.5
 * @property {Number} thumbSize
 * @android
 */
RangeSlider.prototype.thumbSize;

/**
 * Gets/Sets color of the thumbs.
 *
 * @since 4.1.5
 * @property {UI.Color} thumbColor
 * @android
 */
RangeSlider.prototype.thumbColor;


/**
 * Gets/Sets border color of the thumbs.
 *
 * @since 4.1.5
 * @property {UI.Color} thumbBorderColor
 * @android
 */
RangeSlider.prototype.thumbBorderColor;

/**
 * Gets/Sets border width of the thumbs.
 *
 * @since 4.1.5
 * @property {Number} thumbBorderWidth
 * @android
 */
RangeSlider.prototype.thumbBorderWidth;


/**
 * Gets/Sets color of the connecting line between the thumbs.
 *
 * @since 4.1.5
 * @property {UI.Color} trackColor
 * @android
 * @ios
 */
RangeSlider.prototype.trackColor;


/**
 * Gets/Sets color of the bar line in RangeSlider.
 *
 * @since 4.1.5
 * @property {UI.Color} outerTrackColor
 * @android
 * @ios
 */
RangeSlider.prototype.outerTrackColor;


/**
 * Gets/Sets weight of track line in RangeSlider.
 *
 * @since 4.1.5
 * @property {Number} outerTrackWeight
 * @android
 */
RangeSlider.prototype.outerTrackWeight;


/**
 * Gets/Sets weight of track line. In Android, outer track line won't change unless {@link UI.RangeSlider#outerTrackWeight outerTrackWeight} specified. 
 *
 * @since 4.1.5
 * @property {Number} trackWeight
 * @android
 * @ios
 */
RangeSlider.prototype.trackWeight;

/**
 * Specifies the slider as a range or single.
 *
 * @since 4.1.5
 * @property {Boolean} [rangeEnabled = true]
 * @ios
 * @android
 */
RangeSlider.prototype.rangeEnabled;

/**
 * Gets/Sets thumbs value. Default values are differentiated in both OS.
 *
 * @since 4.1.5
 * @property {Number[]} value
 * @android
 * @ios
 */
RangeSlider.prototype.value;

/**
 * Gets/Sets minimum steps between range.
 *
 * @since 4.1.5
 * @property {Number} [snapStepSize = 1 ]
 * @android
 * @ios
 */
RangeSlider.prototype.snapStepSize = 1;

/**
 * Gets/Sets start value in RangeSlider
 *
 * @since 4.1.5
 * @property {Number} [minValue = 0]
 * @android
 * @ios
 */
RangeSlider.prototype.minValue = 0;


/**
 * Gets/Sets end value in RangeSlider
 *
 * @since 4.1.5
 * @property {Number} [maxValue = 5]
 * @android
 * @ios
 */
RangeSlider.prototype.maxValue = 1;

/**
 * Sets given image to thumb
 *
 * @since 4.1.5
 * @property {UI.Image} [thumbImage = undefined]
 * @ios
 */
RangeSlider.prototype.thumbImage = undefined;

/**
 * The color of the shadow. Use {@link UI.RangeSlider#applyThumbViewChanges applyThumbViewChanges} after changes.
 *
 * @since 4.2.0
 * @property {UI.Color} [thumbShadowColor = UI.Color.GRAY]
 * @ios
 */
RangeSlider.prototype.thumbShadowColor = UI.Color.GRAY;

/**
 * The value in this property must be in the range 0.0 (transparent) to 1.0 (opaque). Use {@link UI.RangeSlider#applyThumbViewChanges applyThumbViewChanges} after changes.
 *
 * @since 4.2.0
 * @property {Number} [thumbShadowOpacity = 0.25]
 * @ios
 */
RangeSlider.prototype.thumbShadowOpacity = 0.25;

/**
 * The blur radius (in points) used to render the shadow. Use {@link UI.RangeSlider#applyThumbViewChanges applyThumbViewChanges} after changes.
 *
 * @since 4.2.0
 * @property {Number} [thumbShadowRadius = 0.5]
 * @ios
 */
RangeSlider.prototype.thumbShadowRadius = 0.5;

/**
 * The offset (in points) of the shadow. Use {@link UI.RangeSlider#applyThumbViewChanges applyThumbViewChanges} after changes.
 * 
 * @property {Object} [thumbShadowOffset = {x: 0.0,y: 4.0}]
 * @property {Number} thumbShadowOffset.x
 * @property {Number} thumbShadowOffset.y
 * @ios
 * @since 4.2.0
 */
RangeSlider.prototype.ios.thumbShadowOffset = {
    x: 0.0,
    y: 4.0
};

/**
 * If you make any changes to ThumbView, you should call applyThumbViewChanges.
 *
 * @method applyThumbViewChanges
 * @ios
 */
RangeSlider.prototype.applyThumbViewChanges = function () { };

/**
 * This property enables / disables haptic feedback when sliding over snap values.
 *
 * @since 4.1.5
 * @property {Boolean} [isHapticSnap = true]
 * @ios
 */
RangeSlider.prototype.isHapticSnap = true;

/**
 * This property enables / disables the shadow under the image.
 *
 * @since 4.1.5
 * @property {Boolean} [showsThumbImageShadow = true]
 * @ios
 */
RangeSlider.prototype.showsThumbImageShadow = true;

/**
 * Set the bar with rounded corners
 *
 * @since 4.1.5
 * @property {Boolean} [isTrackRounded = true]
 * @ios
 * @android
 */
RangeSlider.prototype.isTrackRounded;


/**
 * This event is called when RangeSlider value changes.
 *
 * @event onValueChange
 * @deprecated
 * @param {Number[]} value
 * @android
 * @ios
 * @since 4.1.5
 */
RangeSlider.prototype.onValueChange = function (value) { };



/**
 * This event is called when RangeSlider value changes.
 *
 * @event onValueChange
 * @param {Number[]} value
 * @android
 * @ios
 * @since 4.1.5
 */
RangeSlider.Events.ValueChange = "valueChange";


module.exports = RangeSlider;