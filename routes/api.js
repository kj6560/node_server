// api.js
import  express  from 'express';
const router = express.Router();
import { verifyToken } from  '../../web_server/configs/authMiddleware.js';
import {ApiController} from '../../web_server/controllers/apicontroller.js';

router.post('/posts', verifyToken,(req, res) => {
  ApiController.getPosts(req, res);
});

export {router}; 
