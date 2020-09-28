import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Global/Header';
import Navbar from '../components/Global/Navbar';
import AboutThis from '../components/About/AboutThis';

const About = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>F1 2020 Dashboard - about</title>
      </Head>

      <Navbar 
        myComponents={[
          <Header />,
          <AboutThis />, 
        ]} />
      
    </div>
  );
};

export default About;