/* global requireClass */
const AndroidConfig = require("../../util/Android/androidconfig");
const NativeIntent = requireClass('android.content.Intent');
const NativeBuildConfig = requireClass(AndroidConfig.activity.getPackageName() + ".BuildConfig");
const NativeFileProvider = requireClass('androidx.core.content.FileProvider');

const Authority = NativeBuildConfig.APPLICATION_ID + ".provider";

const Share = {};
Object.defineProperties(Share, {
    'shareText': {
        value: function (text, page, blacklist) {
            shareContent({
                type: "text/plain",
                extra: text,
                extraType: NativeIntent.EXTRA_TEXT,
                actionType: NativeIntent.ACTION_SEND
            });
        }
    },
    'shareImage': {
        value: function (image, page, blacklist) {
            var imageFile = writeImageToFile(image);
            let uri = getUriFromFile(imageFile);

            shareContent({
                type: "image/*",
                extra: uri,
                extraType: NativeIntent.EXTRA_STREAM,
                actionType: NativeIntent.ACTION_SEND
            });
        }
    },
    'shareFile': {
        value: function (file, page, blacklist) {
            let uri = getUriFromFile(file.nativeObject);

            shareContent({
                type: "application/*",
                extra: uri,
                extraType: NativeIntent.EXTRA_STREAM,
                actionType: NativeIntent.ACTION_SEND
            });
        }
    },
    'share': {
        value: function (params) {
            const File = require("../../io/file");
            const Image = require("../../ui/image");
            const Contacts = require("../../device/contacts");
            const NativeArrayList = requireClass("java.util.ArrayList");


            let itemList = params.items || [];
            let shareIntent = new NativeIntent(NativeIntent.ACTION_SEND_MULTIPLE);
            shareIntent.setType("*/*");

            let contentSharing = {
                mimeTypes: [],
                parcelabels: new NativeArrayList()
            };
            let addContentItem = addContent.bind(contentSharing);
            itemList.forEach((item) => {
                if (item instanceof File) {
                    addContentItem(item.nativeObject, "application/*");
                } else if (typeof (item) === 'string') {
                    shareIntent.putExtra(NativeIntent.EXTRA_TEXT, item);
                    contentSharing.mimeTypes.push("text/plain");
                } else if (item instanceof Image) {
                    var imageFile = writeImageToFile(item)
                    addContentItem(imageFile, "image/*");
                }
            });
            let contacts = itemList.filter(item => item.constructor === Contacts.Contact);
            if (contacts.length > 0) {
                let vCardFileName = getContactFileName(contacts);
                let file = writeContactsToFile(contacts, vCardFileName);
                addContentItem(file.nativeObject, "text/x-vcard");
            }

            !(contentSharing.parcelabels.isEmpty()) && shareIntent.putExtra(NativeIntent.EXTRA_STREAM, contentSharing.parcelabels);
            shareIntent.putExtra(NativeIntent.EXTRA_MIME_TYPES, array(contentSharing.mimeTypes, 'java.lang.String'));
            AndroidConfig.activity.startActivity(shareIntent);
        }
    },
    shareContacts: {
        value: function (params) {
            const NativeURI = requireClass('android.net.Uri');

            let itemList = params.items || [];
            let vCardFileName = params.fileName ? params.fileName : "Contacts";
            let file = writeContactsToFile(itemList, vCardFileName);
            let uri;
            if (AndroidConfig.sdkVersion < 24) {
                uri = NativeURI.fromFile(file.nativeObject);
            } else {
                uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, file.nativeObject);
            }

            shareContent({
                type: "text/x-vcard",
                extra: uri,
                extraType: NativeIntent.EXTRA_STREAM,
                actionType: NativeIntent.ACTION_SEND
            });
        }
    }
});

function writeImageToFile(image) {
    const NativeFile = requireClass('java.io.File');
    const NativeBitmap = requireClass('android.graphics.Bitmap');
    const NativeOutStream = requireClass('java.io.ByteArrayOutputStream');
    const NativeFileOutStream = requireClass('java.io.FileOutputStream');

    var outStream = new NativeOutStream();
    var bitmap = image.nativeObject.getBitmap();
    bitmap.compress(NativeBitmap.CompressFormat.PNG, 100, outStream);

    var byteArray = outStream.toByteArray();
    var tempFile = new NativeFile(AndroidConfig.activity.getExternalFilesDir(null), "sf-core-temp.png");
    var fileOutStream = new NativeFileOutStream(tempFile);
    fileOutStream.write(byteArray);
    fileOutStream.flush();
    fileOutStream.close();

    return tempFile;
}

function writeContactsToFile(contacts, vCardFileName) {
    const FileStream = require('../../io/filestream');
    const File = require('../../io/file');
    const NativeStringUtil = requireClass('io.smartface.android.utils.StringUtil');

    let file = new File({ path: AndroidConfig.activity.getExternalCacheDir() + `/readytosharecontact/` + (vCardFileName + ".vcf") });
    if (!file.exists)
        file.createFile(true);
    let fileStream = file.openStream(FileStream.StreamType.WRITE, FileStream.ContentMode.TEXT);

    contacts.forEach((contact) => {
        const { namePrefix = "", firstName = "", lastName = "", middleName = "", title = "",
            organization = "", nickname = "", department = "", photo,
            nameSuffix = "", phoneNumbers = [], urlAddresses = [], emailAddresses = [], addresses = [] } = contact;
        const UTF_8_QUOTED_PRINTABLE = "CHARSET=UTF-8;ENCODING=QUOTED-PRINTABLE";

        fileStream.write("BEGIN:VCARD\r\n");
        fileStream.write("VERSION:2.1\r\n");

        if (NativeStringUtil.isUsAscii(lastName) && NativeStringUtil.isUsAscii(firstName) &&
            NativeStringUtil.isUsAscii(middleName) && NativeStringUtil.isUsAscii(namePrefix) && NativeStringUtil.isUsAscii(nameSuffix)) {
            fileStream.write(`N:${lastName};${firstName};${middleName};${namePrefix};${nameSuffix}\r\n`)
        } else {
            fileStream.write(`N;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(lastName)};${NativeStringUtil.encodeToUTF8QuotedPrintable(firstName)};${NativeStringUtil.encodeToUTF8QuotedPrintable(middleName)};${NativeStringUtil.encodeToUTF8QuotedPrintable(namePrefix)};${NativeStringUtil.encodeToUTF8QuotedPrintable(nameSuffix)}\r\n`);
        }

        let vcard_firstName = NativeStringUtil.isUsAscii(firstName) ? `FN:${firstName}\r\n` : `FN;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(firstName)}\r\n`;
        fileStream.write(vcard_firstName);

        if (NativeStringUtil.isUsAscii(organization) && NativeStringUtil.isUsAscii(department))
            fileStream.write(`ORG:${organization};${department}\r\n`);
        else
            fileStream.write(`ORG;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(organization)};${NativeStringUtil.encodeToUTF8QuotedPrintable(department)}\r\n`);

        let vcard_title = NativeStringUtil.isUsAscii(title) ? `TITLE:${title}\r\n` : `TITLE;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(title)}\r\n`;
        fileStream.write(vcard_title);
        let vcard_nickname = NativeStringUtil.isUsAscii(nickname) ? `X-ANDROID-CUSTOM:vnd.android.cursor.item/nickname;${nickname};1;;;;;;;;;;;;;\r\n` : `X-ANDROID-CUSTOM;${UTF_8_QUOTED_PRINTABLE}:vnd.android.cursor.item/nickname;${NativeStringUtil.encodeToUTF8QuotedPrintable(nickname)};1;;;;;;;;;;;;;\r\n`;
        fileStream.write(vcard_nickname);

        if (photo)
            fileStream.write(`PHOTO;ENCODING=BASE64;JPEG:${photo.toBase64()}\r\n`)

        phoneNumbers.forEach(phoneNumber => fileStream.write(`TEL;HOME;VOICE:${phoneNumber}\r\n`));

        emailAddresses.forEach(emailAddress => {
            let vcard_emailAddress = NativeStringUtil.isUsAscii(emailAddress) ? `EMAIL;PREF;X-INTERNET:${emailAddress}\r\n` : `EMAIL;PREF;X-INTERNET;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(emailAddress)}\r\n`;
            fileStream.write(vcard_emailAddress)
        });

        addresses.forEach(address => {
            let vcard_address = NativeStringUtil.isUsAscii(address) ? `ADR;HOME:;;${address};;;;\r\n` : `ADR;HOME;${UTF_8_QUOTED_PRINTABLE}:;;${NativeStringUtil.encodeToUTF8QuotedPrintable(address)};;;;\r\n`;
            fileStream.write(vcard_address)
        });

        urlAddresses.forEach(urlAddress => {
            let vcard_urlAddress = NativeStringUtil.isUsAscii(urlAddress) ? `URL:${urlAddress}\r\n` : `URL;${UTF_8_QUOTED_PRINTABLE}:${NativeStringUtil.encodeToUTF8QuotedPrintable(urlAddress)}\r\n`;
            fileStream.write(vcard_urlAddress)
        });
        fileStream.write("END:VCARD\r\n");
    });
    fileStream.nativeObject.flush();
    fileStream.close();

    return file;
}


function getContactFileName(contacts) {
    if (contacts.length > 1)
        return "Contacts";

    const { namePrefix = "", firstName = "", lastName = "", middleName = "", nameSuffix = "", phoneNumbers = [] } = contacts[0];
    let contactFileName = "";
    if (firstName.length > 0 || lastName.length > 0 || middleName.length > 0) {
        contactFileName += `${namePrefix}${firstName}${middleName}${lastName}${nameSuffix}`;
    } else if (phoneNumbers.length > 0) {
        contactFileName += `${phoneNumbers[0]}`;
    } else {
        contactFileName += "vcard_" + Math.round(Math.random() * 9999999);
    }
    return contactFileName;
}

function getUriFromFile(fileNativeObject) {
    const NativeURI = requireClass('android.net.Uri');
    if (AndroidConfig.sdkVersion < 24) {
        return NativeURI.fromFile(fileNativeObject);
    }
    return NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
}

function addContent(fileNativeObject, fileType) {
    var contentSharing = this;
    const NativeURI = requireClass('android.net.Uri');
    let uri;
    if (AndroidConfig.sdkVersion < 24) {
        uri = NativeURI.fromFile(fileNativeObject);
    } else {
        uri = NativeFileProvider.getUriForFile(AndroidConfig.activity, Authority, fileNativeObject);
    }
    contentSharing.mimeTypes.push(fileType);
    contentSharing.parcelabels.add(uri);
}

function shareContent(params = {}) {
    let {
        type,
        extra,
        extraType,
        actionType
    } = params;

    var shareIntent = new NativeIntent(actionType);
    shareIntent.setType(type);
    shareIntent.putExtra(extraType, extra);
    AndroidConfig.activity.startActivity(shareIntent);
}

Share.ios = {};

module.exports = Share;