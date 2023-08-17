mapboxgl.accessToken = 'pk.eyJ1IjoicGV0ZWhpbGxqbnIiLCJhIjoiY2swcjZtd3IxMDJjOTNjb3c1Z25wczQ3NyJ9.2Ut4kmGeVuvc7UUb-qezNw';

var URL_BASE = "https://www.geelong.stantec.online/v1/mvt/nzta.aggregates/{z}/{x}/{y}?geom_column=geom&columns=map_id%2Cscrim";
var layerName = 'nzta.aggregates';
var sourceName = 'pg_agg';

var selectedFeatureId = 0;
var hoveredFeatureId = null;
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
});

var map = new mapboxgl.Map({
    style: 'mapbox://styles/mapbox/light-v10',
    center: [173.8, -42.2],
    zoom: 4,
    pitch: 0,
    bearing: 0,
    container: 'map',
    antialias: true
});

map.on('style.load', function() {
    map.resize();
    addSource();
    addLayer();

});

map.on('load', function() {
    map.resize();
    buildLegend();
});

map.on('mousemove', sourceName, function(e) {
    if (e.features.length > 0) {

        if (hoveredFeatureId !== null) {
            map.setFeatureState({ source: sourceName, sourceLayer: layerName, id: hoveredFeatureId }, { hover: false });
        }

        var initialInfo = `<span style="font-size: 16px"><strong>${e.features[0].properties.streetname}</strong></span></br>
                              <i>${e.features[0].properties.fromstreet} to </br>${e.features[0].properties.tostreet}</i>`;

        $("#info").html(initialInfo + `</br>
                              Loading feature info ...
                              `);
        hoveredFeatureId = e.features[0].id;
        map.setFeatureState({ source: sourceName, sourceLayer: layerName, id: hoveredFeatureId }, { hover: true });
        getSelectedItem(hoveredFeatureId);
    }
});



map.on('mouseleave', sourceName, function() {
    if (hoveredFeatureId !== null) {
        map.setFeatureState({ source: sourceName, sourceLayer: layerName, id: hoveredFeatureId }, { hover: false });
    }
    getSelectedItem(selectedFeatureId);

    hoveredFeatureId = null;
});

function addSource() {
    map.addSource(sourceName, {
        'type': 'vector',
        'tiles': [URL_BASE],
        'promoteId': 'map_id'
    });
}

function addLayer() {
    map.addLayer({
        'id': sourceName,
        'type': 'circle',
        'source': sourceName,
        'source-layer': layerName,
        'minzoom': 0,
        'maxzoom': 22,
        'paint': {
            'circle-radius': [
                    'case',
                    ['boolean', ['feature-state', 'hover'], false],
                    8,
                    3
                ],
            'circle-color': [
                'interpolate',
                // Set the exponential rate of change to 0.5
                ['linear'],
                ['get', 'scrim'],
                0.0, '#eb3434',
                0.45, '#ffff00',
                0.6, '#00631b',
                1, '#00ffff'
            ]
        }
    });
}

function buildLegend() {

    var width = d3.select('#legend').node().getBoundingClientRect().width
    var height = d3.select('#legend').node().getBoundingClientRect().height

    var margin = {
        top: 5,
        right: 40,
        bottom: 5,
        left: 40
    };

    var svg = d3.select('#legend')
        .append("svg")
        .attr("width", width)
        .attr("height", 100)

    var defs = svg.append("defs");


    /*var coloursRainbow = [{offset: 0, colour: '#eb3434'},
                          {offset: 0.3, colour: '#ffb300'},
                          {offset: 0.4, colour: '#ffff00'},
                          {offset: 0.55, colour: '#00ff00'},
                          {offset: 1, colour: '#00ffff'}];
    */
    var coloursRainbow = ['#eb3434', '#ffff00', '#00631b', '#00ffff'];
    var baseLevels = [0, 0.45, 0.6, 1];

    var colorScaleRainbow = d3.scale.linear()
        .domain(baseLevels)
        .range(coloursRainbow)
        .interpolate(d3.interpolateHcl);

    var legendWidth = width * 0.8,
        legendHeight = 10;

    defs.append("linearGradient")
        .attr("id", "gradient-rainbow-colors")
        .attr("x1", "0%").attr("y1", "0%")
        .attr("x2", "100%").attr("y2", "0%")
        .selectAll("stop")
        .data(coloursRainbow)
        .enter().append("stop")
        .attr("offset", function(d, i) { return baseLevels[i] })
        .attr("stop-color", function(d) { return d; });

    //Color Legend container
    var legendsvg = svg.append("g")
        .attr("class", "legendWrapper")
        .attr("transform", "translate(" + ((width - legendWidth) / 2) + ",20)");

    legendsvg.append("rect")
        .attr("class", "legendRect")
        .attr("x", 0)
        .attr("y", 10)
        //.attr("rx", legendHeight/2)
        .attr("width", legendWidth)
        .attr("height", legendHeight)
        .style("fill", "none");

    legendsvg.append("text")
        .attr("class", "legendTitle")
        .attr("x", legendWidth / 2)
        .attr("y", -2)
        .text("SCRIM ESC Readings");

    var xScale = d3.scale.linear()
        .range([0, legendWidth])
        .domain([0, 1])

    var xAxis = d3.svg.axis()
        .orient("bottom")
        .ticks(5) //Set rough # of ticks
        //.tickFormat(formatPercent)
        .scale(xScale);

    //Set up X axis
    legendsvg.append("g")
        .attr("class", "axis") //Assign "axis" class
        .attr("transform", "translate(" + (-2) + "," + (10 + legendHeight) + ")")
        .call(xAxis);

    svg.select(".legendRect")
        .style("fill", "url(#gradient-rainbow-colors)");

}

function updateMap() {
    var filter = getQueryFilters();

    var source_url = URL_BASE + "&filter=" + encodeURI(filter);
    map.getSource(sourceName).setTiles([source_url]);
    //map.triggerRepaint();
}

function getSelectedItem(id) {
    console.log(id)
    $("#map-t1 tr").remove();
    $("#map-t2 tr").remove();

    var data = tempDim.top(Infinity).filter(function(d) { return d.map_id == id })

    console.log( data.map(function(d) { return d.scrim;}))
    if(data.length > 0) {
        data = data[0];    
        $('#map-t1').append(`<tr><td class="table-stat-title">SCRIM ESC</td><td class="table-stat-value">${data["scrim"]}</td></tr>`);
        $('#map-t1').append(`<tr><td class="table-stat-title">Contract</td><td class="table-stat-value">${data["contract"]}</td></tr>`);
        $('#map-t1').append(`<tr><td class="table-stat-title">Aggregate Source</td><td class="table-stat-value">${data["source"]}</td></tr>`);
        $('#map-t1').append(`<tr><td class="table-stat-title">PSV</td><td class="table-stat-value">${data["psv"]}</td></tr>`);
        $('#map-t1').append(`<tr><td class="table-stat-title">Surface Age</td><td class="table-stat-value">${data["age"]}</td></tr>`);
        $('#map-t1').append(`<tr><td class="table-stat-title">Surface Material</td><td class="table-stat-value">${data["material"]}</td></tr>`);
        $('#map-t1').append(`<tr><td class="table-stat-title">Surface Category</td><td class="table-stat-value">${data["surf_category"]}</td></tr>`);
        $('#map-t1').append(`<tr><td class="table-stat-title">Surface Function</td><td class="table-stat-value">${data["function"]}</td></tr>`);

        $('#map-t2').append(`<tr><td class="table-stat-title">ONRC Hierarchy</td><td class="table-stat-value">${data["hierarchy"]}</td></tr>`);
        $('#map-t2').append(`<tr><td class="table-stat-title">Urban / Rural</td><td class="table-stat-value">${data["urban_rural"]}</td></tr>`);
        $('#map-t2').append(`<tr><td class="table-stat-title">Skid Site</td><td class="table-stat-value">${data["skid_site"]}</td></tr>`);
        $('#map-t2').append(`<tr><td class="table-stat-title">AADT Band</td><td class="table-stat-value">${data["traffic"]}</td></tr>`);
        $('#map-t2').append(`<tr><td class="table-stat-title">Heavy AADT Band</td><td class="table-stat-value">${data["heavy"]}</td></tr>`);
        $('#map-t2').append(`<tr><td class="table-stat-title">Curvature Band</td><td class="table-stat-value">${data["curvature"]}</td></tr>`);
        $('#map-t2').append(`<tr><td class="table-stat-title">Gradient (%) (mm)</td><td class="table-stat-value">${data["gradient"]}</td></tr>`);
        $('#map-t2').append(`<tr><td class="table-stat-title">MPD (mm)</td><td class="table-stat-value">${data["mpd"]}</td></tr>`);

    }
}