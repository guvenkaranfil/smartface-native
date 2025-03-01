/**
 * @class Blob
 * @since 0.1
 * 
 * Blob is a binary large object.
 * 
 *     @example
 *     const Blob = require('@smartface/native/blob');
 *     var myBase64Str = "SGVsbG8gV29ybGQ=";
 *     var blob = Blob.createFromBase64(myBase64Str);
 */
declare class Blob {
    constructor(parts: any[], properties: {type: string});
/**
 * Returns the type of Blob data.
 *
 * @property {String} type
 * @readonly
 * @since 0.1
 */
    readonly type: string;
/**
 * Returns blob size.
 *
 * @property {Number} size
 * @readonly
 * @since 0.1
 */
    readonly size: number;
/**
 * Returns a new Blob object containing the data in the specified range of bytes of the existing Blob.
 *
 * @method slice
 * @since 0.1
 */
    slice?: (start: number, end: number) => Blob;
/**
 * Returns a base64 String
 *
 * @method toBase64
 * @since 0.1
 */
    toBase64: () => string;


/**
 * Converts to base64 asynchronously 
 *
 * @method toBase64Async
 * @param {Object} params Object describing parameters for the function.
 * @param {Function} params.onComplete Triggers when conversion is over.
 * @param {String} params.onComplete.base64 
 * @param {Function} [params.onFailure] Triggers when failure situation occurred.
 * @android
 * @ios
 * @since 4.3.0
 */
    toBase64Async: (handlers: { 
        onComplete: (base64 : String) => void,
        onFailure?: () => void
    }) => void;

/** 
 *  * Returns a utf8 String
 *
 * @method toString
 * @since 0.1
 */
    toString: () => string;
/**
 * Creates a blob object from given a base64String.
 *
 * @param {String} base64String
 * @method createFromBase64
 * @return Blob
 * @static
 * @since 0.1
 */
    static createFromBase64(Base64String: string):Blob;
/**
 * Creates a blob object from given a utf8 string.
 *
 * @param {String} utf8String
 * @method createFromUTF8String
 * @return Blob
 * @static
 * @since 0.1
 */
    static createFromUTF8String(utf8String: string):Blob;
}

export = Blob;
