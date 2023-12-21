// api.js
import  express  from 'express';
const router = express.Router();
import { verifyToken } from  '../authMiddleware.js';
import {ApiController} from '../../web_server/controllers/apicontroller.js';

router.post('/posts', verifyToken,(req, res) => {
  ApiController.getPosts(req, res);
});

export {router}; 
