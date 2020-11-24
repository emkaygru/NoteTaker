const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const notes = require("../db/db.json");

module.exports = app => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        // ====== API Routes ======

        //set up /api notes get route
        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

       
      
         // api post route 
         app.post('/api/notes', (req, res) => {
            req.body.id = uuidv4();
           
            // receives a new notes, adds it to the db.json and returns a new note 
            console.log(req.body);
            // notes pushed to notes array 
            notes.push(req.body);

            fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
                if (err) throw err;
                res.json(notes);
            });

        });

          //retrieves note with specific id
          app.get('/api/notes/:id', (req, res) => {
            // displays json index for notes array of iD 
            res.json(notes[req.params.id]);
        });

        // deletes notes with specified id 
        app.delete('/api/notes/:id', (req, res) => {
            var id = req.params.id;

            for(i=0;i < notes.length;i++) {
                if(id === notes[i].id){
                    notes.splice(i,1);
                }
            }
            fs.writeFile('./db/db.json', JSON.stringify(notes), err => {
                if (err) throw err;
                res.json(notes);
            });
        });

        // ====== View Routes ======
        // display notes.html when /notes is visited 
        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });
        // display index.html when all other routes are visited 
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

    });
};