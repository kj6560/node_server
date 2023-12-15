const express = require('express');
const app = express();
const api = require('./routes/api');
const web = require('./routes/web');
const helmet = require('helmet');

app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');


app.set('view engine', 'ejs');

app.use('/api/v1', api);
app.use('/',web);

const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
