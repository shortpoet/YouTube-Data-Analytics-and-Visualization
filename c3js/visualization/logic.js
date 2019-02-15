/*var chart = c3.generate({
    bindto: '#chart',
    data:{
      columns: [
        ['data1', 30, 200, 100, 400, 150, 250],
        ['data2', 50, 20, 10, 40, 15, 25]
        ]
    }
  });
*/
var chart = c3.generate({
  bindto: '#gender',
  data: {
      //url: '/resources/ASMR_data.csv',
      columns: [
          ['Male', 15],
          ['Female', 35]
      ],
      type : 'donut',
      onclick: function (d, i) { console.log("onclick", d, i); },
      onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  },
  donut: {
      title: "Gender of ASMR Youtuber"
  }
});

var chart = c3.generate({
  bindto: '#socialmedia',
  size: {
    height: 260,
    width: 500
  },
  data: {
      x: 'x',
      columns: [
          ['x', 'Social Media'],
          ['facebook', 28],
          ['instagram', 33],
          ['twitch', 7],
          ['twitter', 32]
      ],
      type: 'bar'
  },
  bar: {
      width: {
          ratio: 0.5 // this makes bar width 50% of length between ticks
      }
      // or
      //width: 100 // this makes bar width 100px
  },
  axis: {
      x: {
          type: 'category'
      }
  }
});
