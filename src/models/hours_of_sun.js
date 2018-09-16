const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const HoursOfSun = function(){
}

HoursOfSun.prototype.bindEvents = function(){
    PubSub.subscribe('SearchView:searched-postcode-ready', (event)=>{
        this.findData(event.detail);
    })
}

HoursOfSun.prototype.findData = function(postcode){
    const postcodeRequest = new RequestHelper(`https://api.postcodes.io/postcodes/${postcode}`);
    postcodeRequest.get()
    .then((data)=>{
        const latitude = data.result.latitude;
        const longitude = data.result.longitude;
        this.publishHoursOfSunInfo(latitude, longitude);
    })
    .catch((err)=>{
        console.log(err);
    });
}

HoursOfSun.prototype.publishHoursOfSunInfo = function(latitude, longitude){
    const yesterdayRequest = new RequestHelper(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${this.getTodaysDateOffset(-1)}`);
    yesterdayRequest.get()
    .then((data)=>{
        PubSub.publish('HoursOfSun:info-ready-yesterday', data.results.day_length.slice());
    })
    .catch((err)=>{
        console.log(err);
    });
    const todayRequest = new RequestHelper(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}`);
    todayRequest.get()
    .then((data)=>{
        PubSub.publish('HoursOfSun:info-ready-today', data.results.day_length.slice());
    })
    .catch((err)=>{
        console.log(err);
    });
    const tomorrowRequest = new RequestHelper(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${this.getTodaysDateOffset(1)}`);
    tomorrowRequest.get()
    .then((data)=>{
        PubSub.publish('HoursOfSun:info-ready-tomorrow', data.results.day_length.slice());
    })
    .catch((err)=>{
        console.log(err);
    });
}

HoursOfSun.prototype.getTodaysDateOffset = function(numOfDaysToOffset){
    const today = new Date();
    today.setDate(today.getDate()+numOfDaysToOffset);
    return today.toJSON().slice(0,10);
}

module.exports = HoursOfSun;