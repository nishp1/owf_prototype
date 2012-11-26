define([
    'app',

    'views/base/ListView',

    'collections/DashboardsCollection',

    // Libraries.
    'jquery',
    "libs/kendoui.web/source/js/kendo.core",
    "libs/kendoui.web/source/js/kendo.resizable",
    "libs/kendoui.web/source/js/kendo.draganddrop",
    "libs/kendoui.web/source/js/kendo.splitter"
],

function(app, ListView, DashboardsCollection,$) {

    var TileView = Backbone.View.extend({
        
        className: 'dashboard-view',

        template:   kendo.template(
                        '<img src="http://lorempixel.com/124/124/abstract/" class="img-polaroid" />' +
                        '<span>#=data.name#</span>' +
                        '<div class="btn-group">' +
                            '<button class="btn"><i class="icon-refresh"></i></button>' +
                            '<button class="btn"><i class="icon-share"></i></button>' +
                            '<button class="btn"><i class="icon-edit"></i></button>' +
                            '<button class="btn"><i class="icon-remove"></i></button>' +
                        '</div>'
                    , { useWithBlock: false }),

        render: function() {
            this.$el.html( this.template( this.model.toJSON() ) );
            return this;
        },

        attributes: function() {
            return {
                "data-id": this.model.get('guid'),
                'tabIndex': '0'
            };
        }
    });

    var TilesView = ListView.extend({

        listItemView: TileView,

        className: 'tilesview',

        tabIndex: '-1',

        events: {
            'click .dashboard-view': 'onDashboardClick',
            'mouseenter .dashboard-view': 'showActions',
            'mouseleave .dashboard-view': 'hideActions'
        },

        initialize: function() {
            this.collection = DashboardsCollection;
            this.constructor.__super__.initialize.call(this);
        },

        onDashboardClick: function (evt) {
            var $currentTarget = $(evt.currentTarget),
                model = this.collection.get($currentTarget.data('id'));

            this.trigger('itemselected', model);
        },

        toggleManage: function () {
            this._managing = !this._managing;
        },

        showActions: function (evt) {
            if( !this._managing )
                return;

            $('.btn-group', evt.currentTarget).show();
        },

        hideActions: function (evt) {
            if( !this._managing )
                return;

            $('.btn-group', evt.currentTarget).hide();
        }
    });

    return TilesView;
});
