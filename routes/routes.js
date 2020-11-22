const fs = require('fs');
const path = require('path');

module.exports = app => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);

        app.get('/api/notes', (req, res) => {
            res.json(notes);
        });

        app.post('/api/notes', (req, res) => {
            let newNote = req.body;
            notes.push(newNote);
            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                res.json(notes);
            });

        });

        app.delete('/api/notes/:id', (req, res) => {
            var id = req.params.id;

            for (i = 0; i < notes.length; i++) {
                if (id === notes[i].id) {
                    notes.splice(i, 1);
                };
            };
            fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
                if (err) throw err;
                res.json(notes);
            });
        });

        // ====== View Routes ======

        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/notes.html'));
        });

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

    });
};