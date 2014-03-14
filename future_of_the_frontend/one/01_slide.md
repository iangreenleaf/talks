!SLIDE
# The Future of the Front End #
## or: How I Learned To Stop Worrying And Love JavaScript ##

!SLIDE
# About me #
* @iangreenleaf
* Full-stack Rails developer
* Hire me! dev@iangreenleaf.com
* I wrote a book on CoffeeScript: http://goo.gl/5WtQdg

~~~SECTION:notes~~~
Hello, everyone! My name is Ian Young.

I live down in North Park and this is my first time up here, so I want to say
thanks to Daniel and Michael for inviting me to come give this talk.

I'm a full-stack developer; I do mostly Rails work with a slight emphasis on the back end.
The good news is that you can hire me! I'm available for part-time contract work, so
if you're interested come talk to me afterward or send me an email.

And, I wrote a book on CoffeeScript recently titled CoffeeScript Application Development.
I'll be talking about CoffeeScript some tonight, but I have plenty more to say on the
topic, so if you're interested you can check that out.
~~~ENDSECTION~~~

!SLIDE
# Predicting the future... #

~~~SECTION:notes~~~
I'm here to talk to you about the future of the front end.
Predicting the future of anything is a rather fraught exercise,
and probably nowhere more so than something as fast-paced as web development.
Which is why this talk as actually about three parts *descriptive* to
one part *predictive*.

I can't tell you exactly what our web development world will look like in 2, 5 or 10 years.
But I can tell you where we're headed at the moment, and give you the *shape* of things to come.
~~~ENDSECTION~~~

!SLIDE
# Reality #
~~~SECTION:notes~~~
So let's start with where we are right now, and a few things that are *not* going to happen.
~~~ENDSECTION~~~

!SLIDE
# Internet Explorer is not going away #
~~~SECTION:notes~~~
Internet Explorer is not going away.

Yes, we finally beat down IE 6. It took us a decade and a literally uncountable number of
wasted development hours, but we're finally starting to write off IE6. We're dropping support
for it in our libraries and taking it out of our contracts.
This is a victory, yes, but a bit of a Pyrrhic one.

I want to do a quick poll, for those of you who watch the analytics for a production application.
How many of you have a non-negligible base of uses on some version of Internet Explorer?
Of your IE users, what percentage of them are on IE8 and lower?
5%? 20%? 50%? More?

The stats reported by major trackers of these sorts of things,
and this matches up with my personal experience,
are that currently IE 8 is somewhere between a quarter and a half of
the total Internet Explorer market. And given that IE is still holding on to something like
a third of the total browser market, most sites do not have the luxury of ignoring it.[1]

And IE8 is quite bad. It's badly behind the latest crop of HTML5 standards, it's still not
terribly compliant with those it does support, it still has ugly bugs, and so on.

And people say "yeah, but IE9 is a lot better!"

Which is true -- but mostly because it was a pretty low bar. IE9 was already badly obsolete by
the time it captured any significant portion of the market[2].

And then it's "oh, but IE10 is really the one that's turned things around for them."

Which is *exactly what we said about IE 8.*

And people say "Oh, but now IE is pushing out updates automatically!"

Which is great, but I'm going to hold my celebration until I hear from all those corporate IT
departments who have magically changed their policy to allow Microsoft updates to be pushed
to their networks without review.

Microsoft may improve their browser, but it will always lag behind in standards support,
it will always answer to their not-entirely-noble agenda, and there will always be some
version of IE that everyone hates because it is the least modern browser of the current crop.
This is the only safe assumption to make, and those of you who do not believe this are
going to deal with a lot of disappointment in your lives.

[1]: https://people.mozilla.org/~prouget/ie9/
[2]: http://gs.statcounter.com/#browser_version-US-monthly-201309-201402-bar
~~~ENDSECTION~~~

!SLIDE
# Mobile is the new IE #
~~~SECTION:notes~~~
It gets worse.

Mobile web browsers are bad. Really, really bad.

There's Android 2.3, which has a built-in Chrome-ish browser that does just about everything wrong
when it comes to mobile-specific styling and behavior.
And that browser is never updated because it's tied to Android OS updates, and carriers abandon
updates for their devices roughly as soon as they leave the warehouse.

The only reasons we're even close to being able to abandon Android 2.3 support today is the
short lifecycle of smartphones, plus the relatively high level of user hostility in the mobile web
world in general.

Android 4 is better, but it's far from perfect.

And iOS. iOS started at a better place, but I defy you to tell me that building web applications
for iOS is actually pleasant. Things randomly break. Perfectly valid CSS creates ghostly
artifacts for no reason. The screen flickers at odd times even though you're not repainting anything.
iOS 7 comes out and there are actually a bunch of *regressions* in web standards, with no
explanation and nothing in the release notes.

So we're back to sniffing for specific user agents, which is one of the worst feelings imaginable.
We fill our frontend code with hacks and workarounds, and we paste in inscrutable incantations
we've copied from Stack Overflow because someone else says they worked, kinda, maybe.

It's bad. Mobile is bad right now, and it's going to be bad for a while yet, because the devices
are far more interested in supporting native apps than they are in web applications that
treat all ecosystems fairly and don't advantage them.
~~~ENDSECTION~~~

!SLIDE
# We're never getting rid of JavaScript #
## Or CSS ##
## Or HTML ##

~~~SECTION:notes~~~
We're never getting rid of JavaScript. I don't mean only that specifically,
but we're never going to see a change to web technology that is anything but
incremental.

On a personal note, I believed for a long time that we would be replacing or
augmenting these building blocks with something better. It seemed obvious - the
current tools were pretty lackluster, so we would work on a replacement because
better is better and worse is worse.

But it has not happened and I now believe it's foolish to hope that it ever will.

JavaScript is 19 years old and showing its age rather heavily, yet nothing has come
even close to replacing it as the browser's scripting language. Flash we were only
too happy to get rid of, and ActionScript has all the shortcoming of JavaScript anyhow.
Dart, which I'll talk about later, is perhaps the most serious attempt at replacing
JavaScript, but it's been years and it doesn't seem to have made any headway.

CSS: CSS is terrible at a lot of things and was built around a bunch of printing press
mechanics that have absolutely no place on the web, and yet as far as I know
we haven't ever had a serious contender for a replacement.

HTML is actually the least-bad of the three components and yet ironically the only one
that was nearly replaced. XHTML  TODO
~~~ENDSECTION~~~

!SLIDE
# Standards will never be standard #
~~~SECTION:notes~~~
Look. I have a great amount of respect for what the W3 has done and what the web is today,
but there's no escaping the fact that they do some really suck stuff.
TODO

We're never going to live in a magical land where browsers all support the same standards
perfectly. There's always going to be a certain amount of idealism that goes
unrealized, and there's always going to be problems caused by incompetence, or power plays,
or silly bickering between browser vendors.

That's where we stand, and if I've made it sound a bit grim, that's because I think it *is* a bit grim.
~~~ENDSECTION~~~

!SLIDE
# A way forward #
~~~SECTION:notes~~~
But we've been here before. Things have been bad before, and we got through it.

We've got things that worked in the past, and we've got some amazing new ideas, and together
*I believe* that we can craft a good life for ourselves.

Things will always be crappy. But with the right tools, we can stop *caring* that they are crappy.
~~~ENDSECTION~~~

!SLIDE
TODO the dark ages
~~~SECTION:notes~~~
Let's think back to the dark ages of the Internet. Things were bad then. The browser wars had raged,
and as with most wars civilians paid the highest price.

Nothing *worked*. Simple browser behaviors that we take for granted, like event handling,
were a quagmire of incompatible implementations and ugly bugs. Even simple tasks, like selecting
elements by class name, were maddeningly difficult.

And then things got better. What happened? Browsers didn't suddenly get their shit together overnight.
Nothing about the state of web standards improved -- at least not right away. So what happened?
~~~ENDSECTION~~~

!SLIDE
TODO holy jq
~~~SECTION:notes~~~
jQuery happened.
~~~ENDSECTION~~~

!SLIDE
# jQuery was a watershed moment #
~~~SECTION:notes~~~
jQuery was a watershed moment for web development. Suddenly, it didn't matter that browsers were terrible.
You installed this little JavaScript library, and you had a consistent, predictable, cross-compatible API
to interact with the browser on terms that made sense. jQuery's interface was the interface that should
have existed in the first place, if the world were a slightly better place.
~~~ENDSECTION~~~

!SLIDE
TODO code example
~~~SECTION:notes~~~
jQuery would give some nice method like TODO and you would call it and it would work nicely.

Now, behind the scenes, jQuery was scrambling all over filling in missing features, working around browser
quirks, doing all sorts of ghastly stuff to fulfill the request.

But you, as the developer, *didn't care*. You didn't *need* to care. The work happened once, in jQuery,
by some brilliant people who I'm sure sacrificed some portion of their sanity, and the rest of us
never had to worry about all of that stuff again.
~~~ENDSECTION~~~

!SLIDE
TODO "jquery developers"
~~~SECTION:notes~~~
~~~ENDSECTION~~~
TODO jquery doesn't go far enough

!SLIDE
# Solution: compiled languages! #
~~~SECTION:notes~~~
Compiled languages!
~~~ENDSECTION~~~

!SLIDE
TODO graphic
~~~SECTION:notes~~~
What we do is we write code in a new language. We run that code through a compiler that *translates*
that language into JavaScript, or HTML, or CSS. So the file the compiler spits out is a fully
compatible web-ready format, but we can *write* in a language that is as powerful and expressive as
we can dream.

This workflow is pretty similar to the original compiler workflow, in which you would write some code
in, say, C, and give that to a compiler that would spit out bytecode. Same idea, but...
~~~ENDSECTION~~~

!SLIDE incremental bullets
# JavaScript/CSS/HTML is the new bytecode #
* Backwards compatible
* Reasonably powerful
* Awful to write by hand
~~~SECTION:notes~~~
JavaScript, CSS, and HTML are the new bytecode. By compiling to these targets, you can run on
every browser, from now until forever. Just like bytecode, these technologies provide enough
power to do the things you need to do, and just like bytecode, they are immensely unpleasant to
write by hand.
~~~ENDSECTION~~~

TODO "I;m going to give some examples"

!SLIDE
# SCSS (née Sass) #
~~~SECTION:notes~~~
Our first example is a language called Sass, or SCSS.

This one targets CSS, and fills in a lot of the features that we all miss when we write CSS.
~~~ENDSECTION~~~

!SLIDE
# SCSS #
```scss
a {
  color: #484C55;
}
```
~~~SECTION:notes~~~
SCSS looks a lot like CSS, and in fact any valid CSS is also valid SCSS. But it adds a bunch of stuff on top.
~~~ENDSECTION~~~

!SLIDE
# SCSS #
```scss
$link-color: #484C55;
a {
  color: $link-color;
}
```
~~~SECTION:notes~~~
Variables! So now when you want to tweak one of your color values, you can do it in one place instead of 50
places littered throughout your stylesheets.
~~~ENDSECTION~~~

!SLIDE
# SCSS #
```scss
$link-color: #484C55;
a {
  color: $link-color;
}
a:hover {
  color: $link-color + #444;
}
```
~~~SECTION:notes~~~
You can do math! We want to slightly lighten links on hover, and rather than define a new color we just tell
SCSS to lighten it by a certain amount relative to our variable.
~~~ENDSECTION~~~

!SLIDE
# SCSS #
```scss
.nav-bar {
  a {
    color: black;
  }
}
```
~~~SECTION:notes~~~
You can nest selectors, and this will compile out to what you would expect.
*Much* more pleasant than writing out big sequences of selectors for every single element you need to style.
~~~ENDSECTION~~~

!SLIDE
# SCSS #
```scss
@mixin highlighted {
  background-color: yellow;
  font-style: italic;
}
p.callout {
  @include highlighted();
}
```
~~~SECTION:notes~~~
You can define mixins, which are like reusable functions that set CSS rules. Here we define a "highlighted" mixin
with styling rules, and then we can apply it within any selector we want. Again, this is defining things in
one place rather than repeated throughout our style sheets.
~~~ENDSECTION~~~

!SLIDE
# SCSS + Compass #
```scss
.avatar {
  // No!!!
  -webkit-border-radius: 5;
     -moz-border-radius: 5;
          border-radius: 5;
}
```
~~~SECTION:notes~~~
Now there's an additional library called Compass that leverages SCSS mixins to provide a whole bunch of
compatibility features and other helpful stuff.

I hate when I see code like this. It's a nuisance to write, easy to screw up, and if another browser
adds support under their own prefix, your site will still not look good for that browser unless you
track down every instance of these rules and fix them. This kind of behavior is largely responsible for the
tremendous mess that has been made of browser prefixes and is close to rendering them as meaningless
as user agent strings.
~~~ENDSECTION~~~

!SLIDE
# SCSS + Compass #
```scss
.avatar {
  // Yess!!!
  @include border-radius(5);
}
```
~~~SECTION:notes~~~
The good news is you never have to write that again! Now that you're using Compass, you use their
provided border radius helper and it automatically spits out all the prefixed stuff for you.
The Compass maintainers worry about which prefixes and what format, and as long as you keep your
Compass compiler up to date, your stuff is always correct with *no extra effort from you*.

This is really the promise of compiled languages. We can build with new features and nice APIs,
*without* sacrificing backwards compatibility and graceful degradation. And we can do it all
with very little extra effort on our own part, because we are building on the work of others.
~~~ENDSECTION~~~

!SLIDE
# Haml #
~~~SECTION:notes~~~
HTML hasn't received as much attention as the other two technologies, probably because it's not
as obviously deficient as CSS and JavaScript. HTML isn't super complicated, and it
does what it does decently well.

Still, there's a lot of punctuation involved in writing it by hand, plus the opportunity to miss
a closing bracket and introduce invalid HTML that will more or less continue to work,
silently swallowing the error until two weeks later you lose your mind over an insane CSS
bug triggered by the fact that you're styling an invalid DOM.

So we can still find a more pleasant way to write HTML, which is the idea behind Haml.
~~~ENDSECTION~~~

!SLIDE
# Haml #
```haml
#nav-bar.dropdown
  %ul.nav-links
    %li Home
    %li About
```
~~~SECTION:notes~~~
Haml offers a syntax for defining elements that looks a lot more like CSS selectors and
strips away most of the unnecessary stuff. You can define IDs and classes for an element,
as we are doing at the top. Elements are divs by default, unless you specify a different
element name, as we do with the list.

Nesting is determined by whitespace, so it's impossible to fail to close a tag.

Haml is tightly coupled to the Ruby toolchain, so it doesn't get much use in other
platforms, but there are similar projects with similar ideas.
~~~ENDSECTION~~~

!SLIDE
# CoffeeScript #
~~~SECTION:notes~~~
Now we're going to look at JavaScript. JavaScript is the full programming language, so
it has seen the most interest both because it has the most potential, and because it... has
the most room for improvement.

The most well-known compiled language that targets JavaScript is CoffeeScript.
~~~ENDSECTION~~~

!SLIDE
# CoffeeScript #
```coffeescript
num = Math.pow 2, 3
if true == true
  console.log "Tautology!"
```
~~~SECTION:notes~~~
CoffeeScript cleans up a lot of JavaScript's unnecessary syntax. Parentheses are optional most
of the time, semicolons are out, curly braces are gone and mostly replaced by indentation.

And some of the common mistakes in JavaScript are automatically taken care of.
Our num variable is defined in the local scope, not the global scope, no `var` keyword needed.
And the double-equals is automatically converted to a triple-equals, because double-equals
in JavaScript is dangerous and never what you actually want.
~~~ENDSECTION~~~

!SLIDE
# CoffeeScript #
```coffeescript
animals = ["dog", "cat", "bird"]
for animal in animals
  console.log animal
```
~~~SECTION:notes~~~
CoffeeScript is a much more pleasant way to write JavaScript - it's simply easier. Easier to write,
easier to read and understand. And it's much less likely that a moment's inattention will introduce
a nasty bug, because there's simply less for you to screw up.

Here's a for loop. You can probably work out what it's going to do.
~~~ENDSECTION~~~

!SLIDE
# CoffeeScript #
```coffeescript
double = (num) ->
  num * 2

double(5)
```
~~~SECTION:notes~~~
This is a function in CoffeeScript. CoffeeScript performs implicit returns, so the function will
automatically return the last statement in the block unless I tell it otherwise.

The arrow syntax takes a little getting used to, but it dramatically reduces the visual noise,
especially when you are dealing with nested callbacks, which happens a lot with AJAX operations
or in Node.js.
~~~ENDSECTION~~~

!SLIDE
# CoffeeScript #
```coffeescript
class Automobile
  honk: ->
    console.log "Beep!"

car = new Automobile()
car.honk()
```
~~~SECTION:notes~~~
CoffeeScript also offers a class structure. Even though it looks very different, these still
compile down to the agreed-upon standard "class" objects in JavaScript, where the class is a
function object and methods are attached to the prototype chain.
~~~ENDSECTION~~~

!SLIDE
# CoffeeScript #
```coffeescript
class PoliceCar extends Automobile
  honk: ->
    super
    console.log "Wee-oo wee-oo wee-oo!"
```
~~~SECTION:notes~~~
CoffeeScript classes offer inheritance too. The CoffeeScript compiler worries about keeping track
of the prototype chain and all that business, so that we don't have to. And because it's a compiled
language, it can introduce new keywords like `super` that compile to some less-pretty JavaScript.
~~~ENDSECTION~~~

!SLIDE
# CoffeeScript #
```coffeescript
document.getElementById("nav-bar").className
```
~~~SECTION:notes~~~
CoffeeScript is a fairly thin layer on top of JavaScript, and a major advantage it reaps from this
is very simple interoperability. It's extremely simple to work with the DOM from CoffeeScript, and
to call to 3rd party JavaScript libraries. And it's also simple to call your CoffeeScript code
from JavaScript. So CoffeeScript can easily be dropped in to an existing project and work
side-by-side with everything else.
~~~ENDSECTION~~~

!SLIDE
# JavaScript #
# ...well, ES6 to be precise #
~~~SECTION:notes~~~
Another language that compiles to JavaScript is... JavaScript. Bear with me for a moment.
~~~ENDSECTION~~~

!SLIDE
# ES6 #
~~~SECTION:notes~~~
The next generation of JavaScript is ES6. It's going to be introducing a nice set of features,
but even once ES6 is finalized, we would generally have to wait until every browser supported
ES6 before we could safely roll it out.

Well, not any more! There are several libraries being developed with the goal of taking
shiny ES6 JavaScript and compiling it *back* to the JavaScript of today. So you use all the
nice new features of ES6, but your code still works fro everyone.
~~~ENDSECTION~~~

!SLIDE
# ES6 #
```javascript
for (let element of [1, 2, 3]) {
  console.log(element);
}
```
~~~SECTION:notes~~~
ES6 has new iterators and better for-loops. Pretty nice.
~~~ENDSECTION~~~

!SLIDE
# ES6 #
```javascript
class PoliceCar extends Automobile {
  honk() {
    super();
    console.log("Wee-oo wee-oo wee-oo!");
  }
}
```
~~~SECTION:notes~~~
It has classes and inheritance.
~~~ENDSECTION~~~

!SLIDE
# ES6 #
```javascript
import {firstName, lastName} from './another_file';
```
~~~SECTION:notes~~~
It has a module system for encapsulating code instead of throwing everything into the global scope.
~~~ENDSECTION~~~

!SLIDE
# ...and more #
~~~SECTION:notes~~~
It has a bunch of cool stuff, and if we can write ES6 now instead of twiddling our thumbs waiting for
full adoption, it becomes a very viable alternative. Writing ES6 and compiling for compatibility
could strike a nice middle ground that mirrors many of the benefits of CoffeeScript without
the overhead of learning a new language.
~~~ENDSECTION~~~

!SLIDE
# ClojureScript #
~~~SECTION:notes~~~
Moving slightly further afield, we encounter ClojureScript.

ClojureScript is related to *Clojure*, which is a server-side language that runs on the JVM.
Clojure is a LISP, which if you don't know what that
means, LISP is basically the hipster of programming languages -- it was doing advanced language techniques
before it was cool.
~~~ENDSECTION~~~

!SLIDE
# Clojure #
```clojure
(def a 5)
(+ a 2 3)
; => 10
```
~~~SECTION:notes~~~
Clojure looks like this. The syntax is different from most popular languages -- that's the result of being a LISP.
Parens enclose a function call, and the first thing inside the parens is the function being called.
Even arithmetic operators get the same treatment; this is called "prefix" notation.

Here we first define a variable, a, and give it the value 5. Then we call the "plus" function with
a and some other arguments, which will add everything. That third line is a comment, which I'm going to be using to
show return values.
~~~ENDSECTION~~~

!SLIDE
# Clojure #
(def shout (fn [x] (.toUpperCase x)))
(shout "hello")
; => "HELLO"
(map shout ["hello" "world"])
; => ("HELLO" "WORLD")
~~~SECTION:notes~~~
Here we're defining a function, "shout", that takes an argument and uppercases it.
We can then call that function on a string.
We can also use `map` to call the function on each element of an array and return a new array with the results.

Clojure is a functional programming language, so you'll see some concepts you might be familiar with from JavaScript,
but Clojure takes these much further and relies on the functional paradigm much more heavily.

That's Clojure in a nutshell.
~~~ENDSECTION~~~

!SLIDE
# ClojureScript #
(def shout (fn [x] (.toUpperCase x)))
(shout "hello")
; => "HELLO"
(map shout ["hello" "world"])
; => ("HELLO" "WORLD")
~~~SECTION:notes~~~
Clojure*Script* is a port of Clojure that compiles to JavaScript. In other words, it looks mostly the same, but you can
compile it to something that runs in the browser.

Now, it's worth noting that the previous languages we've looked at map very closely to JavaScript.
The data primitives are all JavaScript primitives, and the mechanics of the language are still JavaScript.
Once you understand
CoffeeScript, it's fairly easy to guess what the compiled JavaScript output will look like. And in fact, the compiled
JavaScript looks like something a human *might* write.

This isn't the case for ClojureScript. It's founded on a significantly different set of assumptions, and so it maintains
it's own immutable data types, and has a significant amount of extra runtime built in.
~~~ENDSECTION~~~

!SLIDE
TODO
```clojure
(def foo (js-obj "bar" "baz"))
; var foo = {bar: "baz"};
(set! (.-bar foo) "quux")
(def clojure-foo (js->clj foo))
(clj->js clojure-foo)
```
~~~SECTION:notes~~~
ClojureScript offers some extra functionality to bridge the gap between Clojure and the browser runtime.

You can create JavaScript primitives and convert between those and Clojure data structures.
TODO explain

The upshot of this is that it's not quite as straightforward to interface between ClojureScript and 3rd-party libraries,
or the DOM itself. If you use ClojureScript you'll want to use as many native ClojureScript libraries as you can
to save yourself the trouble of bridging that gap. This leaves you at the mercy of a healthy ClojureScript ecosystem,
though to be fair there are some very nice projects happening so far.

TODO performance

The big upside to this greater level of abstraction is that we are better insulated from JavaScript's failings.
CoffeeScript classes are pleasant to work with thanks to the thoughtful implementation and nice syntax, but
at the end of the day you *are* still working with JavaScript's wacky and poorly-implemented version of
prototypical inheritance, which I guarantee will come around to bite you sooner or later. You're still
working with JavaScript's weak typing and ridiculous comparators.[1]

CoffeeScript does what it can to insulate you from JavaScript's shortcomings, but the unavoidable truth is that
it can only do so much. ClojureScript, by greater abstraction, can do much more.

[1]: https://www.destroyallsoftware.com/talks/wat
~~~ENDSECTION~~~

!SLIDE
# asm.js #
~~~SECTION:notes~~~
The other consequence of this abstraction is that we are now starting to treat JavaScript a lot like bytecode.

CoffeeScript still has access to the entire JavaScript feature set and a CoffeeScript program will likely use
much of it.

A ClojureScript program uses many fewer of JavaScript's features. In fact, to be Turing complete we need only
a very small number of simple operations in theory, and we could build an entire language runtime on top of those.

Some very smart people followed this train of thought and said, "Hey, if we're going to treat JavaScript like
bytecode, why not actually define a JavaScript bytecode?" And thus asm.js was born.

asm.js is a spec. It's a subset of JavaScript that uses only a small number of simple operations. TODO what operations?
You give a browser a piece of asm-compliant code, and that browser can, in theory,
choose to run that code with a bunch of optimizations applied that are not possible when you must account
for JavaScript's full set of more dynamic features. In other words, if the browser supports it, asm-compliant
code can run very, very fast.

Now, asm code is also not very human readable. TODO example
You're not really meant to produce asm by hand. It's a target for compilers. *pause*

It's all coming together, right?

TODO graphics
We build something in a language of our choice, a language that may be as far removed from JavaScript as we please.
We *compile* our code through a special compiler that targets
asm.js. It spits out a bunch of ugly JavaScript with the full runtime that's needed to run our code.
This JavaScript is regular JavaScript that will run on *any* browser. It just so happens that a browser with
ASM optimizations will run it very, very fast. Suddenly, any language we can dream is theoretically available to
us in the browser, fully functional in older browsers and with excellent performance in modern browsers.
~~~ENDSECTION~~~

!SLIDE
# Can I use asm.js now? #
# ...sorta. #
* LLVM is a many-to-many compiler toolset
* Emscripten can go from LLVM to JavaScript
* C --(clang)--> LLVM --(Emscripten)--> asm.js
~~~SECTION:notes~~~
Welllll... sorta.

Chrome and Firefox are starting to roll out some ASM optimizations, though it's still
a work in progress and you might not see all the performance gains right away.

For compiling to JS, there's a project called LLVM that's sorta the Swiss army knife of compilers.
It provides a common format for all the gunk that sits in the middle of the
compilation process. So there are a number of things that can take various
languages and feed them *in* to LLVM, and once you're there you can output your gunk
to any number of supported output sources.

One of those output sources is Emscripten, which goes from LLVM to ASM-compatible JavaScript.
So in theory anything that you can pump into LLVM could run in a browser.
Right now people are running C and C++ code in the browser by way of this toolchain,
though it's mostly for benchmarking and experimental purposes at the moment.

In practice, making ASM languages a pleasant and useful experience will take a bit more work,
and we're not really there yet. ASM is still in an experimental phase, though
I think the odds are extremely good for it to see widespread adoption.
~~~ENDSECTION~~~

!SLIDE
# The best is yet to come #
~~~SECTION:notes~~~
We're going to see more and more compiled language options for every piece of front end technology.
It's already becoming more and more common for back end platforms like Rails and Node to offer
"asset pipelines" that take care of the compilation step for all your front end assets.

What we have today is pretty great, and I believe what we have in a few years will be
spectacular.

Imagine a world where you can write your front end application in any number of languages,
and it automatically works on every browser. A language someone dreamt up *yesterday*
can hit the web and immediately work everywhere, for everyone. This is the world
we're going to have very soon, and it's a little bit frightening but very, very exciting.
~~~ENDSECTION~~~

!SLIDE
# We're never getting rid of HTML/CSS/JavaScript #
# ...but I don't care. #
~~~SECTION:notes~~~
We're never getting rid of Internet Explorer. We're never getting rid of JavaScript.

But that's okay. We're never getting rid of them, but we aren't going to be *using*
them for much longer.
~~~ENDSECTION~~~

!SLIDE
# Fin #
~~~SECTION:notes~~~
~~~ENDSECTION~~~
