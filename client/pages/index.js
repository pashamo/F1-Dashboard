import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Global/Header';
import LoginForm from '../components/Login/LoginForm';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>F1 Dashboard</title>
      </Head>

      <Header />
      <LoginForm />
    </div>
  );
};

export default Home;