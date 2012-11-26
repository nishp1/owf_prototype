define([
    "app",

    // Libraries.
    "jquery",
    "lodash",
    "backbone",

    // Plugins.
    "plugins/backbone.layoutmanager",
    "libs/jquery-ui/ui/jquery-ui",
    "libs/kendoui.web/source/js/kendo.core",
    "libs/kendoui.web/source/js/kendo.resizable",
    "libs/kendoui.web/source/js/kendo.draganddrop",
    "libs/kendoui.web/source/js/kendo.splitter"
],

function(app, $, _, Backbone) {

    var boxTpl = '<div class="pane"></div><div class="pane"></div>',
        HIGHLIGHTCLASS = 'highlight';

    var DashboardDesigner = Backbone.Layout.extend({

        id: 'dashboard-designer',

        template: '#dashboard-designer-layout',

        // views: {
        //   "#side-panel": new Backbone.LayoutView()
        // }

        events: {
            'click .save-btn': 'save'
        },

        initialize: function() {
            _.bindAll(this);
        },

        save: function () {
            var config = this.$designer.data('config');
            console.log('saving...', config);
            this.deferred.resolve( config );
        },

        afterRender: function() {
            this.$designer = $('#designer');
            this._initDragAndDrop();
        },

        design: function() {
            this.render();
            return (this.deferred = $.Deferred());
        },

        _initDragAndDrop: function() {
            this.$('li').draggable({
                cursorAt: { left: -50 },
                helper: 'clone',
                scroll: false,
                start: this._onDragStart,
                stop: this._onDragStop
            });

            $('#designer').droppable({
                drop: this._onDrop
            });
        },

        _uninitDragAndDrop: function () {
            // clean up
        },

        _onMouseOverPane: function (evt) {
            console.log(evt.target);
            this.$_mouseOverPane = $(evt.target).addClass(HIGHLIGHTCLASS);
        },

        _onMouseOutPane: function  () {
            this.$_mouseOverPane && this.$_mouseOverPane.removeClass(HIGHLIGHTCLASS)
        },

        _onDragStart: function(evt, ui) {
            $(ui.helper).data({
                type: $(evt.target).data().type
            });

            $(document).on('mouseenter', '#designer, #designer .pane', this._onMouseOverPane);
            $(document).on('mouseleave', '#designer, #designer .pane', this._onMouseOutPane);
        },

        _onDrop: function (evt, ui) {
            var data = $(ui.helper).data(),
                panes = [
                    { collapsible: false },
                    { collapsible: false }
                ],
                options = {
                    panes: panes
                },
                box = $(boxTpl);

            if( data.type === 'vbox' ) {
                options.orientation = 'vertical';
            }

            var index = this.$_mouseOverPane.index(),
                parentConfig = this.$_mouseOverPane.parent().data('config');

            // account for splitter
            if(index === 2) {
                index = 1;
            }

            // if parent has a config
            if(parentConfig) {
                parentConfig.panes[index].box = options;
            }

            this.$_mouseOverPane
                .data('config', options)
                .removeClass(HIGHLIGHTCLASS)
                .append(box)
                .kendoSplitter(options);

            this.$_mouseOverPane.data("kendoSplitter").bind("resize", function (evt) {
                console.log('resized panes');
                //panes = evt.sender.options.panes;
            });
        },

        _onDragStop: function(evt, ui) {
            $(document).off('mouseenter', '#designer, #designer .pane', this._onMouseOverPane);
            $(document).off('mouseleave', '#designer, #designer .pane', this._onMouseOutPane);
        }
    });

    return DashboardDesigner;

});
