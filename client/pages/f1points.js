import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Global/Header';
import Navbar from '../components/Global/Navbar';
import DriverPointsChart from '../components/F1Points/DriverPointsChart';
import CommentSection from '../components/F1Points/CommentSection';


import { client , Provider } from '../components/Global/urqlClient';


const F1Drivers = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>F1 2020 Dashboard - points</title>
      </Head>

      <Provider value={client}>
        <Navbar 
          myComponents={[
          ]} />
        <DriverPointsChart />
        <CommentSection />
      </Provider>
      
    </div>
  );
};

export default F1Drivers;