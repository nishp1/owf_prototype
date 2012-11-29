define([
    // Libraries.
    "jquery",
    "lodash",
    "backbone"
],

function($, _, Backbone) {

    // add jQuery like one method support to Backbone
    _.extend(Backbone.Events, {

        one: function (events, callback, context) {
            var me = this,
                origFn = callback,
                fn = function () {
                    me.off(events, fn, context);
                    origFn.apply(context, arguments);
                };
            return this.on(events, fn, context);
        }

    });

    // global mask
    var $mask = $('#mask');
    function mask (evt, ui) {
        $mask.removeClass('hide');
    }
    function unmask (evt, ui) {
        $mask.addClass('hide');
    }

    // Mix Backbone.Events into app object.
    var app = _.extend({
                // The root path to run the application.
                root: "/"
            },{

                mask: mask,
                unmask: unmask,

                support: {
                    animationend: (function () {

                        var transEndEventNames = {
                                'WebkitAnimation' : 'webkitAnimationEnd',
                                'MozAnimation'    : 'animationend',
                                'OAnimation'      : 'oAnimationEnd oanimationend',
                                'animation'       : 'animationend'
                            }
                            , name;

                        return transEndEventNames[ Modernizr.prefixed('animation') ]

                    }())
                }

            }, Backbone.Events);

    app.on('dashboard:activated', function (model, dashboard) {
        document.title = model.get('name');
    })
    return app;
});
