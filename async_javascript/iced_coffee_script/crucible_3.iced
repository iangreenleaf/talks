c = require("../crucibles")
ids = c.input("3")


getAndCollate = (callback) ->
  dbResults = []
  errors = []
  await
    for id, i in ids
      c.dbAccess id, defer errors[i], dbResults[i]

  errors = (err for err in errors when err?)
  if errors.length isnt 0
    callback(errors)
    return

  c.collate dbResults[0], dbResults[1], callback

await
  c.network 1, defer errNetwork, n1
  getAndCollate defer errCollate, c1

if errNetwork? or errCollate?
  c.errored()
else
  c.output c1, n1
