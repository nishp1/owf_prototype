define([
    'app',

    // Libraries.
    'backbone',
    "libs/kendoui.web/source/js/kendo.core"
],

function(app, Backbone) {

    var WidgetPanel = Backbone.View.extend({

        className: 'widget panel',

        template: kendo.template($('#widget-template').html(), { useWithBlock: false }),

        events: {
            'dblclick' : 'toggleCollapse',
            'click .collapse-btn' : 'toggleCollapse',
            'click .expand-btn' : 'toggleCollapse',
            'click .close-btn' : 'close',
            'click .show-all-tools-btn': 'showAllTools'
        },

        initialize: function () {
            this.model = this.options.model;
            this.title || ( this.title = 'Yet Another Widget' );
            this.containment = this.options.containment || ( this.containment = $(document.body) );
        },

        render: function () {
            this.$el.html( this.template( this ) );
            this.$header || ( this.$header = this.$el.children('.header') );
            this.$body || ( this.$body = this.$el.children('.body') );
            
            return this;
        },
        
        close: function (evt) {
            evt.stopPropagation();

            this.$header = this.$body = null;
            this.remove();
        },

        toggleCollapse: function () {
            evt.stopPropagation();

            if(this.isCollapsed === true)
                this.$body.slideDown();
            else
                this.$body.slideUp();
            
            this.isCollapsed = !this.isCollapsed;
        },

        showAllTools: function () {
            
        },

        getBox: function () {
            var $el = this.$el;

            return {
                width: $el.width(),
                height: $el.height(),
                top: $el.css('top'),
                left: $el.css('left')
            };
        }

    });

    return WidgetPanel;

});
