import View from "../../ui/view";

declare enum IEvents {
    /**
     * Set the event callback.
     *
     * @event onChange
     * @param {Object} params
     * @param {Number} params.event See more: https://github.com/NodeMedia/NodeMediaClient-Android/blob/2.x/docs/NodePlayer_API_CN.md#%E4%BA%8B%E4%BB%B6%E5%9B%9E%E8%B0%83
     * @param {String} params.message
     * @android
     * @ios
     * @since 4.2.2
     */
    Change = "change"
}

/**
 * @class UI.LiveMediaPlayer
 * @since 4.2.2
 *
 * LiveMediaPublisher is a live streaming player. It is used for audio and video playback in RTMP/RTMPT/RTSP/HTTP/TCP/UDP/FILE format.
 * 
 *     @example
 *     const LiveMediaPlayer = require('@smartface/native/ui/livemediaplayer');
 *
 *     let liveMediaPlayer = new LiveMediaPlayer({
 *         flexGrow: 1,
 *         backgroundColor: Color.GRAY,
 *         scaleType: LiveMediaPlayer.ScaleType.ASPECTFIT,
 *         inputUrl: "https://..."
 *     });
 *     liveMediaPlayer.start();
 * 
 */

 declare class LiveMediaPlayer extends View<IEvents> {
    /**
     * Set whether video is enabled
     *
     * @property {Boolean} videoEnabled
     * @android
     * @ios
     * @since 4.2.2
     */
    videoEnabled: boolean;
    
    /**
     * Set input stream adress. Supported protocols: RTMP/RTMPT/RTSP/HTTP/TCP/UDP/FILE
     *
     * @property {String} inputUrl
     * @android
     * @ios
     * @since 4.2.2
     */
    inputUrl: string;

    /**
     * Set whether audio is enabled
     *
     * @property {Boolean} audioEnabled
     * @android
     * @ios
     * @since 4.2.2
     */
    audioEnabled: boolean;

    /**
     * Set video zoom mode.
     *
     * @property {UI.LiveMediaPlayer.ScaleType} scaleType
     * @android
     * @ios
     * @since 4.2.2
     */
    scaleType: LiveMediaPlayer.ScaleType;

    /**
     * Start playing.
     *
     * @method start
     * @android
     * @ios
     * @since 4.2.2
     */
    start () : void;

    /**
     * Pause playback.
     *
     * @method pause
     * @android
     * @ios
     * @since 4.2.2
     */
    pause () : void;

    /**
     * Returns whether it is currently playing.
     *
     * @method isPlaying
     * @android
     * @ios
     * @since 4.2.2
     */
    isPlaying () : boolean;

    /**
     * Release the underlying resources.
     *
     * @method release
     * @android
     * @ios
     * @since 4.2.2
     */
    release () : void;

    /**
     * Stop playing.
     *
     * @method stop
     * @android
     * @ios
     * @since 4.2.2
     */
    stop () : void;

    /**
     * Set the event callback.
     *
     * @event onChange
     * @deprecated
     * @param {Object} params
     * @param {Number} params.event See more: https://github.com/NodeMedia/NodeMediaClient-Android/blob/2.x/docs/NodePlayer_API_CN.md#%E4%BA%8B%E4%BB%B6%E5%9B%9E%E8%B0%83
     * @param {String} params.message
     * @android
     * @ios
     * @since 4.2.2
     */
    onChange: (params: { event: number; message: string }) => void;
 }


declare namespace LiveMediaPlayer {
    const Events: typeof IEvents & typeof View.Events
    type Events = typeof Events
    /**
     * @enum {Number} UI.LiveMediaPlayer.ScaleType
     * 
     * ScaleType is an enum. It defines the scale type of the video player.
     * @since 4.2.2
     *
     */
    enum ScaleType {
        /**
         * @property {Number} STRETCH
         * @android
         * @ios
         * @static
         * @readonly
         * @android
         * @ios
         * @since 4.2.2
         */
        STRETCH = 0,

        /**
         * @property {Number} ASPECTFIT
         * @android
         * @ios
         * @static
         * @readonly
         * @android
         * @ios
         * @since 4.2.2
         */
        ASPECTFIT = 1,

        /**
         * @property {Number} ASPECTFILL
         * @android
         * @ios
         * @static
         * @readonly
         * @android
         * @ios
         * @since 4.2.2
         */
        ASPECTFILL = 2
	}
}
export = LiveMediaPlayer;