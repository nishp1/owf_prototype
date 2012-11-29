define([
    'app',

    'models/WidgetStateModel'
],

function(app, WidgetStateModel) {

    var WidgetStateCollection = Backbone.Collection.extend({
        
        model: WidgetStateModel,

        parse: function() {
            console.log(arguments);
        }

    });

    return WidgetStateCollection;
});
