import type { NextPage } from 'next';
import Head from 'next/head';
import { Container } from '../styles/Layouts';
import dynamic from 'next/dynamic';

const DynamicHelloWorld = dynamic(() => import('../examples/HelloWorld'), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>component</title>
        <meta name='description' content='Index' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <h1>Hello World</h1>
        <DynamicHelloWorld />
      </Container>
    </div>
  );
};

export default Home;
