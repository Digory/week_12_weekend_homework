const Weather = require('./models/weather.js');
const ButtonsView = require('./views/buttons_view.js');

document.addEventListener('DOMContentLoaded', ()=>{
  const weather = new Weather();
  weather.getData();

  const buttonsView = new ButtonsView();
  buttonsView.bindEvents();
})