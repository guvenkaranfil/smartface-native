const AndroidConfig             = require('../../util/Android/androidconfig')
const NativeSensor              = requireClass('android.hardware.Sensor');
const NativeSensorEventListener = requireClass('android.hardware.SensorEventListener');
// Context.SENSOR_SERVICE
const SENSOR_SERVICE = 'sensor';
const SENSOR_MANAGER = 'android.hardware.SensorManager';

const Accelerometer = {};

var sensorManager = AndroidConfig.getSystemService(SENSOR_SERVICE, SENSOR_MANAGER);
var sensor = sensorManager.getDefaultSensor(NativeSensor.TYPE_ACCELEROMETER);

var _callback;
var _sensorListener;
Object.defineProperties(Accelerometer, {
    'start': {
        value: function() {
            _sensorListener = NativeSensorEventListener.implement({
                onAccuracyChanged: function(sensor, accuracy) {},
                onSensorChanged: function(event) {
                    /** @todo
                     * System.err: java.lang.ClassCastException: float[] cannot be cast to java.lang.Object[]
                     */
                    var eventData = array(event.values);
                    _callback && _callback({
                        x: float(eventData[0]),
                        y: float(eventData[1]),
                        z: float(eventData[2])
                    });
                }
            });
            // SensorManager.SENSOR_DELAY_UI
            sensorManager.registerListener(_sensorListener, sensor, 2);
        }
    },
    'stop': {
        value: function() {
            if (_sensorListener) {
                sensorManager.unregisterListener(_sensorListener, sensor);
                _sensorListener = null;
            }
        }
    },
    'onAccelerate': {
        get: function() {
            return _callback;
        },
        set: function(callback) {
            _callback = callback;
        }
    }
});

module.exports = Accelerometer;