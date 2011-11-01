!SLIDE
# Rails up your Backbone #

!SLIDE
![Yo dawg, I heard you like Rails](yo_dawg.jpg)

!SLIDE bullets incremental
# Backbone.js #

* Frontend Javascript library
* Models and views
* Lightweight

!SLIDE
# My one complaint: #
# A couple fiddly bits #

!SLIDE
# Step one #

!SLIDE
# CoffeeScript #
![Caffeine high](coffee.png)

<cite>[(image credit: theoatmeal.com)](http://theoatmeal.com/comics/coffee)</cite>

!SLIDE code

    @@@ coffeescript
    class window.Star extends Backbone.Model

      defaults:
        ships: 1
        industry: 0
        eta: null

      projected_ships: ->
        @get("ships") +
          (@get("eta") * @get("industry") / 12)
      extra_ship_probability: ->
        Math.round 100 * (@projected_ships() -
          Math.floor @projected_ships())

!SLIDE
# Step two #

!SLIDE
# Relational models #
![I can haz-many?](can_haz.jpg)

!SLIDE
[PaulUithol/Backbone-relational](https://github.com/PaulUithol/Backbone-relational)

!SLIDE

    @@@ coffeescript
    class window.Battle
      extends Backbone.RelationalModel

      relations: [{
        type: Backbone.HasOne
        key: "defender"
        relatedModel: "Star"
      }]

      defaults:
        defender:
          ships: null
          ws: 1

      defender_ships_remaining: ->
        @get("defender").get("ships") - 10

!SLIDE
# Step three #

!SLIDE
# jquery.formparams #

[v3.javascriptmvc.com](http://v3.javascriptmvc.com/docs/dom.html#&who=jQuery.fn.formParams)

[jupiterjs.com](http://jupiterjs.com/news/convert-form-elements-to-javascript-object-literals-with-jquery-formparams-plugin)

!SLIDE commandline incremental

    # $('#myform').formParams()
    {
      turn: 5
      defender : {
        ships: 25
        ws: 18
      }
    }

!SLIDE
![JSON success](json_success.jpg)

!SLIDE
# Bringin' it all together #

!SLIDE

    @@@ html
    <div id="content">
      <form>
        <label>Defender ships:
          <input type="number"
            name="battle[defender][ships]"
            value="" />
        </label>
        <label>Defender WS:
          <input type="number"
            name="battle[defender][ws]"
            value="" />
        </label>
      </form>
    </div>

!SLIDE

    @@@ coffeescript
    class window.BattleView
      extends Backbone.View

      el: "form"

      events: {
        "keyup input": "updateModel"
      }

      updateModel: ->
        this.model.set(
          $("form").formParams()["battle"]
        )

!SLIDE
# Sound familiar? #

!SLIDE

    @@@ ruby
    class BattleController
      < ApplicationController

      def update
        @battle = Battle.find params[:id]
        @battle.update_attributes(
          params[:battle]
        )
      end

    end

!SLIDE

![Polar bear in coffee](polar_bear.jpg)

[github.com/iangreenleaf](https://github.com/iangreenleaf)

[@iangreenleaf](https://twitter.com/iangreenleaf)
