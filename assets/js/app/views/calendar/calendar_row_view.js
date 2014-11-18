if(!App.Views.Calendar) App.Views.Calendar = {};

App.Views.Calendar.CalendarRowView = Backbone.View.extend({

    tagName : 'tr',

    initialize : function(options){
        this.rowItems = options.rowItems
    },

    render : function(){
        _.each(this.rowItems, function(item){
            var cell = new App.Views.Calendar.CalendarCellView({
                cellItem : item
            });
            cell.parentView = this;
            cell.rootView = this.rootView;
            this.$el.append(cell.render().el)
        }, this)

        return this
    }
})