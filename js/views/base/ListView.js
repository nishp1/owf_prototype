define([
    'app',

    // Libraries.
    'jquery',

    'bootstrap/bootstrap-modal'
],

function(app, $) {

    var ListView = Backbone.View.extend({

        // backbone view for a list item
        listItemView: null,

        initialize: function() {
            // listen to collection's events
            this.collection.bind('add', this.addOne, this);
            this.collection.bind('reset', this.addAll, this);

            // bind all functions content to this view
            _.bindAll(this);
        },

        render: function () {
            this.addAll();
            return this;
        },

        addOne: function(item) {
            var view = new this.listItemView({ model: item });
            this.$el.append(view.render().el);
        },

        addAll: function() {
            var frag = document.createDocumentFragment(),
                listItemView = this.listItemView;

            this.collection.each(function(item) {
                var view = new listItemView({ model: item });
                frag.appendChild(view.render().el);
            });

            this.$el.append(frag);
        }
    });

    return ListView;
});
