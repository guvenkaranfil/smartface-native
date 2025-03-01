const FlexLayout = require("../flexlayout");

/**
 * @class UI.Dialog
 * @since 0.1
 * 
 * Dialog class provides showing user interfaces. Dialog has an embedded layout 
 * inside which you can use for adding views into Dialog.
 *
 *     @example
 *     const Dialog = require("@smartface/native/ui/dialog");
 *     const Button = require("@smartface/native/ui/button");
 *     const Color = require("@smartface/native/ui/color");
 *     var myDialog = new Dialog();
 *     
 *     var myButton = new Button({
 *         width: 100,
 *         height: 80,
 *         backgroundColor: Color.BLUE,
 *         text: "Hide Dialog",
 *         onPress: function() {
 *             myDialog.hide();
 *         }
 *     });
 * 
 *     myDialog.layout.addChild(myButton);
 *     myDialog.layout.applyLayout();
 *     myDialog.show();
 *
 */
function Dialog(params) {}

/**
 * Gets the layout of Dialog. You should add views to the layout of the dialog instance.
 *
 * @property {UI.FlexLayout} layout
 * @readonly
 * @android
 * @ios
 * @since 0.1
 */
Dialog.prototype.layout = new FlexLayout();


/**
 * Hides the dialog.
 * 
 * @method hide
 * @android
 * @ios
 * @since 0.1
 */
Dialog.prototype.hide = function() {};

/**
 * Shows the dialog.
 *
 * @method show
 * @since 0.1
 * @android
 * @ios
 */
Dialog.prototype.show = function() {};

Dialog.prototype.android = {};

/**
 * Sets the theme style of dialog.
 *
 * @property {UI.Dialog.Android.Style} themeStyle
 * @android
 * @since 3.0.2
 */
Dialog.prototype.android.themeStyle = Dialog.Android.Style;

/**
 * Sets whether the dialog is full transparent. This property must be given in constructor function.
 * If {@link UI.StatusBar statusBar} is visible, the dialog is drawn under status bar.
 *
 * @property {Boolean} isTransparent
 * @android
 * @since 3.2.0
 */
Dialog.prototype.android.isTransparent;


/**
 * Sets whether this dialog is cancelable with the {@link Application#onBackButtonPressed BACK} key.
 *
 * @property {Boolean} cancelable
 * @android
 * @since 4.0.2
 */
Dialog.prototype.android.cancelable = true;


/**
 * This function hides keyboard.
 *
 * @method hideKeyboard
 * @android
 * @static
 * @deprecated 4.0.2 Use {@link Application#hideKeyboard} instead.
 * @since 3.0.1
 */
Dialog.prototype.android.hideKeyboard = function() {};


/** 
 * @enum UI.Dialog.Android.Style
 * @android
 * @since 3.0.2
 *
 * According to your requirements, you should choose of the theme enums.  
 *
 *     @example
 *     const Dialog = require("@smartface/native/ui/dialog");
 *     const Button = require("@smartface/native/ui/button");
 *     const Color = require("@smartface/native/ui/color");
 *
 *     var myDialog = new Dialog({
 *      android: {
 *          themeStyle: Dialog.Android.Style.ThemeNoHeaderBar
 *        }
 *     });
 *     
 *     var myButton = new Button({
 *         width: 100,
 *         height: 80,
 *         backgroundColor: Color.BLUE,
 *         text: "Hide Dialog",
 *         onPress: function() {
 *             myDialog.hide();
 *         }
 *     });
 *     
 *     myDialog.layout.addChild(myButton);
 *     myDialog.layout.applyLayout();
 *     myDialog.show();
 *
 */
Dialog.prototype.Android.Style = {};


/**
 * This is default enum which will act as default when no themeStyle given.Default theme has no title bar and fills the entire screen.
 *
 * @property ThemeDefault
 * @static
 * @android
 * @readonly
 * @since 3.0.2
 */
Dialog.prototype.Android.Style.ThemeDefault;

/**
 * This theme with no header bar.  
 *
 * @property ThemeNoHeaderBar
 * @static
 * @android
 * @readonly
 * @since 3.0.2
 */
Dialog.prototype.Android.Style.ThemeNoHeaderBar;

/**
 * This theme has no title bar and fills the entire screen and extends into the display overscan region. 
 *
 * @property ThemeNoHeaderBarWithOverscan
 * @static
 * @android
 * @readonly
 * @since 3.0.2
 */
Dialog.prototype.Android.Style.ThemeNoHeaderBarWithOverscan;

/**
 * This theme  has no title bar and translucent system decor. 
 *
 * @property ThemeNoHeaderBarWithTranslucentDecor
 * @static
 * @android
 * @readonly
 * @since 3.0.2
 */
Dialog.prototype.Android.Style.ThemeNoHeaderBarWithTranslucentDecor;


module.exports = Dialog;