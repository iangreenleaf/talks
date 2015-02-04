var Q = require("q");
var c = require("./crucibles_promise_api");
var ids = c.input("2");

var promises = ids.map(c.dbAccess);
Q.all(promises).then(
    function(data) {
      c.output(data);
    },
    function(err) {
      c.errored();
    }
  );
