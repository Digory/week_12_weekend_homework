const PubSub = require('../helpers/pub_sub.js');

const SunsetView = function(){

}

SunsetView.prototype.bindEvents = function(){
    PubSub.subscribe('Sunset:info-ready', (event)=>{
        const sunsetData = event.detail;
        console.log(sunsetData);
    });
}

module.exports = SunsetView;