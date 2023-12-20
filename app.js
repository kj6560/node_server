import express from 'express';
const app = express();
import { router } from '../web_server/routes/api.js';
import helmet from 'helmet';
app.use(helmet());
app.use(express.json());
app.disable('x-powered-by');


//app.set('view engine', 'ejs');

app.use('/api/v1', router);
//app.use('/',web);




const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
