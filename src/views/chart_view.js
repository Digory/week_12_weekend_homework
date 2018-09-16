const PubSub = require('../helpers/pub_sub.js');

const ChartView = function(container){
    this.container = container;
    this.multipleDaysData = {}
}

ChartView.prototype.bindEvents = function(){
    PubSub.subscribe('HoursOfSun:info-ready-yesterday', (event)=>{
        this.multipleDaysData.yesterday = event.detail;
        if(this.allDataCollected()){
            this.render();
        }
    });
    PubSub.subscribe('HoursOfSun:info-ready-today', (event)=>{
        this.multipleDaysData.today = event.detail;
        if(this.allDataCollected()){
            this.render();
        }
    });
    PubSub.subscribe('HoursOfSun:info-ready-tomorrow', (event)=>{
        this.multipleDaysData.tomorrow = event.detail;
        if(this.allDataCollected()){
            this.render();
        }
    });
}

ChartView.prototype.allDataCollected = function(){
    return Object.keys(this.multipleDaysData).length === 3
}

ChartView.prototype.render = function(){
    this.createTableElements(); 
    this.insertDataIntoTable();
    this.displayChart();
    console.log(this.dataTable);
}

ChartView.prototype.createTableElements = function(){
    this.dataTable = document.createElement('table');
    this.dataTable.setAttribute('id', 'datatable');
    this.header = this.dataTable.createTHead();
    this.body = this.dataTable.createTBody();
    this.row1 = this.header.insertRow(0);
    this.row2 = this.body.insertRow(0);
    this.row3 = this.body.insertRow(1);
    this.row4 = this.body.insertRow(2);
    this.thTitle = document.createElement('th');
    this.thTitle2 = document.createElement('th');
    this.th1 = document.createElement('th');
    this.th2 = document.createElement('th');
    this.th3 = document.createElement('th');
    this.row1.appendChild(this.thTitle);
    this.row1.appendChild(this.thTitle2);
    this.row2.appendChild(this.th1);
    this.row3.appendChild(this.th2);
    this.row4.appendChild(this.th3);
    this.cell1 = this.row2.insertCell(1);
    this.cell2 = this.row3.insertCell(1);
    this.cell3 = this.row4.insertCell(1);
    this.container.appendChild(this.dataTable);
}

ChartView.prototype.insertDataIntoTable = function(){
    this.thTitle.textContent = "Hours";
    this.thTitle2.textContent = "Hours";
    this.th1.textContent = "yesterday";
    this.cell1.innerHTML = this.numberFormat(this.multipleDaysData.yesterday);
    this.th2.textContent = "today";
    this.cell2.innerHTML = this.numberFormat(this.multipleDaysData.today);
    this.th3.textContent = "tomorrow";
    this.cell3.innerHTML = this.numberFormat(this.multipleDaysData.tomorrow);
}

ChartView.prototype.numberFormat = function(dayLengthString){
    let hoursAsNumber = "";
    hoursAsNumber += dayLengthString[0] + dayLengthString[1];
    const minutesAsString = dayLengthString[3] + dayLengthString[4];
    const minutesAsNumber = parseInt(minutesAsString);
    const minutesAsDecimal = 100*minutesAsNumber/60;
    hoursAsNumber += "." + minutesAsDecimal.toString().slice(0,2);
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