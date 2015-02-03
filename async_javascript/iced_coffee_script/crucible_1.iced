c = require("../crucibles")

await c.dbAccess(1, defer err, data)
if err
  c.errored()
else
  c.output data
