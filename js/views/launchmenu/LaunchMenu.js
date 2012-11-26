define([
    'app',

    'collections/WidgetsCollection',

    'views/launchmenu/ActionToolbarView',
    'views/launchmenu/TilesView',
    'views/launchmenu/GridView',
    'views/launchmenu/AdvancePanel',

    // Libraries.
    'backbone',
    'jquery'
],

function(app, WidgetsCollection, ActionToolbarView, TilesView, GridView, AdvancePanel, Backbone, $) {

    var LaunchMenuView = Backbone.View.extend({

        id: 'launch-menu',

        className: 'modal fade no-border-radius',

        tabIndex: '-1',

        template:   '<button class="btn slide"><i class="icon-chevron-left"></i></button>' +
                    '<div class="content">' +
                        '<div class="cards"></div>' + 
                        '<div class="favorite-widgets"></div>' +
                    '</div>',

        events: {
            'click .slide': 'toggleAdvancePanel'
        },

        initialize: function() {
            var me = this;
            
            me.actionToolbarView = new ActionToolbarView();
            me.tilesView = new TilesView({
                collection: WidgetsCollection
            });
            me.gridView;
            
            _.bindAll(this);

            app.on('launch-widget', function () {
                me.hide();
            });

            // hide advance panel when launch menu is hidden
            me.$el.on('hide', _.bind(me.hideAdvancePanel, me, {animate: false}));

            // show respective card
            me.actionToolbarView.on('show:grid-view', me.showGridView);
            me.actionToolbarView.on('show:tiles-view', me.showTilesView);
        },

        render: function () {
            this.$el.append( this.actionToolbarView.render().$el );
            
            this.$contentView = $( this.template );
            $('.cards', this.$contentView).append( this.tilesView.render().$el );

            this.$el.append( this.$contentView );

            return this;
        },

        show: function() {
            this.$el.modal({ show: true });
        },

        hide: function() {
            if(this._advancePanelShown) {
                this.advancePanel.$el.hide();
                this._advancePanelShown = !this._advancePanelShown;
            }
            this.$el.modal('hide');
        },

        showTilesView: function () {
            if(!this.tilesView) {
                this.tilesView = new TilesView().render();
                $('.cards', this.$contentView).append( this.tilesView.$el );
            }

            this.gridView && this.gridView.$el.addClass('hide');
            this.tilesView.$el.removeClass('hide');
        },

        showGridView: function () {
            if(!this.gridView) {
                this.gridView = new GridView({
                    collection: WidgetsCollection
                }).render();
                $('.cards', this.$contentView).append( this.gridView.$el );
            }

            this.tilesView && this.tilesView.$el.addClass('hide');
            this.gridView.$el.removeClass('hide');
        },

        hideAdvancePanel: function (options, evt) {
            if(this._advancePanelShown === true) {
                this.advancePanel.hide( options ? options.animate : true);
                this._advancePanelShown = !this._advancePanelShown;
            }
        },

        toggleAdvancePanel: function () {
            if( !this.advancePanel ) {
                this.advancePanel = new AdvancePanel();
                $('body').append( this.advancePanel.render().$el );
            }
            if( !this._advancePanelShown ) {
                var height = this.$el.height(),
                    offset = this.$el.offset(),
                    marginTop = 10;

                this.advancePanel.$el.css({
                    'height': height - (2 * marginTop),
                    'top': offset.top + marginTop,
                    'left': offset.left - this.advancePanel.$el.width()
                });
                this.advancePanel.show();

                this._advancePanelShown = !this._advancePanelShown;
            }
            else {
                this.hideAdvancePanel()
            }
        }


    });

    return (new LaunchMenuView());
});
