define([
    'app',

    'services/DashboardService',

    // Libraries.
    'jquery',
    'lodash',
    'backbone',

    "libs/kendoui.web/source/js/kendo.core",
    "libs/kendoui.web/source/js/kendo.resizable",
    "libs/kendoui.web/source/js/kendo.draganddrop",
    "libs/kendoui.web/source/js/kendo.splitter"
],

function(app, DashboardService, $, _, Backbone) {

    var Dashboard = Backbone.View.extend({

        model: null,

        className: 'dashboard animated',

        animateInClass: 'dashboardSlideInLeft',
        animateOutClass: 'dashboardSlideOutLeft',

        render: function () {
            console.log('Rendering.... ', this.model.get('name'));
            
            //this.$el.append(DashboardService.create( this.model.get('layoutConfig') ));
            DashboardService.create( this.model.get('layoutConfig'), this.$el );
            return this;
        },

        layout: function () {
            // parent element must have desired width and height set
            // find all child boxes including current element

            var $boxes = this.$el.hasClass('box') ? 
                            this.$el.find('.box').andSelf() :
                            this.$el.find('.box');

            $boxes.each(function() {
                var box = $(this),
                    config = box.data('config');

                // init splitter
                box.kendoSplitter(config);

                // mask and unmask when drag starts and stops
                // to prevent widgets from getting mouseevents
                // and to enable smoother drag
                box.data("kendoDraggable").
                    bind('dragstart', app.mask).
                    bind('dragend', app.unmask);
            });

            return this;
        },

        hide: function (animate) {
            var me = this,
                $el = this.$el;

            function afterAnimation () {
                $el.removeClass('active ' + me.animateOutClass).addClass('inactive');
            }
            
            if( animate === false || !Modernizr.cssanimations ) {
                afterAnimation();
            }
            else {
                $el
                    .removeClass(this.animateInClass)
                    .addClass(this.animateOutClass)
                    .one(app.support.animationend, afterAnimation);
            }

            app.trigger('dashboard:deactivated', this.model, this);
        },

        show: function (animate) {
            var me = this,
                $el = this.$el;
            
            function afterAnimation () {
                $el.addClass('active').removeClass(me.animateInClass);
            }
            
            $el.removeClass('inactive');
            
            if( animate === false || !Modernizr.cssanimations ) {
                afterAnimation();
            }
            else {
                $el
                    .addClass(this.animateInClass)
                    .one(app.support.animationend, afterAnimation);
            }
            
            app.trigger('dashboard:activated', this.model, this);
        },

        launchWidget: function (model) {
            var deferred = $.Deferred();

            this.selectPane().then(function (evt, paneView) {
                console.log('pane selected ', evt, paneView);

                var widget = paneView.launchWidget(evt, model);
                deferred.resolve( widget );
            }, function () {
                deferred.reject();
            });

            return deferred.promise();
        },

        selectPane: function () {
            var me = this,
                dfd = $.Deferred(),
                $shims = this.$('.paneshim').removeClass('hide');

            this.$el.on('mouseover', '.pane', function (evt) {
                evt.stopPropagation();
                console.log('over pane');
                $(evt.target).addClass('over');
            });

            this.$el.on('mouseout', '.pane', function (evt) {
                evt.stopPropagation();
                console.log('out of pane ');
                $(evt.target).removeClass('over');
            });

            // mouseup outside of the dasboard
            $(document).one('mouseup', function (evt) {
                // mouseup outside of the dashboard => reject the deferred
                if( dfd.state() === 'pending' ) {
                    dfd.reject();
                }
                // cleanup listeners added for launching
                me.$el.off('mouseover', '.pane');
                me.$el.off('mouseout', '.pane');
            });

            // mouseup in dashboard
            this.$el.one('mouseup', '.pane', function (evt) {
                var $target = $(evt.target),
                    $currentTarget = $(evt.currentTarget);

                console.log('pane selected');
                
                $target.removeClass('over');
                $shims.addClass('hide');
                
                dfd.resolve( evt, $currentTarget.data('view') );
            })

            return dfd.promise();
        }

    });

    return Dashboard;

});
