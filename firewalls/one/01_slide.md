!SLIDE
# The firewall also #
# gazes into you #

!SLIDE
# About me #
* @iangreenleaf
* Rails developer (backend, *not* devops)
* Hire me! dev@iangreenleaf.com

~~~SECTION:notes~~~

* My name
* I'm a full stack Rails developer
* Prefer backend, don't like devops. Happy that other people do.
* Hire me, I promise I'll put a firewall on your machine, but please
  hire mre to write awesome code for you, not to do devops.
~~~ENDSECTION~~~

!SLIDE
# "What's the use of firewalls?" #

~~~SECTION:notes~~~
So recently I posed a question on the SDRuby mailing list asking if firewalls
were still a necessary thing, and I received a couple responses along the lines
of "just who do you think you are?".
~~~ENDSECTION~~~

!SLIDE
![?!](eyebrow.gif)
~~~SECTION:notes~~~
Now, I've always been fortunate enough to have someone else around who's responsible for
the public-facing servers, so I'd never had to confront this issue myself.
~~~ENDSECTION~~~

!SLIDE
# Wide-open ports #
# Isn't that a little 1997? #
~~~SECTION:notes~~~

* Never saw the database port argument as convincing
* DBs accept only connections from the same machine by default
* And conventionally have password auth as a backup
~~~ENDSECTION~~~

!SLIDE
# Well... #
~~~SECTION:notes~~~

* Then I started looking at other services we use in a modern web stack
* Servers aren't just code+SQL any more
~~~ENDSECTION~~~

!SLIDE
# MongoDB #
* Local connections only by default
* Authentication possible, off by default

~~~SECTION:notes~~~

* MongoDB usually ships with local-only defaults. Usually.
* It offers authentication, but it's off by default and our tools don't
  necessarily prompt us to enable it.
~~~ENDSECTION~~~

!SLIDE
# Sphinx full-text search #
* Local connections possible, off by default
* No authentication

~~~SECTION:notes~~~

* Sphinx is open to the world by default
* No authentication possible
~~~ENDSECTION~~~

!SLIDE
# Memcached #
* Local connections possible, off by default
* Authentication sorta possible, off by default

~~~SECTION:notes~~~

* Memcache is open to the world by default
* It sorta offers authentication, but it's nothing I would put much trust in,
  and hard to say if our tools could even handle it.
~~~ENDSECTION~~~

!SLIDE
# Redis #
* Local connections possible, off by default
* Authentication possible, off by default
~~~SECTION:notes~~~

* Redis is open to the world by default
* It too offers weak authentication
~~~ENDSECTION~~~

!SLIDE
# Yikes #
~~~SECTION:notes~~~
So it turns out that SQL servers are more of an exception than a standard when it comes to secured services.
~~~ENDSECTION~~~

!SLIDE
# You *could* fix each of these individually #
~~~SECTION:notes~~~
And sure, you could lock down each of these options. You could hunt down the appropriate configuration setting
to restrict each service to local connections or trusted IPs. And you could then *test* each of these
services to make sure that it worked.

But do you trust yourself to catch every one? You'll always remember and you'll always
be the person in charge of adding new services and you'll never suffer from a
moment's inattention?
~~~ENDSECTION~~~

!SLIDE
# My ops policy: #
## Assume I am stupid ##
~~~SECTION:notes~~~
When I plan anything, I have a policy that the system should be resilient to me doing the stupidest possible thing
at any moment. If I contract a space virus and come back to work a shambling zombie, I should be able to
more or less continue on with my work.
~~~ENDSECTION~~~

!SLIDE
# Default to the #
# least bad thing #
~~~SECTION:notes~~~
One of the tenets of this policy is that if I *fail* to take the correct set of steps,
the system should default to the least bad thing.

This, I realized, is what firewalls are for.
~~~ENDSECTION~~~

!SLIDE
# Firewalls are dead #
# Long live firewalls #
~~~SECTION:notes~~~
We don't *need* firewalls. But having a firewall in place means that if I completely fail to
do anything else, by default my stuff is still protected.
~~~ENDSECTION~~~

!SLIDE
# When you hear "firewall", do you think of... #
~~~SECTION:notes~~~
But I've always had pretty negative feelings towards the idea of firewalls.

Firewalls, to me, always conjure up associations like...
~~~ENDSECTION~~~

!SLIDE
# Network administrators #

!SLIDE
# 1980's era Cisco hardware #

!SLIDE
# NATs #

!SLIDE
# ssh me@server -p 2525 #
## Keep it secret; keep it safe ##

!SLIDE
# Network diagrams #

!SLIDE
# Stupid crap interfering with my ability to play World of Warcraft #

!SLIDE
# Let go of your fear #
~~~SECTION:notes~~~
Thos things still exist. And still suck.

But it doesn't have to be like that. The only firewalls we, dear Ruby developers,
need to worry about are simple, effective, and only the tiniest bit painful.
~~~ENDSECTION~~~

!SLIDE
# Firewalls that don't suck #
* Default to DENY
* Assume every machine is public
* Simple firewall on each machine

~~~SECTION:notes~~~

* We're going to set a default policy of DENY. This means that all traffic is rejected unless we specifically allow it.
  Remember, least bad thing by default.
* We're going to treat all of our machines as if they are public-facing. It doesn't matter if they are or not,
  because if we do it this way we're guaranteed protected. Moving to a new hosting provider? Great. Least bad thing by default.
* And we're going to run a simple firewall on each machine. This firewall will open whichever ports are safe on that
  particular machine. No complicated policies or central point of confusion. Doesn't matter if all the machines are on
  a shared private network. Doesn't matter.
~~~ENDSECTION~~~

!SLIDE
# PSA: Make sure to open your SSH port! #
~~~SECTION:notes~~~
~~~ENDSECTION~~~

!SLIDE
# iptables #
~~~SECTION:notes~~~
iptables is a venerable Unix firewalling utility, and it's still the gold standard in the field.

You run it on each machine, you give it rules, and it looks at all traffic and decides whether to drop it or not.

It's very good at this. It's also a little annoying to use.

* It takes all config as command-line inputs, which is not super compatible with, say, configuration management.
* It loses everything on restart. You want your machine to be misconfigured by default any time you reboot?
  Of course not. Assume stupidity.
* Two different configs for IPv4 and IPv6, because the best way to prepare for the IPv6 switchover is to have no idea
  if your infrastructure has a consistent configuration between the two.
~~~ENDSECTION~~~

!SLIDE
# ufw #
~~~SECTION:notes~~~
There are ways to deal with the shortcomings of iptables, but we're going to get some help.

ufw stands for "Uncomplicated Firewall". It's an Ubuntu thing, but is available on all Debian systems, and I think others?

It's a wrapper to more easily configure iptables. Same chocolatey core, tasty candy shell.
~~~ENDSECTION~~~

!SLIDE
# Chef/Ansible #
## Because you *are* automating, right? ##
~~~SECTION:notes~~~
And of course we're going to automate the entire configuration.

Assume stupidity / least bad by default isn't even *possible* if I'm doing stuff manually.

If I'm configuring things manually, the most damage I could do is always *the most damage*.
~~~ENDSECTION~~~

!SLIDE
# Chef #
## `firewall` cookbook ##

!SLIDE
# Chef #
    firewall 'ufw' do
      action :enable
    end
~~~SECTION:notes~~~
~~~ENDSECTION~~~

!SLIDE
# Chef #
    firewall_rule 'default' do
      action :deny
    end
~~~SECTION:notes~~~
~~~ENDSECTION~~~

!SLIDE
# Chef #
    firewall_rule 'ssh' do
      port     22
      action   :allow
    end
~~~SECTION:notes~~~
~~~ENDSECTION~~~

!SLIDE
# Chef #
    firewall_rule 'http' do
      port     80
      protocol :tcp
      action   :allow
    end
~~~SECTION:notes~~~
You should also probably do HTTPS, but I'm not gonna show that because it's boring.
~~~ENDSECTION~~~

!SLIDE
# That wasn't so bad #

!SLIDE
# Ansible #
## `ufw` module in 1.6+ ##

!SLIDE
# Ansible #
    - name: install ufw
      apt: pkg=ufw state=present

!SLIDE
# Ansible #
    - name: enable firewall
      ufw: state=enabled policy=deny

!SLIDE
# Ansible #
    - name: pass SSH through firewall
      ufw: rule=allow name=OpenSSH

!SLIDE
# Ansible #
    - name: pass HTTP through firewall
      ufw: rule=allow port=80 proto=tcp

!SLIDE
# That's it! #

!SLIDE
# Fin #
~~~SECTION:notes~~~
~~~ENDSECTION~~~
