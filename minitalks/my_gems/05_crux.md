!SLIDE subsection
# crux #

[github.com/iangreenleaf/crux](https://github.com/iangreenleaf/crux)

!SLIDE incremental
# Greasemonkey #

 * Firefox extension
 * Execute your own Javascript on matched pages

!SLIDE
    @@@ javascript
    // ==UserScript==
    // @name Github autocomplete
    // @namespace iangreenleaf.com
    // @description Autocompletion for @-mentions on GitHub
    // @include https://github.com/*
    // @require http://.../1.6.4/jquery.min.js
    // ==/UserScript==

    $(".comment-form").keyup(function(e) {
      // ...
    });

!SLIDE
# Greasemonkey scripts work on Chrome #

!SLIDE
# Except a few things #

Like `@require`.

!SLIDE
# Chrome extensions #

Turns out packaging them isn't that hard.

!SLIDE
# manifest.json #

    @@@ javascript
    {
      "name": "My Extension",
      "version": "2.1",
      "description": "Sample plugin.",
      "permissions": ["https://*.google.com/"],
      "content_scripts":
        [{ "js": ["jquery.js", "myscript.js"] }]
    }

!SLIDE
# I am so lazy #

!SLIDE
# Let's package it automatically #

Use the Greasemonkey metadata and a couple assumptions.

!SLIDE
# To Do #
 * Most of the actual work
 * Host from GitHub
 * Auto-updating
 * Maybe export to [dotjs](https://github.com/defunkt/dotjs) as well
 * CoffeeScript?
