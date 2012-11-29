define([
    'app',

    'views/widget/WidgetPanel',

    'services/ZIndexManager',

    // Libraries.
    'jquery',
    'backbone',
    'libs/jquery-ui/ui/jquery-ui'
],

function(app, WidgetPanel, ZIndexManager, $, Backbone) {

    var windowZIndexManager = new ZIndexManager();

    var WidgetWindow = WidgetPanel.extend({

        className: 'widget window',

        events: {
            'click .minimize-btn' : 'minimize',
            'click .maximize-btn' : 'toggleMaximize',
            'click .restore-btn' : 'toggleMaximize',
            'dblclick': 'toggleMaximize'
        },

        closable: true,
        minimizable: true,
        maximizable: true,

        initialize: function () {
            var parent =  this.constructor.__super__;
            parent.initialize.call(this);
            this.events = _.extend({}, parent.events, this.events);
        },

        render: function () {
            var me = this;
            
            console.time('widgetrender');

            me.constructor.__super__.render.call(me);

            me.model.get('maximized') ? me._hideMaximizeBtn() : me._hideRestoreBtn();
            me._toggleToolsMenuBtn(true);

            me.$el.
                one('mousedown', function (evt) {
                    me.$el.
                        draggable({
                            containment: me.containment,
                            start: app.mask,
                            stop: app.unmask
                        }).
                        trigger(evt);
                }).
                resizable({
                    start: _.bind(me.onResizeStart, me),
                    resize: _.bind(me.onResize, me),
                    stop: _.bind(me.onResizeStop, me)
                });
            
            windowZIndexManager.register(me);
            console.timeEnd('widgetrender');

            return me;
        },

        activate: function () {
            console.log('activate');
        },

        attributes: function() {
            var model = this.model;
            return {
                'style':    'left:' + model.get('x') + 'px;' +
                            'top:' + model.get('y') + 'px;' + 
                            'width:' + model.get('width') + 'px;' +
                            'height:' + model.get('height') + 'px;' + 
                            'z-index:' + model.get('zIndex') + ';'
            };
        },

        minimize: function(evt) {
            console.log('minimize');
        },

        toggleMaximize: function(evt) {
            var container = this.options.containment,
                offset = container.offset(),
                $el = this.$el,
                $target = $(evt.target),
                $currentTarget = $(evt.currentTarget);

            if(this.maximized) {
                this._restoreBox && $el.css(this._restoreBox);
                this._hideRestoreBtn();

                delete this._restoreBox;
            }
            else {
                this._restoreBox = this.getBox();

                this.$el.css({
                    width: container.width(),
                    height: container.height(),
                    top: '0px',
                    left: '0px'
                });
                this._hideMaximizeBtn();
            }

            this.maximized = !this.maximized;
        },

        _hideRestoreBtn: function () {
            this.$('.restore-btn').parent().hide();
            this.$('.maximize-btn').parent().show();
        },

        _hideMaximizeBtn: function () {
            this.$('.maximize-btn').parent().hide();
            this.$('.restore-btn').parent().show();
        },

        onResizeStart: function () {
            console.log('resize start');
            app.mask();

            var actions = this.$('.actions');
            this._headerTitleOrigWidth = this.$('.title').width();
            this._actionsOrigWidth = actions.width();

            this._$tools = actions.children().filter(':visible').not('.show-all-tools-li');
            this._$showAllTools = $('.show-all-tools-li', actions);
        },

        onResize: function (evt, ui) {
            var size = ui.size,
                width = size.width, // header'width == window's width
                height = size.height;

            console.log(this._headerTitleOrigWidth, this._actionsOrigWidth, width)
            if((this._headerTitleOrigWidth + this._actionsOrigWidth + 20) > width) {
                //overflow
                console.log('overflow')
                this._$tools.hide()
                this._$showAllTools.show()
            }
            else {
                console.log('overflow cleared')
                this._$tools.show()
                this._$showAllTools.hide()
            }

            // this._headerTitleOrigWidth = this.$('.title').width();
            // this._actionsOrigWidth = this.$('.actions').width();
        },

        onResizeStop: function () {
            console.log('resize stop');
            app.unmask();

            this._actions = null;
            this._headerTitleOrigWidth = null;
            this._actionsOrigWidth = null;
        },

        _toggleToolsMenuBtn: function (hide) {
            hide ? this.$('.show-all-tools').hide() : this.$('.show-all-tools').toggle();
        }

    });

    return WidgetWindow;

});
