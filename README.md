[![npm version](https://badge.fury.io/js/react-frame-contextmenu.svg)](https://badge.fury.io/js/react-frame-contextmenu)
[![](https://img.shields.io/npm/dm/react-frame-contextmenu.svg)](https://www.npmjs.com/package/react-frame-contextmenu)

react-frame-menu makes menus dynamically added to the "React" project available.

## Install

```bash
npm i react-frame-contextmenu
```

DEMO : https://react-frame-contextmenu.vercel.app/

## Development

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## USE

### Add styles to your project

Add a CSS file to suit your project.
You can also create your own files by referring to the files provided.

```typescript jsx
import 'react-frame-contextmenu/dist/style.less';
// or
import 'react-frame-contextmenu/dist/style.css';
// or 
import 'react-frame-contextmenu/dist/style.scss';
```

### Contextmenu Example

Open [https://codesandbox.io/s/react-frame-contextmenu-6ldsx1](codesandbox)

```typescript jsx
import React from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FacebookOutlined,
  GithubOutlined,
  GooglePlusOutlined,
  MailOutlined,
  ReloadOutlined,
  SlackOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { ContextMenu, IRFCMenu } from '../react-frame-contextmenu';
import styled from '@emotion/styled';

const ContextMenuSample: React.FC = () => {
  const contextMenu = React.useRef<ContextMenu>(
    new ContextMenu({
      id: 'basic',
      style: { fontSize: '14px', minWidth: '200px' },
    }), // also you can set menu by second parameter
  );

  const onClickMenu: IRFCMenu.OnClickItem = React.useCallback(menuItem => {
    console.log(menuItem);
  }, []);

  const handleContextMenu = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    contextMenu.current.popup({
      x: e.pageX,
      y: e.pageY,
    });
  }, []);

  React.useEffect(() => {
    contextMenu.current.setMenu([
      {
        label: 'Back (enabled: false)',
        icon: <ArrowLeftOutlined />,
        click: onClickMenu,
        enabled: false,
      },
      {
        label: 'Forward',
        icon: <ArrowRightOutlined />,
        click: onClickMenu,
        accelerator: 'Cmd+F',
      },
      {
        label: 'Reload',
        icon: <ReloadOutlined />,
        click: onClickMenu,
      },
      { type: 'separator' },
      { label: 'Save as', click: onClickMenu, visible: false },
      {
        label: 'Print (enabled: false)',
        click: onClickMenu,
        enabled: false,
      },
      {
        type: 'checkbox',
        label: 'Action option 1',
        click: (menuItem, w, e) => {
          console.log(menuItem);
        },
      },
      {
        type: 'checkbox',
        label: 'Action option 2 (enabled: false)',
        checked: true,
        enabled: false,
        click: (menuItem, w, e) => {
          console.log(menuItem);
        },
      },
      {
        label: 'send to...',
        submenu: [
          {
            label: 'Github',
            icon: <GithubOutlined />,
            click: onClickMenu,
          },
          {
            label: 'Gitlab',
            icon: <GithubOutlined />,
            click: onClickMenu,
          },
          {
            label: 'Twitter',
            icon: <TwitterOutlined />,
            click: onClickMenu,
          },
          {
            label: 'Facebook',
            icon: <FacebookOutlined />,
            click: onClickMenu,
          },
          {
            label: 'Google+',
            icon: <GooglePlusOutlined />,
            click: onClickMenu,
            visible: false,
          },
          {
            label: 'Slack (enabled: false)',
            icon: <SlackOutlined />,
            click: onClickMenu,
            enabled: false,
          },
          {
            label: 'Email',
            icon: <MailOutlined />,
            click: onClickMenu,
          },
        ],
      },
      { type: 'separator' },
      { label: 'View Source', click: onClickMenu },
      { label: 'Save', click: onClickMenu },
    ]);
  }, [onClickMenu]);

  return (
    <Container data-testid={'context-menu-sample-div'} onContextMenu={handleContextMenu}>
      Right mouse click here
    </Container>
  );
};

const Container = styled.div`
  height: 500px;
  background: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default ContextMenuSample;
```

### MenuBar Example

```typescript jsx
import React from 'react';
import styled from '@emotion/styled';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  FacebookOutlined,
  GithubOutlined,
  GooglePlusOutlined,
  MailOutlined,
  ReloadOutlined,
  SlackOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { MenuBar, IRFCMenu } from '../react-frame-contextmenu';

const MenuBarExample: React.FC = () => {
  const onClickMenu: IRFCMenu.OnClickItem = React.useCallback(menuItem => {
    console.log(menuItem);
  }, []);

  return (
    <Container>
      <div className='menubar-container'>
        <MenuBar
          style={{ height: '25px' }}
          submenu={{
            style: { minWidth: '150px' },
            placement: 'bottom',
          }}
          items={[
            {
              label: 'File',
              submenu: [
                {
                  label: 'Back (enabled: false)',
                  icon: <ArrowLeftOutlined />,
                  click: onClickMenu,
                  enabled: false,
                },
                {
                  label: 'Forward',
                  icon: <ArrowRightOutlined />,
                  click: onClickMenu,
                  accelerator: 'Cmd+F',
                },
                {
                  label: 'Reload',
                  icon: <ReloadOutlined />,
                  click: onClickMenu,
                },
                { type: 'separator' },
                { label: 'Save as', click: onClickMenu, visible: false },
                {
                  label: 'Print (enabled: false)',
                  click: onClickMenu,
                  enabled: false,
                },
                {
                  type: 'checkbox',
                  label: 'Action option 1',
                  click: (menuItem, w, e) => {
                    console.log(menuItem);
                  },
                },
                {
                  type: 'checkbox',
                  label: 'Action option 2 (enabled: false)',
                  checked: true,
                  enabled: false,
                  click: (menuItem, w, e) => {
                    console.log(menuItem);
                  },
                },
                {
                  label: 'send to...',
                  submenu: [
                    {
                      label: 'Github',
                      icon: <GithubOutlined />,
                      click: onClickMenu,
                    },
                    {
                      label: 'Gitlab',
                      icon: <GithubOutlined />,
                      click: onClickMenu,
                    },
                    {
                      label: 'Twitter',
                      icon: <TwitterOutlined />,
                      click: onClickMenu,
                    },
                    {
                      label: 'Facebook',
                      icon: <FacebookOutlined />,
                      click: onClickMenu,
                    },
                    {
                      label: 'Google+',
                      icon: <GooglePlusOutlined />,
                      click: onClickMenu,
                      visible: false,
                    },
                    {
                      label: 'Slack (enabled: false)',
                      icon: <SlackOutlined />,
                      click: onClickMenu,
                      enabled: false,
                    },
                    {
                      label: 'Email',
                      icon: <MailOutlined />,
                      click: onClickMenu,
                    },
                  ],
                },
                { type: 'separator' },
                { label: 'View Source', click: onClickMenu },
                { label: 'Save', click: onClickMenu },
              ],
            },
            {
              label: 'Edit',
              submenu: [
                {
                  label: 'Undo',
                  accelerator: 'Cmd+Z',
                  click: onClickMenu,
                },
                {
                  label: 'Redo',
                  accelerator: 'Cmd++Shift+Z',
                  click: onClickMenu,
                },
              ],
            },
            {
              label: 'Selection',
              submenu: [
                {
                  label: 'Select All',
                  click: onClickMenu,
                },
              ],
            },
          ]}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  height: 500px;
  background: #467bff;
  padding: 10px;
  overflow: auto;

  .menubar-container {
    padding: 0 10px;
    height: 25px;
    background: #eee;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);

    font-size: 12px;
  }
`;

export default MenuBarExample;
```

