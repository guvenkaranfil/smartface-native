const AndroidConfig = require('../../util/Android/androidconfig')
const NativeSettings = requireClass('android.provider.Settings');
const NativeBuild = requireClass('android.os.Build');
// Context.TELEPHONY_SERVICE
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';
const Hardware = {};

Hardware.android = {};
Hardware.ios = {};
Hardware.ios.microphone = {};
Hardware.ios.microphone.requestRecordPermission = function() {};

Object.defineProperty(Hardware.android, 'IMEI', {
    get: function() {
        var telephonyManager = AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
        return telephonyManager.getDeviceId();
    },
    configurable: false
});

Object.defineProperty(Hardware, 'UID', {
    get: function() {
        var activity = AndroidConfig.activity;
        var contentResolver = activity.getContentResolver();

        return NativeSettings.Secure.getString(contentResolver, NativeSettings.Secure.ANDROID_ID);
    },
    configurable: false
});

Object.defineProperty(Hardware, 'brandName', {
    get: function() {
        return NativeBuild.BRAND;
    },
    configurable: false
});

Object.defineProperty(Hardware, 'brandModel', {
    get: function() {
        return NativeBuild.MODEL;
    },
    configurable: false
});

Object.defineProperty(Hardware.android, 'vendorID', {
    get: function() {
        return NativeBuild.SERIAL;
    },
    configurable: false
});

Hardware.MANUFACTURER = NativeBuild.MANUFACTURER;

Hardware.getDeviceModelName = function() {
    return Hardware.MANUFACTURER + " " + Hardware.brandName + " " + Hardware.brandModel;
};

module.exports = Hardware;