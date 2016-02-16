const express = require('express');
const mongooseRoutes = require('../routes/mongodb');

module.exports = function (app) {
    app.use('/mongodb', mongooseRoutes);

    app.get('/', (req, res) => {
        res.send('hello playpen');
    });

    return app;
}