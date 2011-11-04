!SLIDE subsection
# active_set #

[github.com/iangreenleaf/active_set](https://github.com/iangreenleaf/active_set)

!SLIDE
# Meet MySQL SET #

!SLIDE commandline incremental
    $ mysql> desc balloons;
    +-------+--------------------------+------+-----+---------+
    | Field | Type                     | Null | Key | Default |
    +-------+--------------------------+------+-----+---------+
    | gas   | set('helium','hydrogen') | YES  |     | NULL    |
    +-------+--------------------------+------+-----+---------+

    $ mysql> insert into balloons values ('helium');
    Query OK, 1 row affected (0.00 sec)
    $ mysql> insert into balloons values ('helium,hydrogen');
    Query OK, 1 row affected (0.00 sec)
    $ mysql> select count(*) from foo where \
      find_in_set('hydrogen',gas);
    +----------+
    | count(*) |
    +----------+
    |        1 |
    +----------+
    1 row in set (0.00 sec)

!SLIDE
# Non-standard SQL?!?! #
# Well, yes #

!SLIDE
# ...I was on a roll #

!SLIDE
    @@@ ruby
    class Balloon < ActiveRecord::Base
      acts_as_set :gasses, ["helium","hydrogen"]
    end

    Balloon.create :gasses=>["helium","hydrogen"]

!SLIDE
# Remember #

Use with `activerecord_enum` to keep your schema clean

!SLIDE incremental
# Does #
 * Not much

!SLIDE incremental
# What should I add? #
 * Probably validations
 * Support find\_in\_set(?)
 * Does anyone even use these?

!SLIDE commandline incremental
# Bonus slide #

    $ mysql> desc my_table;
    +-----------+----------------------------------------+
    | Field     | Type            | Null | Key | Default |
    +-----------+-----------------+------+-----+---------+
    | special   | set('yes','no') | YES  |     | NULL    |
    +-----------+-----------------+------+-----+---------+
