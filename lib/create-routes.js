const mongooseRoutes = require('../routes/mongodb');

module.exports = (app) => {
    app.use('/mongodb', mongooseRoutes);

    app.get('/', (req, res) => {
        res.send('hello playpen');
    });

    return app;
};
