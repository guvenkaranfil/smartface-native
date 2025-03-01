const View = require('../view');


/**
 * @class UI.MapView
 * @since 0.1
 * @extends UI.View
 * MapView is a view that shows Apple Maps on iOS and Google Maps on Android.
 *
 *     @example
 *     const MapView = require('@smartface/native/ui/mapview');
 *     var myMapView = new MapView({
 *         flexGrow: 1,
 *         alignSelf: FlexLayout.AlignSelf.STRETCH,
 *         onCreate: function() {
 *             var centerLocation = {
 *                 latitude: 37.4488259,
 *                 longitude: -122.1600047
 *             };
 *             myMapView.setCenterLocationWithZoomLevel(centerLocation,11,false);
 *             var myPin = new MapView.Pin({
 *                 location: {
 *                     latitude: 37.4488259,
 *                     longitude: -122.1600047
 *                 },
 *                 title: 'Smartface Inc.',
 *                 subtitle: '2nd Floor, 530 Lytton Ave, Palo Alto, CA 94301',
 *                 color: Color.RED,
 *                 onPress: function() {
 *                     const Application = require('@smartface/native/application');
 *                     Application.call("geo:" + myPin.location.latitude + ',' + myPin.location.longitude, {
 *                         'hl': 'en',
 *                     });
 *                 }
 *             });
 *             myMapView.addPin(myPin);
 *        }
 *     });
 *     myPage.layout.addChild(myMapView);
 * 
 */
function MapView(params) { }

/**
 * Enables/disables the information view to display on the right side of the callout bubble.
 *
 * @property {Boolean} [enableInfoWindow = false]
 * @ios
 * @since 4.3.2
 */
MapView.prototype.enableInfoWindow;

/**
 * Enables/Disables scroll gestures so that map can be dragged.
 *
 * @property {Boolean} [scrollEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.scrollEnabled;

/**
 * Enables/Disables rotate gestures so that map can be rotated.
 *
 * @property {Boolean} [rotateEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.rotateEnabled;

/**
 * Enables/Disables compass on map.
 *
 * @property {Boolean} [compassEnabled = true]
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.compassEnabled;

/**
 * Enables/Disables user location indicator on map.
 *
 * @property {Boolean} [userLocationEnabled = false]
 * @android
 * @ios
 * @since 1.1.10
 */
MapView.prototype.userLocationEnabled;

/**
 * Enables/Disables clusterEnabled on map. Cluster works on Android & iOS 11.0+.
 *
 * @property {Boolean} [clusterEnabled = false]
 * @android
 * @ios
 * @since 3.0.1
 */
MapView.prototype.clusterEnabled;

/**
 * This property sets cluster fillColor. Cluster works on Android & iOS 11.0+.
 *
 * @property {UI.Color} clusterFillColor
 * @android
 * @ios
 * @since 3.0.1
 */
MapView.prototype.clusterFillColor;

/**
 * This property sets cluster borderColor. Cluster works on Android & iOS 11.0+.
 *
 * @property {UI.Color} clusterBorderColor
 * @ios
 * @android
 * @since 3.0.1
 */
MapView.prototype.clusterBorderColor;

/**
 * This property sets cluster textColor. Cluster works on Android & iOS 11.0+.
 *
 * @property {UI.Color} clusterTextColor
 * @android
 * @ios
 * @since 3.0.1
 */
MapView.prototype.clusterTextColor;

/**
 * This property sets cluster borderWidth. Only works on ios.
 *
 * @property {Number} [clusterBorderWidth = 2]
 * @ios
 * @since 3.0.1
 */
MapView.prototype.clusterBorderWidth;

/**
 * This property sets cluster font. Cluster works on Android & iOS 11.0+.
 *
 * @property {UI.Font} clusterFont
 * @android
 * @ios
 * @since 3.0.1
 */
MapView.prototype.clusterFont;

/**
 * This property sets cluster size. Only works on ios. If cluster size is 0, wraps the content according to font properties. In Android, wraps the content according to font properties.
 *
 * @property {Number} [clusterSize = 0]
 * @ios
 * @since 3.0.1
 */
MapView.prototype.clusterSize;

/**
 * This property sets cluster padding. Work when cluster size is 0. Only works on ios.
 *
 * @property {Number} [clusterPadding = 15]
 * @ios
 * @since 3.0.1
 */
MapView.prototype.clusterPadding;

/**
 * This property sets center location of the map to the given latitude & longitude.
 *
 * @method setCenterLocationWithZoomLevel
 * @param {Object} centerLocation
 * @param {Number} centerLocation.latitude
 * @param {Number} centerLocation.longitude
 * @param {Number} zoomLevel
 * @param {Boolean} animated
 * @android
 * @ios
 * @since 3.2.1
 */
MapView.prototype.setCenterLocationWithZoomLevel = function (centerLocation, zoomLevel, animated) { };


/**
 * This property gets zoom level of the map to the given level. if user changed zoom level via pinching you will get different value than you set. Default of this property is 3 on iOS and 8 on Android.
 *
 * @property {Number} zoomLevel
 * @readonly
 * @android
 * @ios
 * @since 1.1.10
 */
MapView.prototype.zoomLevel;

/**
 * Gets/sets minimum zoom level.
 * @property {Number} [minZoomLevel = 0]
 * @android
 * @ios
 * @since 2.0.9
 */
MapView.prototype.minZoomLevel;

/**
 * Gets/sets minimum zoom level.
 * @property {Number} [maxZoomLevel = 19]
 * @android
 * @ios
 * @since 2.0.9
 */
MapView.prototype.maxZoomLevel;

/**
 * Prepare the map later. This parameter must be given in constructor.
 * @property {Boolean} [lazyLoading = false]
 * @android
 * @since 2.0.10
 * @deprecated
 */
MapView.prototype.android.lazyLoading;

/**
 * This property sets visibility of my location button.
 * @property {Boolean} [locationButtonVisible = false]
 * @android
 * @since 3.0.1
 */
MapView.prototype.android.locationButtonVisible;

/**
 * This property gets center location of the map to the given latitude & longitude. Getting this property must be 
 * in onCreate event or after. 
 *
 * @property {Object} centerLocation
 * @android
 * @ios
 * @readonly
 * @since 0.1
 */
MapView.prototype.centerLocation;


/**
 * Contains the four points defining the four-sided polygon that is visible in a map's camera. This polygon can be a trapezoid instead of a rectangle, because a camera can have tilt. If the camera is directly over the center of the camera, the shape is rectangular, but if the camera is tilted, the shape will appear to be a trapezoid whose smallest side is closest to the point of view.
 *
 * @property {Object} visibleRegion
 * @property {Object} visibleRegion.topLeft that defines the top left corner of the camera.
 * @property {Number} visibleRegion.topLeft.latitude
 * @property {Number} visibleRegion.topLeft.longitude
 * @property {Object} visibleRegion.topRight that defines the top right corner of the camera.
 * @property {Number} visibleRegion.topRight.latitude
 * @property {Number} visibleRegion.topRight.longitude
 * @property {Object} visibleRegion.bottomLeft that defines the bottom left corner of the camera.
 * @property {Number} visibleRegion.bottomLeft.latitude
 * @property {Number} visibleRegion.bottomLeft.longitude
 * @property {Object} visibleRegion.bottomRight that defines the bottom right corner of the camera.
 * @property {Number} visibleRegion.bottomRight.latitude
 * @property {Number} visibleRegion.bottomRight.longitude
 * @android
 * @ios
 * @readonly
 * @since 4.3.2
 */
MapView.prototype.visibleRegion;

/**
 * Get visible pins on MapView.
 *
 * @return {UI.MapView.Pin[]} Visible pin array.
 * @android
 * @ios
 * @method getVisiblePins
 * @since 2.0.7
 */
MapView.prototype.getVisiblePins = function () { };


/**
 * Prepare the map asynchronously. You must call this method manually if you use lazyLoading as true in constructor. 
 * Otherwise, you do not need to call this method.
 * 
 * @android
 * @method prepareMapAsync
 * @deprecated
 * @since 2.0.10
 */
MapView.prototype.android.prepareMapAsync = function () { };


/**
 * Prepare the map asynchronously. You must call this method manually. Use this method after page onShow callback.
 * 
 * @android
 * @method prepareMap
 * @since 3.1.0
 */
MapView.prototype.android.prepareMap = function () { };

/**
 * Adds a UI.MapView.Pin on the map.
 *
 * @param {UI.MapView.Pin} pin
 * @android
 * @ios
 * @method addPin
 * @since 0.1
 */
MapView.prototype.addPin = function () { };

/**
 * Removes the UI.MapView.Pin from the map.
 *
 * @param {UI.MapView.Pin} pin
 * @method removePin
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.removePin = function () { };

/**
 * Removes all pins from the map.
 *
 * @method removeAllPins
 * @android
 * @ios
 * @since 3.1.1
 */
MapView.prototype.removeAllPins = function () { };

/**
 * onTouch event
 *
 * @event onTouch
 * @android
 * @ios
 * @removed
 * @since 2.0.9
 */
MapView.prototype.onTouch;

/**
 * onTouchEnded event
 *
 * @event onTouchEnded
 * @android
 * @ios
 * @removed
 * @since 2.0.9
 */
MapView.prototype.onTouchEnded;

/**
 * onTouchCancelled event
 *
 * @event onTouchCancelled
 * @android
 * @ios
 * @removed
 * @since 2.0.9
 */
MapView.prototype.onTouchCancelled;

/**
 * onTouchMoved event
 *
 * @event onTouchMoved
 * @android
 * @ios
 * @removed
 * @since 2.0.9
 */
MapView.prototype.onTouchMoved;



/**
 * Triggered when pressed on the cluster. Cluster works on Android & iOS 11.0+.
 *
 * @event onClusterPress
 * @deprecated
 * @param {Array<UI.MapView.Pin>} pins
 * @android
 * @ios
 * @since 3.0.1
 */
MapView.prototype.onClusterPress;

/**
 * Triggered when pressed on the map and sends the location pressed on the map.
 *
 * @event onPress
 * @deprecated
 * @param {Object} location
 * @param {Number} location.latitude
 * @param {Number} location.longitude
 * @android
 * @ios
 * @since 1.1.3
 */
MapView.prototype.onPress;

/**
 * Gets/sets callback for dragging start.
 *
 * @event onCameraMoveStarted
 * @deprecated
 * @android
 * @ios
 * @since 2.0.9
 */
MapView.prototype.onCameraMoveStarted;

/**
 * Gets/sets callback for dragging end.
 *
 * @event onCameraMoveEnded
 * @deprecated
 * @android
 * @ios
 * @since 2.0.9
 */
MapView.prototype.onCameraMoveEnded;

/**
 * Triggered when long pressed on the map and sends the location pressed on the map.
 *
 * @event onLongPress
 * @deprecated
 * @param {Object} location
 * @param {Number} location.latitude
 * @param {Number} location.longitude
 * @android
 * @ios
 * @since 1.1.3
 */
MapView.prototype.onLongPress;

/**
 * This event is called when map is ready to be used.
 *
 * @since 0.1
 * @event onCreate
 * @deprecated
 * @android
 * @ios
 */
MapView.prototype.onCreate = function onCreate() { };





/**
 * Triggered when pressed on the cluster. Cluster works on Android & iOS 11.0+.
 *
 * @event onClusterPress
 * @param {Array<UI.MapView.Pin>} pins
 * @android
 * @ios
 * @since 3.0.1
 */
MapView.Events.ClusterPress = "clusterPress";


/**
 * Triggered when pressed on the map and sends the location pressed on the map.
 *
 * @event onPress
 * @param {Object} location
 * @param {Number} location.latitude
 * @param {Number} location.longitude
 * @android
 * @ios
 * @since 1.1.3
 */
MapView.Events.Press = "Press";

/**
 * Gets/sets callback for dragging start.
 *
 * @event onCameraMoveStarted
 * @android
 * @ios
 * @since 2.0.9
 */
MapView.Events.CameraMoveStarted = "cameraMoveStarted";

/**
 * Gets/sets callback for dragging end.
 *
 * @event onCameraMoveEnded
 * @android
 * @ios
 * @since 2.0.9
 */
MapView.Events.CameraMoveEnded = "cameraMoveEnded";

/**
 * Triggered when long pressed on the map and sends the location pressed on the map.
 *
 * @event onLongPress
 * @param {Object} location
 * @param {Number} location.latitude
 * @param {Number} location.longitude
 * @android
 * @ios
 * @since 1.1.3
 */
MapView.Events.LongPress = "longPress";

/**
* This event is called when map is ready to be used.
*
* @since 0.1
* @event onCreate
* @android
* @ios
*/
MapView.Events.Create = "create";

/**
 * Gets/Sets map type
 *
 * @property {UI.MapView.Type} [type = UI.MapView.Type.NORMAL]
 * @android
 * @ios
 * @since 0.1
 */
MapView.prototype.type = UI.MapView.Type.NORMAL;

/**
 * @class UI.MapView.Pin
 * @since 0.1
 * Pin is placed on UI.MapView.
 *
 *     @example
 *     const MapView = require('@smartface/native/ui/mapview');
 *     var myPin = new MapView.Pin({
 *         location: {
 *             latitude: 40.9844753,
 *             longitude: 28.8184597
 *         },
 *         title: 'Ataturk Airport'
 *     });
 *     var myMapView = new MapView({
 *          left:0,
 *          top:0,
 *          right:0,
 *          bottom:0,
 *          onCreate: function() {
 *            myMapView.scrollEnabled =  true;
 *            myMapView.rotateEnabled = true;
 *            myMapView.zoomEnabled =  true;
 *            myMapView.compassEnabled = true;
 *            myMapView.type =  MapView.Type.NORMAL;
 *            var centerLocation = {
 *                 latitude: 41.0209078,
 *                 longitude: 29.0039533
 *            };
 *            myMapView.setCenterLocationWithZoomLevel(centerLocation,11,false);
 *            myMapView.addPin(myPin);
 *         }
 *     });
 *     myPage.layout.addChild(myMapView);
 */
function Pin() { }

/**
 * Pin location on the map. 
 *
 *     @example
 *     const MapView = require('@smartface/native/ui/mapview');
 *     var myPin = new MapView.Pin({
 *         location: {
 *             latitude: 40.9844753,
 *             longitude: 28.8184597
 *         }
 *     });
 *
 * @property {Object} location
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.location;

/**
 * This property shows title when user touches on the pin.
 *
 * @property {String} title
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.title;

/**
 * This property shows subtitle when user touches on the pin.
 *
 * @property {String} subtitle
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.subtitle;

/**
 * This property sets pin color.
 * Avaliable colors for Android: [BLUE, CYAN, GREEN, MAGENTA, RED, YELLOW]
 *
 * @property {UI.Color} color
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.color;

/**
 * This property sets pin id.
 *
 * @property {Number} id
 * @android
 * @ios
 * @since 2.0.11
 */
Pin.prototype.id;

/**
 * This property sets an image as pin instead of default pin.
 *
 * @property {UI.Image} image
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.image;

/**
 * Gets/Sets visibility of a pin. In Android if cluster is enable, visible property cannot be assigned. 
 *
 * @property {Boolean} visible
 * @android
 * @ios
 * @since 0.1
 */
Pin.prototype.visible;

/**
 * This event will be fired when the pin is touched.
 *
 * @event onPress
 * @deprecated
 * @android
 * @ios
 * @since 1.1.2
 */
Pin.prototype.onPress;


/**
 * This event will be fired when the pin's info window is touched.
 *
 * @event onInfoWindowPress
 * @deprecated
 * @android
 * @ios
 * @since 4.3.2
 */
Pin.prototype.onInfoWindowPress;

/**
 * This event will be fired when the pin is touched.
 *
 * @event onPress
 * @android
 * @ios
 * @since 1.1.2
 */
Pin.Events.Press = "press";


/**
 * This event will be fired when the pin's info window is touched.
 *
 * @event onInfoWindowPress
 * @android
 * @ios
 * @since 4.3.2
 */
Pin.Events.InfoWindowPress = "infoWindowPress";

MapView.Pin = Pin;

/**
 * @enum UI.MapView.Type
 * @static
 * @readonly
 * @since 0.1
 *
 * This property indicates how map will be displayed.
 *
 */
MapView.Type = {};

/**
 * @property {Number} NORMAL
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
MapView.Type.NORMAL = 0;

/**
 * @property {Number} SATELLITE
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
MapView.Type.SATELLITE = 1;

/**
 * @property {Number} HYBRID
 * @android
 * @ios
 * @static
 * @readonly
 * @since 0.1
 */
MapView.Type.HYBRID = 2;

module.exports = MapView;