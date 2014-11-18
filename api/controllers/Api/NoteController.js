/**
 * Api/NoteController
 *
 * @description :: Server-side logic for managing api/notes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    index : function(req, res){
        Note.find().exec(function(err, notes){
            if(err) return res.badRequest();

            return res.json(notes)
        })
    },
    find : function(req, res){
        Note.findOne(req.param('id')).exec(function(err, note){
            if(err) return res.badRequest();

            return res.json(note)
        })
    },
    create : function(req, res){
        Note.create(req.allParams()).exec(function(err, note){
            if(err) return res.badRequest();

            return res.json(note)
        })
    },
    update : function(req, res){
        var params = req.allParams();
        var id = params.id;
        delete params.id;

        Note.update(id, params).exec(function(err, note){
            if(err) return res.badRequest();

            return res.json(note)
        })
    },
    destroy : function(req, res){
        Note.destroy(req.param('id')).exec(function(err){
            if(err) return res.badRequest();

            return res.json({done : true})
        })
    }
};

