// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

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
var svg = d3.select("#line")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse(" %Y-%m-%d");

endpoint = 'asmr_channels'

function drawLine(endpoint) {
	console.log(endpoint)
	d3.json(endpoint).then(function(asmr_data) {
		console.log(endpoint)
        console.log(asmr_data)


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

    var dropdownDiv1 = d3.select('.lineSelect1').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect1')
      .text('Select X Axis Data Vector');
    var dropdown1 = dropdownDiv1.append('select').classed('form-control', true).attr('id', 'lineChannelSelect1');
    var dropdownOptions1 = dropdown1.selectAll('option').data(asmr_data).enter()
                                  .append('option')
                                  .text(d => d.channel_name)
                                  .attr('value', d => d.channel_name);

    var dropdownDiv2 = d3.select('.lineSelect2').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect2')
      .text('Select X Axis Data Vector');
    var dropdown2 = dropdownDiv2.append('select').classed('form-control', true).attr('id', 'lineChannelSelect2');
    var dropdownOptions2 = dropdown2.selectAll('option').data(asmr_data).enter()
                                  .append('option')
                                  .text(d => d.channel_name)
                                  .attr('value', d => d.channel_name);
  
    var series_options = d3.keys(asmr_data[0]['time_series'])
    var radioDiv = d3.select('.seriesSelect').append('div').classed('form-check form-check-inline', true).append('label')
      .attr('for', 'lineSeriesSelect')
      .text('Select X Axis Data Vector');
    var radioGroup = radioDiv.append('input').classed('form-check-inline', true).attr('id', 'lineChannelSelect');
    var dropdownOptions2 = dropdown2.selectAll('option').data(asmr_data).enter()
                                  .append('option')
                                  .text(d => d.channel_name)
                                  .attr('value', d => d.channel_name);
  
    var chosenSelect = 'Angelica'
  

    // Configure a time scale
    // d3.extent returns the an array containing the min and max values for the property specified
    var xTimeScale = d3.scaleTime()
        .range([0, chartWidth])
        .domain(d3.extent(asmr_data[0].time_series.average_views, data => data.dates))
    // Configure a linear scale with a range between the chartHeight and 0
    var yLinearScale = d3.scaleLinear()
        .range([chartHeight, 0])
        .domain([0, d3.max(asmr_data[0].time_series.average_views, data => data.average_views)])

    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xTimeScale)
    var leftAxis = d3.axisLeft(yLinearScale)
    
    // Configure a line function which will plot the x and y coordinates using our scales
    var drawLine = d3.line()
        .x(data => xTimeScale(data.dates))
        .y(data => yLinearScale(data.average_views))
        .curve(d3.curveMonotoneX)
    // Append an SVG path and plot its points using the line function
    chartGroup.append("path")
        // The drawLine function returns the instructions for creating the line for asmr_data
        .attr("d", drawLine(asmr_data[0].time_series.average_views))
        .classed("line", true);

    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);
    });
}

drawLine(endpoint)