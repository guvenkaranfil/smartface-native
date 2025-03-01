import { IEventEmitter } from "core/eventemitter";
import Color from "../color";
import Font from "../font";

declare enum Events {
    /**
     * This event is called when an item is selected/unselected on the SelectablePicker.
     * If multiSelectEnabled is false, selected will be always true.
     *
     * @param {Number} index
     * @param {Boolean} selected
     * @event onSelected
     * @android
     * @since 4.0.5
     */
    Selected = "selected"
}

/**
 * @class UI.SelectablePicker
 * @since 4.0.5
 *
 * SelectablePicker is a dialog where users are able to pick item/items on.
 *
 *     @example
 *     const SelectablePicker = require('@smartface/native/ui/selectablepicker');
 *     var items = [
 *          "item1",
 *          "item2",
 *          "item3",
 *          "item4",
 *          "item5"
 *     ];
 * 
 *     var checkedItems = [3,2]
 *     var mySelectablePicker = new SelectablePicker({
 *          multiSelectEnabled: true,
 *          items: items,
 *          checkedItems: checkedItems
 *     });
 *     var doneCallback = function(params){
 *          console.log(params.items);
 *     }
 *     var cancelCallback = function(params){
 *          console.log("Canceled");
 *     }
 *     mySelectablePicker.show(doneCallback,cancelCallback);
 */
declare class SelectablePicker extends NativeComponent implements IEventEmitter<Events> {
    constructor(params?: any);
    static Events: typeof Events;
    on(eventName: Events, callback: (...args: any) => void): () => void;
    off(eventName: Events, callback?: (...args: any) => void): void;
    emit(event: Events, detail?: any[]): void;
    /**
     * Gets/sets items of the SelectablePicker.
     *
     * @property {Array} items
     * @android
     * @since 4.0.5
     */
    items: [];
    /**
     * This event is called when an item is selected/unselected on the SelectablePicker.
     * If multiSelectEnabled is false, selected will be always true.
     *
     * @param {Number} index
     * @param {Boolean} selected
     * @event onSelected
     * @deprecated
     * @android
     * @since 4.0.5
     */
    onSelected: (index: boolean, selected: boolean) => void;
    /**
     * Gets/sets title of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {String} [title = Picker]
     * @android
     * @since 4.0.5
     */
    title: string;
    /**
     * Gets/sets titleColor of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {UI.Color} [titleColor = Color.BLACK]
     * @android
     * @since 4.0.5
     */
    titleColor: Color;
    /**
     * Gets/sets titleFont of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {UI.Font} titleFont
     * @android
     * @since 4.0.5
     */
    titleFont: Font;
    /**
     * Gets/sets multiSelectEnabled of the SelectablePicker. You must set this property in constructor  
     * and can not change this property on run-time. Otherwise SelectablePicker may not work properly. 
     * This property only works with show method. Must set before show method.
     *
     * @property {Boolean} [multiSelectEnabled = false]
     * @android
     * @since 4.0.5
     */
    multiSelectEnabled: boolean;
    /**
     * Gets/sets cancelable of the SelectablePicker. If click outside of dialog, it will be canceled.
     * This property only works with show method. Must set before show method.
     *
     * @property {Boolean} [cancelable = true]
     * @android
     * @since 4.0.5
     */
    cancelable: boolean;
    /**
     * Gets/sets checkedItems of the SelectablePicker. 
     * If multiSelectEnabled is false, checkedItems must be a spesific index of the items array or array of index.
     * This property only works with show method. Must set before show method.
     *
     * @property {Number|Array} [checkedItems = -1]
     * @android
     * @since 4.0.5
     */
    checkedItems: number | number[];
    /**
     * Gets/sets backgroundColor of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {UI.Color} [backgroundColor = Color.WHITE]
     * @android
     * @since 4.0.5
     */
    backgroundColor: Color;
    /**
     * Gets/sets cancelButtonColor of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {UI.Color} cancelButtonColor
     * @android
     * @since 4.0.5
     */
    cancelButtonColor: Color;

    /**
     * Gets/sets cancelButtonFont of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {UI.Font} cancelButtonFont
     * @android
     * @since 4.0.5
     */
    cancelButtonFont: Font;
    /**
     * Gets/sets cancelButtonText of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {String} [cancelButtonText = Cancel]
     * @android
     * @since 4.0.5
     */
    cancelButtonText: string;
    /**
     * Gets/sets doneButtonColor of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {UI.Color} doneButtonColor
     * @android
     * @since 4.0.5
     */
    doneButtonColor: Color;
    /**
     * Gets/sets doneButtonText of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {String} [doneButtonText = Ok]
     * @android
     * @since 4.0.5
     */
    doneButtonText: string;
    /**
     * Gets/sets doneButtonFont of the SelectablePicker. 
     * This property only works with show method. Must set before show method.
     *
     * @property {UI.Font} doneButtonFont
     * @android
     * @since 4.0.5
     */
    doneButtonFont: Font;
    /**
     * This function shows SelectablePicker in a dialog.
     *
     * @param {Function} done This event is called when user clicks done button.
     * @param {Object} done.param
     * @param {Number|Array} done.param.items If multiSelectEnabled is false, items will be index of selected item, otherwise array of selected items's indexs
     * @param {Function} cancel This event is called when user clicks cancel button.
     * @method show
     * @android
     * @since 4.0.5
     */
    show(done: (param: { items: number | number[]; }) => void, cancel: () => void): void;
}
export = SelectablePicker;
