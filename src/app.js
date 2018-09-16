const Sunset = require('./models/sunset.js');
const SearchView = require('./views/search_view.js');
const SunsetView = require('./views/sunset_view.js'); 

document.addEventListener('DOMContentLoaded', ()=>{
  const sunset = new Sunset();
  sunset.bindEvents();

  const sunsetView = new SunsetView();
  sunsetView.bindEvents();

  const searchBar = document.querySelector('#searchbar');
  const searchView = new SearchView(searchBar);
  searchView.bindEvents();

  const theTable = document.createElement('table');
  theTable.setAttribute('id', 'datatable');
  const header = theTable.createTHead();
  const body = theTable.createTBody();
  const row1 = header.insertRow(0);
  const row2 = body.insertRow(0);
  const th1 = document.createElement('th');
  th1.textContent = "Digory";
  row1.appendChild(th1);
  const th2 = document.createElement('th');
  th2.textContent = "test";
  row2.appendChild(th2);
  const cell1 = row2.insertCell(1);
  cell1.innerHTML = "3";
  const container = document.querySelector('#container');
  container.appendChild(theTable);
  console.log(theTable);

  Highcharts.chart('container', {
    data: {
        table: 'datatable',
        enablePolling: true
    },
    chart: {
        type: 'column'
    },
    title: {
        text: 'Data extracted from a HTML table in the page'
    },
    yAxis: {
        allowDecimals: false,
        title: {
            text: 'Units'
        }
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                this.point.y + ' ' + this.point.name.toLowerCase();
        }
    }
  });
})