import Page from "../../ui/page";
import Image from "../../ui/image";
import File from "../../io/file";
import Contacts from "../../device/contacts";

/**
 * @class Share
 * @static
 * @since 0.1
 *
 * Share allows sending a text, an image or a file over
 * other apps on the device. Blacklist works for iOS only.
 *
 */
declare const Share: {
	/**
	 * Shares a text.
	 *
	 *     @example
	 *     const Share = require('@smartface/native/share');
	 *     Share.shareText("Hello from @smartface/native", myPage, [Share.ios.Twitter, Share.ios.Facebook]);
	 *
	 * @method shareText
	 * @param {String} text
	 * @param {UI.Page} page
	 * @param {Array} [blacklist]
	 * @ios
	 * @android
	 * @since 0.1
	 * @deprecated 4.0.2 Use {@link Share#share} instead.
	 */
	shareText(text: string, page: Page, blacklist: string[]): void;
	/**
	 * Shares an image.
	 *
	 *     @example
	 *     const Share = require('@smartface/native/share');
	 *     const Image = require('@smartface/native/ui/image');
	 *
	 *     var image = Image.createFromFile('path to the image');
	 *     Share.shareImage(image, myPage, []);
	 *
	 * @method shareImage
	 * @param {UI.Image} image
	 * @param {UI.Page} page
	 * @param {Array} [blacklist]
	 * @android
	 * @ios
	 * @since 0.1
	 * @deprecated 4.0.2 Use {@link Share#share} instead.
	 */
	shareImage(image: Image, page: Page, blacklist: string[]): void;
	/**
	 * Shares a file.
	 *
	 *     @example
	 *     const Share = require('@smartface/native/share');
	 *     const File = require('@smartface/native/io/file');
	 *
	 *     var file = new File({path: 'path to the file'});
	 *     Share.shareFile(file, myPage, []);
	 *
	 * @method shareFile
	 * @param {IO.File} file
	 * @param {UI.Page} page
	 * @param {Array} [blacklist]
	 * @ios
	 * @android
	 * @since 0.1
	 * @deprecated 4.0.2 Use {@link Share#share} instead.
	 */
    shareFile(image: File, page: Page, blacklist: string[]): void;
    /**
	 * Shares contact.
	 *
	 * @method shareContacts
	 * @param {Object} params
	 * @param {Contacts.Contact[]} params.items
     * @param {String} params.fileName Specifies vCard file name. Defaults to Contacts
	 * @param {UI.Page} params.page
	 * @param {Array} [params.blacklist]
	 * @ios
	 * @android
     * @see https://developer.smartface.io/docs/native-share-in-ios-and-android#contacts-sharing
	 * @since 4.2.1
	 */
    shareContacts(params: { items: Contacts.Contact[]; fileName?: string; page: Page; blacklist: string[] }): void;

	/**
	 * Shares file, image & text.
	 *
	 *     @example
	 *     const Share = require('@smartface/native/share');
	 *     const File = require('@smartface/native/io/file');
	 *
	 *     var myPage = this; // in page scope
	 *     var file = new File({
	 *         path: 'assets://yourFile.pdf'
	 *     });
	 *     var image = Image.createFromFile("images://smartface.png");
	 *     var text = "Hello from Smartface";
	 *     Share.share({ items: [text, file, image] , page: myPage, blacklist: [Share.ios.Twitter, Share.ios.Facebook]});
	 *
	 * @method share
	 * @param {Object} params
	 * @param {Array} params.items
	 * @param {UI.Page} params.page
	 * @param {Array} [params.blacklist]
	 * @ios
	 * @android
     * @see https://developer.smartface.io/docs/native-share-in-ios-and-android#multiple-sharing
	 * @since 4.0.2
	 */
    share(params: { items: any[]; page: Page; blacklist: string[] }): void;
	ios: {
		/**
		 * @property {String} AirDrop
		 * @static
		 * @readonly
		 * @ios
		 * @since 0.1
		 */
		readonly AirDrop: string;
		/**
		 * @property {String} Facebook
		 * @static
		 * @readonly
		 * @ios
		 * @since 0.1
		 */
		readonly Facebook: string;
		/**
		 * @property {String} Twitter
		 * @static
		 * @readonly
		 * @ios
		 * @since 0.1
		 */
		readonly Twitter: string;
		/**
		 * @property {String} Message
		 * @static
		 * @readonly
		 * @ios
		 * @since 0.1
		 */
		readonly Message: string;
		/**
		 * @property {String} Mail
		 * @static
		 * @readonly
		 * @ios
		 * @since 0.1
		 */
		readonly Mail: string;
		/**
		 * @property {String} Vimeo
		 * @static
		 * @readonly
		 * @ios
		 * @since 0.1
		 */
		readonly Vimeo: string;
	};
};

export = Share;
