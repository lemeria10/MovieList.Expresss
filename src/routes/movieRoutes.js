import express from 'express';

const router = express.Router();
// Sample route for movies
router.get('/', (req, res) => {
  res.send('{ "message": "Welcome to the Movie API!" }');
});



export default router;