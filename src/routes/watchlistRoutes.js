import express from 'express';
import { addToWatchlist } from '../controllers/watchlistController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes in this router

router.post('/', addToWatchlist);

// {{baseUrl}}/watchlist/:id
router.delete('/:id');



export default router;