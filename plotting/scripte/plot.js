/**
 * Created by Marcel on 16.05.2016.
 */


window.onload = function() {
  var trace1 = {
    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
    y: [10, 15, 13],
    type: 'scatter'
  };

  var trace2 = {
    x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
    y: [16, 5, 11],
    type: 'scatter'
  };

  var data = [trace1, trace2];

  Plotly.newPlot('myDiv', data);

};