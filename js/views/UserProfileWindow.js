define([
    'app',

    // Libraries.
    'backbone',
    'jquery'
],

function(app, Backbone, $) {

    var UserProfileWindow = Backbone.View.extend({

        id: 'user-profile-window',

        className: 'modal fade',
        
        template:   '<div class="modal-body">' + 
                        '<div class="row">' +
                            '<div class="span2">User Name</div>' +
                            '<div class="">johndoe</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="span2">Full Name</div>' +
                            '<div class="">John Doe</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="span2">Email</div>' +
                            '<div class="">johndoe@gmail.com</div>' +
                        '</div>' +
                        '<div class="row">' +
                            '<div class="span2">Groups</div>' +
                            '<div class="">TestGroup1, OWF Users, TestGroup2, OWF Administrators</div>' +
                        '</div>' +
                    '</div>',
        
        initialize: function  () {
            var me = this;
            me.$el.one('hidden', function () {
                me.remove();
            });
        },

        render: function () {
            this.$el.html( this.template );
            return this;
        },

        show: function() {
            this.$el.modal({ show: true });
        }
    });

    return UserProfileWindow;

});
