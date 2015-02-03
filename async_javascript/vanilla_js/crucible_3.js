var  c = require("../crucibles");
var ids = c.input("3");

// // This is the awful version
// // And doesn't even have error checking
// var dbResults = [];
// var dbWaiting = 0;
// var networkWaiting = false;
// var networkResult;
// var collateWaiting = false;
// var collateResult;
// for (i=0; i<ids.length; i+=1) {
//   (function(i) {
//     dbWaiting += 1;
//     c.dbAccess(ids[i], function(data) {
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
  var errors = [];
  for (i=0; i<ids.length; i+=1) {
    (function(i) {
      dbWaiting += 1;
      c.dbAccess(ids[i], function(err, data) {
        if (err) {
          errors.push(err);
        }
        dbResults[i] = data;
        dbWaiting -= 1;
        if (dbWaiting === 0) {
          if (errors.length > 0) {
            callback(errors);
          } else {
            callback(null, dbResults);
          }
        }
      });
    })(i);
  }
};

var getAndCollate = function(callback) {
  getDbResults(function(err, dbResults) {
    if (err) {
      callback(err);
    } else {
      c.collate(dbResults[0], dbResults[1], callback);
    }
  });
};

var networkAndCollation = function(callback) {
  var networkWaiting;
  var networkResult;
  var collateWaiting;
  var collateResult;
  var errors = [];
  var tryContinue = function() {
    if (!networkWaiting && !collateWaiting) {
      if (errors.length > 0) {
        callback(errors);
      } else {
        callback(null, [collateResult, networkResult]);
      }
    }
  };

  collateWaiting = true;
  getAndCollate(function(err, c1) {
    if (err) {
      errors.push(err);
    }
    collateWaiting = false;
    collateResult = c1;
    tryContinue();
  });

  networkWaiting = true;
  c.network(1, function(err, n1) {
    if (err) {
      errors.push(err);
    }
    networkWaiting = false;
    networkResult = n1;
    tryContinue();
  });
};

networkAndCollation(function(err, data) {
  if (err) {
    c.errored();
  } else {
    c.output(data[0], data[1]);
  }
});
