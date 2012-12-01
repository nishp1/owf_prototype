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

    var Cookie = {
        set: function (key, value) {
            var cookie = document.cookie;
            if(cookie === '') {
                cookie[key] = value;
            }
            else {
                cookie = JSON.parse(cookie);
                cookie[key] = value;
            }
            document.cookie = JSON.stringify(cookie);
        },

        get: function (key) {
            var cookie = document.cookie;
            return cookie === '' ? null : JSON.parse(cookie)[key]
        }
    };

    
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
                var renderTimes = Cookie.get('renderTimes') || [];
                renderTimes.push( endTime-startTime );
                Cookie.set('renderTimes', renderTimes);

                if(renderTimes.length >= count) {
                    var sum = _.reduce(renderTimes, function(memo, num){ return memo + num; }, 0);
                    console.log('Average render time ', sum/(renderTimes.length), renderTimes);
                    alert('Average render time ' + sum/(renderTimes.length) + ' ms');

                    Cookie.set('renderTimes', []);
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
