var  c = require("../crucibles");

// var results = [];
// var waiting = 0;
// for (i=0; i<=5; i+=1) {
//   waiting += 1;
//   c.dbAccess(1, function(data) {
//     results[i] = data;
//     waiting -= 1;
//     if (waiting === 0) {
//       c.output(results); // HAHAHA NOPE FUCK YOU
//     }
//   });
// }

var results = [];
var waiting = 0;
for (i=1; i<=5; i+=1) {
  (function(i) {
    waiting += 1;
    c.dbAccess(i, function(data) {
      results[i] = data;
      waiting -= 1;
      if (waiting === 0) {
        c.output(results);
      }
    });
  })(i);
}
