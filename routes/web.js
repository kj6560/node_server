import  express  from 'express';
const web = express.Router();

import {SiteController} from '../../instant_sports/controllers/sitecontroller.js';

web.get('/', (req, res) => {
    SiteController.index(req, res);
});
// web.post('/uploadFile', upload.single('file'),(req, res) => {
//     SiteController.uploadFile(req, res);
// });

export {web}; 