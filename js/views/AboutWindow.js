define([
    'app',

    // Libraries.
    'backbone',
    'jquery'
],

function(app, Backbone, $) {

    var AboutWindow = Backbone.View.extend({

        id: 'about-window',

        className: 'modal fade',

        template:   '<h1>O W F</h1>' +
                    '<p>Powered by Backbone, Bootstrap, jQuery, HTML5 & CSS3</p>',

        initialize: function  () {
            var me = this;
            me.$el.one('hidden', function () {
                me.remove();
            });
        },

        render: function () {
            this.$el.html( this.template );
            return this;
        },

        show: function() {
            this.$el.modal({ show: true });
        }
    });

    return AboutWindow;

});
