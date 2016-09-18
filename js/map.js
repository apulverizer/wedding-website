var streets = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
});

var imagery = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

var topo = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

var weddingIcon = new L.Icon({
    iconUrl: "https://cdn4.iconfinder.com/data/icons/wedding-vol-2/48/78-512.png",
    iconSize: [30,30]
});

var lodgingIcon = new L.Icon({
    iconUrl: "https://d30y9cdsu7xlg0.cloudfront.net/png/4398-200.png",
    iconSize: [30,30]
});

var eventsGroupLayer = L.layerGroup([
    L.marker([44.182488, -73.964446]).setIcon(weddingIcon)
    .bindPopup('<b><a href="http://www.adk.org/page.php?pname=adirondak-loj">Adirondack Loj at Heart Lake</a></b><br/><img style="width:100%" src="https://media-cdn.tripadvisor.com/media/photo-s/01/c0/33/3a/adirondack-mountain-loj.jpg"/>Location of Wedding and Reception.'),
]);
var lodgingGroupLayer = L.layerGroup([
    L.marker([44.287367, -73.985532]).setIcon(lodgingIcon)
    .bindPopup('<b><a href="http://www.hotelnorthwoods.com/">Hotel North Woods</a></b><br/><img style="width:100%" src="http://www.hotelnorthwoods.com/wp-content/uploads/2015/08/HNW_Outdoors-4_edited_sm.jpg"/>Potential Hotel with some blocked out rooms.')
]);

var mymap = L.map('mapid', {
    center: [44.241873, -73.982381],
    zoom: 11,
    layers: [streets, eventsGroupLayer],
});

mymap.on('popupopen', function(e) {
    var px = mymap.project(e.popup._latlng);
    px.y -= e.popup._container.clientHeight/2
    mymap.panTo(mymap.unproject(px),{animate: true});
});

var baseMaps = {
    "Streets" : streets,
    "Imagery" : imagery,
    "Topo" : topo
};

var overlayMaps = {
    "Events" : eventsGroupLayer,
    "Lodging" : lodgingGroupLayer
}

L.control.layers(baseMaps, overlayMaps, {collapsed:false, position: 'topright'}).addTo(mymap);

