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
      callback({data: "db"+id});
    });
  },
  collate: function(d1, d2, callback) {
    _randomAsync("", "collate", 60, 80, function() {
      callback([d1.data, d2.data].join(":"));
    });
  },
  network: function(id, callback) {
    _randomAsync(id, "network", 100, 150, function(){
      callback({data: "network"+id});
    });
  },
  output: function(a/*args...*/) {
    console.log.apply(null, arguments);
  }
};
