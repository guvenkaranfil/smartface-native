/**
 * @class Device.CallDetection
 * @since 4.3.1
 *
 * Helps to detect call states. 
 * Required {@link Application.Android.Permissions-static-property-READ_PHONE_STATE READ_PHONE_STATE} permission for Android.
 *
 *     @example
 *     const CallDetection = require("@smartface/native/device/calldetection");
 * 
 *     const callDetection = new CallDetection();
 *     callDetection.onCallStateChanged = (params) => {
 *         console.log(params);
 *     };
 *
 */
const CallDetection  = function() {}

/**
 * Triggers when device call state changes.
 *
 * @since 4.3.1
 * @event onCallStateChanged
 * @deprecated
 * @param {Object} params
 * @param {Device.CallDetection.State} state
 * @param {String} incomingNumber Android only parameter
 * @android
 * @ios
 */
CallDetection.prototype.onCallStateChanged = function onCallStateChanged(params) {}

/** 
 * Call state
 * @enum {String} CallDetection.State
 * @since 4.3.1
 * @ios
 * @android
 */
CallDetection.State = {};

/**
 * 
 * @property {String} DISCONNECTED
 * @static
 * @ios
 * @android
 * @readonly
 * @since 4.1.3
 */
CallDetection.State.DISCONNECTED = "Disconnected";

/**
 * Android-only
 * 
 * @property {String} MISSED
 * @static
 * @android
 * @readonly
 * @since 4.1.3
 */
CallDetection.State.MISSED = "Missed";

/**
 * Android-only
 * 
 * @property {String} OFFHOOK
 * @static
 * @android
 * @readonly
 * @since 3.1.3
 */
CallDetection.State.OFFHOOK = "Offhook";

/**
 * 
 * @property {String} INCOMING
 * @static
 * @ios
 * @android
 * @readonly
 * @since 4.1.3
 */
CallDetection.State.INCOMING = "Incoming";

/**
 * iOS-only state
 * 
 * @property {String} INCOMING
 * @static
 * @ios
 * @readonly
 * @since 4.1.3
 */
CallDetection.State.DIALING = "Dialing";

/**
 * iOS-only state
 * 
 * @property {String} CONNECTED
 * @static
 * @ios
 * @readonly
 * @since 4.1.3
 */
CallDetection.State.CONNECTED = "Connected";

/**
 * Event to be implemented
 * @param {string} event - Event type to be created
 * @param {*} callback
 * @returns {Function} unlistener function. Call it to remove the event
 * @android
 * @ios
 */
 CallDetection.prototype.on = function(event, callback) {}
 /**
  * Event to be removed
  * @param {string} event - Event type to be created
  * @param {*} callback
  * @returns {Function} unlistener function. Call it to remove the event
  * @android
  * @ios
  */
CallDetection.prototype.off = function(event, callback) {}
 
 /**
  * Event to be emitted
  * @param {string} event - Event type to be triggered
  * @param {*} detail - Pass appropiate parameter to invoke the relevant event
  * @android
  * @ios
  */
CallDetection.prototype.emit = function(event, detail) {}

/**
 * Triggers when device call state changes.
 *
 * @since 4.3.1
 * @event onCallStateChanged
 * @param {Object} params
 * @param {Device.CallDetection.State} state
 * @param {String} incomingNumber Android only parameter
 * @android
 * @ios
 */
 CallDetection.Events.CallStateChanged = function onCallStateChanged(params) {}