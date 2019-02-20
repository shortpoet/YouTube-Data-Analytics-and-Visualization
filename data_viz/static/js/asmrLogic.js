// Creating map object
var map = L.map("map", {
  center: [34.681771, -47.031195],
  zoom: 4
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);

var link = "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json"



// Function that will determine the color of a neighborhood based on the borough it belongs to
function chooseColor(country) {
  switch (country) {
  
  case "Australia":
    return "#98ee00";
  case "Belgium":
    return "#bddd1c";
  case "Canada":
    return "#bddd1c";
  case "China":
    return "#98ee00";
  case "Costa Rica":
    return "#98ee00";
  case "Denmark":
    return "#98ee00";
  case "United Kingdom":
    return "#d86615";
  case "Israel":
    return "#98ee00";
  case "South Korea":
    return "#ead116";
  case "Poland":
    return "#98ee00";
  case "Russia":
    return "#ea9917";
  case "Spain":
    return "#98ee00";
  case "Sweden":
    return "#98ee00";
  case "United States of America":
    return "#d11919";
  
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(link, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.name),
        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        // click: function(event) {
        //   map.fitBounds(event.target.getBounds());
        // }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.name)
      //  + "</h1> <hr> <h2>" + feature.properties.borough + "</h2>");

    }
  }).addTo(map);

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
    channels = [0, 1, 2, 3, 5, 15],
    labels = ["#98ee00", "#bddd1c", "#ead116", "#ea9917", "#d86615", "#d11919"];

    // Add title to the legend box
    div.innerHTML = "<p>Channel Frequency</p><hr>"

    // loop through our channels and generate a label with a colored square for each interval
    for (var i = 0; i < channels.length; i++) {
         
      div.innerHTML +=
            '<i style="background:' + labels[i] + '"></i> ' +
            channels[i] + (channels[i + 1] ? '&ndash;' + channels[i + 1] + '<br>' : '+');
}

    return div;
    };

legend.addTo(map);


});
