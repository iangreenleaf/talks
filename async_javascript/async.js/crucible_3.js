var c = require("../crucibles");
var async = require("async");
var ids = c.input("3");

var getDbResults = function(callback) {
  async.map(ids, c.dbAccess, callback);
};

var getAndCollate = function(callback) {
  async.waterfall([
    getDbResults,
    function(dbResults, callback) {
      c.collate(dbResults[0], dbResults[1], callback);
    }
  ], callback);
};

async.parallel(
  [
    getAndCollate,
    async.apply(c.network, 1)
  ],
  function(err, results) {
    if (err) {
      c.errored();
    } else {
      c.output(results);
    }
  }
);
