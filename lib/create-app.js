const express = require('express');
// const mongoose = require('mongoose');
const createRoutes = require('./create-routes');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

module.exports = () => {
    // mongoose.connect(process.env.MONGOLAB_URI);
    app.set('port', (process.env.PORT || 5050));
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(bodyParser.json());

    createRoutes(app);

    app.listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'));
    });

    return app;
};
