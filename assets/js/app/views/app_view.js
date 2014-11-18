App.Views.AppView = Backbone.View.extend({

    el : "#App",

    events : {
        'submit #addNotesForm' : 'addNote'
    },

    initialize : function(){
        this.notes = new App.Collections.NoteCollection();
        this.calendarView = new App.Views.Calendar.CalendarView({
            el : '#calendar',
            collection : this.notes
        })

        this.notes.fetch({reset : true})
    },

    addNote : function(e){
        e.preventDefault();
        var self = this;
        var $form = $(e.target);
        var requiredFields = this.checkRequiredFields($form);

        $form.find('.has-error').removeClass('has-error');
        if(requiredFields.length){
            requiredFields.eq(0).focus();
            requiredFields.closest('.form-group').addClass('has-error');
            return false
        }

        var $inputs = $form.find('[name]');
        var params = App.Util.parse_param($inputs);

        if(params.date !== ''){
            params.date = moment(params.date, 'DD-MM-YYYY').format('YYYY-MM-DD')
            var existNote = this.notes.find(function(item){
                if(moment(item.get('date')).format('YYYY-MM-DD') == params.date){
                    return true
                }
            });

            if(_.isUndefined(existNote)){
                this.notes.create(params, {
                    success : function(){
                        self.clearInputs($inputs);
                    }
                })
            }else{
                existNote.save(params, {
                    success : function(){
                        self.clearInputs($inputs);
                    }
                })
            }
        }


    },

    clearInputs : function(inputs){
        inputs.val('')
    },

    checkRequiredFields : function($form){
        var $fields = $([])
        $form.find('[required]').each(function(){
            var $this = $(this)
            if($.trim($this.val()) == ''){
                $fields = $fields.add(this)
            }
        })
        return $fields
    }
})
