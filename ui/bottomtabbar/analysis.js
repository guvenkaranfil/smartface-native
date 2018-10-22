/**
 * @class UI.BottomTabBar
 * @since 1.1.10
 *
 * BottomTabBar is used for navigating between tab bar items with given tags.
 *
 *     @example
 *     const TabBarItem = require('sf-core/ui/tabbaritem');
 *     const BottomTabBar = require('sf-core/ui/bottomtabbar');
 *     const Router = require('sf-core/router');
 *     const Image = require('sf-core/ui/image');
 *     
 *     var myProfileImage = Image.createFromFile("images://profile.png");
 *     var myMessageImage = Image.createFromFile("images://messages.png");
 *     var myTab = new BottomTabBar();
 * 
 *     var myProfileItem = new TabBarItem({
 *         title: "Profile",
 *         icon: myProfileImage,
 *         route: 'pages/pgProfile'
 *     });
 * 
 *     var myMessageItem = new TabBarItem({
 *         title: "Messages",
 *         icon: myMessageImage,
 *         route: 'pages/pgMessages'
 *     });
 * 
 *     myTab.add('profile', myProfileItem);
 *     myTab.add('messages', myMessageItem);
 *     myTab.setIndex('messages');
 * 
 *     Router.add('dashboard', myTab);
 *     Router.go('dashboard');
 */
function BottomTabBar() {}


/**
 * Gets the maximum number of items that add to bottom tab bar.
 *
 * @since 1.1.10
 * @property {Number} maxItemCount
 * @android
 * @readonly
 */
BottomTabBar.prototype.android = {};
BottomTabBar.prototype.android.maxItemCount = true;

/**
 * Gets/sets title and icon color of the tab bar items. 
 *
 * @property {Object} itemColor
 * @property {UI.Color} itemColor.normal 
 * @property {UI.Color} itemColor.selected
 * @android
 * @ios
 * @since 1.1.10
 */
BottomTabBar.prototype.itemColor = {normal: Color.BLACK, selected: Color.BLUE};

/**
 * Gets/sets background color of the tab bar items. 
 *
 * @property {UI.Color} backgroundColor
 * @android
 * @ios
 * @since 1.1.10
 */
BottomTabBar.prototype.backgroundColor = Color.WHITE;


/**
 * Gets/sets items of the tab bar. 
 *
 * @property {UI.TabBarItem[]} items
 * @android
 * @ios
 * @since 3.2.0
 */
BottomTabBar.prototype.items = null;

module.exports = BottomTabBar;