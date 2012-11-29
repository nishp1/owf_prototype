define([
    'app',

    // Libraries.
    'backbone'
],

function(app, Backbone) {

    var FitWidget = Backbone.View.extend({

        model: null,

        tagName: 'iframe',

        className: 'widget fitwidget',

        attributes: function() {
            var model = this.model;
            return {
                'frameborder' : 0,
                'src': 'widget.html'//model.get('url') +';'
            };
        },

        close: function() {
            this.remove();
        }

    });

    return FitWidget;

});
