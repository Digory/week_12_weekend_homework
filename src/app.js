const Sunset = require('./models/sunset.js');
const SearchView = require('./views/search_view.js');
const SunsetView = require('./views/sunset_view.js');
const ChartView = require('./views/chart_view.js'); 
const HoursOfSun = require('./models/hours_of_sun.js');

document.addEventListener('DOMContentLoaded', ()=>{
  const sunset = new Sunset();
  sunset.bindEvents();

  const sunsetContainer = document.querySelector('#sunset-time');
  const sunsetView = new SunsetView(sunsetContainer);
  sunsetView.bindEvents();

  const searchBar = document.querySelector('#searchbar');
  const searchView = new SearchView(searchBar);
  searchView.bindEvents();

  const chartContainer = document.querySelector('#chart-container');
  const chartView = new ChartView(chartContainer);
  chartView.bindEvents();

  const hoursOfSun = new HoursOfSun();
  hoursOfSun.bindEvents();

})