const PubSub = require('../helpers/pub_sub.js');

const SearchView = function(searchElement){
    this.searchElement = searchElement;
}

SearchView.prototype.bindEvents = function(){
    this.searchElement.addEventListener('submit', (event)=>{
        event.preventDefault();
        const postcode = event.target.search.value;
        PubSub.publish('SearchView:searched-postcode-ready', postcode);
    });
}

module.exports = SearchView;