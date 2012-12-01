define([
    'app',

    'collections/DashboardsCollection',
    'collections/WidgetsCollection',

    'views/Dashboard',
    'views/dashboards/CreateEditDashboard',
    'views/DashboardDesigner',

    // Libraries.
    'jquery',
    'lodash',
    'backbone'
],

function(app, DashboardCollection, WidgetsCollection, DashboardView, CreateEditDashboard, DashboardDesigner, $, _, Backbone) {

    var DashboardContainer = Backbone.View.extend({

        el: $('#dashboard-container'),

        initialize: function() {
            this.activeDashboard = null;
            this.activatedDashboards = {};

            app.on('launch-widget', this.launchWidget, this);
            app.on('dashboard:switch', this.activateDashboard, this);
            app.on('dashboard:create', this.createDashboard, this);
        },

        render: function () {
            // this.activeDashboard = DashboardCollection.find(function (dashboard) {
            //     return dashboard.get('isdefault');
            // });

            var dashboardModel = DashboardCollection.models[1];
            this.activateDashboard(dashboardModel, false);
            return this;
        },

        activateDashboard: function (model, animate) {
            var guid = model.get('guid'),
                dashboardName = model.get('name'),
                dashboardModel = DashboardCollection.get(model.get('guid'));

            console.time(dashboardName);
            if( this.activeDashboard ) {
                if( this.activeDashboard.model.get('guid') === guid )
                    return;

                this.activeDashboard.hide();
            }

            if( this.activatedDashboards[ guid ] ) {
                this.activeDashboard = this.activatedDashboards[ guid ];
                this.activeDashboard.show();
            }
            else {
                this.activeDashboard = new DashboardView({
                    model: dashboardModel
                }).render();
                
                this.activatedDashboards[ guid ] = this.activeDashboard;
                this.$el.append(this.activeDashboard.$el);

                // layout after dom write
                this.activeDashboard.layout().show(animate);
            }
            console.timeEnd(dashboardName);
            app.trigger('dashboard:activated', model, this.activeDashboard);
        },

        createDashboard: function () {
            var me = this,
                ced = new CreateEditDashboard();

            $(document.body).append( ced.render().$el );
            
            ced.show();
            ced.create().then(function (model) {
                me.designDashboard( model );
            });
        },

        designDashboard: function ( model ) {
            var me =this,
                dd = new DashboardDesigner();

            dd.render();
            $(document.body).append(dd.$el);

            dd.design().then(function(config) {
                dd.remove();
                model.set( 'layoutConfig', config );

                DashboardCollection.add(model);
                me.activateDashboard(model);
            });

        },

        launchWidget: function (model) {
            return this.activeDashboard.launchWidget(model).then(
                function (model, view) {
                    app.trigger('afterwidgetlaunch');
                }, function  (model) {

                }).
                always(function (model) {
                    app.trigger('launchend');
                });
        }

    });

    return DashboardContainer;

});
