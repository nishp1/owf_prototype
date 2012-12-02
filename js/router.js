define([
    // Application.
    'app',

    //views
    'views/Banner',
    'views/DashboardContainer',

    'backbone',
    'lodash',
    'jquery'
],

function(app, Banner, DashboardContainer, Backbone, _, $) {
    var pluses = /\+/g;

    function raw(s) {
        return s;
    }

    function decoded(s) {
        return decodeURIComponent(s.replace(pluses, ' '));
    }

    var config = $.cookie = function (key, value, options) {

        // write
        if (value !== undefined) {
            options = $.extend({}, config.defaults, options);

            if (value === null) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = config.json ? JSON.stringify(value) : String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // read
        var decode = config.raw ? raw : decoded;
        var cookies = document.cookie.split('; ');
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            if (decode(parts.shift()) === key) {
                var cookie = decode(parts.join('='));
                return config.json ? JSON.parse(cookie) : cookie;
            }
        }

        return null;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        if ($.cookie(key) !== null) {
            $.cookie(key, null, options);
            return true;
        }
        return false;
    };
    $.cookie.json = true;

    
    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'perf/:count': 'measurePerformance'
        },

        index: function() {
            var banner = new Banner(),
                dashboardContainer = new DashboardContainer();
            
            dashboardContainer.render();
        },

        measurePerformance: function (count) {
            var startTime = +(new Date());
            count = parseInt(count);
                
            app.on('dashboard:activated', function (model, view) {
                var endTime = +(new Date());
                var renderTimes = $.cookie('renderTimes') || [];
                renderTimes.push( endTime-startTime );
                $.cookie('renderTimes', renderTimes, { expires: 7, path: '/' });

                if(renderTimes.length >= count) {
                    var sum = _.reduce(renderTimes, function(memo, num){ return memo + num; }, 0);
                    console.log('Average render time ', sum/(renderTimes.length), renderTimes);
                    alert('Average render time ' + sum/(renderTimes.length) + ' ms');

                    $.removeCookie('renderTimes');
                }
                else {
                    setTimeout(function () {
                        window.location.reload();
                    }, 2000);
                }
            });

            this.index();

        }
    });

    return Router;

});
