import express from 'express';
const web = express.Router();

import { SiteController } from '../../instant_sports/controllers/sitecontroller.js';
import { requireLogin } from  '../../instant_sports/configs/authMiddleware.js';

web.get('/', (req, res) => {
    SiteController.index(req, res);
});
web.get('/login', (req, res) => {
    SiteController.login(req, res);
});
web.post('/loginUser', (req, res) => {
    SiteController.loginUser(req, res);
});
web.get('/register', (req, res) => {
    SiteController.register(req, res);
});
web.post('/registerUser', (req, res) => {
    SiteController.registerUser(req, res);
});
web.get('/allUsers', requireLogin, (req, res) => {
    SiteController.getAllUsers(req, res);
});
// web.post('/uploadFile', upload.single('file'),(req, res) => {
//     SiteController.uploadFile(req, res);
// });

export { web }; 