define([
    'app',

    'models/DashboardModel',

    // Libraries.
    'jquery'
],

function(app, DashboardModel, $) {

    var CreateEditDashboard = Backbone.View.extend({

        id: 'create-edit-dashboard-window',

        className: 'modal hide fade',

        template:   '<div class="modal-header">' + 
                        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                        '<h4>Create Dashboard</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                        '<form class="form-horizontal">' +
                            '<div class="control-group">' + 
                                '<label class="control-label" for="name">Name</label>' + 
                                '<div class="controls">' + 
                                    '<input autofocus type="text" class="name" placeholder="Name...">' + 
                                '</div>' + 
                            '</div>' + 
                            '<div class="control-group">' + 
                                '<label class="control-label" for="description">Description</label>' + 
                                '<div class="controls">' + 
                                    '<textarea rows="3" class="description" placeholder="Description..."></textarea>' + 
                                '</div>' + 
                            '</div>' + 
                        '</form>' + 
                    '</div>' +
                    '<div class="modal-footer">' +
                        '<a href="#" class="btn">Close</a>' +
                        '<a href="#" class="btn btn-primary continue">Continue</a>' +
                    '</div>',

        events:  {
            'click .continue': 'continueAhead'
        },

        initialize: function () {

        },
        
        render: function  () {
            this.$el.append( this.template );
            return this;
        },

        continueAhead: function () {
            var me = this,
                name = $('.name', me.$el).val(),
                description = $('.description', me.$el).val();

            if( me._createDeferred ) {
                var dashboard = new DashboardModel({
                    name: name,
                    description: description
                });
                
                me.hide().then(function () {
                    me.remove();
                    me._createDeferred.resolve( dashboard );
                });
            }
            else {
                // this._editDeferred.resolve()
            }
        },

        create: function () {
            this._createDeferred = $.Deferred();
            return this._createDeferred.promise();
        },

        show: function() {
            var dfd = $.Deferred();

            this.$el.one('shown', function () {
                dfd.resolve();
            }).modal({
                show: true
            });

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

    return CreateEditDashboard;
});
