define([
    'app',

    'views/launchmenu/LaunchMenu',
    'views/dashboardswitcher/DashboardSwitcher',
    'views/UserProfileWindow',
    'views/AboutWindow',

    // Libraries.
    'backbone',
    'jquery'
],

function(app, LaunchMenu, DashboardSwitcher, UserProfileWindow, AboutWindow, Backbone, $) {

    var $body = $(document.body),
        launchmenuShown = false;

    var Banner = Backbone.View.extend({

        el: $('#banner'),

        events: {
            'click .launchmenu-btn': 'showLaunchMenu',
            'click .dashboards-btn': 'showDashboardsWindow',
            'click .admin-btn': 'showAdminWindow',
            'click .user-profile-btn': 'showProfileWindow',
            'click .about-btn': 'showAboutWindow'
        },

        initialize: function () {
            this.$el.tooltip();  
            return this;
        },
        
        showLaunchMenu: function (evt) {
            //this.trigger('show:launchmenu', e);
            if(!launchmenuShown)
                $body.append(LaunchMenu.render().$el);

            LaunchMenu.show();
            launchmenuShown = true;
            return false;
        },

        showDashboardsWindow: function(evt) {
            if(!this.dashboardSwitcher) {
                this.dashboardSwitcher = new DashboardSwitcher();
                $body.append(this.dashboardSwitcher.render().$el);
            }

            this.dashboardSwitcher.show();
            this.dashboardSwitcher.$el.one('hidden', function () {
                $(evt.currentTarget).removeClass('active');
            });
            $(evt.currentTarget).addClass('active');
            return false;
        },

        showAdminWindow: function(e) {
            return false;
        },

        showProfileWindow: function () {
            var userProfileWindow = new UserProfileWindow();
            $body.append( userProfileWindow.render().$el );
            userProfileWindow.show();
        },

        showAboutWindow: function () {
            var aboutWindow = new AboutWindow();
            $body.append( aboutWindow.render().$el );
            aboutWindow.show();
        }
    });

    return Banner;

});
