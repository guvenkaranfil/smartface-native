/* utf.js - UTF-8 <=> UTF-16 convertion
 *
 * Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
 * Version: 1.0
 * LastModified: Dec 25 1999
 * This library is free.  You can redistribute it and/or modify it.
 * 
 */

 /** 
  * @type {{
 *   Utf8ArrayToStr: (data:string[]) => string,
 *   StrToUtf8Array: (data: string) => string[]
 * }} 
 */
const Base64Util = {};

// Taken from https://weblog.rogueamoeba.com/2017/02/27/javascript-correctly-converting-a-byte-array-to-a-utf-8-string/
Base64Util.Utf8ArrayToStr = function(data) {
    const extraByteMap = [1, 1, 1, 1, 2, 2, 3, 0];
    var count = data.length;
    var str = "";

    for (var index = 0; index < count;) {
        var ch = data[index++];
        if (ch & 0x80) {
            var extra = extraByteMap[(ch >> 3) & 0x07];
            if (!(ch & 0x40) || !extra || ((index + extra) > count))
                return null;

            ch = ch & (0x3F >> extra);
            for (; extra > 0; extra -= 1) {
                var chx = data[index++];
                if ((chx & 0xC0) != 0x80)
                    return null;

                ch = (ch << 6) | (chx & 0x3F);
            }
        }

        str += String.fromCharCode(ch);
    }

    return str;
};

Base64Util.StrToUtf8Array = function(str) {
    var utf8 = [];
    for (var i = 0; i < str.length; i++) {
        var charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
            utf8.push(0xc0 | (charcode >> 6),
                0x80 | (charcode & 0x3f));
        } else if (charcode < 0xd800 || charcode >= 0xe000) {
            utf8.push(0xe0 | (charcode >> 12),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
            i++;
            // UTF-16 encodes 0x10000-0x10FFFF by
            // subtracting 0x10000 and splitting the
            // 20 bits of 0x0-0xFFFFF into two halves
            charcode = 0x10000 + (((charcode & 0x3ff) << 10) |
                (str.charCodeAt(i) & 0x3ff));
            utf8.push(0xf0 | (charcode >> 18),
                0x80 | ((charcode >> 12) & 0x3f),
                0x80 | ((charcode >> 6) & 0x3f),
                0x80 | (charcode & 0x3f));
        }
    }
    return utf8;
};

module.exports = Base64Util;