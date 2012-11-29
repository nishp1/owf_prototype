define([
    'app',

    // Libraries.
    'jquery',
    'backbone'
],

function(app, $, Backbone) {

    var AdvancePanel = Backbone.View.extend({

        id: 'launchmenu-advance-panel',

        className: 'animated',

        events: {
        },

        show: function (animate) {
            this.$el.show();

            if( animate === false || !Modernizr.cssanimations ) {
                // no animations
            }
            else {
                this.$el
                        .off(app.support.animationend).
                        removeClass('slideOutRight').
                        addClass('slideInLeft');
            }
        },

        hide: function (animate) {
            var $el = this.$el;

            function hideEl () {
                $el.removeClass('slideOutRight').hide();
            }

            if( animate === false || !Modernizr.cssanimations ) {
                hideEl();
            }
            else {
                $el.removeClass('slideInLeft').
                    off(app.support.animationend).
                    addClass('slideOutRight').
                    one(app.support.animationend, hideEl);
            }
        }
    });

    return AdvancePanel;
});
