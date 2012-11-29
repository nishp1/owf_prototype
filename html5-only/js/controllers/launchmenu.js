OWF.Controller.LaunchMenu = Backbone.Controller.extend({
	
	view: {
		selectedWidgetView: null,
		infoView: null,
		controlsView: null,
		mainView: null
	},

	initialize: function() {
		var me = this;

		// this.selectedWidgetView.on('widget:launch', function(model) {
		// 	OWF.EventDispatcher.trigger("widget:launch", model.toJSON());
		// });

		// this.mainView.on('widget:launch', function(model) {
		// 	OWF.EventDispatcher.trigger("widget:launch", model.toJSON());
		// });

		this.selectedWidgetView.on('widget:launch', this.launchWidget, this);

		this.mainView.on('widget:launch', this.launchWidget, this);

		this.mainView.on('widget:select', function(model) {
			me.selectedWidgetView.update(model);
			OWF.EventDispatcher.trigger("widget:select", model.toJSON());
		})

		OWF.EventDispatcher.on('show:launchmenu', function() {
			me.mainView.show();
		});

		//me.mainView.show();
	},

	launchWidget: function(model) {
		OWF.EventDispatcher.trigger("widget:launch", model.toJSON());
		this.mainView.hide();
	}

});