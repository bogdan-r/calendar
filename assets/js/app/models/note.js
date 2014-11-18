App.Models.Note = Backbone.Model.extend({})

App.Collections.NoteCollection = Backbone.Collection.extend({
    model : App.Models.Note,
    url : '/api/notes'
})
