import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Header from '../components/Global/Header';
import Navbar from '../components/Global/Navbar';
import DriverCard from '../components/F1Drivers/DriverCard';
import DriverTable from '../components/F1Drivers/DriverTable';
import FilterDriverTable from '../components/F1Drivers/FilterDriverTable';
import { client , Provider } from '../components/Global/urqlClient';

const F1Drivers = () => {
  const [teamFilterState, setTeamFilterState] = React.useState({
    ar: false, 
    at: false, 
    ferrari: false, 
    haas: false, 
    mclaren: false, 
    mercedes: false, 
    rp: false, 
    rb: false, 
    renault: false, 
    williams: false  
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>F1 2020 Dashboard - drivers</title>
      </Head>

      <Provider value={client}>
        <Navbar 
          myComponents={[
          ]} />
        <FilterDriverTable teamFilter={teamFilterState} setTeamFilter={setTeamFilterState}/>
        <DriverTable teamFilter={teamFilterState}/>
      </Provider>
      

    </div>
  );
};

export default F1Drivers;