import ContextMenu from '../ContextMenu';
import * as React from 'react';

export namespace IRFCMenu {
  export type OnHoverItem<P = string> = (
    menuItem: IMenuItem<P>,
    event: React.MouseEvent<HTMLDivElement>,
    hover: boolean,
  ) => void;

  export type OnClickItem<T = any> = (
    menuItem: IMenuItem<T>,
    browserWindow: Window,
    event: React.MouseEvent<HTMLDivElement>,
  ) => void;

  export interface IMenuItem<T = any> {
    action?: T;
    id?: string;
    label?: string;
    subLabel?: string;
    type?: 'normal' | 'separator' | 'checkbox';
    icon?: string | React.ReactNode;
    checked?: boolean;
    submenu?: IMenuItem<T>[];
    click?: OnClickItem<T>;
    opened?: boolean;
    enabled?: boolean;
    visible?: boolean;
    accelerator?: string;
  }

  export interface IMenuItemProps {
    item: IMenuItem;
    onClickItem: OnClickItem;
    onHoverItem: OnHoverItem;
  }

  export interface IContextMenuOptions {
    id?: string;
    style?: React.CSSProperties;
    placement?: 'top' | 'bottom';
  }

  export interface IPopupOption {
    x?: number;
    y?: number;
    callback?: () => void;
  }

  export interface IPopupMenuProps {
    visible: boolean;
    menuItems: IMenuItem[];
    onClickItem: OnClickItem;
    parentOffset: {
      left: number;
      top: number;
      width?: number;
      height?: number;
      id?: string;
    };
    userStyle?: React.CSSProperties;
  }

  export interface IPopupMenuState {
    visible: boolean;
    positioned: boolean;
    newLeft: number;
    newTop: number;
    menuItems: IMenuItem[];
  }

  export interface IContextMenu {
    popup: (popupOption?: IPopupOption) => void;
    setMenu: (menuItems: IMenuItem[]) => ContextMenu;
    close: () => void;
  }

  export interface IMenuBarSubmenu {
    style?: React.CSSProperties;
    placement?: 'top' | 'bottom';
  }

  export interface IMenuBarProps {
    items?: IMenuItem[];
    style?: React.CSSProperties;
    submenu?: IMenuBarSubmenu;
  }
}
