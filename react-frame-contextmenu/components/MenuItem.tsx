import * as React from 'react';
import CheckboxIcon from './CheckboxIcon';
import SubmenuIcon from './SubmenuIcon';
import Submenu from './Submenu';
import { IRFCMenu } from '../common/@types';

const platform = typeof window !== 'undefined' ? window.navigator.platform : process.platform;
const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K', 'darwin'];
const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE', 'win32'];

const is = {
  macos: macosPlatforms.indexOf(platform) !== -1,
  linux: macosPlatforms.indexOf(platform) === -1 && windowsPlatforms.indexOf(platform) === -1,
  windows: windowsPlatforms.indexOf(platform) !== -1,
};

export function KeymapDisplay(key?: string) {
  if (!key) {
    return '';
  }

  const chars: Record<string, string> = {
    Command: '⌘',
    Cmd: '⌘',
    Control: 'Ctrl',
    Ctrl: 'Ctrl',
    CommandOrControl: is.macos ? '⌘' : 'Ctrl',
    CmdOrCtrl: is.macos ? '⌘' : 'Ctrl',
    Alt: is.macos ? '⌥' : 'Alt',
    Option: '⌥',
    Shift: is.macos ? '⇧' : 'Shift',
    Return: is.macos ? '↵' : 'Enter',
  };

  return key
    .split(/\+/g)
    .map(s => {
      if (typeof chars[s] === 'undefined') {
        return s;
      } else {
        return chars[s];
      }
    })
    .join(' + ');
}

class MenuItem extends React.Component<IRFCMenu.IMenuItemProps> {
  itemRef: React.RefObject<HTMLDivElement>;

  constructor(props: IRFCMenu.IMenuItemProps) {
    super(props);
    this.itemRef = React.createRef();
  }

  render() {
    const { item, onClickItem, onHoverItem } = this.props;
    const { type = 'normal', label, icon, checked, submenu, click, enabled = true, visible = true } = item;
    const itemProps: Record<any, any> = {};

    if (!visible) {
      return null;
    }

    switch (type) {
      case 'normal':
      case 'checkbox':
        itemProps['data-ctx-item'] = true;
        itemProps['data-enabled'] = enabled;

        if (item.opened) {
          itemProps['data-opened'] = true;
        }

        return (
          <div
            ref={this.itemRef}
            {...itemProps}
            onClick={e => {
              // has click and dont have submenu
              if (!item.submenu && enabled) {
                onClickItem(item, window, e);
                if (click) {
                  click(item, window, e);
                }
              }
            }}
            onMouseOver={e => {
              onHoverItem(item, e, true);
            }}
          >
            <div data-checkbox>{item.checked && <CheckboxIcon />}</div>

            <div data-label>
              {icon && <span data-label-icon>{icon}</span>}
              {item.label}
            </div>

            {item.submenu ? (
              <>
                <SubmenuIcon />
                {item.opened && <Submenu submenu={item.submenu} onClickItem={onClickItem} itemRef={this.itemRef} />}
              </>
            ) : (
              <div data-accelerator>{KeymapDisplay(item.accelerator)}</div>
            )}
          </div>
        );
      case 'separator':
        itemProps['data-ctx-separator'] = true;
        return <div {...itemProps} />;

      default:
        return null;
    }
  }
}

export default MenuItem;
