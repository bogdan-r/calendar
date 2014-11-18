if(!App.Views.Notes) App.Views.Notes = {};

App.Views.Notes.NoteView = Backbone.View.extend({

    template : JST['assets/templates/note_item.html'],

    initialize : function(){
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render : function(){
        this.$el.html(this.template(this.model.toJSON()));

        return this
    }
})