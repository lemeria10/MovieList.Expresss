import express from 'express';
import { signup } from '../controllers/authController.js';
import { login } from '../controllers/authController.js';
import { logout } from '../controllers/authController.js';


const router = express.Router();
// Sample route for movies
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);



export default router;