const PubSub = require('../helpers/pub_sub.js');

const SunsetView = function(container){
    this.container = container;
}

SunsetView.prototype.bindEvents = function(){
    PubSub.subscribe('Sunset:info-ready', (event)=>{
        const sunsetData = event.detail;
        this.render(sunsetData);
    });
}

SunsetView.prototype.render = function(sunsetData){
    const sunsetTime = document.createElement('h3');
    sunsetTime.textContent = (sunsetData.results)? `The sun will set at ${sunsetData.results.sunset} today` : 'Please enter a valid postcode';
    this.container.appendChild(sunsetTime);
}

module.exports = SunsetView;