OWF.Template.LaunchMenuItem = $("#launch-menu-item-template").html();


OWF.View.LaunchMenuItem = Backbone.View.extend({
	
	className: 'widget-thumb',

	template: Handlebars.compile( OWF.Template.LaunchMenuItem ),

	render: function() {
		this.$el.html( this.template( this.model.toJSON() ) );
		return this;
	},

	attributes: function() {
		return {
			"data-id": this.model.get('id')
		}
	}
});

OWF.View.ThumbnailLayout = Backbone.View.extend({

	el: $('#launch-menu'),

	events: {
		'click .widget-thumb': 'widgetSelected',
		'dblclick .widget-thumb': 'widgetSelectedForLaunch'
	},

	initialize: function() {

		// listen to collection's events
		OWF.Collection.Widgets.bind('add', this.addOne, this);
		OWF.Collection.Widgets.bind('reset', this.addAll, this);

		// bind all functions content to this view
		_.bindAll(this);

		this.addAll();
		// normally we'd fetch here, and reset/add be fired once fetched
		// OWF.Collections.Widgets.fetch();
	},

	show: function() {

		this.$el.modal({
			show: true
		});
	},

	hide: function() {
		this.$el.modal('hide');
	},

	addOne: function(item) {
		var view = new OWF.View.LaunchMenuItem({model: item});
		this.$el.append(view.render().el);
	},

	addAll: function() {
		var frag = document.createDocumentFragment();

		OWF.Collection.Widgets.each(function(item) {
			var view = new OWF.View.LaunchMenuItem( {model: item} );
			frag.appendChild(view.render().el);
		});

		this.$el.append(frag);
	},

	widgetSelected: function(e) {
		var $currentTarget = $(e.currentTarget);

		if(this.lastSelected)
			this.lastSelected.removeClass('selected');

		this.lastSelected = $currentTarget.addClass('selected');
		this.trigger('widget:select', OWF.Collection.Widgets.get($currentTarget.data('id')));
	},

	widgetSelectedForLaunch: function(e) {
		var $currentTarget = $(e.currentTarget);
		this.trigger('widget:launch', OWF.Collection.Widgets.get($currentTarget.data('id')));
	}
});