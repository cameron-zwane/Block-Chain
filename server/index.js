import express from 'express';
import bodyParser from 'body-parser';
import { router } from './routes/assetsRoutes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
