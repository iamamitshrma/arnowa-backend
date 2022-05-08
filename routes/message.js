import express from 'express';
import { getMessage, postMessage } from '../controllers/messages.js';

const router = express.Router();

router.post('/postMessage', postMessage);
router.get('/allMessage', getMessage);

export default router;