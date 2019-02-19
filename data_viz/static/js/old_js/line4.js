// Define SVG area dimensions
var svgWidth = 480;
var svgHeight = 400;

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

function xScale(channelData, chosenSeries) {
  var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(d3.extent(channelData.time_series[chosenSeries], data => data.dates))
    return xTimeScale
}

function yScale(channelData, chosenSeries) {
  var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(channelData.time_series[chosenSeries], data => data[chosenSeries])])
  return xTimeScale
}

function renderXAxes(newXScale, xAxis) {
  var bottomAxis = d3.axisBottom(newXScale);

  xAxis.transition()
    .duration(1000)
    .call(bottomAxis);

  return xAxis;
}

function renderYAxes(newYScale, yAxis) {
  var leftAxis = d3.axisLeft(newYScale);

  yAxis.transition()
    .duration(1000)
    .call(leftAxis);

  return yAxis;
}

function renderPath(chartGroup, newXScale, chosenSeries, newYScale, drawLine) {
  
  
  chartGroup.transition()
    .duration(1000)
    .attr("d", drawLine())

  return circlesGroup;
}

function lineFunc(newXScale, newYScale, chosenSeries) {
  var drawLine = d3.line()
    .x(data => newXScale(data.dates))
    .y(data => newYScale(data[chosenSeries]))
    .curve(d3.curveMonotoneX)
  return drawLine
}



function getChannel(data, chosenChannel) {
  console.log(chosenChannel)
  var channel_data = data.filter(datum => datum.channel_name == chosenChannel)
  console.log(channel_data)
  return channel_data[0]
}

function drawInput(){
	d3.json('asmr_channels').then(function(asmrData) {
    console.log(asmrData)
    var dropdownDiv1 = d3.select('.lineSelect1').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect1')
      .text('Select Channel 1');
    var dropdown1 = dropdownDiv1.append('select').classed('form-control', true).attr('id', 'lineChannelSelect1');
    var dropdownOptions1 = dropdown1.selectAll('option').data(asmrData).enter()
      .append('option')
      .text(d => d.channel_name)
      .attr('value', d => d.channel_name)

    var submit1 = dropdownDiv1.append('button')
      .attr('type', 'submit')
      .attr('id', 'submit1')
      .classed('btn btn-default', true)
      .on('change', function(){
        d3.selectAll('.line1').remove()
        d3.selectAll('#xaxis1').remove()
        d3.selectAll('#yaxis1').remove()
        var chosenChannel1 = d3.select(this).attr('value')
        console.log(chosenChannel1)
        drawLine(chosenChannel1, chosenChannel2, chosenSeries)
      })

    var dropdownDiv2 = d3.select('.lineSelect2').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect2')
      .text('Select Channel 2');
    var dropdown2 = dropdownDiv2.append('select').classed('form-control', true).attr('id', 'lineChannelSelect2');
    var dropdownOptions2 = dropdown2.selectAll('option').data(asmrData).enter()
      .append('option')
      .text(d => d.channel_name)
      .attr('value', d => d.channel_name)
      
    var submit2 = dropdownDiv2.append('button')
      .attr('type', 'submit')
      .attr('id', 'submit1')
      .classed('btn btn-default', true)
      .on('change', function(){
        d3.selectAll('.line2').remove()
        d3.selectAll('#xaxis2').remove()
        d3.selectAll('#yaxis2').remove()
        var chosenChannel2 = d3.select(this).attr('value')
        console.log(chosenChannel2)
        drawLine(chosenChannel1, chosenChannel2, chosenSeries)
      })
    var series_options = d3.keys(asmrData[0]['time_series'])
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

  })
}

function



drawInput()
