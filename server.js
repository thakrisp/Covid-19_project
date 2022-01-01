/* if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
} */

const express = require('express');
const axios = require('axios');
const fs = require('fs');
const app = express();

const {
  percentOfConfirmedDeath,
  percentOfConfirmedRecovered,
  casesPerThousand,
  convertDate,
  europeTotal,
} = require('./calulations');

app.use(express.json());
app.use(express.static('public'));

//https://documenter.getpostman.com/view/10808728/SzS8rjbc?version=latest#00030720-fae3-4c72-8aea-ad01ba17adf8
const url = `https://api.covid19api.com/summary`;

/* async function getData() {
  let response = await axios.get(url);
  return response.data;
}*/

let proccessedData = {
  'United States of America': {
    Population: 327000000,
    Area: 3800000,
  },
  Italy: {
    Population: 60500000,
    Area: 116347,
  },
  Spain: {
    Population: 46600000,
    Area: 195364,
  },
  Germany: {
    Population: 82800000,
    Area: 67051,
  },
  France: {
    Population: 67000000,
    Area: 248573,
  },
  'United Kingdom': {
    Population: 66400000,
    Area: 791900,
  },
};

let rawData = () => {
  let rawData = fs.readFileSync('./Public/example.json', 'utf8');
  let parsedData = JSON.parse(rawData);
  proccessedData['Date'] = convertDate(parsedData['Date']);
  return parsedData['Countries'];
};

function addData(rawData) {
  for (let country in proccessedData) {
    rawData.forEach((_, i) => {
      if (rawData[i]['Country'] === country) {
        proccessedData[country]['Deaths'] = rawData[i]['TotalDeaths'];
        proccessedData[country]['Cases'] = rawData[i]['TotalConfirmed'];
        proccessedData[country]['Recovered'] = rawData[i]['TotalRecovered'];

        proccessedData[country]['PercentConfirmedDeath'] =
          percentOfConfirmedDeath(
            proccessedData[country]['Deaths'],
            proccessedData[country]['Cases']
          );
        proccessedData[country]['percentOfConfirmedRecovered'] =
          percentOfConfirmedRecovered(
            proccessedData[country]['Recovered'],
            proccessedData[country]['Cases']
          );
        proccessedData[country]['casesPerThousand'] = casesPerThousand(
          proccessedData[country]['Population'],
          proccessedData[country]['Cases']
        );
      }
    });
  }
  proccessedData['Total'] = europeTotal(proccessedData);
  //writeToFile();
}

function writeToFile() {
  fs.writeFile('./Public/data.json', JSON.stringify(proccessedData), (err) => {
    if (err) console.log(err);
  });
}

addData(rawData());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
