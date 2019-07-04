// const mongooseRoutes = require('../routes/mongodb');
const bankroll = require('../lib/bankroll');
const video = require('../lib/video');

module.exports = app => {
  // app.use('/mongodb', mongooseRoutes);

  app.get('/', (req, res) => {
    res.send('hello playpen');
  });

  app.post('/bankroll', (req, res) => {
    res.json(bankroll(req.body));
  });

  app.get('/video', (req, res) => {
    video(base64Image => {
      res.send(base64Image);
    });
  });

  return app;
};
