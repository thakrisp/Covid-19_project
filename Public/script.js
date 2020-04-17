fetch('/countries', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}).then(res => res.json()).then(data => {
    getCountryData(data);
}).catch(err =>  {
    console.error(err);
})

//let tbody;

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
};

function getCountryData(data) {
    var data = data;
    LastUpdated = ConvertDate(data.Date);
    displayDate(LastUpdated);
    //console.log(data.Date);
    console.log(data);

    var areaAndPop = {  usPop:327000000, usArea:3800000, italyPop:60500000, italyArea:116347, spainPop:46600000, spainArea:195364, 
                        germanyPop:82800000, germanyArea:67051, francePop:67000000, franceArea:248573, ukPop:66400000,ukArea:791900};

    us = returnCountrydata(data["Countries"][236],areaAndPop.usPop,areaAndPop.usArea);
    italy = returnCountrydata(data["Countries"][108],areaAndPop.italyPop,areaAndPop.italyArea);
    spain = returnCountrydata(data["Countries"][208],areaAndPop.spainPop,areaAndPop.spainArea);
    germany = returnCountrydata(data["Countries"][81],areaAndPop.germanyPop,areaAndPop.germanyArea);
    france = returnCountrydata(data["Countries"][74],areaAndPop.francePop,areaAndPop.franceArea);
    uk = returnCountrydata(data["Countries"][235],areaAndPop.ukPop,areaAndPop.ukArea);

    //let proccessedData = {0:{us},1:{italy},2:{spain},3:{germany},4:{france},5:{uk}};
    proccessedData = {us,italy,spain,germany,france,uk};
    //console.log(proccessedData);
    return initListOfTasks(proccessedData);
    //return {us,italy,spain,germany,france,uk};
};

function returnCountrydata(data,pop,area) {
    Country = data.Country;
    Confirmed = data.TotalConfirmed;
    Pop = pop;
    Area = area;
    Deaths = data.TotalDeaths;
    Recovered = data.TotalRecovered;
    CasesPerThousand = (Confirmed / (Pop / 1000)).toFixed(2);
    percentOfPopDeath = ((Deaths / pop) * 100).toFixed(2);
    percentOfPopRecovered = ((Recovered / pop) * 100).toFixed(2);

        return {Country: Country, pop: pop, Area: Area, ConfirmedCases:Confirmed, casesPerThousand: CasesPerThousand, TotalRecovered: Recovered, TotalDeaths: Deaths, percentOfPopDeath: percentOfPopDeath, percentOfPopRecovered: percentOfPopRecovered};

}

//Display data returned from getCountryData as a table.
var displayData = (task) => {

    //console.log(task['Country']);

    let rowElement = document.createElement('tr');

    let countryElement = document.createElement('td');
    countryElement.innerText = task['Country'];

    let popElement = document.createElement('td');
    popElement.innerText = formatNumber(task['pop']);

    let sizeElement = document.createElement('td');
    sizeElement.innerText = formatNumber(task['Area']);

    let ConfirmedCasesElement = document.createElement('td');
    ConfirmedCasesElement.innerText = formatNumber(task['ConfirmedCases']);

    let confirmedDeathsElement = document.createElement('td');
    confirmedDeathsElement.innerText = formatNumber(task['TotalDeaths']);

    let DeathPercentElement = document.createElement('td');
    DeathPercentElement.innerText = formatNumber(task['percentOfPopDeath'] +"%");

    let confirmedRecoveredElement = document.createElement('td');
    confirmedRecoveredElement.innerText = formatNumber(task['TotalRecovered']);

    let RecoveredPercentElement = document.createElement('td');
    RecoveredPercentElement.innerText = formatNumber(task['percentOfPopRecovered'] +"%");

    let casesPerThousandElement = document.createElement('td');
    casesPerThousandElement.innerText = task['casesPerThousand'];

    rowElement.appendChild(countryElement);
    rowElement.appendChild(popElement);
    rowElement.appendChild(sizeElement);
    rowElement.appendChild(ConfirmedCasesElement);
    rowElement.appendChild(confirmedDeathsElement);
    rowElement.appendChild(DeathPercentElement);
    rowElement.appendChild(confirmedRecoveredElement);
    rowElement.appendChild(RecoveredPercentElement);
    rowElement.appendChild(casesPerThousandElement);
    document.getElementById("table").appendChild(rowElement);
}

var displayDate = (task) => {

    let LastUpdatedElement = document.getElementById('Date');
    LastUpdatedElement.innerText = task['date'] + " @ " + task['time'] + "UTC";

}

let initListOfTasks = (data) => {
    a = data;
    //console.log(data);

/*     if (tbody) {
        document.getElementById('table').replaceWith(tbody);
        return;
    } */

    row = document.getElementById('td');
    Object.keys(a).forEach(function (key){
        displayData(a[key]);
        //console.log(a[key]);
    });
};

function ConvertDate (date) {
    var LastUpdated = date;
    var array = LastUpdated.split("T",2);
    date = array[0];
    time = array[1].replace('Z',"");
    return {date:date, time: time}
}

window.onload = function(){
load = setInterval(function(){
    getCountryData();
}, 10000);
window.clearTimeout(load);
//console.log("timerCleared")
};