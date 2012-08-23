
OWF.View.SelectedWidget = Backbone.View.extend({

	el: $('#launch-menu-header-selected-widget'),

	events: {
		'click .btn': 'launchWidget'
	},

	initialize: function() {
		var $infoView = this.$('#launch-menu-header-selected-widget-info');

		this.selectedWidgetModel = null;
		this.$img = this.$('#launch-menu-header-selected-widget-thumb img');
		this.$name = $infoView.find('span');
		this.$description = $infoView.find('p');
	},

	update: function(widgetModel) {

		this.selectedWidgetModel = widgetModel;

		this.$img.attr('src', widgetModel.get('largeIconUrl'));
		this.$name.html(widgetModel.get('namespace'));

		// Todo get description here 
		// this.$description = '.....';
	},

	launchWidget: function(e) {
		this.trigger('widget:launch', this.selectedWidgetModel);
	}
});