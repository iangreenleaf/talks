!SLIDE subsection
# activerecord_enum #

[github.com/iangreenleaf/activerecord_enum](https://github.com/iangreenleaf/activerecord_enum)

!SLIDE commandline incremental
# Meet MySQL ENUM #

    $ mysql> desc gemstones;
    +-------+--------------------------------+------+-----+---------+
    | Field | Type                           | Null | Key | Default |
    +-------+--------------------------------+------+-----+---------+
    | size  | enum('small','large') | YES  |     | NULL    |
    +-------+--------------------------------+------+-----+---------+

    $ mysql> insert into gemstones values ('large');
    Query OK, 1 row affected (0.00 sec)

!SLIDE
# Non-standard SQL?!?! #
# Well, yes #

!SLIDE incremental
# Not the only option #

 * A string column with an index
 * `validates_inclusion_of`
 * [nofxx/symbolize](https://github.com/nofxx/symbolize)

!SLIDE
# nofxx/symbolize #
      @@@ ruby
       class Gemstone
         symbolize :size, \
          :in => [:small, :large]
       end

       @gemstone.size
         # => :small

!SLIDE incremental
# Why use ENUM? #

 * Performance(...)
 * DB structure
 * Other codebases
 * Legacy support

!SLIDE

    @@@ ruby
    # schema.rb
    create_table "gemstones" do |t|
      t.column "size", "enum('small','large')"
    end

!SLIDE
# So far, so good #

!SLIDE
[use rake]

!SLIDE
# But wait... #

!SLIDE

    @@@ diff
    diff --git a/db/schema.rb b/db/schema.rb
    index 0ea17e4..d4a2cf9 100644
    --- a/db/schema.rb
    +++ b/db/schema.rb
    @@ -53,16 +53,16 @@
    - t.column "size", "enum('small','large')"
    + t.string "size", :limit => 0

!SLIDE
# Arrrrrrggggh #

!SLIDE
# Solution #

Tell ActiveRecord about enums

!SLIDE

    @@@ ruby
    # schema.rb
    create_table "gemstones" do |t|
      t.enum "size", :limit => ["small","large"]
    end

!SLIDE
# Works with other database adapters, too #

So please put the weapons down

!SLIDE incremental
# Does #
 * Rails 3.0.x
 * mysql2, sqlite
 * ENUM and SET types

!SLIDE incremental
# Should add #
 * Rails 3.1.x
 * Other DB adapters
