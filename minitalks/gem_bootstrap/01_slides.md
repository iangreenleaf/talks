!SLIDE
# Ultra-minimalist gem bootstrapping #

!SLIDE
# Let's make a gem! #

!SLIDE
# A little intimidating...? #

# Nahhhhh #

!SLIDE incremental
# Hoe, Jeweler #

 * Gem management gems
 * Comprehensive

!SLIDE incremental
# But... #

 * Kinda pushy
 * I have to require the jeweler gem inside my gem
 * Kinda... complicated

!SLIDE
# Suddenly we're back to intimidated #

!SLIDE incremental
# There are some other options out there #

But nothing that gets me particularly excited

!SLIDE
# There's another way #

!SLIDE
# The tool is coming... #
!SLIDE
# ...from INSIDE YOUR COMPUTER #

!SLIDE
![Bundler](bundler.png)

!SLIDE commandline incremental
    $ bundle gem buzzfizz
          create  buzzfizz/Gemfile
          create  buzzfizz/Rakefile
          create  buzzfizz/.gitignore
          create  buzzfizz/buzzfizz.gemspec
          create  buzzfizz/lib/buzzfizz.rb
          create  buzzfizz/lib/buzzfizz/version.rb
    Initializating git repo in /home/youngian/code/buzzfizz

!SLIDE
    @@@ ruby
    # Rakefile

    require 'bundler'
    Bundler::GemHelper.install_tasks

!SLIDE
    # .gitignore

    *.gem
    .bundle
    Gemfile.lock
    pkg/*

!SLIDE
    @@@ ruby
    # lib/buzzfizz/version.rb

    module Buzzfizz
      VERSION = "0.0.1"
    end

!SLIDE
    @@@ ruby
    # lib/buzzfizz.rb

    module Buzzfizz
      # Your code goes here...
    end

!SLIDE
    @@@ ruby
    # Gemfile

    source "http://rubygems.org"

    # Specify your gem's dependencies
    # in buzzfizz.gemspec
    gemspec

!SLIDE
    @@@ ruby
    # buzzfizz.gemspec
    # -*- encoding: utf-8 -*-
    $:.push File.expand_path("../lib", __FILE__)
    require "buzzfizz/version"

    Gem::Specification.new do |s|
      s.name = "buzzfizz"
      s.version = Buzzfizz::VERSION
      s.platform = Gem::Platform::RUBY
      s.authors = ["TODO: Write your name"]
      s.email = ["TODO: Write your email address"]
      s.homepage = ""
      s.summary = %q{TODO: Write a gem summary}
      s.description = %q{TODO: Write a gem description}

!SLIDE
    @@@ ruby
      s.rubyforge_project = "buzzfizz"

      s.files = `git ls-files`.split("\n")
      s.test_files = `git ls-files -- {test,spec,features}/*`.split("\n")
      s.executables = `git ls-files -- bin/*`.split("\n").map{ |f| File.basename(f) }
      s.require_paths = ["lib"]
    end

!SLIDE
# We'll probably want to add a couple things #

!SLIDE
    @@@ ruby
    s.add_dependency "activerecord", "~> 3.0.9"
    s.add_development_dependency "mocha"


!SLIDE
# Let's use it #

!SLIDE commandline incremental
    $ rake -T
    rake build       # Build buzzfizz-0.0.2.gem into the pkg directory
    rake db:prepare  # Prepare the databases.
    rake default     # Default: run all unit tests.
    rake install     # Build and install buzzfizz-0.0.2.gem into
                     # system gems
    rake release     # Create tag v0.0.2 and build and
                     # push buzzfizz-0.0.2.gem to Rubygems
    rake spec        # Run the test suite.
    rake spec:all    # Run the test suite for all DBs.

!SLIDE
# Register at Rubygems.org #

!SLIDE commandline
    $ gem push
    Email:
    Password:

!SLIDE commandline incremental
    $ rake release
    buzzfizz 0.0.2 built to pkg/buzzfizz-0.0.2.gem
    Tagged v0.0.3
    Pushed git commits and tags
    Pushed buzzfizz 0.0.2 to rubygems.org

!SLIDE
# Congratulations! #

You're a gem author!
