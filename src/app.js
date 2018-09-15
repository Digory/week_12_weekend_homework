const Sunset = require('./models/sunset.js');
const ButtonsView = require('./views/buttons_view.js');

document.addEventListener('DOMContentLoaded', ()=>{
  const sunset = new Sunset();
  sunset.getData();

  const buttonsView = new ButtonsView();
  buttonsView.bindEvents();
})