const PubSub = require('../helpers/pub_sub.js');

const ButtonsView = function(){

}

ButtonsView.prototype.bindEvents = function(){
    PubSub.subscribe('Sunset:info-ready', (event)=>{
        const sunsetData = event.detail;
        console.log(sunsetData);
    });
}

module.exports = ButtonsView;