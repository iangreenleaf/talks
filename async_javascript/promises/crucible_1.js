var c = require("./crucibles_promise_api");

c.dbAccess(1).then(
    function(data) {
      c.output(data);
    },
    function(err) {
      c.errored();
    }
  );
