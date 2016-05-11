/**
 * Created by Marcel on 04.05.2016.
 */

window.onload = function() {
    var map = L.map('routingmap');

    var layer1 = L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }).addTo(map);

    map.setView([47.2760,11.4136], 12);

    var waypoints = [L.latLng(47.258582, 11.394144), L.latLng(47.265291, 11.345922)]

    var routing = L.Routing.control({
        //waypoints: waypoints,
        show : false
    }).addTo(map);

    // hash on site to send link with view
    var hash = new L.Hash(map);

    var i = 0;
    var firstpoint = null;
    map.on("click", function(event){
        // Own
        // if (i == 0){
        //     var start = L.latLng(event.latlng.lat,event.latlng.lng);
        //     waypoints[i] = start;
        //     console.log(start,i);
        //     i += 1
        //
        // }
        // else if (i == 1){
        //     var end = L.latLng(event.latlng.lat,event.latlng.lng);
        //     waypoints[i] = end;
        //     console.log(end, i);
        //     console.log(waypoints)
        //     i = 0
        //     routing.setWaypoints(waypoints);
        // }
        
        // Klaus
        if (firstpoint){
            routing.setWaypoints([firstpoint,L.latLng(event.latlng)]).show();
            firstpoint = null;
        }
        else {
            routing.hide();
            firstpoint = L.latLng(event.latlng);
        }



    });

    // routing: setwaypoints
};




