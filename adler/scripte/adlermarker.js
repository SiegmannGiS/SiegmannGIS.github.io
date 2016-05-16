/**
 * Created by Marcel on 27.04.2016.
 * shows three etappes of the Adlerweg
 * Panoramio integration
 * wiki articles integration
 */

window.onload = function() {

    var schichten = { // http://www.basemap.at/wmts/1.0.0/WMTSCapabilities.xml
        geolandbasemap: L.tileLayer("http://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmapoverlay: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmapgrau: L.tileLayer("http://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmaphidpi: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        bmaporthofoto30cm: L.tileLayer("http://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        })
    };

    var map = L.map('karte', {
        layers: [schichten.geolandbasemap]
    });

    var baselayers = {
        "Geoland Basemap": schichten.geolandbasemap,
        "Geoland Basemap Overlay": schichten.bmapoverlay,
        "Geoland Basemap Grau": schichten.bmapgrau,
        "Geoland Basemap High DPI": schichten.bmaphidpi,
        "Geoland Basemap Orthofoto": schichten.bmaporthofoto30cm
    }

    L.control.scale({
        'imperial': true
    }).addTo(map);

    // elevation
    var el = L.control.elevation({
        position: "bottomleft",
        collapsed: "True"
    }).addTo(map)

    var adler01 = L.geoJson(adlerjson01, {
        style: {
            color: "#ff120f"
        }, onEachFeature: el.addData.bind(el)

    })
    adler01.bindPopup("<a href='http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-1-st-johann-gaudeamushuette'><h3>Adlerwege Nr.1</h3></a>")
    var adler02 = L.geoJson(adlerjson02, {
        style: {
            color: "blue"
        }, onEachFeature: el.addData.bind(el)
    })
    adler02.bindPopup("<a href='http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-2-gaudeamushuette-hintersteiner-see'><h3>Adlerwege Nr.2</h3></a>")
    var adler03 = L.geoJson(adlerjson03, {
        style: {
            color: "green"
        }, onEachFeature: el.addData.bind(el)
    })
    adler03.bindPopup("<a href='http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-3-hintersteiner-see-kufstein'><h3>Adlerweg Nr.3</h3></a>")

    var alladler = L.featureGroup([adler01, adler02, adler03]);

    map.addLayer(alladler);
    map.fitBounds(alladler);

    var bounds = alladler.getBounds();

    // Panoramio integration
    var url = "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20" +
        "&minx=" + bounds.getWest() +
        "&miny=" + bounds.getSouth() +
        "&maxx=" + bounds.getEast() +
        "&maxy=" + bounds.getNorth() +
        "&size=mini_square&mapfilter=true&callback=showimages";

    var panoscript = document.createElement("script");
    panoscript.src = url;
    document.getElementsByTagName("head")[0].appendChild(panoscript);


    var panoimages = L.featureGroup()
    window.showimages = function(images) {

        for (var i = 0; i < images.photos.length; i++) {
            //console.log("photo title", images.photos[i]);
            var imagemarker = L.marker([images.photos[i].latitude, images.photos[i].longitude], {
                icon: L.icon({
                    iconUrl: images.photos[i].photo_file_url
                })
            });

            imagemarker.bindPopup("<a href=" + images.photos[i].photo_url + "><h3>" + images.photos[i].photo_title + "</h3></a>");

            imagemarker.addTo(panoimages)
        }
        panoimages.addTo(map)
    }


    // Wiki Integration
    var url2 = "http://api.geonames.org/wikipediaBoundingBoxJSON?" +
        "north=" + bounds.getNorth() +
        "&south=" + bounds.getSouth() +
        "&east=" + bounds.getEast() +
        "&west=" + bounds.getWest() +
        "&username=oeggl&callback=showwiki";

    var showwiki = document.createElement("script");
    showwiki.src = url2;
    document.getElementsByTagName("head")[0].appendChild(showwiki);

    var wikiarticles = L.featureGroup()
    window.showwiki = function(data) {

        for (var i = 0; i < data.geonames.length; i++) {
            //console.log("photo title", data.geonames[i]);
            var wikimarker = L.marker([data.geonames[i].lat, data.geonames[i].lng], {
                icon: L.icon({
                    iconUrl: "http://findicons.com/files/icons/111/popular_sites/128/wikipedia_globe_icon.png",
                    iconSize: [30, 30]
                })
            });

            wikimarker.bindPopup("<a href=https://" + data.geonames[i].wikipediaUrl + "><h3>" + data.geonames[i].title + "</h3></a>");

            wikimarker.addTo(wikiarticles)
        }
        wikiarticles.addTo(map)
    }




    var overlays = {
        "Wege": alladler,
        "Panoramio Images": panoimages,
        "Wiki": wikiarticles
    };

    L.control.layers(baselayers, overlays).addTo(map);

    // hash on site to send link with view
    var hash = new L.Hash(map);



};