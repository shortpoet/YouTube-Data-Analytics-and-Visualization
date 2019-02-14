// @TODO: YOUR CODE HERE!
var svgWidth = 960 * 1.25;
var svgHeight = 500 * 1.25;

var margin = {
  top: 20,
  right: 40,
  bottom: 80,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var scatterSvg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = scatterSvg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "subscribers";
var chosenYAxis = "uploads";

// function used for updating x-scale var upon click on axis label
function xScale(asmrData, chosenXAxis) {
    // create scales
    var xLinearScale = d3.scaleLinear()
      .domain([d3.min(asmrData, d => d[chosenXAxis]) * 0.8,
        d3.max(asmrData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);
  
    return xLinearScale;
  
  }
// function used for updating y-scale var upon click on axis label
function yScale(asmrData, chosenYAxis) {
    // create scales
    var yLinearScale = d3.scaleLinear()
      .domain([d3.min(asmrData, d => d[chosenYAxis]) * 0.8,
        d3.max(asmrData, d => d[chosenYAxis]) * 1.2
      ])
      .range([height, 0]);
  
    return yLinearScale;
  
  }
   
  // function used for updating xAxis var upon click on axis label
  function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
  }
  // function used for updating yAxis var upon click on axis label
  function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);
  
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
  }
  
  // function used for updating circles group with a transition to
  // new circles
  function renderCircles(circlesGroup, newXScale, chosenXaxis, newYScale, chosenYaxis) {
  
    circlesGroup.transition()
      .duration(1000)
      .attr("cx", d => newXScale(d[chosenXAxis]))
      .attr("cy", d => newYScale(d[chosenYAxis]));
  
    return circlesGroup;
  }
  
  function renderLabels(circleLabels, newXScale, chosenXaxis, newYScale, chosenYaxis) {
  
    circleLabels.transition()
      .duration(1000)
      .attr("x", d => newXScale(d[chosenXAxis]))
      .attr("y", d => newYScale(d[chosenYAxis]));
  
    return circleLabels;
  }
  
  // function used for updating circles group with new tooltip
  function updateToolTip(chosenXAxis, chosenYAxis, circlesGroup) {
  
    if (chosenXAxis === "subscribers") {
      var xlabel = "Subscribers";
    }
    else if (chosenXAxis === "views") {
      var xlabel = "Views";
    }
    
    if (chosenYAxis === "uploads") {
      var ylabel = "Uploads";
    }
    else if (chosenYAxis === "channel_age") {
      var ylabel = "Channel Age";
    }
    else if (chosenYAxis === "upload_frequency") {
        var ylabel = "Upload Frequency";
      }
    else {
      var ylabel = "Comment Count";
    }
  
    // var toolTip = d3.tip()
    //   .attr("class", "d3-tip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.state}<br>${xlabel}: ${d[chosenXAxis]}<br>${ylabel}: ${d[chosenYAxis]}`);
    //   });
  
    // circlesGroup.call(toolTip);
  
    // circlesGroup.on("mouseover", function(data) {
    //   toolTip.show(data, this);
    // })
    //   // onmouseout event
    //   .on("mouseout", function(data, index) {
    //     toolTip.hide(data);
    // });
  
    return circlesGroup;
  }
function average(dataset, column) {
  dataset = dataset.map(d => d[column])
  return (dataset.reduce((a,b) => a + b))/dataset.length
}

d3.json('asmr_channels').then(function(asmrData) {
  Object.entries(asmrData).forEach((k,v) => {
    var channel_name = k['channel_name']
  })
  
  // asmrData.forEach(data => {
  //     var uploads = +data.uploads
  //     var subscribers = +data.subs
  //     var views = +data.views
  //     var channel_name = data.channel_name

  //     var diff_hours = now - new Date('2015-08-14T00:00:00')/1000/3600/24

  // })
  console.log(asmrData)
  var headers = d3.keys(asmrData['Angelica'])
  console.log(headers)
    // headers = headers.slice(1,4).concat(headers.slice(5,6)).concat(headers.slice(7,8)).concat(headers.slice(9,10)).concat(headers.slice(12,13)).concat(headers.slice(15,16))
    // var table = d3.select('.data').append('table').classed('table table-striped table-sortable', true)
    // var thead = table.append('thead')
    // var headrow = thead.append('tr')
    // var averageRow = thead.append('tr').attr('class', 'avgerageRow').html(`<td class="row_0"><strong>Average</strong></td class="row_0"><td></td><td class="row_0">${average(asmrData, 'subscribers')}</td><td class="row_0">${average(asmrData, 'age')}</td><td class="row_0">${average(asmrData, 'income')}</td><td class="row_0">${average(asmrData, 'healthcare')}</td><td class="row_0">${average(asmrData, 'uploads')}</td><td class="row_0">${average(asmrData, 'smokes')}</td>`)
    // var tbody = d3.select('table').append('tbody')
    // var content = tbody.selectAll('tr').data(asmrData).enter().append('tr').html((data, i) => `<td class="col_0 row_${i + 1}">${data.state}</td><td class="col_1 row_${i + 1}">${data.abbr}</td><td class="col_2 row_${i + 1}">${data.subscribers}</td><td class="col_3 row_${i + 1}">${data.age}</td><td class="col_4 row_${i + 1}">${data.income}</td><td class="col_5 row_${i + 1}">${data.healthcare}</td><td class="col_6 row_${i + 1}">${data.uploads}</td><td class="col_7 row_${i + 1}">${data.smokes}</td>`).on('mouseover', function(d, i) {
    //                      d3.select(this).style('background-color', 'rgb(0, 14, 142').style('color', 'silver')
    //                     //  d3.selectAll('td.col_' + i).style('background-color', 'purple')
    //                     //  console.log(this)
    //                    })
    //                    .on('mouseout', function(d, i) {
    //                      d3.select(this).style('background-color', null).style('color', null)
    //                     //  d3.selectAll('td.col_' + i).style('background-color', null)
    //                      d3.select('.data').append('table').classed('table table-striped table-sortable', true)
    //                   })
  // d3.selectAll('td.col_2').style("background-color", function(d, i){
  //   return colorScale(i);
  // });

  // function colorScale(i){
  //   var color = d3.scaleLinear()
  //     .domain([0, content.selectAll("tr").length-1])
  //     .interpolate(d3.interpolateRgb)
  //     .range(["orange", "silver"]);

  //   return color(i);
  // }
              
    // var sortAscending = true
    // headrow.selectAll('th').data(headers).enter().append('th').attr('class', (d, i) => `sortable col_${i + 1}`).attr('value', d => d).text(d => d).on('click',function(d, i) {
    //   headrow.selectAll('th').attr('class', 'sortable')
    //   var sort_value = d3.select(this).attr('value')
    //   if (sortAscending === true) {
    //     content.sort((a,b) => d3.ascending(a[sort_value], b[sort_value]))
    //     sortAscending = false
    //     d3.select(this).attr('class', 'asc')
    //     //d3.select(this).append('span').attr('class', 'glyphicon glyphicon-triangle-bottom')
    //     // d3.select(this).classed('asc', false).classed('desc', true)
    //   } else {
    //     content.sort((a,b) => d3.descending(a[sort_value], b[sort_value]))
    //     sortAscending = true
    //     d3.select(this).attr('class', 'desc')
    //     // d3.select(this).html(`<th>${d3(select(this).text())}</th><span class="glyphicon glyphicon-triangle-bottom"></span>`)
    //     // d3.select(this).classed('asc', true).classed('desc', false)
    //   }
    // })
    
    // xLinearScale function above csv import
  var xLinearScale = xScale(asmrData, chosenXAxis);
  var yLinearScale = yScale(asmrData, chosenYAxis);

  // Create initial axis functions
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // append x axis
  var xAxis = chartGroup.append("g")
    .classed("x-axis", true)
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);
  // append y axis
  var yAxis = chartGroup.append("g")
    .classed("y-axis", true)
    //.attr("transform", `translate(${width})`)
    .call(leftAxis);


  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(asmrData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("opacity", ".5")
    .classed('channelCircle', true)

  var circleLabelsGroup = chartGroup.append('g')
    .classed('stateText', true)

  var circleLabels = circleLabelsGroup.selectAll('text')
    .data(asmrData)
    .enter()
    .append('text')
    .text(d => d.channel_name)
    .attr('x', d =>  xLinearScale(d[chosenXAxis]))
    .attr('y', d =>  yLinearScale(d[chosenYAxis]))
    .classed('circleLabel', true)

  // Create group for  2 x- axis labels
  var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`)
    .classed("axis-text", true);
  var yLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${-(margin.left)}, ${(height / 2)}) rotate(-90)`)
    //.attr("dy", "1em")
    //.classed("axis-text", true);


  

  var subscribersLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "subscribers") // value to grab for event listener
    .classed("active", true)
    .text("Subscribers");

  var viewsLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "views") // value to grab for event listener
    .classed("inactive", true)
    .text("Views");
  
  var uploadsLabel = yLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "uploads") // value to grab for event listener
    .classed("active", true)
    .text("Uploads");

  var channelAgeLabel = yLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "channel_age") // value to grab for event listener
    .classed("inactive", true)
    .text("Channel Age");
  
  var uploadFrequencyLabel = yLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "upload_frequency") // value to grab for event listener
    .classed("inactive", true)
    .text("Upload Frequency");

    var commentCountLabel = yLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("value", "comment_count") // value to grab for event listener
    .classed("inactive", true)
    .text("Comment Count");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  // x axis labels event listener
  xLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenXAxis) {

        // replaces chosenXAxis with value
        chosenXAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        xLinearScale = xScale(asmrData, chosenXAxis);

        // updates x axis with transition
        xAxis = renderXAxes(xLinearScale, xAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
       
        // updates labels with new x values
        circleLabels = renderLabels(circleLabels, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenXAxis === "subscribers") {
          subscribersLabel
            .classed("active", true)
            .classed("inactive", false);
          viewsLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          subscribersLabel
            .classed("active", false)
            .classed("inactive", true);
          viewsLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
  yLabelsGroup.selectAll("text")
    .on("click", function() {
      // get value of selection
      var value = d3.select(this).attr("value");
      if (value !== chosenYAxis) {

        // replaces chosenXAxis with value
        chosenYAxis = value;

        // console.log(chosenXAxis)

        // functions here found above csv import
        // updates x scale for new data
        yLinearScale = yScale(asmrData, chosenYAxis);

        // updates x axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates labels with new x values
        circleLabels = renderLabels(circleLabels, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "uploads") {
          uploadsLabel
            .classed("active", true)
            .classed("inactive", false);
          channelAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          uploadFrequencyLabel
            .classed("active", false)
            .classed("inactive", true);
          commentCountLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenYAxis === "channel_age") {
          uploadsLabel
            .classed("active", false)
            .classed("inactive", true);
          channelAgeLabel
            .classed("active", true)
            .classed("inactive", false);
          uploadFrequencyLabel
            .classed("active", false)
            .classed("inactive", true);
          commentCountLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenYAxis === "upload_frequency") {
          uploadsLabel
            .classed("active", false)
            .classed("inactive", true);
          channelAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          uploadFrequencyLabel
            .classed("active", true)
            .classed("inactive", false);
          commentCountLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          uploadsLabel
            .classed("active", false)
            .classed("inactive", true);
          channelAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          uploadFrequencyLabel
            .classed("active", false)
            .classed("inactive", true);
          commentCountLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
 
  
  });
  






