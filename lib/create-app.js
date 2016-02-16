const express = require('express');
const mongoose = require('mongoose');
const createRoutes = require('./create-routes');
const app = express();

module.exports = function () {
    mongoose.connect(process.env.MONGOLAB_URI);

    app.set('port', (process.env.PORT || 5050));
    app.use(express.static(__dirname + '/public'));

    createRoutes(app);

    app.listen(app.get('port'), () => {
        console.log('Node app is running on port', app.get('port'));
    });

    return app;
}