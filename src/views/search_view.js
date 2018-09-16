const PubSub = require('../helpers/pub_sub.js');

const SearchView = function(searchElement, sunsetContainer, chartContainer){
    this.searchElement = searchElement;
    this.sunsetContainer = sunsetContainer;
    this.chartContainer = chartContainer;
}

SearchView.prototype.bindEvents = function(){
    this.searchElement.addEventListener('submit', (event)=>{
        event.preventDefault();
        this.sunsetContainer.innerHTML = "";
        this.chartContainer.innerHTML = "";
        const postcode = event.target.search.value;
        PubSub.publish('SearchView:searched-postcode-ready', postcode);
    });
}

module.exports = SearchView;