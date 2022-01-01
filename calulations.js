function casesPerThousand(Pop, Confirmed) {
  return Number(((Confirmed / Pop) * 1000).toFixed(2));
}

function percentOfConfirmedDeath(Deaths, Confirmed) {
  return Number(((Deaths / Confirmed) * 100).toFixed(2));
}

function percentOfConfirmedRecovered(Recovered, Confirmed) {
  return Number(((Recovered / Confirmed) * 100).toFixed(2));
}

function convertDate(date) {
  var LastUpdated = date;
  var array = LastUpdated.split('T', 2);
  date = array[0];
  time = array[1].replace('Z', '');
  return { date: date, time: time };
}

function europeTotal(data) {
  let total = {};
  let pop = [];
  let area = [];
  let deaths = [];
  let cases = [];
  let recovered = [];

  for (const key in data) {
    if (key !== 'United States of America' && key !== 'Date') {
      pop.push(data[key]['Population']);
      area.push(data[key]['Area']);
      deaths.push(data[key]['Deaths']);
      cases.push(data[key]['Cases']);
      recovered.push(data[key]['Reocovered']);
    }
  }
  total['Population'] = pop.reduce((a, b) => a + b);
  total['Area'] = area.reduce((a, b) => a + b);
  total['Deaths'] = deaths.reduce((a, b) => a + b);
  total['Cases'] = cases.reduce((a, b) => a + b);
  let recoveredTemp = recovered.reduce((a, b) => a + b);
  total['Recovered'] = typeof recoveredTemp === Number ? recoveredTemp : 0;

  total['PercentConfirmedDeath'] = percentOfConfirmedDeath(
    total['Deaths'],
    total['Cases']
  );
  total['percentOfConfirmedRecovered'] = percentOfConfirmedRecovered(
    total['Recovered'],
    total['Cases']
  );
  total['casesPerThousand'] = casesPerThousand(
    total['Population'],
    total['Cases']
  );

  return total;
}

module.exports = {
  casesPerThousand,
  percentOfConfirmedDeath,
  percentOfConfirmedRecovered,
  convertDate,
  europeTotal,
};
