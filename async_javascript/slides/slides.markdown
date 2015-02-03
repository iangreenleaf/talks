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
        var processed_data = process(data);
        fs.writeFile('/var/processed/' + filename, processed_data, function(err) {
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
  var processed_data = process(data);
  var err = fs.writeFile('/var/processed/' + filename, processed_data);
  if (!err) {
    db.table('unprocessed_files').delete(filename);
    response.writeHead(200);
    response.finish();
  }
}
```

Notes:

Now this might not look as bad visually.
But I contend that this code still sucks.
This is doing waaaaaay too many things in one big imperative block.
Our problem wasn't that asynchronous style made our code bad, it's that our code *was* bad and asynchronous style just made that very obvious.

~~~

# Lots of tiny pyramids #

```javascript
function processAndWriteToFile(data, callback) {
  var processed_data = process(data);
  fs.writeFile('/var/processed/' + filename, processed_data, callback);
}

function readAndProcessFile(filename, callback) {
  fs.stat(filename, function(err, stat) {
    if (stats.isFile()) {
      fs.readFile(filename, callback);
    }
  });
}

function dbPopAndHandle(table, processingFn, callback) {
  db.table('unprocessed_files').first(function(record) {
    processingFn(record, function(err) {
      db.table('unprocessed_files').delete(filename, callback);
    });
  });
}

function popUnprocessedFile(callback) {
  dbPopAndHandle('unprocessed_files', function(record) {
    readAndProcessFile(record, function(err, data) {
      processAndWriteToFile(data, callback);
    });
  });
}

popUnprocessedFile(function(err) {
  if (!err) {
    response.writeHead(200);
    response.finish();
  }
});
```

Notes:

In fact, if we clean up this code and factor it into a bunch of little functions that do one thing well, which is a good programming practice no matter what style you're writing, you can see that the Pyramid of Doom goes away.

Describe what's happening.

This code has all the same async stuff going on, but it's not nearly so bad.
Each function is easy to understand, and we've genericized some of the functions so they could be reused elsewhere in our imaginary application.

~~~

# Don't worry about the Pyramid of Doom #
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
