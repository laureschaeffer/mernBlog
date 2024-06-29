import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

// route signup and call the function
router.post('/signup', signup);

export default router;