const express = require('express');
const mongooseRoutes = require('../routes/mongoose');

module.exports = function (app) {
    app.use('/mongoose', mongooseRoutes);

    app.get('/', (req, res) => {
        res.send('hello playpen');
    });

    return app;
}