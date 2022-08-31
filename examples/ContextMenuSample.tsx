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
