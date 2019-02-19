// @TODO: YOUR CODE HERE!
var svgWidth = 960 * 1.25;
var svgHeight = 600 * 1.25;

var margin = {
  top: 20,
  right: 40,
  bottom: 125,
  left: 20
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
var chosenXAxis = "subs";
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
  
    if (chosenYAxis === "subs") {
      var ylabel = "Subscribers";
    }
    else if (chosenYAxis === "views") {
      var ylabel = "Views";
    }
    
    if (chosenXAxis === "uploads") {
      var xlabel = "Uploads";
    }
    else if (chosenXAxis === "channel_age") {
      var xlabel = "Channel Age";
    }
    else if (chosenXAxis === "upload_frequency") {
        var xlabel = "Days Between Uploads";
      }
    else if (chosenXAxis === "avg_views_video") {
      var xlabel = "Average Views / Video";
    }
    else if (chosenXAxis === "avg_views_subscriber") {
      var xlabel = "Average Views / Subscriber";
    }
  
    var toolTip = d3.tip()
      .attr("class", "d3-tip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.channel_name}<br>${xlabel}: ${d[chosenXAxis]}<br>${ylabel}: ${d[chosenYAxis]}`);
      });
  
    circlesGroup.call(toolTip);
  
    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data, this);
    })
      // onmouseout event
      .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });
  
    return circlesGroup;
  }
function average(dataset, column) {
  dataset = dataset.map(d => d[column])
  return (dataset.reduce((a,b) => a + b))/dataset.length
}

d3.json('asmr_channels').then(function(asmrData) {
  
  asmrData.forEach(data => {
      data.uploads = +data.uploads
      data.subs = +data.subs
      data.views = +data.views
      data.avg_views_video = +data.avg_views_video
      data.avg_views_subscriber = +data.avg_views_subscriber
      data.upload_frequency = +data.upload_frequency
      data.channel_age = +data.channel_age
  })
  console.log(asmrData)
    
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
    .attr("transform", `translate(${width-margin.right})`)
    .call(leftAxis);


  // append initial circles
  var circlesGroup = chartGroup.selectAll("circle")
    .data(asmrData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d[chosenXAxis]))
    .attr("cy", d => yLinearScale(d[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", d => d.gender === "M" ? "blue" : "pink")
    .attr("opacity", ".8")
    .classed('channelCircle', true)

  var circleLabelsGroup = chartGroup.append('g')
    .classed('circleLabelGroup', true)

  var circleLabels = circleLabelsGroup.selectAll('text')
    .data(asmrData)
    .enter()
    .append('text')
    .attr('x', d =>  xLinearScale(d[chosenXAxis]))
    .attr('y', d =>  yLinearScale(d[chosenYAxis]))
    .classed('circleLabel', true)

  // Create group for  2 x- axis labels
  var xLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${width / 2}, ${height})`)
    .classed("axis-text", true);
  var yLabelsGroup = chartGroup.append("g")
    .attr("transform", `translate(${(width-margin.right)}, ${(height / 2)}) rotate(-90)`)
    //.attr("dy", "1em")
    //.classed("axis-text", true);


  

  var subsLabel = yLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 20)
    .attr("value", "subs") // value to grab for event listener
    .classed("active", true)
    .text("Subscribers");

  var viewsLabel = yLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "views") // value to grab for event listener
    .classed("inactive", true)
    .text("Views");
  
  var uploadsLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 40)
    .attr("value", "uploads") // value to grab for event listener
    .classed("active", true)
    .text("Uploads");

  var channelAgeLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 60)
    .attr("value", "channel_age") // value to grab for event listener
    .classed("inactive", true)
    .text("Channel Age");
  
  var uploadFrequencyLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 80)
    .attr("value", "days_btw_uploads") // value to grab for event listener
    .classed("inactive", true)
    .text("Days Between Uploads");

    var avgVidViewsLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 100)
    .attr("value", "avg_100k_views_video") // value to grab for event listener
    .classed("inactive", true)
    .text("Average 100k Views / Video");
    
    var avgVidSubsLabel = xLabelsGroup.append("text")
    .attr("x", 0)
    .attr("y", 120)
    .attr("value", "avg_100k_views_subscriber") // value to grab for event listener
    .classed("inactive", true)
    .text("Average 100k Views / Subscribers");

  // updateToolTip function above csv import
  var circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

  // x axis labels event listener
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
        yLinearScale = xScale(asmrData, chosenYAxis);

        // updates x axis with transition
        yAxis = renderYAxes(yLinearScale, yAxis);

        // updates circles with new x values
        circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);
       
        // updates labels with new x values
        circleLabels = renderLabels(circleLabels, xLinearScale, chosenXAxis, yLinearScale, chosenYAxis);

        // updates tooltips with new info
        circlesGroup = updateToolTip(chosenXAxis, chosenYAxis, circlesGroup);

        // changes classes to change bold text
        if (chosenYAxis === "subs") {
          subsLabel
            .classed("active", true)
            .classed("inactive", false);
          viewsLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else {
          subsLabel
            .classed("active", false)
            .classed("inactive", true);
          viewsLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
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
        if (chosenXAxis === "uploads") {
          uploadsLabel
            .classed("active", true)
            .classed("inactive", false);
          channelAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          uploadFrequencyLabel
            .classed("active", false)
            .classed("inactive", true);
          avgVidViewsLabel
            .classed("active", false)
            .classed("inactive", true);
          avgVidSubsLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "channel_age") {
          uploadsLabel
            .classed("active", false)
            .classed("inactive", true);
          channelAgeLabel
            .classed("active", true)
            .classed("inactive", false);
          uploadFrequencyLabel
            .classed("active", false)
            .classed("inactive", true);
          avgVidViewsLabel
            .classed("active", false)
            .classed("inactive", true);
          avgVidSubsLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "days_btw_uploads") {
          uploadsLabel
            .classed("active", false)
            .classed("inactive", true);
          channelAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          uploadFrequencyLabel
            .classed("active", true)
            .classed("inactive", false);
          avgVidViewsLabel
            .classed("active", false)
            .classed("inactive", true);
          avgVidSubsLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "avg_100k_views_video") {
          uploadsLabel
            .classed("active", false)
            .classed("inactive", true);
          channelAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          uploadFrequencyLabel
            .classed("active", false)
            .classed("inactive", true);
          avgVidViewsLabel
            .classed("active", true)
            .classed("inactive", false);
          avgVidSubsLabel
            .classed("active", false)
            .classed("inactive", true);
        }
        else if (chosenXAxis === "avg_100k_views_subscriber") {
          uploadsLabel
            .classed("active", false)
            .classed("inactive", true);
          channelAgeLabel
            .classed("active", false)
            .classed("inactive", true);
          uploadFrequencyLabel
            .classed("active", false)
            .classed("inactive", true);
          avgVidViewsLabel
            .classed("active", false)
            .classed("inactive", true);
          avgVidSubsLabel
            .classed("active", true)
            .classed("inactive", false);
        }
      }
    });
 
  
  });
  






