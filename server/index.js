const express = require('express');
const bodyParser = require('body-parser');
const assetsRoutes = require('./routes/assetsRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', assetsRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
