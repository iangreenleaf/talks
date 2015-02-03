var c = require("../crucibles");
var async = require("async");
var ids = c.input("2");

async.map(ids, c.dbAccess, function(err, results) {
  if (err) {
    c.errored();
  } else {
    c.output(results);
  }
});
