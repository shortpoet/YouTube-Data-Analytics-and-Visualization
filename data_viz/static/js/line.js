// Define SVG area dimensions
var svgWidth = 700;
var svgHeight = 575;

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
    asmr_data.sort((a,b) => d3.descending(parseFloat(a['subs']), parseFloat(b['subs'])))
    var dropdownDiv1 = d3.select('.lineSelect1').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect1')
      .text('Listed by Subscribers Descending');
    var dropdown1 = dropdownDiv1.append('select').classed('form-control', true).attr('id', 'lineChannelSelect1');
    var dropdownOptions1 = dropdown1.selectAll('option').data(asmr_data).enter()
      .append('option')
      .text(d => d.channel_name)
      .attr('value', d => d.channel_name)
      .attr('id', d => d.channel_name.replace(/\s/g, '_') + '_1')

    dropdownDiv1.on('change', function(){
      var sel1 = document.getElementById('lineChannelSelect1')
      var chosenChannel1 = sel1.options[sel1.selectedIndex].value
      chartGroup1.remove()
      chartGroup1 = svg1.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
      drawLine(chartGroup1, chosenChannel1, chosenSeries)
      })
    
    d3.select('#ASMR_Darling_1').attr('selected', 'selected')

    var scaleSubmit1 = dropdownDiv1.append('p').text('Click to rescale y axis with range from other channel: ')
      .append('button').attr('type', 'submit').attr('value', 'rescale1').attr('form', 'lineChannelSelect1')
      .text('rescale1')
      .on('click', function(){
        console.log('hello')
        var sel1 = document.getElementById('lineChannelSelect1')
        var chosenChannel1 = sel1.options[sel1.selectedIndex].innerText  
        var sel2 = document.getElementById('lineChannelSelect2')
        var chosenChannel2 = sel2.options[sel2.selectedIndex].innerText
        var chosenSeries = document.querySelector('input[name="lineSeriesSelect"]:checked').value
        chartGroup1.remove()
        chartGroup1 = svg1.append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);
        rescale1(chartGroup1, chosenChannel1, chosenChannel2, chosenSeries)
  
      })

    var dropdownDiv2 = d3.select('.lineSelect2').append('div').classed('form-group', true).append('label')
      .attr('for', 'lineChannelSelect2')
      .text('Listed by Subscribers Descending');
    var dropdown2 = dropdownDiv2.append('select').classed('form-control', true).attr('id', 'lineChannelSelect2');
    var dropdownOptions2 = dropdown2.selectAll('option').data(asmr_data).enter()
      .append('option')
      .text(d => d.channel_name)
      .attr('value', d => d.channel_name)
      .attr('id', d => d.channel_name.replace(/\s/g, '_') + '_2')
      
    dropdownDiv2.on('change', function(){
      var sel2 = document.getElementById('lineChannelSelect2')
      var chosenChannel2 = sel2.options[sel2.selectedIndex].value
      chartGroup2.remove()
      chartGroup2 = svg2.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

      drawLine(chartGroup2, chosenChannel2, chosenSeries)
    })

    d3.select('#ASMR_PPOMO_2').attr('selected', 'selected')

    var scaleSubmit2 = dropdownDiv2.append('p').text('Click to rescale y axis with range from other channel: ')
      .append('button').attr('type', 'submit').attr('value', 'rescale2').attr('form', 'lineChannelSelect2')
      .text('rescale2')
      .on('click', function(){
        console.log('hello')
        var sel1 = document.getElementById('lineChannelSelect1')
        var chosenChannel1 = sel1.options[sel1.selectedIndex].innerText  
        var sel2 = document.getElementById('lineChannelSelect2')
        var chosenChannel2 = sel2.options[sel2.selectedIndex].innerText
        var chosenSeries = document.querySelector('input[name="lineSeriesSelect"]:checked').value
        chartGroup2.remove()
        chartGroup2 = svg2.append("g")
          .attr("transform", `translate(${margin.left}, ${margin.top})`);
        rescale2(chartGroup2, chosenChannel2, chosenChannel1, chosenSeries)
  
      })

    var series_options = d3.keys(asmr_data[0]['time_series'])
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
        var sel1 = document.getElementById('lineChannelSelect1')
        var chosenChannel1 = sel1.options[sel1.selectedIndex].value
        var sel2 = document.getElementById('lineChannelSelect2')
        var chosenChannel2 = sel2.options[sel2.selectedIndex].value
        drawLine(chartGroup1, chosenChannel1, chosenSeries)
        drawLine(chartGroup2, chosenChannel2, chosenSeries)
      })
    d3.select('#total_subs_radio').attr('checked', 'checked')
  })
}

drawInput()

function drawLine(chartGroup, chosenChannel, chosenSeries) {
	d3.json('asmr_channels').then(function(asmr_data) {

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
    console.log(chosenChannel)
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

var chosenSeries = 'total_subs'
var chosenChannel1 = 'ASMR Darling'
var chosenChannel2 = 'ASMR PPOMO'

drawLine(chartGroup1, chosenChannel1, chosenSeries)
drawLine(chartGroup2, chosenChannel2, chosenSeries)

function rescale1(chartGroup, chosenChannel1, chosenChannel2, chosenSeries) {
  d3.json('asmr_channels').then(function(asmr_data) {

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

  var channelThis = asmr_data.filter(datum => datum.channel_name == chosenChannel1)[0]
  console.log(channelThis)
  var channelThat = asmr_data.filter(datum => datum.channel_name == chosenChannel2)[0]
  console.log(channelThat)

  var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(d3.extent(channelThis.time_series[chosenSeries], data => data.dates))
    
    var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(channelThat.time_series[chosenSeries], data => data[chosenSeries])])
    
    var bottomAxis = d3.axisBottom(xTimeScale)
    var leftAxis = d3.axisLeft(yLinearScale)

    var drawLine = d3.line()
    .x(data => xTimeScale(data.dates))
    .y(data => yLinearScale(data[chosenSeries]))
    .curve(d3.curveMonotoneX)

    chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for asmr_data
    .attr("d", drawLine(channelThis.time_series[chosenSeries]))
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
function rescale2(chartGroup, chosenChannel2, chosenChannel1, chosenSeries) {
  d3.json('asmr_channels').then(function(asmr_data) {

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
  console.log(chosenChannel2)
  console.log(chosenChannel1)
  console.log(chosenSeries)

  var channelThis = asmr_data.filter(datum => datum.channel_name == chosenChannel2)[0]
  console.log(channelThis)
  var channelThat = asmr_data.filter(datum => datum.channel_name == chosenChannel1)[0]
  console.log(channelThat)

  var xTimeScale = d3.scaleTime()
    .range([0, chartWidth])
    .domain(d3.extent(channelThis.time_series[chosenSeries], data => data.dates))
    
    var yLinearScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(channelThat.time_series[chosenSeries], data => data[chosenSeries])])
    
    var bottomAxis = d3.axisBottom(xTimeScale)
    var leftAxis = d3.axisLeft(yLinearScale)

    var drawLine = d3.line()
    .x(data => xTimeScale(data.dates))
    .y(data => yLinearScale(data[chosenSeries]))
    .curve(d3.curveMonotoneX)

    chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for asmr_data
    .attr("d", drawLine(channelThis.time_series[chosenSeries]))
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
