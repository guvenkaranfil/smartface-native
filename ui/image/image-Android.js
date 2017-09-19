const NativeBitmapFactory  = requireClass("android.graphics.BitmapFactory");
const NativeBitmapDrawable = requireClass("android.graphics.drawable.BitmapDrawable");
const NativeBitmap = requireClass("android.graphics.Bitmap");
const NativeMatrix = requireClass("android.graphics.Matrix");
const NativeByteArrayOutputStream = requireClass("java.io.ByteArrayOutputStream");

const AndroidConfig = require("../../util/Android/androidconfig");
const Blob = require('../../blob');
const File = require('../../io/file');
const Path = require("../../io/path");

const CompressFormat = [
    NativeBitmap.CompressFormat.JPEG,
    NativeBitmap.CompressFormat.PNG
];

const Format = {
    JPEG: 0,
    PNG: 1
};

function Image (params) {
    var self = this;
    var androidResources = AndroidConfig.activity.getResources();
    if (params) {
        if(params.bitmap){
            self.nativeObject = new NativeBitmapDrawable(androidResources, params.bitmap);
        }
        else if(params.path){
            var bitmap = NativeBitmapFactory.decodeFile(params.path);
            self.nativeObject = new NativeBitmapDrawable(androidResources, bitmap);
        }
        else{
            throw new Error("path or bitmap can not be empty for Image!");
        }
    }
    else{
        throw new Error("Constructor parameters needed for Image!");
    }
    
    Object.defineProperties(this, {
        'height': {
            get: function() {
                return self.nativeObject.getBitmap().getHeight();
            }, 
            enumerable: true
        },
        'width': {
            get: function() {
                return self.nativeObject.getBitmap().getWidth();
            }, 
            enumerable: true
        },
        'toBlob':{
            value: function() {
                var bitmap = self.nativeObject.getBitmap();
                var stream = new NativeByteArrayOutputStream();
                bitmap.compress(CompressFormat[1], 100, stream);
                return new Blob(stream.toByteArray(), {type: "image"});
            }, 
            enumerable: true
        },
        'resize':{
            value: function(width, height, onSuccess, onFailure){
                var success = true;
                try {
                    var originalBitmap = self.nativeObject.getBitmap();
                    var newBitmap = NativeBitmap.createScaledBitmap(originalBitmap, width, height, false);  
                }
                catch(err) {
                    success = false;
                    if(onFailure) 
                        onFailure({message: err});
                    else 
                        return null;
                }
                if(success) {
                    if(onSuccess)
                        onSuccess({image: new Image({bitmap: newBitmap})});
                    else
                        return (new Image({bitmap: newBitmap}));
                }
            }, 
            enumerable: true
        },
        'crop':{
            value: function(x, y, width, height, onSuccess, onFailure) {
                var success = true;
                try {
                    var originalBitmap = self.nativeObject.getBitmap();
                    var newBitmap = NativeBitmap.createBitmap(originalBitmap, x, y, width, height);
                }
                catch(err) {
                    success = false;
                    if(onFailure) 
                        onFailure({message: err});
                    else 
                        return null;
                }
                if(success) {
                    if(onSuccess)
                        onSuccess({image: new Image({bitmap: newBitmap})});
                    else
                        return (new Image({bitmap: newBitmap}));
                }
            }, 
            enumerable: true
        },
        'rotate': {
            value: function(angle, onSuccess, onFailure) {
                var success = true;
                try {
                    var matrix = new NativeMatrix();
                    matrix.postRotate(angle);
                    var bitmap = self.nativeObject.getBitmap();
                    var width = bitmap.getWidth(), height = bitmap.getHeight();
                    var newBitmap = NativeBitmap.createBitmap(bitmap, 0, 0, width, height, matrix, true);  
                }
                catch(err) {
                    success = false;
                    if(onFailure) 
                        onFailure({message: err});
                    else 
                        return null;
                }
                if(success) {
                    if(onSuccess)
                        onSuccess({image: new Image({bitmap: newBitmap})});
                    else
                        return (new Image({bitmap: newBitmap}));
                }
            }, 
            enumerable: true
        },
        'compress': {
            value: function(format, quality, onSuccess, onFailure) {
                var success = true;
                try {
                    var out = new NativeByteArrayOutputStream();
                    var bitmap = self.nativeObject.getBitmap();
                    bitmap.compress(CompressFormat[format], quality, out);
                    var byteArray = out.toByteArray();
                }
                catch(err) {
                    success = false;
                    if(onFailure) 
                        onFailure({message: err});
                    else 
                        return null;
                }
                if(success) {
                    if(onSuccess) 
                        onSuccess({blob: new Blob(byteArray, {type:"image"})});
                    else 
                        return (new Blob(byteArray, {type:"image"}));
                }
            }, 
            enumerable: true
        },
        'toBlob':{
            value: function() {
                var bitmap = self.nativeObject.getBitmap();
                var stream = new NativeByteArrayOutputStream();
                bitmap.compress(CompressFormat[1], 100, stream);
                return new Blob(stream.toByteArray(), {type: "image"});
            }, 
            enumerable: true
        },
        'toString': {
            value: function(){
                return 'Image';
            },
            enumerable: true, 
            configurable: true
        }
    });
}

Object.defineProperties(Image,{
    'createFromFile': {
        value: function(path) {
            var imageFile = new File({path:path});
            if(imageFile && imageFile.nativeObject){
                var bitmap;
                if(imageFile.type === Path.FILE_TYPE.ASSET){
                    var assetsInputStream = Android.getActivity().getAssets().open(imageFile.nativeObject);
                    bitmap = NativeBitmapFactory.decodeStream(assetsInputStream);
                    assetsInputStream.close();
                }
                else if(imageFile.type === Path.FILE_TYPE.DRAWABLE){
                    bitmap = imageFile.nativeObject;
                }
                else{
                    bitmap = NativeBitmapFactory.decodeFile(imageFile.fullPath);
                }
                return (new Image({bitmap: bitmap}));
            }
            return null;
        },
        enumerable: true
    },
    'createFromBlob': {
        value: function(blob) {
            var newBitmap = NativeBitmapFactory.decodeByteArray(array(blob.parts, "byte"), 0, blob.size);
            if(newBitmap)
                return (new Image({bitmap: newBitmap}));
            return null;
        },
        enumerable: true
    },
    'Format': {
        value: Format,
        enumerable: true
    }
});

module.exports = Image;