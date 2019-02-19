
// Create the Traces


// var peopleTrace1 = {
//   x: people250.map(x => x['Total Uploads']),
//   y: people250.map(x => x['Total Video Views']),
//   mode: "markers",
//   type: "scatter",
//   name: "Uploads vs Total Views",
//   marker: {
//     color: "#2077b4",
//     symbol: "hexagram"
//   }
// };
// -------------------------------------------------



var bubbleData = [
  {
    x: people250.map(x => x['Subscribers']),
    y: people250.map(x => x['Total Video Views']),
    text: people250.map(x => x['Username']),
    mode: "markers",
    marker: {
      size: 10,
      // color: otu_ids,
      colorscale: "Earth"
    }
  }
];

var bubbleLayout = {
  margin: { t: 0 },
  hovermode: "closest",
  xaxis: { title: "Subs vs Views" }
};

Plotly.plot("peoplePlot1", bubbleData, bubbleLayout);


// -------------------------------------------------






var peopleTrace2 = {
  x: people250.map(x => x['Subscribers']),
  y: people250.map(x => x['Total Video Views']),
  mode: "markers",
  type: "scatter",
  name: "Subscribers vs Total Views",
  marker: {
    color: "#2077b4",
    symbol: "hexagram"
  }
};

var entertainmentTrace1 = {
  x: entertainment250.map(x => x['Total Uploads']),
  y: entertainment250.map(x => x['Total Video Views']),
  mode: "markers",
  type: "scatter",
  name: "Uploads vs Total Views",
  marker: {
    color: "orange",
    symbol: "diamond-x"
  }
};

var entertainmentTrace2 = {
  x: entertainment250.map(x => x['Subscribers']),
  y: entertainment250.map(x => x['Total Video Views']),
  mode: "markers",
  type: "scatter",
  name: "Subscribers vs Total Views",
  marker: {
    color: "orange",
    symbol: "diamond-x"
  }
};



// Create the data array for the People: Uploads vs Views plot
// var peopleData1 = [peopleTrace1];



// var peopleLayout1 = {
//   title: "Total Views vs Uploads",
//   xaxis: { title: "Total Uploads" },
//   yaxis: { title: "Total Video Views" }
// };

// // Plot the chart to a div tag with id "peoplePlot1"
// Plotly.newPlot("peoplePlot1", peopleData1, peopleLayout1);


// Create the data array for the People: Subs vs Views plot
var peopleData2 = [peopleTrace2];


// Define the plot layout
var peopleLayout2 = {
  title: "Total Views vs Uploads",
  xaxis: { title: "Subscribers" },
  yaxis: { title: "Total Video Views" }
};

// Plot the chart to a div tag with id "peoplePlot2"
Plotly.newPlot("peoplePlot2", peopleData2, peopleLayout2);

// -------------------------------------------------------------------------------------------------------------------


// Create the data array for the Entertainment: Uploads vs Views plot
var entertainmentData1 = [entertainmentTrace1];

// Define the plot layout
var entertainmentLayout1 = {
  title: "Total Views vs Uploads",
  xaxis: { title: "Total Uploads" },
  yaxis: { title: "Total Video Views" }
};

// Plot the chart to a div tag with id "entertainmentPlot1"
Plotly.newPlot("entertainmentPlot1", entertainmentData1, entertainmentLayout1);

// Create the data array for the Entertainment: Subs vs Views plot
var entertainmentData2 = [entertainmentTrace2];

var entertainmentLayout2 = {
  title: "Total Views vs Uploads",
  xaxis: { title: "Subscribers" },
  yaxis: { title: "Total Video Views" }
};

// Plot the chart to a div tag with id "entertainmentPlot2"
Plotly.newPlot("entertainmentPlot2", entertainmentData2, entertainmentLayout2);
