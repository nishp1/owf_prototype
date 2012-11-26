define([
    'app',

    'views/panes/Pane',
    'views/widget/FitWidget',

    // Libraries.
    'lodash',
    'backbone'
],

function(app, Pane, FitWidget, _, Backbone) {

    var FitPane = Pane.extend({

        className: 'pane fitpane',

        render: function () {
            var me = this;
            me.constructor.__super__.render.call(me);

            me.widgetsCollection.each(function (widgetState) {
                
                console.time('widget');
            
                var fw = new FitWidget({
                    model: widgetState
                });
                me.$el.append( fw.render().$el );

                console.timeEnd('widget');

            });

            return me;
        },

        launchWidget: function (evt, model) {
            console.time('iframe');

            var fw = new FitWidget({
                model: model
            });
            this.$('iframe').remove();
            this.$el.append( fw.render().$el );

            console.timeEnd('iframe');

            return fw;
        }

    });

    return FitPane;

});
