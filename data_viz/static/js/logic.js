//testing with sb_asmr_data_test.json
//python -m http.server
/*using C3 with JSON
  https://stackoverflow.com/questions/27695206/formatting-json-for-c3-js
  http://plnkr.co/edit/nvPE88GhuLIdIKz1pieJ?p=preview
  http://plnkr.co/edit/y3wyCEiSfHgFwTF4t45i?p=preview
*/

//SCATTERPLOT
d3.json('asmr_channels', function(error, asmrAnalysis) {
  console.log(asmrAnalysis);
  asmrAnalysis.forEach(channel => {
    
  })
  var channelAge = asmrAnalysis.map(data => data.channel_age);
  console.log(channelAge);

  var channelAgeinYEARS = channelAge.map(function(x) {return x/365});
  console.log(channelAgeinYEARS);

  var channelYEARcreated = channelAgeinYEARS.map(function(x) {return 2019-x});
  console.log(channelYEARcreated);

  var subx = ["Subscribers_x"]

  var YEARcreated = subx.concat(channelYEARcreated)
  console.log(YEARcreated);

  var subscribers = asmrAnalysis.map(data => data.subs);
  console.log(subscribers);

  var subs1k = subscribers.map(function(x) {return x/10000});
  console.log(subs1k);

  var sub = ["Subscribers"]

  var sub10k = sub.concat(subs1k);
  console.log(sub10k);

  //SCATTERPLOT C3
  var chart = c3.generate({
    point: {
      focus: {
        expand: {
          enabled: true
        }
      },
      r: 10
    },
    size: {
      height: 400,
      //width: 1200
    },
    bindto: '#scatter',
    data: {
        xs: {
            Subscribers: 'Subscribers_x'
        },
        columns: [
            YEARcreated, 
            sub10k
        ],
        type: 'scatter'
    },
    axis: {
        x: {
            label: 'Year Youtube Channel Created',
            tick: {
                values: [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012, 2011, 2010, 2009, 2008, 2007, 2006],
                fit: true
            }
        },
        y: {
            label: 'Subscribers in 10k'
        }
    }
  });
});

//DONUT
d3.json('asmr_channels', function(error, asmrAnalysis) {
  console.log(asmrAnalysis);
  asmrAnalysis.forEach(channel => {
    
  })
  var male = asmrAnalysis.filter(channel=>channel.gender === "M")
  console.log('male')
  console.log(male.length);

  var female = asmrAnalysis.filter(channel=>channel.gender === "F")
  console.log('female')
  console.log(female.length);

  //DONUT C3
  var chart = c3.generate({
  bindto: '#gender',
  data: {
      columns: [
          ['Male', male.length],
          ['Female', female.length]
      ],
      type : 'donut',
      //onclick: function (d, i) { console.log("onclick", d, i); },
      //onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      //onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  },
  donut: {
      title: "Youtuber Gender"
  }
  });
});

//SOCIAL MEDIA
d3.json('asmr_channels', function(error, asmrAnalysis) {
  console.log(asmrAnalysis);
  asmrAnalysis.forEach(channel => {
    
  })
  var facebook = asmrAnalysis.filter(channel=>channel.facebook === true)
  console.log('facebook')
  console.log(facebook.length);

  var instagram = asmrAnalysis.filter(channel=>channel.instagram === true)
  console.log('instragram')
  console.log(instagram.length);

  var twitch = asmrAnalysis.filter(channel=>channel.twitch === true)
  console.log('twitch')
  console.log(twitch.length);

  var twitter = asmrAnalysis.filter(channel=>channel.twitter === true)
  console.log('twitter')
  console.log(twitter.length);

  //SOCIAL MEDIA C3
  var chart = c3.generate({
    bindto: '#socialmedia',
    //size: {
    //  height: 260,
    //  width: 500
    //},
    data: {
        x: 'x',
        columns: [
            ['x', 'Social Media'],
            ['Facebook', facebook.length],
            ['Instagram', instagram.length],
            ['Twitch', twitch.length],
            ['Twitter', twitter.length]
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
  
});

//STACKED BAR CHART
d3.json('asmr_channels', function(error, asmrAnalysis) {
  console.log(asmrAnalysis);
  asmrAnalysis.forEach(channel => {
    
  })

  var upload = asmrAnalysis.map(data => data.uploads);
  console.log(upload);

  var subscribers = asmrAnalysis.map(data => data.subs);
  console.log(subscribers);

  var subs1k = subscribers.map(function(x) {return x/10000});
  console.log(subs1k);

  var channelNames = asmrAnalysis.map(data => data.channel_name);
  console.log(channelNames);

  var total_views = asmrAnalysis.map(data => data.views);
  console.log(total_views);

  var viewsinMil = total_views.map(function(x) {return x/1000000});
  console.log(viewsinMil);


  //STACKED BAR CHART C3
  var chart = c3.generate({
    size: {
      height: 1200,
      width: 1000
    },
    bindto: '#top10',
    data: {
        columns: [
             subs1k
        ],
        names: {
          225.8428: 'Subscribers in 10k'
        },
        type: 'bar',
        groups: [[225.8428]],
        order: 'asc'
    },
    bar: {
      width: {
          ratio: 0.8 // this makes bar width 50% of length between ticks
      }
      // or
      //width: 20 // this makes bar width 100px
    },
    axis: {
        rotated: true,
        x: {
          padding: {
            left: 0,
            right: 0
          },
          type: 'category',
          categories: channelNames
        }
    },
    grid: {
        y: {
            lines: [{value:100}]
        }
    }
  });
  setTimeout(function(){
    chart.load({
      columns: [
        viewsinMil
      ],
      names: {
        420.321655: 'Views in Millions'
      },
    });
  },1000);
  setTimeout(function(){
    chart.load({
      columns: [
        upload
      ],
      names: {
        154: 'Number of Uploaded Videos'
      },
    });
  },2000);
  setTimeout(function (){
    chart.groups([[225.8428, 420.321655, 154]])
  },3000);
  
});