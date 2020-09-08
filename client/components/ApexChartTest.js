import React, { useState } from "react";
import { useQuery } from "urql";
import dynamic from 'next/dynamic'
import Button from '@material-ui/core/Button';
const Chart = dynamic(() => import('react-apexcharts'), {ssr:false})
import styles from '../styles/ApexChartTest.module.css';

const driversQuery = `
  query {
    f1drivers {
      driver
      f1constructor
      points
    }
  }
`;

const ApexChartTest = (props) => {
  const [options, setOptions] = useState({
    chart: {
      width: "100%",
      id: "basic-bar"
    },
    stroke: { curve: "smooth"},
    xaxis: {
      categories: [
        "Round 1",
        "Round 2",
        "Round 3",
        "Round 4",
        "Round 5",
        "Round 6",
        "Round 7",
        "Round 8"
      ]
    }
  });

  const [series, setSeries] = useState([]);
  const [count, setCount] = useState(0);

  const [result, reexecuteQuery] = useQuery({
    query: driversQuery
  });

  const {data, fetching, error} = result;

  if (fetching) {return <p>Loading...</p>;}
  if (error) {return <p>Errored!</p>;}

  const addDriverHandler = () => {
    if (count != 20) {
      setSeries([...series,{
        name: data.f1drivers[count].driver,
        data: data.f1drivers[count].points
      }]);
      setCount(count + 1);
    }
    console.log("clicked Add");
  }

  const removeDriverHandler = () => {
    if (count != 0) {
      const newSeries = [...series];
      newSeries.pop();
      setSeries(newSeries);
      setCount(count - 1);
    }
    console.log("clicked Remove");
  }

  return (
    <div className={styles.chart}>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
      />
      
      <Button size="small" variant="contained" color="primary" name="AddDriver" onClick={addDriverHandler}>Add a Driver</Button>
      <Button size="small" variant="contained" color="secondary" name="RemoveDriver" onClick={removeDriverHandler}>Remove a Driver</Button>
    </div>
  );
}

export default ApexChartTest;
