// api.js
import  express  from 'express';
const router = express.Router();
import { verifyToken } from  '../../instant_sports/configs/authMiddleware.js';
import {ApiController} from '../../instant_sports/controllers/apicontroller.js';

router.post('/posts', verifyToken,(req, res) => {
  ApiController.getPosts(req, res);
});

export {router}; 
