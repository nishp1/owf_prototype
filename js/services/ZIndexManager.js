define([
    'jquery',
    'lodash'
],

function( $, _ ) {

    if (!Date.now) {
        Date.now = function now() {
            return +(new Date);
        };
    }
    
    var ZBASE = 10000,
        IDSTR = '_zIndexManager-id',
        ACTIVATED = 'activated',
        DEACTIVATED = 'deactivated';

    function ZIndexManager () {

        var me = this;
        
        this.zBase = ZBASE;
        this.front = null;

        this._elClassName = 'z-index-managed-' + this.zBase;

        var me = this;
        $(document).on('mousedown', '.' + this._elClassName, function (evt) {
            me.bringToFront( $(evt.currentTarget) );
        });

        ZBASE *= 2;
    }

    ZIndexManager.prototype._setZindex = function($el) {
        $el.css('z-index', this.zBase);
        this.zBase += 4;
    };

    ZIndexManager.prototype.register = function(view) {
        view.$el.addClass(this._elClassName);
        this.bringToFront(view.$el);
    };

    ZIndexManager.prototype.unregister = function(view) {
        view.$el.removeClass(this._elClassName);
    };

    ZIndexManager.prototype.bringToFront = function($el) {
        var oldFront = this.front;

        if(oldFront) {
            if(oldFront[0] === $el[0]) {
                return;
            }
            else {
                oldFront.removeClass('active').trigger(DEACTIVATED);
            }
        }

        this.front = $el.addClass('active');
        this.front.trigger(ACTIVATED);

        this._setZindex(this.front);
    };

    return ZIndexManager;

});
