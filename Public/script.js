async function getData() {
  res = await fetch('./data.json').then((data) => data.json());
  return res;
}

//Display data returned from getCountryData as a table.
let displayData = (data, country) => {
  if (country === 'United States of America') {
    USTotal(country, data);
  }

  let rowElement = document.createElement('tr');

  let countryElement = document.createElement('td');
  let popElement = document.createElement('td');
  let areaElement = document.createElement('td');
  let ConfirmedCasesElement = document.createElement('td');
  let confirmedDeathsElement = document.createElement('td');
  let DeathPercentElement = document.createElement('td');
  let confirmedRecoveredElement = document.createElement('td');
  let activeCasesElement = document.createElement('td');
  let RecoveredPercentElement = document.createElement('td');
  let casesPerThousandElement = document.createElement('td');

  countryElement.innerText = country;
  popElement.innerText = formatNumber(data['Population']);
  areaElement.innerText = formatNumber(data['Area']);
  ConfirmedCasesElement.innerText = formatNumber(data['Cases']);
  confirmedDeathsElement.innerText = formatNumber(data['Deaths']);
  DeathPercentElement.innerText = data['PercentConfirmedDeath'] + '%';
  confirmedRecoveredElement.innerText = formatNumber(data['Recovered']);
  RecoveredPercentElement.innerText = data['percentOfConfirmedRecovered'] + '%';
  activeCasesElement.innerHTML = formatNumber(data['activeCases']);
  casesPerThousandElement.innerText = formatNumber(data['casesPerThousand']);

  rowElement.appendChild(countryElement);
  rowElement.appendChild(popElement);
  rowElement.appendChild(areaElement);
  rowElement.appendChild(ConfirmedCasesElement);
  rowElement.appendChild(confirmedDeathsElement);
  rowElement.appendChild(DeathPercentElement);
  rowElement.appendChild(confirmedRecoveredElement);
  rowElement.appendChild(RecoveredPercentElement);
  rowElement.appendChild(activeCasesElement);
  rowElement.appendChild(casesPerThousandElement);
  rowElement.setAttribute('id', country);

  document.getElementById('table').appendChild(rowElement);
};

//takes returned data from displayDate and outputs it to a span in the H1.
let displayDate = (data) => {
  let LastUpdatedElement = document.getElementById('Date');
  LastUpdatedElement.innerText = data['date'] + ' @ ' + data['time'] + 'UTC';
};

function formatNumber(num) {
  try {
    return typeof num !== 'undefined'
      ? num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
      : 0;
  } catch (err) {
    //console.error(err);
  }
}

getData().then((data) => {
  displayDate(data['Date']);
  for (key in data) {
    if (key !== 'Date') {
      displayData(data[key], key);
    }
  }
});

/* window.onload = () => {
  load = setInterval(() => {
    console.log(Test);
  }, 10000);
  window.clearTimeout(load);
}; */

function USTotal(country, data) {
  console.log(`${country}:
Percent of Population had it: ${(
    (data['Cases'] / data['Population']) *
    100
  ).toFixed(2)}%
Percent of Population Deaths: ${(
    (data['Deaths'] / data['Population']) *
    100
  ).toFixed(2)}%
Percent of Population Recovered: ${(
    (data['Recovered'] / data['Population']) *
    100
  ).toFixed(2)}%`);
}
