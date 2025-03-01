const Base64Util = require("../..//util/base64");
const NativeBlob = requireClass("io.smartface.android.sfcore.global.SFBlob")

const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

function Blob(parts, properties) {
    var self = this;
    var _type = null;
    if (parts && properties && properties.type) {
        _type = properties.type;

        self.nativeObject = new NativeByteArrayOutputStream();
        if (Array.isArray(parts)) {
            self.nativeObject.write(array(parts, "byte"));
        } else {
            self.nativeObject.write(parts);
        }
        // TODO: This line added for AND-3357. 
        // But investigate whether parts property is need.
        this.parts = parts;
    }

    Object.defineProperty(this, 'type', {
        get: function () {
            return _type;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'size', {
        get: function () {
            return self.nativeObject && arrayLength(self.nativeObject.toByteArray());
        },
        enumerable: true
    });

    this.slice = function (start, end, type) {
        var newBlob = new Blob();
        var byteArray = self.nativeObject.toByteArray();
        newBlob.nativeObject.write(byteArray, arrayLength(byteArray) - start, end - start); //  write(byte[] b, int off, int len)
        return newBlob;
    };

    this.toBase64 = function () {
        const NativeBase64 = requireClass("android.util.Base64");
        let byteArray = self.nativeObject.toByteArray();
        let encodedString = NativeBase64.encodeToString(byteArray, NativeBase64.NO_WRAP);
        return encodedString;
    };

    this.toBase64Async = (callbacks) => NativeBlob.toBase64Async(self.nativeObject, callbacks)

    this.toString = function () {
        return this.nativeObject.toString();
    };
}

/** @todo 
 * Error: Attempt to invoke virtual method 'int io.smartface.ExposingEngine.FastArray.size()' on a null object reference
 */
Blob.createFromBase64 = function (base64String) {
    const NativeBase64 = requireClass("android.util.Base64");
    let byteArray = NativeBase64.decode(base64String, NativeBase64.NO_WRAP);
    let newBlob = new Blob(byteArray, {
        type: "image"
    });
    return newBlob;
};

Blob.createFromUTF8String = function (str) { // utf string or string
    var utf8Array = Base64Util.StrToUtf8Array(str);
    return new Blob(array(utf8Array, "byte"), {
        type: "text"
    });
};

module.exports = Blob;