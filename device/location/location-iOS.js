const Invocation = require('../../util').Invocation;
const System = require("../system");
const { EventEmitterCreator } = require("../../core/eventemitter");
const Events = require('./events');

const EventFunctions = {
    [Events.LocationChanged]: function () {
        Location.onLocationChanged = function ({ latitude, longitude }) {
            Location.emitter.emit(Events.LocationChanged, { latitude, longitude });
        }
    }
}
function Location() { };

Location.Events = { ...Events };

Location.nativeObject = new __SF_CLLocationManager();
EventEmitterCreator(Location, EventFunctions);

Location.ios = {};
Location.ios.native = {};
Location.ios.native.authorizationStatus = {
    NotDetermined: 0,
    Restricted: 1,
    Denied: 2,
    AuthorizedAlways: 3,
    AuthorizedWhenInUse: 4
};

Location.ios.authorizationStatus = { //deprecated
    NotDetermined: 0,
    Restricted: 1,
    Denied: 2,
    Authorized: 3
};

Location.iOS = {};
Location.iOS.AuthorizationStatus = {
    NOTDETERMINED: 0,
    RESTRICTED: 1,
    DENIED: 2,
    AUTHORIZED: 3
};

Location.changeLocationListener = function (e) {
    Location.onLocationChanged(e);
}

Location.ios.locationServicesEnabled = function () {
    return __SF_CLLocationManager.locationServicesEnabled();
}

Location.ios.getAuthorizationStatus = function () {
    var authorizationStatus = Invocation.invokeClassMethod("CLLocationManager", "authorizationStatus", [], "int");
    var status;
    switch (authorizationStatus) {
        case Location.ios.native.authorizationStatus.AuthorizedAlways:
        case Location.ios.native.authorizationStatus.AuthorizedWhenInUse:
            status = Location.ios.authorizationStatus.Authorized;
            break;
        case Location.ios.native.authorizationStatus.NotDetermined:
            status = Location.ios.authorizationStatus.NotDetermined;
            break;
        case Location.ios.native.authorizationStatus.Restricted:
            status = Location.ios.authorizationStatus.Restricted;
            break;
        case Location.ios.native.authorizationStatus.Denied:
            status = Location.ios.authorizationStatus.Denied;
            break;
        default:
            break;
    }
    return status;
}

var _authorizationStatus = Location.ios.authorizationStatus.NotDetermined;
Location.start = function () {
    if (Location.nativeObject) {
        Location.stop();
    }

    Location.delegate = new __SF_CLLocationManagerDelegate();

    if (__SF_CLLocationManager.locationServicesEnabled()) {
        Location.nativeObject.delegate = Location.delegate;
        Location.delegate.didUpdateLocations = Location.changeLocationListener;
        Location.delegate.didChangeAuthorizationStatus = function (status) {
            var authStatus = Location.ios.getAuthorizationStatus();
            if (typeof Location.ios.onChangeAuthorizationStatus === 'function' && _authorizationStatus != authStatus) {
                _authorizationStatus = authStatus;
                Location.ios.onChangeAuthorizationStatus((authStatus === Location.ios.authorizationStatus.Authorized));
            }
        };

        Location.nativeObject.requestWhenInUseAuthorization();
        Location.nativeObject.startUpdatingLocation();
    }
}

Location.stop = function () {
    if (Location.nativeObject) {
        Location.nativeObject.stopUpdatingLocation();
        Location.nativeObject.delegate = undefined;
        Location.delegate = undefined;
    }
}

Location.getLastKnownLocation = function (onSuccess, onFailure) {
    var location = Location.nativeObject.lastKnownLocation();
    if (location) {
        onSuccess && onSuccess(location);
    } else {
        onFailure && onFailure();
    }
};

Location.onLocationChanged = function onLocationChanged(event) { }

Location.getLocation = (callback, showSettingsAlert = true, permissionText = '', permissionTitle = '') => {
    const getLocationPromise = async () => {
        await getPermission({
            iosPermission: IOS_PERMISSIONS.LOCATION,
            showSettingsAlert,
            permissionText,
            permissionTitle,
        });
        return getLocationAction();
    }

    if (callback) {
        try {
            const location = await getLocationPromise();
            callback(null, location);
        } catch (e) {
            callback(e);
        } finally {
            return getLocationPromise();
        }
    } else {
        return await getLocationPromise();
    }
};

function getLocationAction() {
	return new Promise((resolve) => {
		Location.start(Location.Android.Priority.HIGH_ACCURACY, 1000);
		Location.onLocationChanged = (location) => {
			Location.onLocationChanged = () => {};
			Location.stop();
			resolve(location);
		};
	});
}

Location.android = {};
Location.android.checkSettings = function () { };
Location.Android = {};
Location.android.Provider = {};
Location.Android.Provider = {};
Location.Android.Priority = {};
Location.Android.SettingsStatusCodes = {};

module.exports = Location;