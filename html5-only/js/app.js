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

			OWF.EventDispatcher.on("widget:launch", this.launchWidget, this);

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

		launchWidget: function (widgetModel) {
			// var widgetCmp = new OWF.View.Panel({
			// 	title: widgetModel.namespace,
			// 	url: widgetModel.url,
			// 	collapsible: true,
			// 	closable: true
			// });
			var me = this;

			me.selectPane().then(function( $pane ) {

				var widgetCmp = new OWF.View.Window({
					title: widgetModel.namespace,
					url: widgetModel.url,
					closable: true,
					minimizable: false,
					maximizable: true,

					container: $pane
				});

				//me.$body.append(widgetCmp.render().el);
				$pane.append(widgetCmp.render().el);

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
						start: function(event, ui) {
							me.$mask.addClass('mask');
						},
						stop: function(event, ui) {
							me.$mask.removeClass('mask');
						}
					});
			});

		},

		selectPane: function () {
			var me = this,
				dfd = $.Deferred();

			this.$body.on('mouseover', '.pane', function (evt) {
				console.log('over pane', arguments);
				$(evt.target).addClass('over');
			});

			this.$body.on('mouseout', '.pane', function (evt) {
				console.log('out of pane ', arguments);
				$(evt.target).removeClass('over');
			});

			this.$body.one('click', '.pane', function (evt) {
				var $target = $(evt.target);

				console.log('pane clicked ', arguments);
				$target.removeClass('over');

				me.$body.off('mouseover', '.pane');
				me.$body.off('mouseout', '.pane');
				
				dfd.resolve( $target );
			})

			return dfd.promise();
		}
	});

	OWF.Controller.App = new appController({
		view: {
			banner: new OWF.View.Banner()
		}
	});
	

})(window, document, window.jQuery || window.zepto);


console.timeEnd('app');