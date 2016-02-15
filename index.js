const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + process.env.MONGOLAB_URI + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + process.env.MONGOLAB_URI);
  }
});

app.set('port', (process.env.PORT || 5050));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('hello playpen');
});

app.get('/mongoose', (req, res) => {
    res.status(200).send('mongoose');
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});