import * as React from 'react';
import { useQuery } from 'urql';
import { DataGrid } from '@material-ui/data-grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const driversQuery = `
  query {
    f1drivers {
      driver
      f1constructor
      totalPoints
    }
  }
`;

const teamsQuery = `
  query($f1teams: [String!]) {
    f1driverfilter(f1constructor: $f1teams) {
      driver
      f1constructor
      totalPoints
    }
  }
`;

const columns = [
  { 
    field: 'driver', 
    headerName: 'Driver', 
    width: 300 
  },
  { 
    field: 'f1constructor', 
    headerName: 'Team', 
    width: 250 
  },
  {
    field: 'totalPoints',
    headerName: 'Points',
    type: 'number',
    width: 100
  }
];

const parseTeam = (teamKey) => {
  let tempTeam = "";
    switch(teamKey) {
      case 'ar':
        tempTeam = "Alfa Romeo";
        break;
      case 'at':
        tempTeam = "AlphaTauri";
        break;
      case 'ferrari':
        tempTeam = "Ferrari";
        break;
      case 'haas':
        tempTeam = "Haas F1";
        break;
      case 'mclaren':
        tempTeam = "McLaren";
        break;
      case 'mercedes':
        tempTeam = "Mercedes";
        break;
      case 'rb':
        tempTeam = "Red Bull";
        break;
      case 'renault':
        tempTeam = "Renault";
        break;
      case 'rp':
        tempTeam = "Racing Point";
        break;
      case 'williams':
        tempTeam = "Williams";
        break;
    };
    return tempTeam;
}

const DriverTable = (props) => {
  let rows = [];
  let f1teams = [];
  let allDrivers = {
    query: driversQuery,
    variables: { f1teams }
  };
  let someDrivers = {
    query: teamsQuery,
    variables: { f1teams }
  };
  let queryToUse = {};

  console.log(f1teams);  

  Object.entries(props.teamFilter).map(item => {
    let tempTeam = parseTeam(item[0]);
    if (item[1] == true) {
      f1teams.push(tempTeam);
    }
  });

  if (f1teams.length > 0) {
    queryToUse = someDrivers;
  } else {
    queryToUse = allDrivers;
  }

  const [result, reexecuteQuery] = useQuery(queryToUse);

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

  if (queryToUse.query == driversQuery) {
    console.table(data.f1drivers);

    if (data.f1drivers != null) {
      data.f1drivers.map((driver,index) => {
        let placeHolder = {
          id: index,
          driver: driver.driver,
          f1constructor: driver.f1constructor,
          totalPoints: driver.totalPoints
        }
        rows.push(placeHolder);
      });
    }
  } else {
    console.table(data.f1driverfilter);

    if (data.f1driverfilter != null) {
      data.f1driverfilter.map((driver,index) => {
        let placeHolder = {
          id: index,
          driver: driver.driver,
          f1constructor: driver.f1constructor,
          totalPoints: driver.totalPoints
        }
        rows.push(placeHolder);
      });
    }
  }

  //if (f1teams.length > 0) {}
  // data.f1drivers.map((driver,index) => {
  //   let placeHolder = {
  //     id: index,
  //     driver: driver.driver,
  //     f1constructor: driver.f1constructor,
  //     totalPoints: driver.totalPoints
  //   }
  //   rows.push(placeHolder);
  // });

  return (
    <div style={{ height: 700, width: 700 }}>
      <DataGrid rows={rows} columns={columns} pageSize={rows.length} />
    </div>
  );
};

export default DriverTable;