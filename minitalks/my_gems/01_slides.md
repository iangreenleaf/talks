!SLIDE
# Gems I've made recently #

!SLIDE
# tap_out #

[github.com/iangreenleaf/tap_out](https://github.com/iangreenleaf/tap_out)

!SLIDE
# Problem #

I have a project with Ruby + PHP code.

The phpunit tests never get run.

!SLIDE
# Solution #

Run phpunit tests from rake.

!SLIDE
# Extra mile #

Hook directly into Test::Unit

!SLIDE
[Test::Unit screenshot](TODO)

!SLIDE commandline incremental
# Test Anything Protocol #

    $ phpunit --tap .
    TAP version 13
    ok 1 - ValidationTest::testBadPhoneParams with data set #0 ('')
    ok 2 - ValidationTest::testBadPhoneParams with data set #1 ('abcdefgh')
    ok 3 - DbConnectionTest::testGetSingleton
    not ok 4 - Failure: DbConnectionTest::testTransactionRollback
      ---
      message: 'Failed asserting that <boolean:false> is not equal to <boolean:false>.'
      severity: fail
      ...
    ok 5 - DbConnectionTest::testTransactionCommit
    1..5

!SLIDE
    @@@ ruby
    require 'test_helper'
    require 'test/phpunit'

    class PHPTest < ActiveSupport::TestCase
      extend Test::PHPUnit
      phpunit "test/phpunit/", \
        :configuration => 'test/phpunit.xml'
    end

!SLIDE incremental
# What else should it do? #

 * Perl (probably easy)
 * Other languages
