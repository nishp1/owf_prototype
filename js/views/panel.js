OWF.Template.Panel = $("#panel-template").html();

OWF.View.Panel = Backbone.View.extend({

	tagName: "div",
	className: "widget panel",
	template: Handlebars.compile( OWF.Template.Panel ),

	events: {
		'click a[title^="collapse"]' : 'collapse',
		'click a[title^="expand"]' : 'expand',
		'click a[title^="minimize"]' : 'minimize',
		'click a[title^="maximize"]' : 'maximize',
		'click a[title^="close"]' : 'close'
	},

	render: function() {
		this.$el.html( this.template(this.options) );
		this.$header || (this.$header = this.$el.children('.header'));
		this.$body || (this.$body = this.$el.children('.body'));
			return this;
	},

	collapse: function() {
		if(!this.isCollapsed)
			this.$body.slideUp();
		
		this.isCollapsed = true;
	},
	expand: function() {
		if(this.isCollapsed)
			this.$body.slideDown();

		this.isCollapsed = false;
	},

	maximize: function() {},
	minimize: function() {},
	
	close: function() {
		this.$header = this.$body = null;
		this.remove();
	}
});