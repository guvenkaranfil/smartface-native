import SpeechRecognizerError from "./error";

export = SpeechRecognizer;
/**
 * @class SpeechRecognizer
 * @static
 * @since 1.1.13
 * 
 * SpeechRecognizer class provides access to the speech recognition service.
 * 
 *     @example
 *     const TextArea = require('@smartface/native/ui/textarea');
 *     const SpeechRecognizer = require("@smartface/native/speechrecognizer");
 *     const Application = require("@smartface/native/application");
 *     const Button = require('@smartface/native/ui/button');
 *     const System = require('@smartface/native/device/system');
 *     var myButton = new Button({
 *         height: 100,
 *         text: "Start Recording"
 *      })   
 *     var myTextArea = new TextArea({
 *         height: 100
 *      })   
 *     myButton.onPress = function() {
 *         if (!SpeechRecognizer.isRunning()) {
 *             myButton.text = "Stop Recording";
 *             if (System.OS === "iOS") {
 *                 startSpeechRecognizer();
 *             }
 *             else if (System.OS === "Android") {
 *                 const RECORD_AUDIO_CODE = 1002;
 *                 Application.android.requestPermissions(RECORD_AUDIO_CODE, Application.Android.Permissions.RECORD_AUDIO);
 *                 Application.android.onRequestPermissionsResult = function(e) {
 *                     if (e.requestCode === RECORD_AUDIO_CODE && e.result) {
 *                         startSpeechRecognizer();
 *                     }
 *                 }
 *             }
 *         }
 *         else {
 *             myButton.text = "Start Recording";
 *             SpeechRecognizer.stop();
 *         }
 *         
 *     this.layout.addChild(myTextArea);
 *     this.layout.addChild(myButton)   
 *     function startSpeechRecognizer() {
 *         SpeechRecognizer.start({
 *             locale : "en_US",
 *             onResult: function(result) {
 *                 myTextArea.text = result;
 *             },
 *             onFinish: function(result) {
 *                 myButton.text = "Start Recording";
 *                 alert("Finish : " + result);
 *             },
 *             onError: function(error) {
 *                 myButton.text = "Start Recording";
 *                 alert("Error : " + error);
 *             }
 *         });
 *     }
 *          
 */
declare const SpeechRecognizer : {

/**
 * Starts speech recognition service. {@link Application.Android.Permissions#RECORD_AUDIO} is required for Android platform.
 * 
 * @param {Object} params Object describing callbacks
 * @param {String} [params.locale] IETF language tag for example "en_US"
 * @param {Function} params.onResult Triggers when partial recognition results are available.
 * @param {String} params.onResult.result
 * @param {Function} params.onFinish Triggers when recognition result is ready.
 * @param {String} params.onFinish.result
 * @param {Function} params.onError This event is called after getting errors.
 * @param {SpeechRecognizer.Error} params.onError.error
 * @method start
 * @android
 * @ios
 * @since 1.1.13
 */
  start(params:{
    locale: string,
    onResult: (result: any) => void;
    onFinish: (result: any) => void;
    onError: (error: SpeechRecognizerError) => void;
  }):void;
/**
 * Stop speech recognition service.
 * 
 * @method stop
 * @android
 * @ios
 * @since 1.1.13
 */
  stop(): void;
/**
 * Returns whether speech recognition service runs or not.
 * 
 * @method isRunning
 * @return {Boolean}
 * @android
 * @ios
 * @since 1.1.13
 */
  isRunning(): boolean;
  ios: {
/**
 * Returns speech recognition supported locale or not supported. Locale parameter must be empty to check current locale.
 * 
 * @param {String} IETF language tag for example "en_US"
 * @method isLocaleSupported
 * @return {Boolean}
 * @ios
 * @since 1.1.16
 */
    isLocaleSupported(locale: string): boolean;
  },
  Error: typeof SpeechRecognizerError
}
