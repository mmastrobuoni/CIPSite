var mymap = L.map('mapid').setView([42.386967, -71.098598], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(mymap);

var ciplayer;
var selection;
var selectedLayer;

// define the styles for the CIP layer (unselected and selected)
function cipStyle(feature) {
  return {
    fillColor: "#a6bddb",
    fillOpacity: 0.5,
    color: '#a6bddb',
  };
}

function cipSelectedStyle(feature) {
  return {
    fillColor: "#2b8cbe",
    color: '#2b8cbe',
    fillOpacity: 0.8
  };
}

// handle click events on cip features
function cipOnEachFeature(feature, layer){
  layer.on({
    click: function(e) {
      if (selection) {            
        resetStyles();
      }
              
      e.target.setStyle(cipSelectedStyle());
      selection = e.target;
      selectedLayer = cipLayer;

      // Insert some HTML with the feature name
      buildSummaryLabel(feature);

      L.DomEvent.stopPropagation(e); // stop click event from being propagated further
    }
  });
}

// add the cip GeoJSON layer using the gardensData variable from cip.js
var cipLayer = new L.geoJSON(cipData,{
  style: cipStyle,
  onEachFeature: cipOnEachFeature
});    
               
cipLayer.addTo(mymap);

// handle clicks on the map that didn't hit a feature
mymap.addEventListener('click', function(e) {
  if (selection) {
    resetStyles();
    selection = null;
    document.getElementById('summaryLabel').innerHTML = '<p>Click a project on the map to get more information.</p>';
  }
});
