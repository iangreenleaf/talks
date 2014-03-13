!SLIDE
# The Future of the Front End #

!SLIDE
TODO about me

!SLIDE
Predicting the future...

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
Internet Explorer is not going away
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
treat all ecosystems fairly.
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
~~~ENDSECTION~~~

!SLIDE
~~~SECTION:notes~~~
~~~ENDSECTION~~~
