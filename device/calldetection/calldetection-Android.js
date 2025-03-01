const SFPhoneStateListener = requireClass("io.smartface.android.sfcore.device.calldetection.SFPhoneStateListener");
const { EventEmitterCreator } = require("../../core/eventemitter");
const Events = require('./events');

CallDetection.Events = { ...Events };

const AndroidConfig = require("../../util/Android/androidconfig");
const { EventEmitterCreator } = require("../../core/eventemitter");

const Events = require('./events');
const TELEPHONY_SERVICE = 'phone';
const TELEPHONY_MANAGER = 'android.telephony.TelephonyManager';

function CallDetection() { 
    const self = this;
    const phoneListener = new SFPhoneStateListener(function (state, incomingNumber) {
        self.onCallStateChanged && self.onCallStateChanged({
            state: state,
            incomingNumber: incomingNumber
        });
    });

    const EventFunctions = {
        [Events.CallStateChanged]: function() {
            this.onCallStateChanged = function (state) {
                this.emitter.emit(Events.CallStateChanged, state);
            } 
        }
    }
    
    const telephonyManager = AndroidConfig.getSystemService(TELEPHONY_SERVICE, TELEPHONY_MANAGER);
    telephonyManager.listen(phoneListener, SFPhoneStateListener.LISTEN_CALL_STATE);

    let _onCallStateChanged;
    Object.defineProperties(this, {
        'onCallStateChanged': {
            get: () => _onCallStateChanged,
            set: (callback) => {
                _onCallStateChanged = callback;
            },
            enumerable: true
        }
    });
}

CallDetection.State = {
	DISCONNECTED: "Disconnected",
	MISSED: "Missed",
	OFFHOOK: "Offhook",
	INCOMING: "Incoming"
};

Object.freeze(CallDetection.State);

module.exports = CallDetection;