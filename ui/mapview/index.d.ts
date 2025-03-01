import View from "../view";
import Color from "../color";
import Font from "../font";
import PinKlass from "./pin";
import Pin from "./pin";

declare enum MapViewEvents {
	CameraMoveEnded = "cameraMoveEnded",
  CameraMoveStarted = "cameraMoveStarted",
  ClusterPress = "clusterPress",
  Create = "create",
  LongPress = "longPress",
  Press = "press"
}

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
declare class MapView extends View<MapViewEvents> {
	/**
	 * Enables/Disables scroll gestures so that map can be dragged.
	 *
	 * @property {Boolean} [scrollEnabled = true]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	scrollEnabled: boolean;
	/**
	 * Enables/Disables rotate gestures so that map can be rotated.
	 *
	 * @property {Boolean} [rotateEnabled = true]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	rotateEnabled: boolean;
	/**
	 * Enables/Disables compass on map.
	 *
	 * @property {Boolean} [compassEnabled = true]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	compassEnabled: boolean;
	/**
	 * Enables/Disables user location indicator on map.
	 *
	 * @property {Boolean} [userLocationEnabled = false]
	 * @android
	 * @ios
	 * @since 1.1.10
	 */
	userLocationEnabled: boolean;
	/**
	 * Enables/Disables clusterEnabled on map. Cluster works on Android & iOS 11.0+.
	 *
	 * @property {Boolean} [clusterEnabled = false]
	 * @android
	 * @ios
	 * @since 3.0.1
	 */
	clusterEnabled: boolean;
	/**
	 * This property sets cluster fillColor. Cluster works on Android & iOS 11.0+.
	 *
	 * @property {UI.Color} clusterFillColor
	 * @android
	 * @ios
	 * @since 3.0.1
	 */
	clusterFillColor: Color;
	/**
	 * This property sets cluster borderColor. Cluster works on Android & iOS 11.0+.
	 *
	 * @property {UI.Color} clusterBorderColor
	 * @ios
	 * @android
	 * @since 3.0.1
	 */
	clusterBorderColor: Color;
	/**
	 * This property sets cluster textColor. Cluster works on Android & iOS 11.0+.
	 *
	 * @property {UI.Color} clusterTextColor
	 * @android
	 * @ios
	 * @since 3.0.1
	 */
	clusterTextColor: Color;
	/**
	 * This property sets cluster font. Cluster works on Android & iOS 11.0+.
	 *
	 * @property {UI.Font} clusterFont
	 * @android
	 * @ios
	 * @since 3.0.1
	 */
	clusterFont: Font;

	/**
	 * Triggered when pressed on the cluster. Cluster works on Android & iOS 11.0+.
	 *
	 * @event onClusterPress
	 * @param {Array<UI.MapView.Pin>} pins
	 * @android
	 * @ios
	 * @since 3.0.1
	 */
	onClusterPress: (pins: Pin[]) => void;
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
	setCenterLocationWithZoomLevel(
		centerLocation: {
			latitude: number;
			longitude: number;
		},
		zoomLevel: number,
		animated: boolean
	): void;
	/**
	 * This property gets zoom level of the map to the given level. if user changed zoom level via pinching you will get different value than you set. Default of this property is 3 on iOS and 8 on Android.
	 *
	 * @property {Number} zoomLevel
	 * @readonly
	 * @android
	 * @ios
	 * @since 1.1.10
	 */
	readonly zoomLevel: number;
	/**
	 * Gets/sets minimum zoom level.
	 * @property {Number} [minZoomLevel = 0]
	 * @android
	 * @ios
	 * @since 2.0.9
	 */
	minZoomLevel: number;
	/**
	 * Gets/sets minimum zoom level.
	 * @property {Number} [maxZoomLevel = 19]
	 * @android
	 * @ios
	 * @since 2.0.9
	 */
	maxZoomLevel: number;
	readonly ios: View['ios'] & {
		/**
		 * This property sets cluster borderWidth. Only works on ios.
		 *
		 * @property {Number} [clusterBorderWidth = 2]
		 * @ios
		 * @since 3.0.1
		 */
		clusterBorderWidth: number;
		/**
		 * This property sets cluster size. Only works on ios. If cluster size is 0, wraps the content according to font properties. In Android, wraps the content according to font properties.
		 *
		 * @property {Number} [clusterSize = 0]
		 * @ios
		 * @since 3.0.1
		 */
		clusterSize: number;
		/**
		 * This property sets cluster padding. Work when cluster size is 0. Only works on ios.
		 *
		 * @property {Number} [clusterPadding = 15]
		 * @ios
		 * @since 3.0.1
		 */
		clusterPadding: number;
	}
	readonly android: View["android"] & {
		prepareMapAsync(): void;
		/**
		 * Prepare the map later. This parameter must be given in constructor.
		 * @property {Boolean} [lazyLoading = false]
		 * @android
		 * @since 2.0.10
		 * @deprecated
		 */
		lazyLoading: boolean;
		/**
		 * This property sets visibility of my location button.
		 * @property {Boolean} [locationButtonVisible = false]
		 * @android
		 * @since 3.0.1
		 */
		locationButtonVisible: boolean;

		/**
		 * Prepare the map asynchronously. You must call this method manually. Use this method after page onShow callback.
		 *
		 * @android
		 * @method prepareMap
		 * @since 3.1.0
		 */
		prepareMap(): void;
	};
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
	readonly centerLocation: {
		latitude: number;
		longitude: number;
    };
    
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
    visibleRegion: { 
        topLeft: {
			latitude: number;
			longitude: number;
		}, 
        topRight: {
			latitude: number;
			longitude: number;
		},
        bottomLeft: {
			latitude: number;
			longitude: number;
		},
        bottomRight: {
			latitude: number;
			longitude: number;
		}
    };
	/**
	 * Get visible pins on MapView.
	 *
	 * @return {UI.MapView.Pin[]} Visible pin array.
	 * @android
	 * @ios
	 * @method getVisiblePins
	 * @since 2.0.7
	 */
	getVisiblePins(): MapView.Pin[];
	/**
	 * Adds a UI.MapView.Pin on the map.
	 *
	 * @param {UI.MapView.Pin} pin
	 * @android
	 * @ios
	 * @method addPin
	 * @since 0.1
	 */
	addPin(pin: MapView.Pin): void;
	/**
	 * Removes the UI.MapView.Pin from the map.
	 *
	 * @param {UI.MapView.Pin} pin
	 * @method removePin
	 * @android
	 * @ios
	 * @since 0.1
	 */
	removePin(pin: MapView.Pin): void;
	/**
	 * Removes all pins from the map.
	 *
	 * @method removeAllPins
	 * @android
	 * @ios
	 * @since 3.1.1
	 */
	removeAllPins(): void;
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
	onPress: (location: { latitude: number; longitude: number }) => void;
	/**
	 * Gets/sets callback for dragging start.
	 *
	 * @event onCameraMoveStarted
	 * @android
	 * @ios
	 * @since 2.0.9
	 */
	onCameraMoveStarted: () => void;
	/**
	 * Gets/sets callback for dragging end.
	 *
	 * @event onCameraMoveEnded
	 * @android
	 * @ios
	 * @since 2.0.9
	 */
	onCameraMoveEnded: () => void;
	/**
	 * Triggered when long pressed on the map and sends the location pressed on the map.
	 *
	 * @event onLongPress
	 * @param {Object} location
	 * @param {Number} location.latitude
	 * @param {Number} location.longitude
	 * @deprecated
	 * @android
	 * @ios
	 * @since 1.1.3
	 */
	onLongPress: (location: {
		latitude: number;
		longitude: number;
	}) => void;
	/**
	 * This event is called when map is ready to be used.
	 *
	 * @deprecated
	 * @since 0.1
	 * @event onCreate
	 * @android
	 * @ios
	 */
	onCreate: () => void;
	/**
	 * Gets/Sets map type
	 *
	 * @deprecated
	 * @property {UI.MapView.Type} [type = UI.MapView.Type.NORMAL]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	type: MapView.Type;
}

declare namespace MapView {
	const Events: typeof MapViewEvents & typeof View.Events
  type Events = typeof Events
	class Pin extends PinKlass { 
		constructor(params?: { location?: { latitude: number, longitude: number }, title?: string })
	}
	
	/**
	 * @enum UI.MapView.Type
	 * @static
	 * @readonly
	 * @since 0.1
	 *
	 * This property indicates how map will be displayed.
	 *
	 */
	enum Type {
		/**
		 * @property {Number} NORMAL
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		NORMAL = 0,
		/**
		 * @property {Number} SATELLITE
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		SATELLITE = 1,
		/**
		 * @property {Number} HYBRID
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 0.1
		 */
		HYBRID = 2
	}
}
export = MapView;
