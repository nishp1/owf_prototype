define([
    'app',

    // Libraries.
    'backbone'
],

function(app, Backbone) {

    var WidgetIframe = Backbone.View.extend({

        tagName: 'iframe',
        
        render: function () {
            return this;
        }

    });

    return WidgetIframe;

});
