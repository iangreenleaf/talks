# Hello! #

Notes:

Say hi

~~~

# Asynchronous JavaScript #

Allow work to happen in the background

Get a callback when it's done

Notes:

Asynchronous APIs allow work to happen in the background while execution of the current thread continues.
You call a function and instead of that call blocking and only returning once the result is ready, the call returns right away and says "okay, I'll have an answer for you later."

How do we receive that answer once it's ready?
We provide a callback, which is just a function that is invoked once the operation has completed. That callback function can take arguments that will hold the results of the operation.

~~~

# Asynchronous JavaScript #

```javascript
$.get("/foo/bar", function(data) {
  // ...
}
```

Notes:

We're used to it on the front end, most often in network requests, but also a number of other operations.

~~~

# Asynchronous JavaScript #

```javascript
fs.stat("/etc/foobar", function(err, stats) {
  // ...
}
```

Notes:

And for those of you who do Node, you're very, very used to it.
Node uses async operations as the core performance principle, so everything in Node that involves I/O has an asynchronous function.

~~~

# Asynchronous JavaScript #

Good for performance

Hard to reason about

Notes:

Asynchronous APIs have some really great performance characteristics because they sidestep the common I/O bottlenecks.
And sometimes async is the only model that fits conceptually, such as when dealing with interactivity.

But asynchronous code can be more difficult to reason about than standard imperative code.

~~~

# What to worry about #

NOT "Pyramid of Doom"

Notes:

When you talk about async code, the *first* objection that comes up is always the Pyramid of Doom, also known as "callback hell".

~~~

# Pyramid of Doom #

```javascript
db.table('unprocessed_files').first(function(filename) {
  fs.stat(filename, function(err, stat) {
    if (stats.isFile()) {
      fs.readFile(filename, function(err, data) {
        var processed = process(data);
        fs.writeFile('/var/processed/' + filename, processed, function(err) {
          if (!err) {
            db.table('unprocessed_files').delete(filename, function(err) {
              response.writeHead(200);
              response.finish();
            });
          }
        });
      });
    }
  });
});
```

Notes:

The Pyramid of Doom looks something like this.
It's where you're performing a bunch of asynchronous operations and end up with deeply nested callbacks.

Describe what's happening.

So you end up about 8 levels of indentation deep and you've lost track of what's happening and it's terrible.

Now, it's true that this code I'm showing you sucks.
But I don't think it makes sense to blame async for this.
Let's pretend that we've got a magical synchronous API that's equivalent and will let us flatten this code out.

~~~

# Plains of Doom #

```javascript
var filename = db.table('unprocessed_files').first();
var stats = fs.stat(filename);
if (stats.isFile()) {
  var data = fs.readFile(filename);
  var processed = process(data);
  var err = fs.writeFile('/var/processed/' + filename, processed);
  if (!err) {
    db.table('unprocessed_files').delete(filename);
    response.writeHead(200);
    response.finish();
  }
}
```

Notes:

Now this might not look as bad visually, but I contend that this code still sucks.
This is doing waaaaaay too many things in one big imperative block.

Our problem wasn't that asynchronous style made our code bad, it's that our code *was* bad and asynchronous style just made that very obvious.

~~~

# Lots of tiny pyramids #

```javascript
function processAndWriteToFile(data, callback) {
  var processed = process(data);
  fs.writeFile('/var/processed/'+filename, processed, callback);
}

function readAndProcessFile(filename, callback) {
  fs.stat(filename, function(err, stat) {
    if (stats.isFile()) {
      fs.readFile(filename, callback);
    }
  });
}
```

Notes:

In fact, if we clean up this code and factor it into a bunch of little functions that do one thing well, which is a good programming practice no matter what style you're writing, you'll see that the Pyramid of Doom goes away.

~~~

```javascript
function dbPopAndHandle(table, processingFn, callback) {
  db.table(table).first(function(record) {
    processingFn(record, function(err) {
      db.table(table).delete(filename, callback);
    });
  });
}

function popAndProcessFile(callback) {
  dbPopAndHandle('unprocessed_files', function(record) {
    readAndProcessFile(record, function(err, data) {
      processAndWriteToFile(data, callback);
    });
  });
}
```

~~~

```javascript
popAndProcessFile(function(err) {
  if (!err) {
    response.writeHead(200);
    response.finish();
  }
});
```

Notes:

This code has all the same async stuff going on, but it's not nearly so bad.
Each function was easy to understand, and we've genericized some of the functions so they could be reused elsewhere in our imaginary application.

~~~

# Don't worry about Pyramid of Doom #
## Worry about other, more important things ##

Notes:

So don't worry about the Pyramid of Doom.
The way you avoid callback hell is you write decent code, and when you don't write decent code you refactor it as soon as practicable.
The same good coding practices that you *should* be following in your synchronous programming will take you a long way with async.

Which is not to say that there's nothing to worry about once you start using a serious amount of asynchronous APIs.

~~~

# Here's what you should fear #

```
dbAccess ----\
              ---> collate(d1,d2) ------\
dbAccess ----/                           ----> output(c1, n1)
                                        /
network -------------------------------/
```

Notes:

This is what you should fear.

Describe

And then, on top of it all, we need to handle errors sensibly, whatever that might mean for our application.

It's this sort of logic that can quickly become difficult to deal with, especially when you're encountering it all the time.

~~~

# The Crucibles #

Notes:

Various solutions exist that take different approaches to helping tame asynchronous code.
I want to give you a better framework for evaluating these solutions, and help you worry about the right things and not the wrong things.

So I've devised a set of three crucibles, little theoretical problems that I think are relevant to the most common use cases that you'll want an async solution to help you with.
I'm going to walk through these crucibles to evaluate four popular solutions, so you can see how each one works and how they compare to each other.

And then when you find another solution that I haven't covered, or you need to pick a solution for a project you're working on, I want you to remember these crucibles.
Pick a solution based on how well it solves these problems, not based on how many indentations or curly braces it involves.

~~~

# Crucible #1 #

A single async operation.

```
dbAccess ---> output(d1)
```

Notes:

This is the simplest crucible.
You'll be doing this sort of thing thousands of times in your asynchronous code, where you perform and asynchronous action and then when it finishes, you do something with the results.
This crucible exists to kick the tires and see how each async solution handles the basic unit of asynchronicity.

~~~

# Crucible #2 #

Multiple parallel async operations.

```
dbAccess -----\
dbAccess ----\ \
dbAccess ---------> output(d1,d2,d3,d4,d5)
dbAccess ----/ /
dbAccess -----/
```

Notes:

This is, I think, the next most common situation you'll run into.
You have more than one asynchronous operations, and you want to run them in parallel, because that's the whole point of having them be asynchronous.

But here's the problem: you need to wait until they're *all* finished, and then you need to do something with the combined results of all the operations.

If they all complete really fast, you want to finish and move on to the next step as soon as possible.
But maybe one of these operations is a cache miss, and then that's going to take a long time, and you gotta wait for that to finish before you move on.
But you *don't know* which of these many parallel operations is going to take the longest, and you can't set an effective upper or lower bound on any of them.

So how do you finish as soon as possible, but no sooner?

~~~

# Crucible #3 #

Parallel & serial operations, combined.

```
dbAccess ----\
              ---> collate(d1,d2) ------\
dbAccess ----/                           ----> output(c1, n1)
                                        /
network -------------------------------/
```

Notes:

And finally we get to the crucible I showed you earlier.
This one is real evil.

I designed this one to be representative of the most convoluted chain of logic that you're still very likely to run into.

Describe.

If your solution can handle this case without breaking a sweat, then it's pretty well equipped to deal with the sorts of asynchronous problems that you're probably going to run into as you build whatever you're building.

~~~

# The API #

input: function([string]crucibleNum)

Returns an array of ids to query the DB

~~~

# The API #

output: function([any]args...)

errored: function()

~~~

# The API #

dbAccess: function([int]id, callback(err, [obj]data))

Notes:

Now we have our asynchronous operations.
Behind the scenes these are all just implemented with variable timeouts to fake waiting for I/O operations.

~~~

# The API #

collate: function([obj]d1, [obj]d2,
<br />callback(err, [string]result))

~~~

# The API #

network: function([int]id, callback(err, [obj]data))

~~~

# The Contenders #

1. Vanilla JavaScript
2. Async.js
3. Promises
4. IcedCoffeeScript

Notes:

Part of the reason I'm showing vanilla JS is that this gets tossed around a lot in discussions by people who are like "You don't need any solution, you can just do it yourself, it's not that hard!"

I'm hoping that including it in this panel will give you a look at its poor performance in these crucibles and dissuade you from taking this route.
~~~

# Not mentioned: ES6 #

 * I don't have personal experience with it
 * Usable in front ends for real users: approximately **never**

Notes:

There's a feature in the upcoming ES6 standard for a thing called generators, and one of the things these can do is take asynchronous JavaScript and make it look synchronous.
I know there's also at least one popular library based on this called Task.js, but I'm not going to cover this because *reasons*.

But if you like it and you want to consider it for your project, I've given you the evaluation.
See how it performs.

~~~

# Let's begin #

~~~

# Crucible 1 #
## Vanilla JavaScript ##

~~~

```javascript
var  c = require("../crucibles");

c.dbAccess(1, function(err, data) {
  if (err) {
    c.errored();
  } else {
    c.output(data);
  }
});
```

Notes:

The first line requires our evaluation harness.
We call methods on that object to perform operations.

Pretty simple.
Our callback takes two values, an error value and a data value.
If the error value isn't null, something went wrong and we need to call `#errored` on our harness to mock the handling of that.
If everything went well, we're going to pass our results to the output method on our harness to demonstrate that we got it.
I have just wired that up to log the data to console so we can see it.

Demonstrate

~~~

# Crucible 1 #
## Async.js ##

~~~

```javascript
var  c = require("../crucibles");

c.dbAccess(1, function(err, data) {
  if (err) {
    c.errored();
  } else {
    c.output(data);
  }
});
```

Notes:

Okay, this is literally the exact same code.
This is because Async.js is a library that's still based on callbacks.
It stays very close to the standard callback model, so in this simple case it doesn't help us at all.
It will definitely help later, though.

~~~

# Crucible 1 #
## Promises ##

~~~

```javascript
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
}
```

Notes:

For Promises we have to wrap the whole evaluation harness so it returns Promises.
This is a big consideration when using Promises: you need your interfaces to *support* Promises.

Have a while separate file to redefine the API, not gonna show the whole thing, but this gives you the idea.

~~~

```javascript
var c = require("./crucibles_promise_api");

c.dbAccess(1).then(
    function(data) {
      c.output(data);
    },
    function(err) {
      c.errored();
    }
  );
```

Notes:

This simple crucible makes it pretty apparent that Promises are really just callbacks dressed up in some ceremony.
Only noticeable difference is that we have separate callbacks for success and failure.
Promises don't help at all in this case, but they'll be more useful later.

~~~

# Crucible 1 #
## IcedCoffeeScript ##

Notes:

ICS is a variant of CoffeeScript with an extra feature layered on top to help with async stuff.
The specifics of CoffeeScript aren't too relevant here, just try to follow along.

~~~

```coffeescript
c = require("../crucibles")

await c.dbAccess(1, defer err, data)
if err
  c.errored()
else
  c.output data
```

Notes:

This takes our async operation and makes it *look* synchronous.

Notice the `await` and `defer`.

~~~

# Crucible 2 #
## Vanilla JavaScript ##

~~~

```javascript
var results = [];
var waiting = 0;
for (i=0; i<ids.length; i+=1) {
  waiting += 1;
  c.dbAccess(ids[i], function(data) {
    results[i] = data;
    // ...
  });
}

// HAHAHA NOPE
```

Notes:

You would *think* that this would work. Nope.

~~~

```javascript
var results = [];
var hadError = false;
var waiting = 0;
for (i=0; i<ids.length; i+=1) {
  (function(i) {
    waiting += 1;
    c.dbAccess(ids[i], function(err, data) {
      if (err) {
        hadError = true;
      }
      results[i] = data;
      waiting -= 1;
      if (waiting === 0) {
        if (hadError) {
          c.errored();
        } else {
          c.output(results);
        }
      }
    });
  })(i);
}
```

Notes:

We're already starting to see the various things that can go wrong when you build the wheel yourself.
None of it is particularly complicated, but there are lots of moving parts, which means lots of places to screw up:

 * The iterator counter
 * Assembling the results correctly
 * The waiting counter (what happens if one request times out?)
 * Error handling on *every single callback*

~~~

# Crucible 2 #
## Async.js ##

~~~

```javascript
var async = require("async");

async.map(ids, c.dbAccess, function(err, results) {
  if (err) {
    c.errored();
  } else {
    c.output(results);
  }
});
```

Notes:

This is why I like Async.js.
Async.js is what you would write if you tried to extract the common behavior from the vanilla JavaScript use cases.
Only it's better.

~~~

# Crucible 2 #
## Promises ##

~~~

```javascript
var Q = require("q");
var c = require("./crucibles_promise_api");

var promises = ids.map(c.dbAccess);
Q.all(promises).then(
    function(data) {
      c.output(data);
    },
    function(err) {
      c.errored();
    }
  );
```

Notes:

Remember, *this* API returns promises from the function calls.

*This* map is different from the last example.

"Promises" itself is a very small specification.
We've hit the end of just-Promises can offer us, but libraries like Q offer more functionality based on the Promises model.

~~~

# Crucible 2 #
## IcedCoffeeScript ##

~~~

```coffeescript
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
```

Notes:

Already seeing that ICS makes us do a little more work

~~~

# Crucible 3 #
## Vanilla JavaScript ##

~~~

# Prepare yourselves #

~~~

```javascript
var dbResults = [];
var dbWaiting = 0;
var networkWaiting = false;
var networkResult;
var collateWaiting = false;
var collateResult;
for (i=0; i<ids.length; i+=1) {
  (function(i) {
    dbWaiting += 1;
    c.dbAccess(ids[i], function(data) {
      dbResults[i] = data;
      dbWaiting -= 1;
      if (dbWaiting === 0) {
        collateWaiting = true;
        c.collate(dbResults[0], dbResults[1], function(c1) {
          collateWaiting = false;
          collateResult = c1;
          if (!networkWaiting) {
            c.output(collateResult, networkResult);
          }
        });
      }
    });
  })(i);
}
networkWaiting = true;
c.network(1, function(n1) {
  networkWaiting = false;
  networkResult = n1;
  if (!collateWaiting) {
    c.output(collateResult, networkResult);
  }
});
```

Notes:

This is the awful version, the version that everyone fears when they talk about callback hell.

But in fairness to vanilla JavaScript, I just yelled at you earlier about writing properly modular code, so let's refactor this into manageable parts.

~~~

```javascript
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
```

Notes:

We've seen this before

~~~

```javascript
var getAndCollate = function(callback) {
  getDbResults(function(err, dbResults) {
    if (err) {
      callback(err);
    } else {
      c.collate(dbResults[0], dbResults[1], callback);
    }
  });
};
```

~~~

```javascript
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

  // Continued...
```

~~~

```javascript
  // ...
  collateWaiting = true;
  getAndCollate(function(err, c1) {
    if (err) {
      errors.push(err);
    }
    collateWaiting = false;
    collateResult = c1;
    tryContinue();
  });
```

~~~

```javascript
  // ...
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
```

~~~

```javascript
networkAndCollation(function(err, data) {
  if (err) {
    c.errored();
  } else {
    c.output(data[0], data[1]);
  }
});
```

Notes:

I tried, I really did.
We've pushed vanilla JavaScript to its breaking point.

~~~

# Crucible 3 #
## Async.js ##

~~~

```javascript
var getDbResults = function(callback) {
  async.map(ids, c.dbAccess, callback);
};
```

Notes:

This we've seen before

~~~

```javascript
var getAndCollate = function(callback) {
  async.waterfall([
    getDbResults,
    function(dbResults, callback) {
      c.collate(dbResults[0], dbResults[1], callback);
    }
  ], callback);
};
```

Notes:

Waterfall performs each function in serial, passing the results of one function to the next one in line.

~~~

```javascript
async.parallel(
  [
    getAndCollate,
    async.apply(c.network, 1)
  ],
  function(err, results) {
    if (err) {
      c.errored();
    } else {
      c.output(results);
    }
  }
);
```

Notes:

`parallel` simple takes an array of functions, runs them all in parallel, and calls the callback when finished.

Error handling in one place.

~~~

# Crucible 3 #
## Promises ##

~~~

```javascript
promises = ids.map(c.dbAccess);
```

Notes:

Seen this before

~~~

```javascript
var collatedPromise = Q.all(promises)
  .then(function(dbResults) {
    return c.collate(dbResults[0], dbResults[1]);
  });
```

Notes:

Promises are *chainable*

~~~

```javascript
Q.all([
    collatedPromise,
    c.network(1)
  ])
  .then(
    function(data) {
      c.output(data);
    },
    function(err) {
      c.errored();
    }
  );
```

Notes:

Error handling in one place.

~~~

# Crucible 3 #
## IcedCoffeeScript ##

~~~

```coffeescript
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
```

Notes:

We bump up against some of ICS' limitations here

Have to wrap this step in its own async function because that's the only way to run this in parallel with the network part.

~~~

```coffeescript
await
  c.network 1, defer errNetwork, n1
  getAndCollate defer errCollate, c1

if errNetwork? or errCollate?
  c.errored()
else
  c.output c1, n1
```

~~~

# Winner? #

~~~

# Vanilla JS #

 * You saw that last one
 * You will experience that pain on a small scale every day.
 * Every. Day.

~~~

# Vanilla JS #
## Thumbs down ##

~~~

# Async.js #

 * It's "close to the metal"
 * Stays out of the way when you don't need it
 * Powerful abstractions for all common use cases

Notes:

I've really only scratched the surface of the various control flows Async.js offers.
If anything, it has too many.

~~~

# Async.js #
## Thumbs up ##

~~~

# Promises #

 * Requires all tools to support Promises
 * Other people can implement Promises poorly and you will pay for it
 * But, it's powerful and usually elegant

Notes:

Putting together this talk improved my opinion of Promises based on how well it handled the third crucible.

~~~

# Promises #
## Thumbs down ##

~~~

# IcedCoffeeScript #

 * Very elegant
 * Not powerful enough
 * Build toolchain problems

~~~

# IcedCoffeeScript #
## Thumbs down ##
