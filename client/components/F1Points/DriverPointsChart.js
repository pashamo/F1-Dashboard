import React, { useState , useEffect} from "react";
import { useQuery } from "urql";
import dynamic from 'next/dynamic'
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
const Chart = dynamic(() => import('react-apexcharts'), {ssr:false})
import styles from '../../styles/DriverPointsChart.module.css';


const driversQuery = `
  query {
    f1drivers {
      driver
      pointsCumulative
    }
  }
`;

const DriverPointsChart = (props) => {
  const [options, setOptions] = useState({
    chart: {
      width: "100%",
      id: "basic-bar"
    },
    //stroke: { curve: "smooth"},
    xaxis: {
      categories: [
        "Round 1",
        "Round 2",
        "Round 3",
        "Round 4",
        "Round 5",
        "Round 6",
        "Round 7",
        "Round 8",
        "Round 9",
        "Round 10",
        "Round 11",
        "Round 12",
        "Round 13",
        "Round 14",
        "Round 15",
        "Round 16",
        "Round 17"
      ]
    }
  });

  const [series, setSeries] = useState([]);
  const [count, setCount] = useState(0);

  const [result, reexecuteQuery] = useQuery({
    query: driversQuery
  });

  const {data, fetching, error} = result;
  if (fetching) {
    return(
      <div>
        <CircularProgress color="secondary" />
      </div>
    ); 
    //<p>Loading...</p>;
  }
  if (error) {return <p>Errored!</p>;}
  console.table(data.f1drivers);
  console.table(series);
  console.log(`count: ${count}`);

 
  const addDriverHandler = () => {
    if (count != 20) {
      let tempDrivers = [];
      data.f1drivers.map(f1driver => {
        tempDrivers = [...tempDrivers, {
          name: f1driver.driver,
          data: f1driver.pointsCumulative
        }];
        setSeries(tempDrivers);
      });
      setCount(data.f1drivers.length);
      console.log(series);

      // setSeries([...series,{
      //   name: data.f1drivers[count].driver,
      //   data: data.f1drivers[count].pointsCumulative
      // }]);
      // setCount(count + 1);
    }
    console.log("clicked Add");
  }

  const removeDriverHandler = () => {
    if (count != 0) {
      setSeries([]);
      setCount(0);
      // const newSeries = [...series];
      // newSeries.pop();
      // setSeries(newSeries);
      // setCount(count - 1);
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
      
      <span className={styles.left}>
        <Button size="small" variant="contained" color="primary" name="AddDriver" onClick={addDriverHandler}>Add Drivers</Button>
      </span>

      <span className={styles.right}>
        <Button size="small" variant="contained" color="secondary" name="RemoveDriver" onClick={removeDriverHandler}>Remove Drivers</Button>
      </span>
    </div>
  );
}

export default DriverPointsChart;
