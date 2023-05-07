import * as React from 'react';
import { AXFCMenu } from './@types';
import ContextMenu from './ContextMenu';

interface IState {
  active: boolean;
  openedMenuIndex: number;
}

class MenuBar extends React.Component<AXFCMenu.IMenuBarProps, IState> {
  childMenu: AXFCMenu.IContextMenu[];
  containerRef: React.RefObject<HTMLDivElement>;
  keydownInfo?: string;

  constructor(props: AXFCMenu.IMenuBarProps) {
    super(props);

    this.childMenu = [];
    this.containerRef = React.createRef();
    this.state = {
      active: false,
      openedMenuIndex: -1,
    };
  }

  onMousedownBody = (ev: MouseEvent) => {
    const el = ev.target;
    if (this.containerRef.current) {
      if (el && el instanceof Node && !this.containerRef.current.contains(el)) {
        this.setState({ active: false, openedMenuIndex: -1 });
        document.body.removeEventListener('mousedown', this.onMousedownBody);
        window.removeEventListener('keydown', this.onKeyDownWindow);
      }
    }
  };

  onKeyDownWindow = (ev: KeyboardEvent) => {
    const { altKey, shiftKey, ctrlKey, metaKey, which } = ev;
    this.keydownInfo = [shiftKey, ctrlKey, metaKey, which].join('-');
  };

  onKeyUpWindow = (ev: KeyboardEvent) => {};

  handleMenuBarActive = () => {
    this.setState({
      active: true,
    });

    document.body.addEventListener('mousedown', this.onMousedownBody);
  };

  handleMenuClick = (e: React.MouseEvent, menuIndex: number) => {
    this.handleSubmenuPopup(e, menuIndex);
  };

  handleMenuOver = (e: React.MouseEvent, menuIndex: number) => {
    const { active } = this.state;
    if (!active) {
      return;
    }
    this.handleSubmenuPopup(e, menuIndex);
  };

  handleSubmenuPopup = (e: React.MouseEvent, menuIndex: number) => {
    const { items = [] } = this.props;
    const item = items[menuIndex];
    const submenu = this.childMenu[menuIndex];

    if (!submenu || !item) {
      return;
    }
    if (!e.currentTarget) {
      return;
    }
    if (!this.containerRef.current) {
      return;
    }

    const { openedMenuIndex = -1 } = this.state;
    const { pageXOffset, pageYOffset } = window;
    const { left, top, height } = e.currentTarget.getBoundingClientRect();

    if (openedMenuIndex !== menuIndex) {
      this.childMenu[openedMenuIndex] && this.childMenu[openedMenuIndex].close();
    }
    // submenu.setMenu(item.submenu || []);

    if ((submenu.menuItems ?? []).length > 0) {
      submenu.popup({ x: left + pageXOffset, y: top + height + pageYOffset });
    }

    this.setState({
      openedMenuIndex: menuIndex,
    });
  };

  initSubmenu = () => {
    const { items = [], submenu: { style: _submenuStyle = {}, placement = 'bottom' } = {} } = this.props;

    const submenuStyle = {
      ..._submenuStyle,
    };

    if (placement === 'bottom') {
      submenuStyle.borderTopLeftRadius = 0;
      submenuStyle.borderTopRightRadius = 0;
      submenuStyle.marginTop = 0;
    }

    this.childMenu = [];
    items.forEach((menu, i) => {
      const submenu = new ContextMenu({
        id: `menu-${i}`,
        style: submenuStyle,
        placement,
      });
      submenu.setMenu(menu.submenu || []);
      this.childMenu.push(submenu);
    });
  };

  componentDidMount() {
    this.initSubmenu();

    window.addEventListener('keydown', this.onKeyDownWindow, false);
    window.addEventListener('keyup', this.onKeyUpWindow, false);
  }

  componentDidUpdate(prevProps: AXFCMenu.IMenuBarProps) {
    if (prevProps.items !== this.props.items) {
      this.initSubmenu();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDownWindow);
    window.removeEventListener('keyup', this.onKeyUpWindow);
  }

  render() {
    const { active, openedMenuIndex } = this.state;
    const { items = [], style } = this.props;
    const menuBarStyle = {
      ...style,
    };
    return (
      <div ref={this.containerRef} className={`rf-menubar${active ? ' rf-menubar-active' : ''}`} style={menuBarStyle}>
        {items.map((menu, mi) => {
          return (
            <div
              className={`${openedMenuIndex === mi ? 'active' : ''}`}
              key={mi}
              data-menubar-item
              onMouseDown={() => {
                this.handleMenuBarActive();
              }}
              onClick={e => {
                this.handleMenuClick(e, mi);

                if (menu.click) {
                  menu.click(menu, window, e);
                  this.setState({ active: false, openedMenuIndex: -1 });
                }
              }}
              onMouseOver={e => {
                this.handleMenuOver(e, mi);
              }}
            >
              {menu.label}
            </div>
          );
        })}
      </div>
    );
  }
}

export default MenuBar;
