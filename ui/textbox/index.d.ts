import View from "../view";
import Font from "../font";
import TextAlignment from "../textalignment";
import Color from "../color";
import FlexLayout from "../flexlayout";
import KeyboardAppearance from "../keyboardappearance";
import TextContentType from "../textcontenttype";
import KeyboardType from "../keyboardtype";
import ActionKeyType from "../actionkeytype";
import TextView from "../textview";

declare enum TextBoxEvents {
  ActionButtonPress ="actionButtonPress",
  ClearButtonPress = "clearButtonPress",
  EditBegins = "editBegins",
  EditEnds = "editEnds",
  TextChanged = "textChanged"
}

/**
 * @class UI.TextBox
 * @since 0.1
 * @extends UI.View
 * TextBox is a UI which users can edit the text.
 *
 *     @example
 *     const TextBox = require('@smartface/native/ui/textbox');
 *     var myTextBox = new TextBox({
 *         left:10, top:10, width:200, height:65,
 *         hint: "Your hint text",
 *         borderWidth: 1
 *     });
 *     myPage.layout.addChild(myTextBox);
 *
 */

declare class TextBox extends View<TextBoxEvents> {
	/**
	 * Gets/sets the font of the TextBox.
	 * @property {UI.Font} [font = null]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	font: Font;
	/**
	 * Gets/sets the text of the TextBox.
	 * @property {String} [text = ""]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	text: string;
	/**
	 * Gets/sets automatically capitalization of the TextBox. {@link UI.TextBox#cursorPosition Cursor Position} might be necessary to re-set.
	 * @property {UI.TextBox.AutoCapitalize} [autoCapitalize = UI.TextBox.AutoCapitalize.NONE]
	 * @android
	 * @ios
	 * @since 2.8
	 */
	autoCapitalize: TextBox.AutoCapitalize;
	/**
	 * Gets/sets the text alignment of the TextBox.
	 * @property {UI.TextAlignment} [textAlignment = UI.TextAlignment.MIDLEFT]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	textAlignment: TextAlignment;
	/**
	 * Gets/sets the text color of TextBox.
	 *
	 * @property {UI.Color} [textColor = UI.Color.BLACK]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	textColor: Color;
	/**
	 * Gets/sets the cursor position of TextBox.
	 *
	 * @property {Object} cursorPosition
	 * @property {Number} cursorPosition.start
	 * @property {Number} cursorPosition.end
	 * @android
	 * @ios
	 * @since 2.0.8
	 */
	cursorPosition: {
		start: number;
		end: number;
	};
	onEditBegins: () => void;
	/**
	 * Gets/sets the cursor color of TextBox.
	 *
	 * @property {UI.Color} cursorColor
	 * @android
	 * @ios
	 * @since 3.2.1
	 */
	cursorColor: Color;
	/**
	 * Gets/sets hint text that will be displayed when TextBox is empty.
	 *
	 * @property {String} [hint = ""]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	hint: string;
	android: View["android"] & {
		/**
		 * Gets/sets the color of the hint text.
		 *
		 * @property {UI.Color} [hintTextColor = UI.Color.LIGHTGRAY]
		 * @android
		 * @ios
		 * @since 0.1
		 */
		hintTextColor: Color;
		/**
		 * Set an input filter to constrain the text length to the specified number. This property works only for Android.
		 *
		 * @method maxLength
		 * @param {Number} value
		 * @android
		 * @since 2.0.10
		 */
		maxLength: number;
	};
	ios: View["ios"] & {
		/**
		 * This property adjusts font size according to view's fixed width. If you set it true,
		 * you should set minimum font size by changing the minimumFontSize property.
		 * This property works only for iOS.
		 *
		 * @property {Boolean} [adjustFontSizeToFit = false]
		 * @ios
		 * @since 0.1
		 */
		adjustFontSizeToFit: boolean;
		/**
		 * Gets/sets minimum font size of TextBox.
		 * This property works only for iOS.
		 *
		 * @property {Number} [minimumFontSize = 7]
		 * @ios
		 * @since 0.1
		 */
		minimumFontSize: number;
		/**
		 * Gets/sets the visibility of clear button. If enabled, clear button will be shown
		 * at right of the TextBox. This property works only for iOS only.
		 *
		 * @property {Boolean} [clearButtonEnabled = false]
		 * @ios
		 * @since 0.1
		 */
		clearButtonEnabled: boolean;
		/**
		 * Gets/sets a layout to be displayed above the standard system keyboard
		 * when the textbox object became focus. This property works only for iOS only.
		 * Default is undefined.
		 *
		 * @property {UI.FlexLayout} [keyboardLayout = undefined]
		 * @ios
		 */
		keyboardLayout: FlexLayout | undefined;
		/**
		 * The custom input view to display instead of system keyboard
		 * when the textbox object became focus. This property works only for iOS only.
		 * Default is undefined.
		 *
		 * @property {Object} inputView
		 * @property {Number} inputView.height
		 * @property {UI.View} inputView.view
		 * @ios
		 */
		inputView: {
			height: number;
			view: View;
		};

		/**
		 * Gets/sets the appearance style of the keyboard that is associated with the TextBox.
		 * This property works only for iOS.
		 *
		 * @property {UI.KeyboardAppearance} [keyboardAppearance = UI.KeyboardAppearance.DEFAULT]
		 * @ios
		 * @since 0.1
		 */
		keyboardAppearance: KeyboardAppearance;
		/**
		 * Use this property to give the keyboard and the system information about the expected semantic meaning for the content that users enter.
		 * This property works only for iOS.
		 *
		 * @property {UI.iOS.TextContentType} textContentType
		 * @ios
		 * Creates a textContentType for ios.
		 *
		 *     @example
		 *     const TextContentType = require("@smartface/native/ui/ios/textcontenttype");
		 *     const System = require('@smartface/native/device/system');
		 *
		 *     if (System.OS == "iOS" && System.OSVersion >= 12){
		 *         textbox.ios.textContentType = TextContentType.ONETIMECODE;
		 *     }
		 *
		 * @since 4.1.3
		 *
		 */
		textContentType: TextContentType;
	};
	/**
	 * Gets/sets the content of the TextBox is password or not. {@link UI.TextBox#cursorPosition Cursor Position} might be necessary to re-set.
	 *
	 * @property {Boolean} [isPassword = false]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	isPassword: boolean;
	/**
	 * Gets/sets keyboard type for TextBox. {@link UI.TextBox#cursorPosition Cursor Position} might be necessary to re-set.
	 *
	 * @property {UI.KeyboardType} [keyboardType = UI.KeyboardType.DEFAULT]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	keyboardType: KeyboardType;
	/**
	 * Gets/sets action key type for TextBox.
	 *
	 * @property {UI.ActionKeyType} [actionKeyType = UI.ActionKeyType.DEFAULT]
	 * @android
	 * @ios
	 * @since 0.1
	 */
	actionKeyType: ActionKeyType;
	/**
	 * This function shows keyboard.
	 *
	 * @method showKeyboard
	 * @android
	 * @ios
	 * @since 0.1
	 * @deprecated 1.1.8 Use {@link UI.TextBox#requestFocus} instead.
	 */
	showKeyboard(): void;
	/**
	 * This function hides keyboard.
	 *
	 * @method hideKeyboard
	 * @android
	 * @ios
	 * @since 0.1
	 * @deprecated 1.1.8 Use {@link UI.TextBox#removeFocus} instead.
	 */
	hideKeyboard(): void;
	/**
	 * This function gives focus to the TextBox. When the TextBox gained focus, keyboard will appear.
	 *
	 * @method requestFocus
	 * @android
	 * @ios
	 * @since 1.1.8
	 */
	requestFocus(): void;
	/**
	 * This function removes focus from the TextBox. When the TextBox lost its focus, keyboard will disappear.
	 *
	 * @method removeFocus
	 * @android
	 * @ios
	 * @since 1.1.8
	 */
	removeFocus(): void;
	/**
	 * This event is called when user inserts or removes a character from TextBox.
	 *
	 *     @example
	 *     myTextBox.onTextChanged: function(e) {
	 *         console.log(e.insertedText);
	 *     };
	 *
	 * @param {Object} e Event arguments.
	 * @param {String} e.insertedText The text that inserted into TextBox.
	 * @param {Number} e.location Index of inserted text.
	 * @event onTextChanged
	 * @android
	 * @ios
	 * @since 0.1
	 */
	onTextChanged: (e?: { insertedText: string; location: number }) => void;
	/**
	 * The text box calls this method in response to the user pressing the built-in clear button. Return value is YES if the text box contents should be cleared; otherwise, NO.
	 * If you do not implement this method, the text box clears the text as if the method had returned YES.
	 *
	 * @event onClearButtonPress
	 * @ios
	 * @since 4.0.2
	 */
	onClearButtonPress: () => void;
	/**
	 * This event is called when user finishes editing by clicking return key
	 * or clicking outside of the TextBox.
	 *
	 * @event onEditEnds
	 * @android
	 * @ios
	 * @since 0.1
	 */
	onEditEnds: () => void;
	/**
	 * This event is called when user clicks action key on the keyboard.
	 *
	 * @param {Object} e Event arguments.
	 * @param {UI.ActionKeyType} e.actionKeyType Pressed action key type.
	 * @event onActionButtonPress
	 * @android
	 * @ios
	 * @since 0.1
	 */
	onActionButtonPress: (e?: { actionKeyType: ActionKeyType }) => void;
}

declare namespace TextBox {
	enum AutoCapitalize {}
  const Events: typeof TextBoxEvents & typeof TextView.Events
  type Events = typeof Events

}
export = TextBox;
