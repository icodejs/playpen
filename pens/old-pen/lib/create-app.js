import express from 'express';
// import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import createRoutes from './create-routes';

const app = express();

export default () => {
  const { env } = process;

  // mongoose.connect(process.env.MONGOLAB_URI);
  app.set('port', env.PORT || 5050);
  app.use(express.static(path.join(__dirname, '../public')));
  app.use(bodyParser.json());

  createRoutes(app);

  app.listen(app.get('port'), () => {
    console.log('Node app is running on port', app.get('port'));
  });

  return app;
};
