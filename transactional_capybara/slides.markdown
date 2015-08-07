# Hello! #

Notes:

Say hi

~~~

# Capybara = great #

Allow work to happen in the background

Get a callback when it's done

Notes:

For anyone unfamiliar with Capybara: it's a tool for integration testing that simulates real user actions in a real browser environment. The computer clicks on things and looks for text or page elements or whatever. It's great.

~~~

# Transactions for test teardown = great #

```ruby
config.use_transactional_fixtures
```

Notes:

~~~

# Transactions for test teardown = great #

```javascript
DatabaseCleaner.strategy = :transaction
```

Notes:

~~~

![database transaction diagram](database_transactions.svg)

~~~

# Database transactions are fast #

~~~

# Capybara + Transactions #
# = not so great #

Notes:

~~~

# Threads #

Notes:

~~~

![threaded transaction diagram](capybara_threads.svg)

~~~

# Share a database connection between threads #

```ruby
class ActiveRecord::Base
  mattr_accessor :shared_connection
  @@shared_connection = nil

  def self.connection
    @@shared_connection || retrieve_connection
  end
end
ActiveRecord::Base.shared_connection =
  ActiveRecord::Base.connection
```

Notes:

~~~

# Good start, but… #

```
Mysql2::Error: This connection is
  in use by: #<Thread:0x0000000bb400b8>
```

Notes:

~~~

# Why everything is broken #

Notes:

~~~

![threaded transaction diagram](threaded_transactions.svg)

~~~

# Temporary solution #

```ruby
after(:each) do
  sleep 2
end
```

Notes:

~~~

# Better solution #

Wait for pending AJAX calls before finishing the test

Notes:

~~~

# Better solution #

```ruby
def wait_for_ajax
  Timeout.timeout(Capybara.default_wait_time) do
    loop until finished_all_ajax_requests?
  end
end

def finished_all_ajax_requests?
  page.evaluate_script('jQuery.active').zero?
end
```

Notes:

~~~

# Problems #

1. Post-jQuery world
2. JavaScript is terrible

Notes:

~~~

# Best solution #

Don't build it yourself

Notes:

~~~

[github.com/iangreenleaf/transactional_capybara](https://github.com/iangreenleaf/transactional_capybara)

Notes:

~~~

# Install it #

```ruby
group :test do
  gem 'transactional_capybara'
end
```

~~~

# With RSpec #

```ruby
# rails_helper.rb
require "transactional_capybara/rspec"
```

That's it.

Notes:

~~~

# With other test frameworks #

```ruby
# test_helper.rb
TransactionalCapybara.share_connection

after :each do
  TransactionalCapybara::AjaxHelpers.wait_for_ajax(page)
end
```

~~~

# Patches welcome! #

Currently supports:

 * ActiveRecord
 * jQuery
 * Angular

~~~

# Database Transactions 💜 Capybara #

Notes:

~~~

# Thanks! #

~~~

## Say hi ##

@iangreenleaf

## Follow my blog ##

technotes.iangreenleaf.com

## Hire me ##

ian@iangreenleaf.com
