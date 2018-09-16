const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Sunset = function(){
}

Sunset.prototype.bindEvents = function(){
    PubSub.subscribe('SearchView:searched-postcode-ready', (event)=>{
        this.findData(event.detail);
    })
}

Sunset.prototype.findData = function(postcode){
    const postcodeRequest = new RequestHelper(`https://api.postcodes.io/postcodes/${postcode}`);
    postcodeRequest.get()
    .then((data)=>{
        let latitude;
        let longitude;
        if(data.result){
            latitude = data.result.latitude;
            longitude = data.result.longitude;
        }
        else{
            latitude = null;
            longitude = null;
        }
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