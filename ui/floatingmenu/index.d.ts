import FloatingMenuItem from "./floatingMenuItem";
import Image from "../image";
import Color from "../color";
import { IEventEmitter } from "core/eventemitter";

declare enum Events {
  Click = "click",
  MenuOpen = "menuOpen",
  MenuClose = "menuClose"
}
declare class FloatingMenu extends NativeComponent implements IEventEmitter<Events> {
  on(eventName: Events, callback: (...args: any) => void): () => void;
  off(eventName: Events, callback?: (...args: any) => void): void;
  emit(event: Events, detail?: any[]): void;
  constructor(params?: any);
  yogaNode: any;
  nativeObject: any;
  items: FloatingMenuItem[];
  icon: Image;
  rotateEnabled: boolean;
  color: Color;
  visible: boolean;
  onClick: () => void;
  onMenuOpen: () => void;
  onMenuClose: () => void;
  open(): void;
  close(): void;
  static Item: FloatingMenuItem;
  static Events: typeof Events;
}

export = FloatingMenu;
