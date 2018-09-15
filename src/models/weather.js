const PubSub = require('/helpers/pub_sub.js');
const RequestHelper = require('/helpers/request_helper.js');

const Weather = function(){
    this.data = [];
}

Weather.getData = function(){
    const request = new RequestHelper('https://www.metaweather.com/api/location/44418');
    request.get()
    .then((data)=>{
        this.data = data;
        PubSub.publish('Weather:all-info-ready', this.data);
    })
    .catch((err)=>{
        console.log(err);
    });
}

module.exports = Weather;