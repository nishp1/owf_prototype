define([
    // Application.
    'app',

    'backbone',

    //views
    'views/Banner',
    'views/DashboardContainer'
],

function(app, Backbone, Banner, DashboardContainer, DashboardDesigner) {

    
    // Defining the application router, you can attach sub routers here.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },

        index: function() {
            var banner = new Banner(),
                dashboardContainer = new DashboardContainer();
            
            dashboardContainer.render();
        }
    });

    return Router;

});
