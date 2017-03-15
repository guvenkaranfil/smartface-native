/**
 * @class Application
 * @since 0.1
 * 
 * A set of collection for application based properties and methods.
 */
function Application() {}

/**
 * Application package name.
 * 
 * @property {String} packageName
 * @readonly
 * @android
 * @static
 * @since 0.1
 */
Application.android.packageName;

/**
 * The received bytes from the application.
 * 
 * @property {Number} byteReceived
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.byteReceived;

/**
 * The sent bytes from the application
 * 
 * @property {Number} byteSent
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.byteSent;

/**
 * The specified release channel within project.json.
 * 
 * @property {String} currentReleaseChannel
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.currentReleaseChannel;

/**
 * The application name within project.json
 * 
 * @property {String} smartfaceAppName
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.smartfaceAppName;

/**
 * The application version within project.json
 * 
 * @property {Number} version
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.version;

/**
 * Launches another application and passes data.
 *
 * @method call
 * @param {String} uriScheme
 * @param {JSON} data
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.call = function(uriScheme, data) {};

/**
 * Exists the application.
 *
 * @method exit
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.exit = function(){};

/**
 * Restarts the application.
 *
 * @method restart
 * @readonly
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.restart = function(){};

/**
 * Triggered when application is called by another application.
 * 
 * @since 0.1
 * @event onApplicationCallReceived
 * @param {Object} [e] 
 * @param {JSON} [e.data] Data sent by application.
 * @param {String} [e.eventType] This parameter is available only for Android. For iOS this always returns "call". 
 * @param {String} [e.result] This parameter is available only for Android and when eventType is "callback". Returns Android Activity result code.
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onApplicationCallReceived = function(e){};

/**
 * Triggered before exiting application.
 * 
 * @since 0.1
 * @event onExit
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onExit = function(){};

/**
 * Triggered when application is started.
 * 
 * @since 0.1
 * @event onStart
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onStart = function(){};

/**
 * Triggered after application bring to front.
 * 
 * @since 0.1
 * @event onMaximize
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onMaximize = function(){};

/**
 * Triggered after application bring to back.
 * 
 * @since 0.1
 * @event onMinimize
 * @android
 * @ios
 * @static
 * @since 0.1
 */
Application.onMinimize = function(){};

module.exports = Application;