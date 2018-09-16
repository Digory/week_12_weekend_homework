const PubSub = require('../helpers/pub_sub.js');

const SunsetView = function(container){
    this.container = container;
}

SunsetView.prototype.bindEvents = function(){
    PubSub.subscribe('Sunset:info-ready', (event)=>{
        const sunsetData = event.detail;
        this.render(sunsetData);
        console.log(sunsetData.results.day_length);
    });
}

SunsetView.prototype.render = function(sunsetData){
    const sunsetTime = document.createElement('h3');
    sunsetTime.textContent = `The sun will set at: ${sunsetData.results.sunset}`;
    this.container.appendChild(sunsetTime);
}

module.exports = SunsetView;