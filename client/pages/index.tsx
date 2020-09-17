import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { createClient , Provider } from 'urql';
import dynamic from 'next/dynamic';

import ApexChartTest from '../components/ApexChartTest';
const CommentSection = dynamic(() => import('../components/CommentSection'), {ssr:false});

const client = createClient({
  //url: "https://eapug4mq63.execute-api.us-east-2.amazonaws.com/dev/graphql"
  url: "http://localhost:4000/graphql"
});

export default function Home() {
  return (
    <div className={styles.body}>
      <h1 className={styles.header}>F1-Dashboard</h1>
      <Provider value={client}>
        <ApexChartTest />
        <CommentSection />
      </Provider>
    </div>
  );
}
