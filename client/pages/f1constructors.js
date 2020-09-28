import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Global/Header';
import Navbar from '../components/Global/Navbar';
import ConstructorCard from '../components/F1Constructors/ConstructorCard';
import ConstructorTable from '../components/F1Constructors/ConstructorTable';

const F1Constructors = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>F1 2020 Dashboard - constructors</title>
      </Head>

      <Navbar 
        myComponents={[
          <Header />,
          <ConstructorTable />,
          <ConstructorCard /> 
        ]} />
    </div>
  );
};

export default F1Constructors;