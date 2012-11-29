// Set the require.js configuration for your application.
require.config({

    // Initialize the application with the main application file.
    deps: ['main'],

    paths: {
        // JavaScript folders.
        libs: 'libs',
        plugins: 'plugins',

        // Libraries.
        jquery: 'libs/jquery',
        lodash: 'libs/lodash',
        backbone: 'libs/backbone',

        //plugins
        bootstrap: 'plugins/bootstrap'
    },

    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: ['lodash', 'jquery'],
            exports: 'Backbone'
        },

        'bootstrap/bootstrap-modal': {
            deps: ['jquery', 'bootstrap/bootstrap-transition', 'bootstrap/bootstrap-dropdown', 'bootstrap/bootstrap-tooltip']
        },

        // Backbone.LayoutManager depends on Backbone.
        'plugins/backbone.layoutmanager': ['backbone'],
        'libs/jquery-ui/ui/jquery-ui': ['jquery'],
        'libs/kendoui.web/source/js/kendo.draganddrop': ['libs/kendoui.web/source/js/kendo.core'],
        'libs/kendoui.web/source/js/kendo.splitter': ['libs/kendoui.web/source/js/kendo.core'],
        'libs/kendoui.web/source/js/kendo.resizable': ['libs/kendoui.web/source/js/kendo.core']
    }

});