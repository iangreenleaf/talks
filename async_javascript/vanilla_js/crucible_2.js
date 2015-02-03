var  c = require("../crucibles");
var ids = c.input("2");

// var results = [];
// var waiting = 0;
// for (i=0; i<ids.length; i+=1) {
//   waiting += 1;
//   c.dbAccess(ids[i], function(data) {
//     // ...
//     // HAHAHA NOPE FUCK YOU
//   });
// }

var results = [];
var waiting = 0;
for (i=0; i<ids.length; i+=1) {
  (function(i) {
    waiting += 1;
    c.dbAccess(ids[i], function(err, data) {
      results[i] = data;
      waiting -= 1;
      if (waiting === 0) {
        c.output(results);
      }
    });
  })(i);
}
