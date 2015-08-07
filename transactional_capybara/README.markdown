# Wrangling Asynchronous JavaScript #

Slides and code to support a talk I gave.

* [Online slides](http://iangreenleaf.github.io/talks/async_javascript/slides)
* [PDF slides](http://iangreenleaf.github.io/talks/async_javascript.pdf)

## Using the code ##

The crucible test harness is in `crucibles.js`.
This module provides all the helper methods you'll need to emulate asynchronous operations.
ASCII diagrams of the crucibles are available in `crucibles.txt`.

See the existing contenders for examples of running the crucibles.
Each is located in its respective folder, with one file per crucible.

To run a crucible, first make sure you have all the packages installed:

```sh
npm install
```

Now, pick your crucible and contender and run it with the appropriate interpreter:

```sh
node vanilla_js/crucible_2.js
```

Or:

```sh
iced iced_coffee_script/crucible_2.iced
```

To have the test harness throw errors at the crucibles, set the `ERRORING` env var to something truthy:

```sh
ERRORING=1 node vanilla_js/crucible_2.js
```
