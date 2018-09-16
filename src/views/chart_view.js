const PubSub = require('../helpers/pub_sub.js');

const ChartView = function(container){
    this.container = container;
}

ChartView.prototype.bindEvents = function(){
    PubSub.subscribe('Sunset:info-ready', (event)=>{
        const sunsetData = event.detail;
        this.render(sunsetData);
    });
}

ChartView.prototype.render = function(sunsetData){
    this.createTableElements(); 
    this.insertDataIntoTable(sunsetData);
    this.displayChart();
}

ChartView.prototype.createTableElements = function(){
    this.dataTable = document.createElement('table');
    this.dataTable.setAttribute('id', 'datatable');
    this.header = this.dataTable.createTHead();
    this.body = this.dataTable.createTBody();
    this.row1 = this.header.insertRow(0);
    this.row2 = this.body.insertRow(0);
    this.th2 = document.createElement('th');
    this.row2.appendChild(this.th2);
    this.cell1 = this.row2.insertCell(1);
    this.container.appendChild(this.dataTable);
}

ChartView.prototype.insertDataIntoTable = function(sunsetData){
    this.th2.textContent = "today";
    this.cell1.innerHTML = this.numberFormat(sunsetData.results.day_length);
}

ChartView.prototype.numberFormat = function(dayLengthString){
    let hoursAsNumber = "";
    hoursAsNumber += dayLengthString[0] + dayLengthString[1];
    const minutesAsString = dayLengthString[3] + dayLengthString[4];
    const minutesAsNumber = parseInt(minutesAsString);
    const minutesAsDecimal = 100*minutesAsNumber/60;
    hoursAsNumber += "." + minutesAsDecimal;
    return hoursAsNumber;
}

ChartView.prototype.displayChart = function(){
    Highcharts.chart('chart-container', {
        data: {
            table: 'datatable',
            enablePolling: true
        },
        chart: {
            type: 'column'
        },
        title: {
            text: 'Hours of sunlight'
        },
        subtitle: {
            text: 'Sources: postcodes.io and sunrise-sunset.org'
        },
        yAxis: {
            allowDecimals: false,
            title: {
                text: 'Hours'
            }
        },
        tooltip: {
            formatter: function () {
                return '<b>' + this.series.name + '</b><br/>' +
                    this.point.y + ' ' + this.point.name.toLowerCase();
            }
        }
      });
}

module.exports = ChartView;