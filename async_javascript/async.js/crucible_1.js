var  c = require("../crucibles");

c.dbAccess(1, function(err, data) {
  if (err) {
    c.errored();
  } else {
    c.output(data);
  }
});
