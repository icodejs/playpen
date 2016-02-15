const express = require('express');
const app = express();
const mongoose = require('mongoose');
const users = require('./mongoose/models/users');

mongoose.connect(process.env.MONGOLAB_URI);

app.set('port', (process.env.PORT || 5050));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send('hello playpen');
});

app.get('/mongoose', (req, res) => {
    var foo = new users({
        name: 'bill '
    });

    foo.save(err => {
        if (err) return res.status(500).send(err.stack);
        res.status(200).send('Succeeded');
    });
});

app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
});