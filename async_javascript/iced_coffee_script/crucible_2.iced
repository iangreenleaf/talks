c = require("../crucibles")
ids = c.input("2")

results = []
errors = []
await
  for id, i in ids
    c.dbAccess(id, defer errors[i], results[i])

errors = (err for err in errors when err?)
if errors.length isnt 0
  c.errored()
else
  c.output results
