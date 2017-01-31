// const mongooseRoutes = require('../routes/mongodb');
const bankroll = require('../lib/bankroll');

module.exports = (app) => {
    // app.use('/mongodb', mongooseRoutes);

    app.get('/', (req, res) => {
        res.send('hello playpen');
    });

    app.post('/bankroll', (req, res) => {
        res.json(bankroll(req.body));
    });

    return app;
};
