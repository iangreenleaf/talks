var Q = require("q");
var c = require("./crucibles_promise_api");
var ids = c.input("3");

promises = ids.map(c.dbAccess);

var collatedPromise = Q.all(promises)
  .then(function(dbResults) {
    return c.collate(dbResults[0], dbResults[1]);
  });

Q.all([
    collatedPromise,
    c.network(1)
  ])
  .then(
    function(data) {
      c.output(data);
    },
    function(err) {
      c.errored();
    }
  );
