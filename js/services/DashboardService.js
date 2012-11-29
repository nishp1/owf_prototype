define([
    'views/panes/DesktopPane',
    'views/panes/FitPane',

    'jquery',
    'lodash'
],

function(DesktopPane, FitPane, $, _) {

    return {

        _createPane: function (config) {
            var pane, 
                options = {
                    widgets: config.widgets || []
                };

            if( config.paneType === 'fitpane' ) {
                pane = new FitPane(options);
            }
            else if( config.paneType === 'tabbedpane' ) {
                // ...
                pane = new FitPane(options);
            }
            else if( config.paneType === 'portalpane' ) {
                // ...
                pane = new FitPane(options);
            }
            else if( config.paneType === 'accordionpane' ) {
                // ...
                pane = new FitPane(options);
            }
            else {// if( config.paneType === 'desktoppane' ) {
                pane = new DesktopPane(options, 4, 5);
            }

            return pane.render();
        },

        _createHTML: function (config, $el) {
            var panes = config.panes;
            $el = $el || $('<div class="box">');
            $el.data('config', config);

            if( panes ) {
                $el.addClass('box');
                for(var i = 0, len = panes.length; i < len; i++) {
                    var paneConfig = panes[i],
                        $box;

                    if( paneConfig.box ) {
                        $box = $('<div class="box">').data( 'config', paneConfig.box );
                        this._createHTML( paneConfig.box, $box );
                        $el.append( $box );
                    }
                    else {
                        $el.append( this._createPane( paneConfig ).$el );
                    }
                }
            }
            else {
                $el.append( this._createPane( config ).$el );
            }

            return $el;
        },
    
        // _createHTML: function (config, $el) {
        //     var panes = config.panes;
        //     $el = $el || $('<div class="box dashboard">');
        //     $el.data('config', config);

        //     if( panes ) {
        //         for(var i = 0, len = panes.length; i < len; i++) {
        //             var paneConfig = panes[i],
        //                 $pane = $('<div>');

        //             $pane.addClass( paneConfig.box ? 'box' : 'pane' );
        //             $el.append( $pane );
        //             if( paneConfig.box ) {
        //                 $pane.data( 'config', paneConfig.box );
        //                 this._createHTML( paneConfig.box, $pane );
        //             }
        //         }
        //     }

        //     return $el;
        // },

        create: function (config, $el) {
            // old layout
            if(config.xtype) {
                config = this.upgrade( config );
            }

            var frag = this._createHTML( config, $el);
            return frag;
        },

        // {
        //  "panes": [
        //      {
        //          "collapsible":false,
        //          "box": {
        //              "panes":[
        //                  {
        //                      "collapsible":false
        //                  },
        //                  {
        //                      "collapsible":false
        //                  }
        //              ]
        //          }
        //      },
        //      {
        //          "collapsible":false
        //      }
        //  ],
        //  "orientation":"vertical"
        // }
        upgrade: function (config) {
            if(config.xtype === 'container') {

                if( config.layout.type === 'vbox' ) {
                    config.orientation = 'vertical';
                }
                config.panes = [config.items[0], config.items[2]];
                
            }

            if(config.flex) {
                config.size = ( (config.flex * 100) + '%');
            }
            else if(config.width) {
                config.size = config.width;
            }
            else if(config.height) {
                config.size = config.height;
            }

            if(config.size === '100%')
                delete config.size;

            delete config.flex;
            delete config.width;
            delete config.height;
            delete config.items;
            delete config.layout;
            delete config.cls;
            delete config.xtype;

            var panes = config.panes,
                pane;

            if(panes && panes.length > 0) {
                for (var i = panes.length - 1; i >= 0; i--) {
                    pane = panes[i];

                    if(pane.items && pane.items.length > 0) {
                        panes[i] = {
                            collapsible: false,
                            box: pane
                        };
                        this.upgrade( panes[i].box );
                    }
                    else {
                        panes[i] = this.upgrade( panes[i] );
                    }

                    panes[i].collapsible = false;
                }
            }

            return config;
        }

    };


});
