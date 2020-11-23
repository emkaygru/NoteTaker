const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        // ====== API Routes ======

        //set up /api notes get route
        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

       
        //retrieves note with specific id
        app.get('/api/notes/:id', (req, res) => {
            // displays json index for notes array of iD 
            res.json(notes[req.params.id]);
        });

         // api post route 
         app.post('/api/notes', (req, res) => {
            // new note variable 
            // receives a new notes, adds it to the db.json and returns a new note 
            let newNote = req.body;
            // notes pushed to notes array 
            notes.push(newNote);

            fs.writeFile('./db/db.json', JSON.stringify(notes,'/t'), (err) => {
                if (err) throw err;
                res.json(notes);
            });

        });
        
        // deletes notes with specified id 
        app.delete('/api/notes/:id', (req, res) => {
            var id = req.params.id;

            for (i = 0; i < notes.length; i++) {
                if (id === notes[i].id) {
                    notes.splice(i, 1);
                };
            };
            fs.writeFile('./db/db.json', JSON.stringify(notes,'/t'), (err) => {
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