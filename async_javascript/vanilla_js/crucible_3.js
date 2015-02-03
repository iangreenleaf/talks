var  c = require("../crucibles");

// // This is the awful version
// var dbResults = [];
// var dbWaiting = 0;
// var networkWaiting = false;
// var networkResult;
// var collateWaiting = false;
// var collateResult;
// for (i=0; i<2; i+=1) {
//   (function(i) {
//     dbWaiting += 1;
//     c.dbAccess(i, function(data) {
//       dbResults[i] = data;
//       dbWaiting -= 1;
//       if (dbWaiting === 0) {
//         collateWaiting = true;
//         c.collate(dbResults[0], dbResults[1], function(c1) {
//           collateWaiting = false;
//           collateResult = c1;
//           if (!networkWaiting) {
//             c.output(collateResult, networkResult);
//           }
//         });
//       }
//     });
//   })(i);
// }
// networkWaiting = true;
// c.network(1, function(n1) {
//   networkWaiting = false;
//   networkResult = n1;
//   if (!collateWaiting) {
//     c.output(collateResult, networkResult);
//   }
// });



var getDbResults = function(callback) {
  var dbResults = [];
  var dbWaiting = 0;
  for (i=0; i<2; i+=1) {
    (function(i) {
      dbWaiting += 1;
      c.dbAccess(i, function(data) {
        dbResults[i] = data;
        dbWaiting -= 1;
        if (dbWaiting === 0) {
          callback(dbResults);
        }
      });
    })(i);
  }
};

var getAndCollate = function(callback) {
  getDbResults(function(dbResults) {
    c.collate(dbResults[0], dbResults[1], callback);
  });
};

var networkAndCollation = function(callback) {
  var networkWaiting;
  var networkResult;
  var collateWaiting;
  var collateResult;
  var tryContinue = function() {
    if (!networkWaiting && !collateWaiting) {
      callback(collateResult, networkResult);
    }
  };

  collateWaiting = true;
  getAndCollate(function(c1) {
    collateWaiting = false;
    collateResult = c1;
    tryContinue();
  });

  networkWaiting = true;
  c.network(1, function(n1) {
    networkWaiting = false;
    networkResult = n1;
    tryContinue();
  });
};

networkAndCollation(c.output);
