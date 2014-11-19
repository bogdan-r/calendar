if(!App.Views.Calendar) App.Views.Calendar = {};

App.Views.Calendar.CalendarView = Backbone.View.extend({

    events : {
        'click .js-prev-month' : 'goToPrevMonth',
        'click .js-next-month' : 'goToNextMonth',
        'click .js-today' : 'goToToday'
    },

    initialize : function(){
        this.COUNT_RENDER_DAYS = 42;
        this.currentDate = new Date();
        this.dates = [];

        this.$calendarCurrentDate = this.$('.js-calendar__current-date');
        this.$calendarBody = this.$('.js-calendar-table-body');

        this.listenTo(this.collection, 'add', this.addNote);
        this.listenTo(this.collection, 'reset', this.buildCalendar);

        this.setDateInfo(this.currentDate);
    },

    setDateInfo : function(date){
        this.currentMomentDate = moment(date);
        this.selectedDateMonth = this.currentMomentDate.format('MM');
        this.selectedDateYear = this.currentMomentDate.format('YYYY');
        this.prevMonthMomentDate = moment(date).subtract(1, 'month')
        this.nextMonthMomentDate = moment(date).add(1, 'month')
    },

    buildDates : function(){
        var firstOfSelectedMonth = moment(['01', this.selectedDateMonth, this.selectedDateYear].join('-'), 'DD-MM-YYYY');
        var daysInSelectedMonth = this.currentMomentDate.daysInMonth();
        var daysBeforeSelectedMonth = firstOfSelectedMonth.day() - 1;
        daysBeforeSelectedMonth = daysBeforeSelectedMonth < 0 ? 6 : daysBeforeSelectedMonth;

        var firstDayBeforeCurrentMonth = parseInt(
            moment(firstOfSelectedMonth)
                .subtract(daysBeforeSelectedMonth, 'days')
                .format('DD')
            , 10);

        var params = {};
        var momentDate = null;
        this.dates = [];

        for(var i = 0; i < this.COUNT_RENDER_DAYS; i++){
            if(i < daysBeforeSelectedMonth){
                momentDate = moment(
                    [firstDayBeforeCurrentMonth + i, this.prevMonthMomentDate.format('MM-YYYY')].join('-'),
                    'DD-MM-YYYY'
                );
                params = this.getParamsForBuildDates(momentDate, false);
            }else if(i < daysBeforeSelectedMonth + daysInSelectedMonth){
                momentDate = moment(
                    [i - daysBeforeSelectedMonth + 1, this.selectedDateMonth, this.selectedDateYear].join('-'),
                    'DD-MM-YYYY'
                );
                params = this.getParamsForBuildDates(momentDate, true);
            }else{
                momentDate = moment(
                    [i - daysInSelectedMonth - daysBeforeSelectedMonth + 1, this.nextMonthMomentDate.format('MM-YYYY')].join('-'),
                    'DD-MM-YYYY'
                );
                params = this.getParamsForBuildDates(momentDate, false);
            }
            this.dates.push(params)
        }
    },

    buildCalendar : function(){
        this.buildDates();
        this.render();
    },

    findNote : function(date){
        return this.collection.find(function(item){
            if(moment(item.get('date')).format('DD-MM-YYYY') == date){
                return true
            }
        })
    },

    addNote : function(note){
        this.setDateInfo(note.get('date'));
        this.buildCalendar()
    },

    goTo : function(date){
        this.setDateInfo(date);
        this.buildCalendar();
    },

    goToPrevMonth : function(e){
        e.preventDefault();
        this.goTo(this.currentMomentDate.subtract(1, 'month').toDate());
    },

    goToNextMonth : function(e){
        e.preventDefault();
        this.goTo(this.currentMomentDate.add(1, 'month').toDate())
    },

    goToToday : function(e){
        e.preventDefault();
        this.goTo(this.currentDate)
    },

    getParamsForBuildDates : function(date, isCurrentMonth){
        return {
            day : date.format('D'),
            fullDate : date,
            currentMonth : isCurrentMonth,
            isToday : date.format('DD-MM-YYYY') == moment(this.currentDate).format('DD-MM-YYYY'),
            note : this.findNote(date.format('DD-MM-YYYY'))
        }
    },

    render : function(){
        var splitDates = App.Util.splitApart(this.dates, 7);
        this.$calendarCurrentDate.html(this.currentMomentDate.format('MMMM') + ', ' + this.selectedDateYear)
        this.$calendarBody.html('');

        _.each(splitDates, function(rowItems){
            var row = new App.Views.Calendar.CalendarRowView({
                rowItems : rowItems
            })
            row.rootView = this
            this.$calendarBody.append(row.render().el)
        }, this)

        return this
    }
})