const fs = require('fs');


const tallyItUpSon = (arr1, arr2) => {
  arr2[0] = arr1[0];
  for(let i = 1; i < arr1.length; i++) {
    arr2[i] = arr1[i] + arr2[i-1];
  }
  console.log(arr1 + " " + arr2);
  arr2 = [];
}

const drivers = JSON.parse(fs.readFileSync('../data/DEMO_F1DriversStandings.json', 'utf-8'));

drivers.map(driver => {
  const pts = driver.points;
  const totalpts = driver.pointsCumulative;
  tallyItUpSon(pts, totalpts);
})

fs.writeFile('../data/DEMO_F1DriversStandings.json', JSON.stringify(drivers, null, 2), 'utf8', () => {});


console.log(drivers);