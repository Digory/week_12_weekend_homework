const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Sunset = function(){
}

Sunset.prototype.getData = function(){
    const postcodeRequest = new RequestHelper('https://api.postcodes.io/postcodes/eh530qz');
    postcodeRequest.get()
    .then((data)=>{
        const latitude = data.result.latitude;
        const longitude = data.result.longitude;
        this.publishSunsetInfo(latitude, longitude);
    })
    .catch((err)=>{
        console.log(err);
    });
}

Sunset.prototype.publishSunsetInfo = function(latitude, longitude){
    const sunsetRequest = new RequestHelper(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`);
    sunsetRequest.get()
    .then((data)=>{
        PubSub.publish('Sunset:info-ready', data);
    })
    .catch((err)=>{
        console.log(err);
    });
}

module.exports = Sunset;