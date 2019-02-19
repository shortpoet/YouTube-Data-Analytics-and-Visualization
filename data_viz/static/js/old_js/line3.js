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

function getChannel(data, chosenChannel) {
  console.log(chosenChannel)
  var channel_data = data.filter(datum => datum.channel_name == chosenChannel)
  console.log(channel_data)
  return channel_data[0]
}

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

    dropdownDiv1.on('change', function(){
      var sel1 = document.getElementById('lineChannelSelect1')
      var chosenChannel1 = sel1.options[sel1.selectedIndex].value

      d3.selectAll('.line1').remove()
      d3.selectAll('#xaxis1').remove()
      d3.selectAll('#yaxis1').remove()
      // var chosenChannel1 = d3.select(this).attr('value')
      console.log(chosenChannel1)
      drawLine(chosenChannel1, chosenChannel2, chosenSeries)
      })

    var dropdownDiv2 = d3.select('.lineSelect2').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect2')
      .text('Select Channel');
    var dropdown2 = dropdownDiv2.append('select').classed('form-control', true).attr('id', 'lineChannelSelect2');
    var dropdownOptions2 = dropdown2.selectAll('option').data(asmr_data).enter()
      .append('option')
      .text(d => d.channel_name)
      .attr('value', d => d.channel_name)
      
    dropdownDiv2.on('change', function(){
      var sel2 = document.getElementById('lineChannelSelect2')
      var chosenChannel2 = sel2.options[sel2.selectedIndex].value
      d3.selectAll('.line2').remove()
      d3.selectAll('#xaxis2').remove()
      d3.selectAll('#yaxis2').remove()
      // var chosenChannel2 = d3.select(this).attr('value')
      drawLine(chosenChannel1, chosenChannel2, chosenSeries)
    })

    var series_options = d3.keys(asmr_data[0]['time_series'])
    console.log('seriesOptions')
    console.log(series_options)
    var radioDiv = d3.select('.seriesSelect').append('div').classed('form-check form-check-inline', true)
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
        d3.selectAll('.line1').remove()
        d3.selectAll('#xaxis1').remove()
        d3.selectAll('#yaxis1').remove()
        d3.selectAll('.line2').remove()
        d3.selectAll('#xaxis2').remove()
        d3.selectAll('#yaxis2').remove()
        var chosenSeries = d3.select(this).attr('value')
        drawLine(chosenChannel1, chosenChannel2, chosenSeries)
      })
    d3.select('#average_views_radio').attr('checked', 'checked')
  })
}

drawInput()

function drawLine(chosenChannel1, chosenChannel2, chosenSeries) {
	d3.json('asmr_channels').then(function(asmr_data) {
    console.log(asmr_data)

  // var chosenChannel1 = d3.select('#lineChannelSelect1').attr('value')
  // var chosenChannel2 = d3.select('#lineChannelSelect2').attr('value')
    asmr_data.forEach(function(data) {
        data.time_series.average_views.forEach(day => {
            day['dates'] = parseTime(day['dates'])
        }) 
        data.time_series.average_views.forEach(day => {
            day['average_views'] = +day['average_views']
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
            day['total_subs'] = parseTime(day['dates'])
        }) 
        data.time_series.total_subs.forEach(day => {
            day['total_subs'] = +day['total_subs']
        }) 
        data.time_series.total_views.forEach(day => {
            day['total_views'] = parseTime(day['dates'])
        }) 
        data.time_series.total_views.forEach(day => {
            day['total_views'] = +day['total_views']
        }) 
    })

    function getChannel(data, chosenChannel) {
      console.log(chosenChannel)
      var channel_data = data.filter(datum => datum.channel_name == chosenChannel)
      console.log(channel_data)
      return channel_data[0]
    }

    // Configure a time scale
    // d3.extent returns the an array containing the min and max values for the property specified
    var xTimeScale1 = d3.scaleTime()
        .range([0, chartWidth])
        .domain(d3.extent(getChannel(asmr_data, chosenChannel1).time_series[chosenSeries], data => data.dates))
    // Configure a linear scale with a range between the chartHeight and 0
    var yLinearScale1 = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(getChannel(asmr_data, chosenChannel1).time_series[chosenSeries], data => data[chosenSeries])])
    var xTimeScale2 = d3.scaleTime()
        .range([0, chartWidth])
        .domain(d3.extent(getChannel(asmr_data, chosenChannel2).time_series[chosenSeries], data => data.dates))
    // Configure a linear scale with a range between the chartHeight and 0
    var yLinearScale2 = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(getChannel(asmr_data, chosenChannel2).time_series[chosenSeries], data => data[chosenSeries])])

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis1 = d3.axisBottom(xTimeScale1)
    var leftAxis1 = d3.axisLeft(yLinearScale1)
    var bottomAxis2 = d3.axisBottom(xTimeScale2)
    var leftAxis2= d3.axisLeft(yLinearScale2)
    
    // Configure a line function which will plot the x and y coordinates using our scales
    var drawLine1 = d3.line()
        .x(data => xTimeScale1(data.dates))
        .y(data => yLinearScale1(data[chosenSeries]))
        .curve(d3.curveMonotoneX)
    var drawLine2 = d3.line()
        .x(data => xTimeScale2(data.dates))
        .y(data => yLinearScale2(data[chosenSeries]))
        .curve(d3.curveMonotoneX)
    // Append an SVG path and plot its points using the line function
    chartGroup1.append("path")
        // The drawLine function returns the instructions for creating the line for asmr_data
        .attr("d", drawLine1(getChannel(asmr_data, chosenChannel1).time_series[chosenSeries]))
        .classed("line1", true);
    
    chartGroup2.append("path")
        // The drawLine function returns the instructions for creating the line for asmr_data
        .attr("d", drawLine2(getChannel(asmr_data, chosenChannel2).time_series[chosenSeries]))
        .classed("line2", true);

    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup1.append("g")
        .classed("axis", true)
        .attr('id', 'yaxis1')
        .call(leftAxis1);
    
    chartGroup2.append("g")
        .classed("axis", true)
        .attr('id', 'yaxis2')
        .call(leftAxis2);

    // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup1.append("g")
        .classed("axis", true)
        .attr('id', 'xaxis1')
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis1);
    
    chartGroup2.append("g")
        .classed("axis", true)
        .attr('id', 'xaxis2')
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis2);
    });
}

var chosenChannel1 = 'Angelica'
var chosenChannel2 = 'Bluewhisper'
var chosenSeries = 'average_views'

drawLine(chosenChannel1, chosenChannel2, chosenSeries)