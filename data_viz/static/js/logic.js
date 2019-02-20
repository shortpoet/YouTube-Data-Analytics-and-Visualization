//testing with sb_asmr_data_test.json
//python -m http.server
/*using C3 with JSON
  https://stackoverflow.com/questions/27695206/formatting-json-for-c3-js
  http://plnkr.co/edit/nvPE88GhuLIdIKz1pieJ?p=preview
  http://plnkr.co/edit/y3wyCEiSfHgFwTF4t45i?p=preview
*/


d3.json('asmr_channels', function(error, asmrAnalysis) {
  console.log(asmrAnalysis);
  asmrAnalysis.forEach(channel => {
    
  })
  var male = asmrAnalysis.filter(channel=>channel.gender === "M")
  console.log('male')
  console.log(male.length)
});

var jsonData = [{"channel":"Angelica","age":null,"uploads":284,"subs":164223,"total_views":28180506,"channel_creation_year":2015,"gender":"F","country":"US","category":"People","twitter":true,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"ASMRctica","age":null,"uploads":76,"subs":27066,"total_views":4070797,"channel_creation_year":2015,"gender":"M","country":"SE","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"ASMRDarling","age":22.0,"uploads":153,"subs":2250614,"total_views":417889554,"channel_creation_year":2014,"gender":"F","country":"US","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"channel"},
                {"channel":"ASMRGlow","age":25.0,"uploads":157,"subs":723721,"total_views":119915280,"channel_creation_year":2016,"gender":"F","country":"ISR","category":"People","twitter":true,"instagram":true,"twitch":true,"facebook":false,"type":"channel"},
                {"channel":"ASMRKittyKlaw","age":null,"uploads":184,"subs":887195,"total_views":141334295,"channel_creation_year":2015,"gender":"F","country":"RS","category":"People","twitter":false,"instagram":true,"twitch":true,"facebook":false,"type":"channel"},
                {"channel":"ASMRPPOMO","age":27.0,"uploads":334,"subs":1703334,"total_views":351067922,"channel_creation_year":2013,"gender":"F","country":"KR","category":"Entertainment","twitter":true,"instagram":false,"twitch":true,"facebook":false,"type":"user"},
                {"channel":"ASMRrequests","age":28.0,"uploads":201,"subs":500041,"total_views":124203848,"channel_creation_year":2012,"gender":"F","country":"US","category":"People","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"ASMRSoundSpace","age":null,"uploads":57,"subs":189710,"total_views":31102900,"channel_creation_year":2016,"gender":"M","country":"GB","category":"Entertainment","twitter":false,"instagram":false,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"ASMRSurge","age":null,"uploads":142,"subs":651738,"total_views":125914998,"channel_creation_year":2012,"gender":"M","country":"PL","category":"Entertainment","twitter":false,"instagram":false,"twitch":false,"facebook":false,"type":"user"},
                {"channel":"ASMRTheChew","age":48.0,"uploads":1624,"subs":561606,"total_views":113489035,"channel_creation_year":2015,"gender":"F","country":"US","category":"People","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"channel"},
                {"channel":"Bluewhisper","age":29.0,"uploads":75,"subs":338,"total_views":46399,"channel_creation_year":2015,"gender":"F","country":"US","category":"HowTo","twitter":false,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"CreativeCalmASMR","age":27.0,"uploads":267,"subs":202232,"total_views":32720764,"channel_creation_year":2015,"gender":"F","country":"GB","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"DrTASMR","age":null,"uploads":308,"subs":315064,"total_views":89237889,"channel_creation_year":2016,"gender":"M","country":"US","category":"Entertainment","twitter":true,"instagram":false,"twitch":false,"facebook":true,"type":"channel"},
                {"channel":"EphemeralRift","age":48.0,"uploads":1231,"subs":595015,"total_views":229702976,"channel_creation_year":2011,"gender":"M","country":"US","category":"Entertainment","twitter":true,"instagram":false,"twitch":false,"facebook":true,"type":"channel"},
                {"channel":"FairyCharASMR","age":21.0,"uploads":253,"subs":412643,"total_views":92724646,"channel_creation_year":2009,"gender":"F","country":"US","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":false,"type":"user"},
                {"channel":"fastASMR","age":29.0,"uploads":589,"subs":410536,"total_views":119438613,"channel_creation_year":2011,"gender":"F","country":"US","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":false,"type":"user"},
                {"channel":"FredsVoiceASMR","age":29.0,"uploads":193,"subs":339108,"total_views":53926121,"channel_creation_year":2011,"gender":"M","country":"GB","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"FrivolousFoxASMR","age":25.0,"uploads":310,"subs":1053497,"total_views":232196121,"channel_creation_year":2016,"gender":"F","country":"US","category":"People","twitter":true,"instagram":true,"twitch":true,"facebook":false,"type":"user"},
                {"channel":"GentleWhisperingASMR","age":33.0,"uploads":393,"subs":1617151,"total_views":578125378,"channel_creation_year":2011,"gender":"F","country":"US","category":"Entertainment","twitter":false,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"GibiASMR","age":25.0,"uploads":372,"subs":1685347,"total_views":429129059,"channel_creation_year":2016,"gender":"F","country":"US","category":"Entertainment","twitter":true,"instagram":true,"twitch":true,"facebook":false,"type":"channel"},
                {"channel":"GoodnightMoon","age":21.0,"uploads":87,"subs":430302,"total_views":59183471,"channel_creation_year":2014,"gender":"F","country":"GB","category":"People","twitter":false,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"GwenGwiz","age":24.0,"uploads":236,"subs":368466,"total_views":39537838,"channel_creation_year":2011,"gender":"F","country":"CA","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"HeatherFeatherASMR","age":35.0,"uploads":319,"subs":507166,"total_views":155106841,"channel_creation_year":2012,"gender":"F","country":"US","category":"People","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"HermeticKitten","age":29.0,"uploads":508,"subs":293771,"total_views":71458273,"channel_creation_year":2013,"gender":"F","country":"GB","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"JASMR","age":22.0,"uploads":307,"subs":119718,"total_views":19885236,"channel_creation_year":2017,"gender":"F","country":"US","category":"Entertainment","twitter":false,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"JojosAsmr","age":21.0,"uploads":377,"subs":534532,"total_views":117567758,"channel_creation_year":2015,"gender":"M","country":"US","category":"People","twitter":false,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"KarunaSatoriASMR","age":28.0,"uploads":697,"subs":626732,"total_views":146226984,"channel_creation_year":2013,"gender":"F","country":"US","category":"People","twitter":true,"instagram":false,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"LatteASMR","age":26.0,"uploads":135,"subs":677225,"total_views":138883059,"channel_creation_year":2016,"gender":"F","country":"KR","category":"People","twitter":false,"instagram":false,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"LauraLemurexASMR","age":23.0,"uploads":264,"subs":153231,"total_views":33505260,"channel_creation_year":2011,"gender":"F","country":"GB","category":"People","twitter":true,"instagram":false,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"MarnoASMR","age":30.0,"uploads":126,"subs":172940,"total_views":18926397,"channel_creation_year":2018,"gender":"M","country":"BE","category":"People","twitter":true,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"MassageASMR","age":null,"uploads":691,"subs":753553,"total_views":283711132,"channel_creation_year":2012,"gender":"M","country":"AU","category":"Entertainment","twitter":false,"instagram":false,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"MiniyuASMR","age":31.0,"uploads":570,"subs":493734,"total_views":159027656,"channel_creation_year":2013,"gender":"F","country":"KR","category":"People","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"MissASMR","age":23.0,"uploads":233,"subs":233418,"total_views":53824452,"channel_creation_year":2013,"gender":"F","country":"US","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"OliviaKissperASMR","age":30.0,"uploads":432,"subs":317551,"total_views":97687202,"channel_creation_year":2013,"gender":"F","country":"CR","category":"Entertainment","twitter":false,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"PelageaASMR","age":26.0,"uploads":123,"subs":784179,"total_views":161445940,"channel_creation_year":2015,"gender":"F","country":"US","category":"People","twitter":false,"instagram":true,"twitch":false,"facebook":true,"type":"channel"},
                {"channel":"PJDreams","age":24.0,"uploads":338,"subs":379590,"total_views":57599987,"channel_creation_year":2016,"gender":"M","country":"CA","category":"Entertainment","twitter":true,"instagram":false,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"RapunzelASMR","age":33.0,"uploads":418,"subs":417877,"total_views":79898568,"channel_creation_year":2014,"gender":"F","country":"BE","category":"Entertainment","twitter":false,"instagram":false,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"ScottishMurmurs","age":24.0,"uploads":163,"subs":125597,"total_views":20782825,"channel_creation_year":2016,"gender":"F","country":"GB","category":"People","twitter":false,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"SensorAdiASMR","age":null,"uploads":658,"subs":201662,"total_views":50998182,"channel_creation_year":2013,"gender":"M","country":"US","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"SleepyTinglesASMR","age":27.0,"uploads":274,"subs":250523,"total_views":40871954,"channel_creation_year":2016,"gender":"M","country":"ES","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"channel"},
                {"channel":"softlygaloshes","age":28.0,"uploads":454,"subs":331777,"total_views":84358390,"channel_creation_year":2012,"gender":"F","country":"US","category":"Entertainment","twitter":true,"instagram":false,"twitch":false,"facebook":true,"type":"channel"},
                {"channel":"SouthernASMRSounds","age":null,"uploads":1521,"subs":148877,"total_views":48462952,"channel_creation_year":2015,"gender":"F","country":"US","category":"People","twitter":true,"instagram":false,"twitch":false,"facebook":true,"type":"channel"},
                {"channel":"SpringbokASMR","age":null,"uploads":135,"subs":158372,"total_views":34688044,"channel_creation_year":2014,"gender":"F","country":"US","category":"Entertainment","twitter":false,"instagram":false,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"suellASMR","age":37.0,"uploads":280,"subs":1618201,"total_views":372189822,"channel_creation_year":2017,"gender":"F","country":"US","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"TheOneLiliumASMR","age":32.0,"uploads":445,"subs":219256,"total_views":64828412,"channel_creation_year":2012,"gender":"F","country":"DK","category":"People","twitter":false,"instagram":false,"twitch":true,"facebook":true,"type":"user"},
                {"channel":"TingleBelleASMR","age":32.0,"uploads":98,"subs":161429,"total_views":28310808,"channel_creation_year":2015,"gender":"F","country":"US","category":"Entertainment","twitter":false,"instagram":false,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"TingTingASMR","age":27.0,"uploads":298,"subs":521795,"total_views":85056106,"channel_creation_year":2017,"gender":"F","country":"CHN","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":false,"type":"channel"},
                {"channel":"TirarADeguello","age":null,"uploads":602,"subs":129832,"total_views":27883383,"channel_creation_year":2010,"gender":"M","country":"US","category":"People","twitter":true,"instagram":false,"twitch":false,"facebook":false,"type":"user"},
                {"channel":"TonyBomboniASMR","age":25.0,"uploads":866,"subs":276923,"total_views":101701872,"channel_creation_year":2012,"gender":"M","country":"US","category":"Entertainment","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"},
                {"channel":"WhispersRedASMR","age":41.0,"uploads":392,"subs":684380,"total_views":177072880,"channel_creation_year":2013,"gender":"F","country":"GB","category":"People","twitter":true,"instagram":true,"twitch":false,"facebook":true,"type":"user"}]

//DONUT
var chart = c3.generate({
  bindto: '#gender',
  data: {
      columns: [
          ['Male', 14],
          ['Female', 36]
      ],
      type : 'donut',
      // onclick: function (d, i) { console.log("onclick", d, i); },
      // onmouseover: function (d, i) { console.log("onmouseover", d, i); },
      // onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  },
  donut: {
      title: "Gender of ASMR Youtuber"
  }
});

//SOCIAL MEDIA
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
          ['Facebook', 25],
          ['Instagram', 33],
          ['Twitch', 6],
          ['Twitter', 33]
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
/*
//STACKED BAR: SUBSCRIBERS, TOTAL VIEWS, AND UPLOADS
var chart = c3.generate({
  bindto: '#stackedbar',
  data: {
      columns: [
           ['Subscribers',164223,27066,2250614,723721,887195,1703334,500041,189710,651738,561606,338,202232,315064,
           595015,412643,410536,339108,1053497,1617151,1685347,430302,368466,507166,293771,119718,
           534532,626732,677225,153231,172940,753553,493734,233418,317551,784179,379590,417877,
           125597,201662,250523,331777,148877,158372,1618201,219256,161429,521795,129832,276923,
           684380],  
      ],
      type: 'bar',
      groups: [['Subscribers']],
  },
  axis: {
      x: {
        type: 'category',
        categories: ['Angelica', 'ASMRctica','ASMRDarling','ASMRGlow','ASMRKittyKlaw','ASMRPPOMO','ASMRrequests',
        'ASMRSoundSpace','ASMRSurge','ASMRTheChew','Bluewhisper','CreativeCalmASMR','DrTASMR','EphemeralRift',
        'FairyCharASMR','fastASMR','FredsVoiceASMR','FrivolousFoxASMR','GentleWhisperingASMR','GibiASMR',
        'GoodnightMoon','GwenGwiz','HeatherFeatherASMR','HermeticKitten','JASMR','JojosAsmr','KarunaSatoriASMR',
        'LatteASMR','LauraLemurexASMR','MarnoASMR','MassageASMR','MiniyuASMR','MissASMR','OliviaKissperASMR',
        'PelageaASMR','PJDreams','RapunzelASMR','ScottishMurmurs','SensorAdiASMR','SleepyTinglesASMR',
        'softlygaloshes','SouthernASMRSounds','SpringbokASMR','suellASMR','TheOneLiliumASMR','TingleBelleASMR',
        'TingTingASMR','TirarADeguello','TonyBomboniASMR','WhispersRedASMR']
      }
  },
  grid: {
      y: {
          lines: [{value:0}]
      }
  }
});
setTimeout(function(){
  chart.load({
    columns: [
      ['Total Views',28180506,4070797,417889554,119915280,141334295,351067922,124203848,31102900,125914998,113489035,
      46399,32720764,89237889,229702976,92724646,119438613,53926121,232196121,578125378,429129059,
      59183471,39537838,155106841,71458273,19885236,117567758,146226984,138883059,33505260,18926397,
      283711132,159027656,53824452,97687202,161445940,57599987,79898568,20782825,50998182,40871954,84358390,
      48462952,34688044,372189822,64828412,28310808,85056106,27883383,101701872,177072880]
    ]
  });
}, 1000);
setTimeout(function(){
  chart.load({
    columns: [
      ['Uploads',284,76,153,157,184,334,201,57,142,1624,75,267,308,1231,253,589,193,310,393,372,87,236,319,508,307,377,697,135,264,126,691,570,
      233,432,123,338,418,163,658,274,454,1521,135,280,445,98,298,602,866,392]
    ]
  });
}, 2000);
setTimeout(function (){
  chart.groups([['Subscribers', 'Total Views', 'Uploads']])
}, 3000);

*/
//STACKED BAR TOP 10 ASMR BY SUBSCRIBER COUNT
var chart = c3.generate({
  bindto: '#top10',
  data: {
      columns: [
           ['Subscribers in Thousands',2251,1703,1685,1618,1617,1053,887,784,754,724],  
      ],
      type: 'bar',
      groups: [['Subscribers in Thousands']],
      order: 'asc'
  },
  axis: {
      x: {
        type: 'category',
        categories: ['ASMRDarling','ASMRPPOMO','GibiASMR','suellASMR','GentleWhisperingASMR',
                    'FrivolousFoxASMR','ASMRKittyKlaw','PelageaASMR','MassageASMR','ASMRGlow']
      }
  },
  grid: {
      y: {
          lines: [{value:0}]
      }
  }
});
setTimeout(function(){
  chart.load({
    columns: [
      ['Total Views in Millions',418,351,429,372,578,232,141,161,284,120]
    ]
  });
}, 1000);
setTimeout(function(){
  chart.load({
    columns: [
      ['Videos Uploaded',153,334,372,280,393,310,184,123,691,157]
    ]
  });
}, 2000);
setTimeout(function (){
  chart.groups([['Subscribers in Thousands', 'Total Views in Millions', 'Videos Uploaded']])
}, 3000);

//SCATTERPLOT
var chart = c3.generate({
  point: {
    focus: {
      expand: {
        enabled: true
      }
    },
    r: 12
    },
  bindto: '#scatterplot',
  data: {
      xs: {
          Subscribers: 'Subscribers_x'
      },
      // iris data from R
      columns: [
          ["Subscribers_x", 2015,2015,2014,2016,2015,2013,2012,2016,2012,2015,2015,2015,2016,2011,2009,2011,2011,
          2016,2011,2016,2014,2011,2012,2013,2017,2015,2013,2016,2011,2018,2012,2013,2013,2013,2015,
          2016,2014,2016,2013,2016,2012,2015,2014,2017,2012,2015,2017,2010,2012,2013],
          ["Subscribers", 164,27,2251,724,887,1703,500,190,652,562, 0,202,315,595,413,411,
          339,1053,1617,1685,430,368,507,294,120,535,627,677,153,173,754,494,233,318,
          784,380,418,126,202,251,332,149,158,1618,219,161,522,130,277,684],
          
      ],
      type: 'scatter'
  },
  axis: {
      x: {
          label: 'Year Youtube Channel Created',
          tick: {
              fit: true
          }
      },
      y: {
          label: 'Subscribers in Thousand'
      }
  }
});