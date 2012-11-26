define([
    'app'
],

function(app) {

    var DashboardModel = Backbone.Model.extend({
    	
    	idAttribute: "guid",

    	defaults: {
            guid: null,
    		name: null,
    		description: null,
    		layoutConfig: null
    	},

        initialize: function() {
            if( !this.get('guid') ) {
                var now = + (new Date());
                this.set( 'guid', now, {silent: true} );
            }
            
        	if( _.isString(this.get('layoutConfig')) )
        		this.set( 'layoutConfig', JSON.parse(this.get('layoutConfig')), {silent: true} );
        }

    });

    return DashboardModel;

});
