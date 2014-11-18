if(!App.Views.Calendar) App.Views.Calendar = {};

App.Views.Calendar.CalendarCellView = Backbone.View.extend({

    tagName : 'td',
    className : 'b-calendar-table__cell',
    template : JST['assets/templates/calendar_cell.html'],
    addNoteFormTemplate : JST['assets/templates/add_note_form.html'],
    showNoteFormTemplate : JST['assets/templates/show_note_form.html'],
    editNoteFormTemplate : JST['assets/templates/edit_note_form.html'],

    events : {
        'click .js-new_note' : 'addNoteForm',
        'submit .js-add-note-form' : 'addNote',
        'click .js-show-note' : 'showNote',
        'click .js-edit-note' : 'editNoteForm',
        'submit .js-edit-note-form' : 'editNote',
        'click .js-destroy-note' : 'deleteNote',
        'click .js-note-form-close' : 'hideAdditionsHandler'
    },

    initialize : function(options){
        this.cellItem = options.cellItem
        this.model = this.cellItem.note
        if(!_.isUndefined(this.model)){
            this.listenTo(this.model, 'destroy', this.deleteSettingsNote);
            this.listenTo(this.model, 'change', this.rerenderCell);
        }
    },

    addNoteForm : function(e){
        e.preventDefault();
        this.hideAdditions();
        this.$('.b-calendar-table__cell__setting').hide();
        this.$('.js-note-additional').html(this.addNoteFormTemplate({
            date : this.cellItem.fullDate.format('YYYY-MM-DD')
        }))
    },

    addNote : function(e){
        e.preventDefault();
        var $inputs = $(e.target).find('[name]');
        var params = App.Util.parse_param($inputs);

        this.rootView.collection.create(params)
    },

    showNote : function(e){
        e.preventDefault();
        console.log(this.model.toJSON())
        this.$('.js-note-additional').html(this.showNoteFormTemplate(this.model.toJSON()))
    },

    editNoteForm : function(e){
        e.preventDefault();
        var params = this.model.toJSON();
        params.date = moment(params.date).format('YYYY-MM-DD')
        this.$('.js-note-additional').html(this.editNoteFormTemplate(params))
    },

    editNote : function(e){
        e.preventDefault();
        var $inputs = $(e.target).find('[name]');
        var params = App.Util.parse_param($inputs);
        this.model.save(params);
    },

    deleteNote : function(e){
        e.preventDefault();
        this.model.destroy();
    },

    deleteSettingsNote : function(){
        this.model = undefined;
        this.cellItem.note = undefined;
        this.render()
    },

    hideAdditionsHandler : function(e){
        e.preventDefault();
        this.hideAdditions();
    },

    hideAdditions : function(){
        $('.js-note-additional').html('');
        $('.b-calendar-table__cell__setting').show();
    },

    rerenderCell : function(){
        this.cellItem.note = this.model;
        this.render();
    },

    render : function(){
        this.$el.html(this.template(this.cellItem));
        if(!_.isUndefined(this.model)){
            new App.Views.Notes.NoteView({
                model : this.model,
                el : this.$('.js-note-item')
            }).render()
        }

        return this
    }
})