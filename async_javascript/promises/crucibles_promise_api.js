var Q = require("q");
var c = require("../crucibles");

module.exports = {
  input: c.input,
  output: c.output,
  errored: c.errored,
  dbAccess: function(id) {
    var deferred = Q.defer();
    c.dbAccess(id, function(err, data) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  },
  collate: function(d1, d2) {
    var deferred = Q.defer();
    c.collate(d1, d2, function(err, data) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  },
  network: function(id) {
    var deferred = Q.defer();
    c.network(id, function(err, data) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  },
};
