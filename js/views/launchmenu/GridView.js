define([
    'app',

    'views/base/ListView',

    // Libraries.
    'jquery',
    "libs/kendoui.web/source/js/kendo.core",
    'bootstrap/bootstrap-modal'
],

function(app, ListView, $) {

    var rowTpl = '<td><img src="#=data.largeIconUrl#"></td>' +
                 '<td>#=data.namespace#</td>';
    var RowView = Backbone.View.extend({
        
        tagName: 'tr',

        className: 'widget-view',

        template: kendo.template(rowTpl, { useWithBlock: false }),

        render: function() {
            this.rendered = true;
            this.$el.html( this.template( this.model.toJSON() ) );

            return this;
        },

        attributes: function() {
            return {
                "data-id": this.model.get('id'),
                'tabIndex': '0'
            };
        }
    });

    var GridView = ListView.extend({

        listItemView: RowView,

        tagName: 'table',

        className: 'gridview table table-hover table-striped animated fadeInRight',

        events: {
            'focus .widget-view': 'widgetSelected',
            'click .widget-view': 'widgetSelected',
            'dblclick .widget-view': 'widgetSelectedForLaunch',
            'mousedown .widget-view': 'enableDrag'
        },
        
        show: function() {
            this.$el.modal({
                show: true
            });
        },

        hide: function() {
            this.$el.modal('hide');
        },

        widgetSelected: function(e) {
            console.log('widgetSelected')
            var $currentTarget = $(e.currentTarget);

            if(this._$previouslySelected)
                this._$previouslySelected.removeClass('selected');

            this._$previouslySelected = $currentTarget.addClass('selected');
            this.trigger('widget:select', this.collection.get($currentTarget.data('id')));
        },

        widgetSelectedForLaunch: function(e) {
            var $currentTarget = $(e.currentTarget);
            this.trigger('widget:launch', this.collection.get($currentTarget.data('id')));
        },

        enableDrag: function (e) {
            var $doc = $(document),
                $body = $(document.body),
                $currentTarget = $(e.currentTarget.cloneNode()),
                $dragProxy = $(e.currentTarget.cloneNode(true)),
                widget = this.collection.get($currentTarget.data('id')),
                proxyAdded = false;

            function onMouseMove(e) {

                if(!proxyAdded) {
                    $body.append($dragProxy.addClass('drag-proxy'));
                    proxyAdded = true;
                }

                $dragProxy.css({
                    left: e.pageX + 25,
                    top: e.pageY + 25
                });

                return false;
            }

            function onMouseUp () {
                $dragProxy.remove();
                $doc.off('mousemove', onMouseMove)
                    .off('mousemove', '.modal-backdrop', onMouseOut);
            }

            function onMouseOut (e) {
                app.trigger('launch-widget', widget);
                return false;
            }

            $doc
                .on('mousemove', onMouseMove)
                .one('mousemove', '.modal-backdrop', onMouseOut)
                .one('mouseup', onMouseUp);

            return false;
        }
    });

    return GridView;
});
