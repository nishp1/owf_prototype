define([
    'app',

    'views/dashboardswitcher/TilesView',

    // Libraries.
    'jquery'
],

function(app, TilesView, $) {

    var DashboardSwitcher = Backbone.View.extend({

        id: 'dashboard-switcher',

        className: 'modal hide fade no-border-radius',

        template:   '<div class="pull-right">' +
                        '<div class="btn-group">' +
                            '<button class="btn manage-btn"><i class="icon-cogs"></i>  Manage</button>' +
                            '<button class="btn create-btn"><i class="icon-plus"></i></button>' +
                        '</div>' +
                    '</div>',

        events:  {
            'click .manage-btn': 'toggleManage',
            'click .create-btn': 'create'
        },

        initialize: function () {
            this.tilesView = new TilesView();
            this.tilesView.on('itemselected', _.bind(this.onDashboardSelect, this));
        },
        
        render: function  () {
            this.$el.append( this.tilesView.render().$el )
                    .append( this.template );
            return this;
        },

        onDashboardSelect: function (model) {
            this.hide().then(function () {
            console.log('dashboard:switch', model.get('name'))
                app.trigger('dashboard:switch', model);
            });
        },

        toggleManage: function (evt) {
            $(evt.currentTarget).toggleClass('active');
            this.tilesView.toggleManage();
        },

        create: function () {
            this.hide().then(function () {
                app.trigger('dashboard:create');
            });
        },  

        show: function() {
            var dfd = $.Deferred();

            this.$el.one('shown', function () {
                dfd.resolve();
            }).modal({ show: true });

            return dfd.promise();
        },

        hide: function() {
            var dfd = $.Deferred();

            this.$el.one('backdrophidden', function () {
                dfd.resolve();
            }).modal('hide');

            return dfd.promise();
        }
    });

    return DashboardSwitcher;
});
