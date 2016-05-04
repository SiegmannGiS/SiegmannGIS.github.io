/**
 * Created by Marcel on 04.05.2016.
 */

var heights = [];
var max = 0;
var min = 9999;
var up = 0;
var down = 0;
var dif = 0;
var letzter;

var aw1 = L.geoJson(adlerjson02,
    {onEachFeature: function(feature, layer){
        for (var i = 0; i < feature.geometry.coordinates.length; i++){
            //console.log(feature.geometry.coordinates[i][2]);
            //heights.push(feature.geometry.coordinates[i][2]);

            var c = feature.geometry.coordinates[i];
            max = Math.max(max, c[2]);
            min = Math.min(min, c[2]);
            if (letzter){
                dif = dif + (c[2] - letzter);
                if (letzter < c[2]){
                    up = up + (c[2] - letzter);
                }
                else if(letzter > c[2]){
                    down = down + (letzter - c[2]);
                }
                else{
                    console.log("letzter aktueller punkt gleich")
                }
            }
            letzter = c[2];

        }
        //var min = Math.min.apply(null, heights),
        //    max = Math.max.apply(null, heights);
        console.log("Max: ",max,"Min: ",min);
        console.log("UP: ",up,"Down: ",down, "Dif",dif)
    }
    });
