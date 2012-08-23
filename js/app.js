/* Author: Nish Patel

*/
console.time('app');

;(function(window, document, $) {

	var appController = Backbone.Controller.extend({

		view: {
			banner: null
		},

		initialize: function() {
			var me = this,
				$main = $('body')
				//$main = $('#main'),
				$mask = $('#doc-mask');

			OWF.EventDispatcher.on("widget:launch", function(widget) {

				// var widgetCmp = new OWF.View.Panel({
				// 	title: widget.namespace,
				// 	url: widget.url,
				// 	collapsible: true,
				// 	closable: true
				// });

				// 

				var widgetCmp = new OWF.View.Window({
					title: widget.namespace,
					url: widget.url,
					closable: true,
					minimizable: true,
					maximizable: true
				});

				$main.append(widgetCmp.render().el);

				widgetCmp.$el
					.draggable({
						start: function(event, ui) {
							$mask.addClass('mask');
						},
						stop: function(event, ui) {
							$mask.removeClass('mask');
						}
					})
					.resizable({
						helper: "ui-state-highlight"
					});
			});

			me.launchmenuController = new OWF.Controller.LaunchMenu({
				view: {
					selectedWidgetView: new OWF.View.SelectedWidget(),
					mainView: new OWF.View.ThumbnailLayout()
				}
			});

			me.banner.on('show:launchmenu', function() {
				OWF.EventDispatcher.trigger('show:launchmenu');
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