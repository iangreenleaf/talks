var _randomAsync = function(id, name, min, max, callback) {
  console.log("Starting "+name+id+"…");
  var secs = Math.round(Math.random() * (max - min) + min);
  setTimeout(function() {
    console.log("Finishing "+name+id+", waited "+secs+" ms");
    callback();
  }, secs);
};

module.exports = {
  input: function(crucibleNum) {
    return {
      "1": [],
      "2": [1, 2, 3, 4, 5],
      "3": [1, 2]
    }[crucibleNum];
  },
  dbAccess: function(id, callback) {
    _randomAsync(id, "dbAccess", 20, 50, function(){
      if (process.env.ERRORING) {
        callback("Oopsie");
      } else {
        callback(null, {data: "db"+id});
      }
    });
  },
  collate: function(d1, d2, callback) {
    _randomAsync("", "collate", 60, 80, function() {
      callback(null, [d1.data, d2.data].join(":"));
    });
  },
  network: function(id, callback) {
    _randomAsync(id, "network", 100, 150, function(){
      callback(null, {data: "network"+id});
    });
  },
  output: function(a/*args...*/) {
    if (process.env.ERRORING) {
      console.log("An error occurred, this output is corrupt!");
      console.log("ヾ(ｏ･ω･)ﾉ");
    } else {
      console.log.apply(null, arguments);
    }
  },
  errored: function() {
    if (process.env.ERRORING) {
      console.log("Error acknowledged");
    } else {
      console.log("False error report!");
      console.log("ヽ(。_°)ノ");
    }
  }
};
