// Define SVG area dimensions
var svgWidth = 480;
var svgHeight = 380;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg1 = d3.select("#line1")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var svg2 = d3.select("#line2")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup1 = svg1.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chartGroup2 = svg2.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse(" %Y-%m-%d");

function drawInput(){
	d3.json('asmr_channels').then(function(asmr_data) {
    console.log(asmr_data)
    var dropdownDiv1 = d3.select('.lineSelect1').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect1')
      .text('Select Channel');
    var dropdown1 = dropdownDiv1.append('select').classed('form-control', true).attr('id', 'lineChannelSelect1');
    var dropdownOptions1 = dropdown1.selectAll('option').data(asmr_data).enter()
      .append('option')
      .text(d => d.channel_name)
      .attr('value', d => d.channel_name)
      .attr('id', d => d.channel_name + '_1')

    dropdownDiv1.on('change', function(){
      var sel1 = document.getElementById('lineChannelSelect1')
      var chosenChannel1 = sel1.options[sel1.selectedIndex].value
      chartGroup1.remove()
      chartGroup1 = svg1.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
      console.log(chosenChannel1)
      drawLine(chartGroup1, chosenChannel1, chosenSeries)
      })
    
    d3.select('#Angelica_1').attr('selected', 'selected')

    var dropdownDiv2 = d3.select('.lineSelect2').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect2')
      .text('Select Channel');
    var dropdown2 = dropdownDiv2.append('select').classed('form-control', true).attr('id', 'lineChannelSelect2');
    var dropdownOptions2 = dropdown2.selectAll('option').data(asmr_data).enter()
      .append('option')
      .text(d => d.channel_name)
      .attr('value', d => d.channel_name)
      .attr('id', d => d.channel_name + '_2')
      
    dropdownDiv2.on('change', function(){
      var sel2 = document.getElementById('lineChannelSelect2')
      var chosenChannel2 = sel2.options[sel2.selectedIndex].value
      chartGroup2.remove()
      chartGroup2 = svg2.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      drawLine(chartGroup2, chosenChannel2, chosenSeries)
    })

    d3.select('#Bluewhisper_2').attr('selected', 'selected')

    var series_options = d3.keys(asmr_data[0]['time_series'])
    console.log('seriesOptions')
    console.log(series_options)
    var radioDiv = d3.select('.seriesSelect').append('div')
      .classed('form-check form-check-inline', true)
      .attr('id', 'radioSelect')
    var radioGroup = radioDiv.selectAll('label').data(series_options).enter()
      .append('div')
      .classed('form check form-check-inline', true)
      .append('label')
      .attr('for', d => d)
      .classed('form-check-label', true)
      .text(d => d)
      .append('input')
      .classed('form-check-input', true)
      .attr('type', 'radio')
      .attr('name', 'lineSeriesSelect')
      .attr('value', d => d)
      .attr('id', d => d + '_radio')
      .on('change', function(){
        d3.selectAll('.line').remove()
        d3.selectAll('#xaxis').remove()
        d3.selectAll('#yaxis').remove()
        var chosenSeries = d3.select(this).attr('value')
        drawLine(chartGroup1, chosenChannel1, chosenSeries)
        drawLine(chartGroup2, chosenChannel2, chosenSeries)
      })
    d3.select('#average_views_radio').attr('checked', 'checked')
  })
}

drawInput()

function drawLine(chartGroup, chosenChannel, chosenSeries) {
	d3.json('asmr_channels').then(function(asmr_data) {
    console.log(asmr_data)

  // var chosenChannel1 = d3.select('#lineChannelSelect1').attr('value')
  // var chosenChannel2 = d3.select('#lineChannelSelect2').attr('value')
    asmr_data.forEach(function(data) {
        data.time_series.average_views.forEach(day => {
            day['dates'] = parseTime(day['dates'])
        }) 
        data.time_series.average_views.forEach(day => {
            day['average_views'] = Math.abs(+day['average_views'])
        }) 
        data.time_series.daily_subs.forEach(day => {
            day['dates'] = parseTime(day['dates'])
        }) 
        data.time_series.daily_subs.forEach(day => {
            day['daily_subs'] = +day['daily_subs']
        }) 
        data.time_series.daily_views.forEach(day => {
            day['dates'] = parseTime(day['dates'])
        }) 
        data.time_series.daily_views.forEach(day => {
            day['daily_views'] = +day['daily_views']
        }) 
        data.time_series.monthly_views.forEach(day => {
            day['dates'] = parseTime(day['dates'])
        }) 
        data.time_series.monthly_views.forEach(day => {
            day['monthly_views'] = +day['monthly_views']
        }) 
        data.time_series.total_subs.forEach(day => {
            day['dates'] = parseTime(day['dates'])
        }) 
        data.time_series.total_subs.forEach(day => {
            day['total_subs'] = +day['total_subs']
        }) 
        data.time_series.total_views.forEach(day => {
            day['dates'] = parseTime(day['dates'])
        }) 
        data.time_series.total_views.forEach(day => {
            day['total_views'] = +day['total_views']
        }) 
    })

    var channel = asmr_data.filter(datum => datum.channel_name == chosenChannel)[0]
    console.log(channel)

    var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(d3.extent(channel.time_series[chosenSeries], data => data.dates))
    
    var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(channel.time_series[chosenSeries], data => data[chosenSeries])])
    
    var bottomAxis = d3.axisBottom(xTimeScale)
    var leftAxis = d3.axisLeft(yLinearScale)

    var drawLine = d3.line()
    .x(data => xTimeScale(data.dates))
    .y(data => yLinearScale(data[chosenSeries]))
    .curve(d3.curveMonotoneX)

    chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for asmr_data
    .attr("d", drawLine(channel.time_series[chosenSeries]))
    .classed("line", true);

    chartGroup.append("g")
    .classed("axis", true)
    .attr('id', 'yaxis')
    .call(leftAxis);

    chartGroup.append("g")
    .classed("axis", true)
    .attr('id', 'xaxis')
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

  })
}

var chosenSeries = 'average_views'
var chosenChannel1 = 'Angelica'
var chosenChannel2 = 'Bluewhisper'

drawLine(chartGroup1, chosenChannel1, chosenSeries)
drawLine(chartGroup2, chosenChannel2, chosenSeries)
