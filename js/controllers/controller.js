Backbone.Controller = function(cfg) {
	
	var me = this;

	_.each(cfg.view, function(value, key) {

		// TODO check for all View here

		me[key] = value;
	});

	this.initialize();
};

Backbone.Controller.extend = Backbone.Model.extend;

_.extend(Backbone.Controller.prototype, Backbone.Events, {
	initialize: function() {}
});
