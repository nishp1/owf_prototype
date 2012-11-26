define([
    'app',

    'collections/WidgetStateCollection',

    // Libraries.
    'lodash',
    'backbone'
],

function(app, WidgetStateCollection, _, Backbone) {

    var Pane = Backbone.View.extend({

        className: 'pane',

        initialize: function () {
            this.widgetsCollection = new WidgetStateCollection(this.options.widgets || []);
            this.$el.data('view', this);
        },

        render: function () {
            this.$el.append( '<div class="paneshim hide"></div>' );
        },

        launchWidget: function (evt, model) {}

    });

    return Pane;

});
