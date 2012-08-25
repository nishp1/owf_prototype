OWF.View.Window = OWF.View.Panel.extend({

    className: 'widget window',

    minimize: function() {
        console.log('minimize');
    },

    toggleMaximize: function(evt) {
        var container = this.options.container,
            offset = this.options.container.offset(),
            $el = this.$el,
            elOffset = $el.offset();

        if(this.maximized) {
            this.restoreSize && this.$el.css(this.restoreSize);
            
            this.maximized = false;
            $(evt.target).removeClass('icon-resize-small').addClass('icon-resize-full');
            $(evt.currentTarget).attr('title', 'maximize');
            delete this.restoreSize;
        }
        else {
            this.restoreSize = {
                width: $el.width(),
                height: $el.height(),
                top: elOffset.top + 'px',
                left: elOffset.left + 'px'
            };
            
            this.$el.css({
                width: container.width(),
                height: container.height(),
                top: offset.top + 'px',
                left: offset.left + 'px'
            });

            $(evt.target).removeClass('icon-resize-full').addClass('icon-resize-small');
            $(evt.currentTarget).attr('title', 'restore');

            this.maximized = true;
        }
    },

    attributes: function() {
        var offset = this.options.container.offset();
        return {
            'style': 'left:' + offset.left + 'px;top:' + offset.top+ 'px;'
        };
    }

});