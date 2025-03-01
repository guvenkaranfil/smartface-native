import Page from "../page";
import View from "../view";
import OverScrollMode from "../android/overscrollmode";

declare enum SwipeViewEvents {
	/**
	 * Gets/Sets the callback triggered when a page is selected after a swipe action.
	 *
	 * @event onPageSelected
	 * @param index
	 * @param page Selected page instance
	 * @android
	 * @ios
	 * @since 1.1.10
	 */
	PageSelected = "pageSelected",
	/**
	 * Gets/Sets the callback triggered when a page is scrolling. When call swipeToIndex function, onPageScrolled will behave differently on iOS and Android.
	 * Click this link for SwipeToIndex and onPageScrolled use together: "https://developer.smartface.io/docs/swipeview-onpagescrolled-and-swipetoindex-together-usage"
	 *
	 * @event onPageScrolled
	 * @param index  Index of the first page from the left that is currently visible.
	 * @param offset Indicating the offset from index. Value from range [0, width of swipeview].
	 * @android
	 * @ios
	 * @since 2.0.9
	 */
  PageScrolled = "pageScrolled",
	/**
	 * Gets/Sets the callback triggered during swipe actions.
	 *
	 * @event onStateChanged
	 * @param {UI.SwipeView.State} state
	 * @android
	 * @ios
	 * @since 1.1.10
	 */
  StateChanged = "stateChanged"
}

/**
 * @class UI.SwipeView
 * @since 1.1.10
 * @extends UI.View
 * SwipeView holds page classes provided inside an array. These pages can be traversed horizontally via gesture
 * actions.
 *
 *     @example
 *     const SwipeView = require('@smartface/native/ui/swipeview');
 *     var swipeView = new SwipeView({
 *       page: currentPage,
 *       width:300, height:300,
 *       pages: [require("../ui/ui_swipePage1"), require("../ui/ui_swipePage2"), require("../ui/ui_swipePage3")],
 *       onPageSelected: function(index,page) {
 *         console.log("Selected Page Index : " + index);
 *         console.log("Selected Page Instance : " + page);
 *       },
 *       onStateChanged: function(state) {
 *         if (SwipeView.State.DRAGGING === state) {
 *           console.log("Dragging");
 *         } else {
 *           console.log("Idle");
 *         }
 *       }
 *     });
 *
 * @constructor
 * @param {Object} object
 * @param {UI.Page} object.page
 * It is required to pass the current page to swipeview.
 *
 */
declare class SwipeView extends View {
	/**
	 * Gets/Sets the array of the page classes will be displayed inside SwipeView. Pages parameter cannot be empty.
	 *
	 * @property {Array} pages
	 * @android
	 * @ios
	 * @since 1.1.10
	 */
	pages: (typeof Page)[];
	/**
	 * Gets/Sets the callback triggered when a page is selected after a swipe action.
	 *
	 * @event onPageSelected
	 * @param index
	 * @deprecated
	 * @param page Selected page instance
	 * @android
	 * @ios
	 * @since 1.1.10
	 */
	onPageSelected: (index: number, page: Page) => void;
	/**
	 * Gets/Sets the callback triggered when a page is scrolling. When call swipeToIndex function, onPageScrolled will behave differently on iOS and Android.
	 * Click this link for SwipeToIndex and onPageScrolled use together: "https://developer.smartface.io/docs/swipeview-onpagescrolled-and-swipetoindex-together-usage"
	 *
	 * @event onPageScrolled
	 * @param index  Index of the first page from the left that is currently visible.
	 * @param offset Indicating the offset from index. Value from range [0, width of swipeview].
	 * @deprecated
	 * @android
	 * @ios
	 * @since 2.0.9
	 */
	onPageScrolled: (index: number, offset: number) => void;
	/**
	 * Gets/Sets the callback triggered during swipe actions.
	 *
	 * @event onStateChanged
	 * @param {UI.SwipeView.State} state
	 * @deprecated
	 * @android
	 * @ios
	 * @since 1.1.10
	 */
	onStateChanged: (state: SwipeView.State) => void;
	/**
	 * Gets the currently displayed page's index inside the page array.
	 *
	 * @property {Number} currentIndex
	 * @android
	 * @ios
	 * @readonly
	 * @since 1.1.10
	 */
    currentIndex: number;
    
    /**
     * Enables/Disables paging behavior.
     *
     * @property {Boolean} [pagingEnabled = true]
     * @android
     * @ios
     * @since 4.3.2
     */
    pagingEnabled: Boolean;
	/**
	 * Swipes to the page inside the index of the array.
	 *
	 * @method swipeToIndex
	 * @param {Number} index
	 * @param {Boolean} [animated=false]
	 * @android
	 * @ios
	 * @since 1.1.10
	 */
	swipeToIndex(index: number, animated: boolean): void;
	overScrollMode: OverScrollMode;
}

declare namespace SwipeView {
  const Events: typeof SwipeViewEvents & typeof View.Events
  type Events = typeof Events
	/**
	 * @enum UI.SwipeView.State
	 * @static
	 * @readonly
	 * @since 1.1.10
	 *
	 */
	enum State {
		/**
		 * @property {Number} [IDLE = 0]
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 1.1.10
		 */
		IDLE = 0,
		/**
		 * @property {Number} [DRAGGING = 1]
		 * @android
		 * @ios
		 * @static
		 * @readonly
		 * @since 1.1.10
		 */
		DRAGGING = 1
	}
}
export = SwipeView;
