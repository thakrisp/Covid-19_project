fetch("/countries", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    getCountryData(data);
  })
  .catch((err) => {
    console.log(err);
  });

//adds comas to case numbers
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

//taking data from COVID-19 API and return collected data from different countries.
function getCountryData(data) {
  var data = data;
  LastUpdated = ConvertDate(data.Date);
  displayDate(LastUpdated);
  console.log(data);

  proccessedData = {};

  var areaAndPop = {
    usPop: 327000000,
    usArea: 3800000,
    italyPop: 60500000,
    italyArea: 116347,
    spainPop: 46600000,
    spainArea: 195364,
    germanyPop: 82800000,
    germanyArea: 67051,
    francePop: 67000000,
    franceArea: 248573,
    ukPop: 66400000,
    ukArea: 791900,
  };

  //var size = Object.keys(data["Countries"]).length;

  for (i = 0; i < Object.keys(data["Countries"]).length; i++) {
    if (data["Countries"][i].Country === "United States of America") {
      //console.log(data["Countries"][i].Country + ": " + i);
      us = returnCountrydata(
        data["Countries"][i],
        areaAndPop.usPop,
        areaAndPop.usArea
      );
    } else if (data["Countries"][i].Country === "Italy") {
      //console.log(data["Countries"][i].Country + ": " + i);
      italy = returnCountrydata(
        data["Countries"][i],
        areaAndPop.italyPop,
        areaAndPop.italyArea
      );
    } else if (data["Countries"][i].Country === "Spain") {
      //console.log(data["Countries"][i].Country + ": " + i);
      spain = returnCountrydata(
        data["Countries"][i],
        areaAndPop.spainPop,
        areaAndPop.spainArea
      );
    } else if (data["Countries"][i].Country === "Germany") {
      //console.log(data["Countries"][i].Country + ": " + i);
      germany = returnCountrydata(
        data["Countries"][i],
        areaAndPop.germanyPop,
        areaAndPop.germanyArea
      );
    } else if (data["Countries"][i].Country === "France") {
      //console.log(data["Countries"][i].Country + ": " + i);
      france = returnCountrydata(
        data["Countries"][i],
        areaAndPop.francePop,
        areaAndPop.franceArea
      );
    } else if (data["Countries"][i].Country === "United Kingdom") {
      //console.log(data["Countries"][i].Country + ": " + i);
      uk = returnCountrydata(
        data["Countries"][i],
        areaAndPop.ukPop,
        areaAndPop.ukArea
      );
    }
  }
  //france belongs in this data set.
  proccessedData = { us, italy, spain, germany, france, uk };
  return initListOfTasks(proccessedData);
}

//takes data from getCountryData and returns data in an object.
function returnCountrydata(data, pop, area) {
  Country = data.Country;
  Confirmed = data.TotalConfirmed;
  Pop = pop;
  Area = area;
  Deaths = data.TotalDeaths;
  Recovered = data.TotalRecovered;
  CasesPerThousand = (Confirmed / (Pop / 1000)).toFixed(2);
  percentOfConfirmedDeath = ((Deaths / Confirmed) * 100).toFixed(2);
  percentOfConfirmedRecovered = ((Recovered / Confirmed) * 100).toFixed(2);
  activeCases = Confirmed - (Deaths + Recovered);

  if (Country === "United States of America") {
    console.log(
      Country +
        ": \nPercent of Population Recovered: " +
        ((Recovered / pop) * 100).toFixed(2) +
        "%" +
        "\n" +
        "Percent of Population Deaths: " +
        ((Deaths / pop) * 100).toFixed(2) +
        "%"
    );
  }

  return {
    Country: Country,
    pop: pop,
    Area: Area,
    ConfirmedCases: Confirmed,
    casesPerThousand: CasesPerThousand,
    TotalRecovered: Recovered,
    TotalDeaths: Deaths,
    percentOfConfirmedDeath: percentOfConfirmedDeath,
    percentOfConfirmedRecovered: percentOfConfirmedRecovered,
    activeCases: activeCases,
  };
}

//Display data returned from getCountryData as a table.
var displayData = (task) => {
  //console.log(task['Country']);

  let rowElement = document.createElement("tr");

  let countryElement = document.createElement("td");
  countryElement.innerText = task["Country"];

  let popElement = document.createElement("td");
  popElement.innerText = formatNumber(task["pop"]);

  let sizeElement = document.createElement("td");
  sizeElement.innerText = formatNumber(task["Area"]);

  let ConfirmedCasesElement = document.createElement("td");
  ConfirmedCasesElement.innerText = formatNumber(task["ConfirmedCases"]);

  let confirmedDeathsElement = document.createElement("td");
  confirmedDeathsElement.innerText = formatNumber(task["TotalDeaths"]);

  let DeathPercentElement = document.createElement("td");
  DeathPercentElement.innerText = formatNumber(
    task["percentOfConfirmedDeath"] + "%"
  );

  let confirmedRecoveredElement = document.createElement("td");
  confirmedRecoveredElement.innerText = formatNumber(task["TotalRecovered"]);

  let RecoveredPercentElement = document.createElement("td");
  RecoveredPercentElement.innerText = formatNumber(
    task["percentOfConfirmedRecovered"] + "%"
  );

  let activeCasesElement = document.createElement("td");
  activeCasesElement.innerHTML = formatNumber(task["activeCases"]);

  let casesPerThousandElement = document.createElement("td");
  casesPerThousandElement.innerText = task["casesPerThousand"];

  rowElement.appendChild(countryElement);
  rowElement.appendChild(popElement);
  rowElement.appendChild(sizeElement);
  rowElement.appendChild(ConfirmedCasesElement);
  rowElement.appendChild(confirmedDeathsElement);
  rowElement.appendChild(DeathPercentElement);
  rowElement.appendChild(confirmedRecoveredElement);
  rowElement.appendChild(RecoveredPercentElement);
  rowElement.appendChild(activeCasesElement);
  rowElement.appendChild(casesPerThousandElement);
  document.getElementById("table").appendChild(rowElement);
};

let initListOfTasks = (data) => {
  a = data;

  row = document.getElementById("td");
  Object.keys(a).forEach(function (key) {
    displayData(a[key]);
    //console.log(a[key]);
  });
};

//takes returned data from displayDate and outputs it to a span in the H1.
var displayDate = (task) => {
  let LastUpdatedElement = document.getElementById("Date");
  LastUpdatedElement.innerText = task["date"] + " @ " + task["time"] + "UTC";
};

//takes date from source data and converts to more readable data.
function ConvertDate(date) {
  var LastUpdated = date;
  var array = LastUpdated.split("T", 2);
  date = array[0];
  time = array[1].replace("Z", "");
  return { date: date, time: time };
}

//takes total number of cases from soure data and returns it to be displayed.
/* function totalCases(data) {
  data = data["Global"];
  
} */

window.onload = function () {
  load = setInterval(function () {
    getCountryData();
  }, 10000);
  window.clearTimeout(load);
  //console.log("timerCleared")
};
