/* Author: Nish Patel

*/
console.time('app');

;(function(window, document, $) {

	var appController = Backbone.Controller.extend({

		view: {
			banner: null
		},

		initialize: function() {
			this.$body = $('body');
			this.$mask = $('#doc-mask');

			OWF.EventDispatcher.on("widget:launch", this.launchWidgetInPane, this);

			this.launchmenuController = new OWF.Controller.LaunchMenu({
				view: {
					selectedWidgetView: new OWF.View.SelectedWidget(),
					mainView: new OWF.View.ThumbnailLayout()
				}
			});

			this.banner.on('show:launchmenu', function() {
				OWF.EventDispatcher.trigger('show:launchmenu');
			});
		},

		launchWidgetInPane: function (widgetModel) {
			// var widgetCmp = new OWF.View.Panel({
			// 	title: widgetModel.namespace,
			// 	url: widgetModel.url,
			// 	collapsible: true,
			// 	closable: true
			// });
			var me = this;

			var $pane = $('#main > .hbox > div');

			var widgetCmp = new OWF.View.Window({
				title: widgetModel.namespace,
				url: widgetModel.url,
				closable: true,
				minimizable: true,
				maximizable: true,

				container: $pane
			});

			me.$body.append(widgetCmp.render().el);

			widgetCmp.$el
				.draggable({
					containment: $pane,
					start: function(event, ui) {
						me.$mask.addClass('mask');
					},
					stop: function(event, ui) {
						me.$mask.removeClass('mask');
					}
				})
				.resizable({
					helper: "ui-state-highlight"
				});
		}
	});

	OWF.Controller.App = new appController({
		view: {
			banner: new OWF.View.Banner()
		}
	});
	

})(window, document, window.jQuery || window.zepto);


console.timeEnd('app');