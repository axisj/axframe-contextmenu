import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../styles/Layouts';
import dynamic from 'next/dynamic';
import styled from '@emotion/styled';

const DynamicContextMenuSample = dynamic(() => import('../examples/ContextMenuSample'), {
  ssr: false,
});
const DynamicMenuBarSample = dynamic(() => import('../examples/MenuBarExample'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <PageContainer>
      <Head>
        <title>@axframe/contextmenu</title>
        <meta name='description' content='Index' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <h1>ContextMenu Sample</h1>
        <DynamicContextMenuSample />

        <h1>MenuBar Sample</h1>
        <DynamicMenuBarSample />
      </Container>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  padding: 0 20px;
`;

export default Home;
