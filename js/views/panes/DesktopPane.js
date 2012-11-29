define([
    'app',

    'views/panes/Pane',
    'views/widget/WidgetWindow',

    // Libraries.
    'lodash',
    'backbone'
],

function(app, Pane, WidgetWindow, _, Backbone) {

    var DesktopPane = Pane.extend({

        className: 'pane desktoppane',

        render: function () {
            var me = this;
            console.time('pane');
            this.constructor.__super__.render.call(this);

            this.widgetsCollection.each(function (widgetState) {
                
                console.time('widget');
            
                var ww = new WidgetWindow({
                    model: widgetState,
                    containment: me.$el
                });
                me.$el.append( ww.render().$el );

                console.timeEnd('widget');

            });
            console.timeEnd('pane');
            return this;
        },

        launchWidget: function (evt, model) {
            var ww = new WidgetWindow({
                model: model,
                containment: this.$el
            });
            this.$el.append( ww.render().$el );
            return ww;
        }

    });

    return DesktopPane;

});
