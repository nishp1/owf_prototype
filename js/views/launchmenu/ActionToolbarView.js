define([
    'app',

    // Libraries.
    'jquery'
],

function(app, $) {

    var ActionToolbarView = Backbone.View.extend({

        className: 'actions',

        template:   '<i class="icon-search"></i><input autofocus type="text" class="search-query no-border-radius" placeholder="Search by name...">' +
                    '<div class="pull-right">' +
                        '<div class="btn-group">' +
                            '<button class="btn active tiles-btn"><i class="icon-th"></i></button>' +
                            '<button class="btn grid-btn"><i class="icon-th-list"></i></button>' +
                        '</div>' +
                    '</div>',

        events: {
            'click .tiles-btn': 'onTilesBtnClick',
            'click .grid-btn': 'onGridBtnClick'
        },

        render: function() {
            this.$el.append( this.template );
            this.$activeBtn = this.$('.active');
            return this;
        },

        onTilesBtnClick: function(evt) {
            var $currentTarget = $(evt.currentTarget);

            if( this.$activeBtn[0] === $currentTarget[0] ) {
                return;
            }

            this.$activeBtn.removeClass('active');
            this.$activeBtn = $currentTarget.addClass('active');
            this.trigger('show:tiles-view');
        },

        onGridBtnClick: function(evt) {
            var $currentTarget = $(evt.currentTarget);

            if( this.$activeBtn[0] === $currentTarget[0] ) {
                return;
            }

            this.$activeBtn.removeClass('active');
            this.$activeBtn = $currentTarget.addClass('active');
            this.trigger('show:grid-view');
        }

    });

    return ActionToolbarView;
});
