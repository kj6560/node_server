// api.js
import  express  from 'express';
const router = express.Router();
import {ApiController} from '../../web_server/controllers/apicontroller.js';

router.get('/posts', (req, res) => {
  ApiController.getPosts(req, res);
});

export {router}; 
