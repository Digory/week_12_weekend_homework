const ButtonsView = function(){

}

ButtonsView.prototype.bindEvents = function(){
    PubSub.subscribe('Weather:all-info-ready', (event)=>{
        const allWeatherData = event.detail;
        console.log(allWeatherData);
    });
}

module.exports = ButtonsView;