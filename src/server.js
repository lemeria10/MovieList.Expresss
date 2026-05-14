import express from 'express';
import {config}  from 'dotenv';
import {connectToDatabase, disconnectFromDatabase} from './config/db.js';

import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
    
config(); // Load environment variables from .env file
connectToDatabase(); // Connect to the database before starting the server
const app = express();

//body parsing  middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/watchlist', watchlistRoutes);



const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle uncaught expections and unhandled promise rejections to ensure the database connection is closed properly
process.on('uncaughtException', async (err) => {
    console.error('Uncaught Exception:', err);
    await disconnectFromDatabase();
    process.exit(1); // Exit the process with an error code
});
// Handle graceful shutdown on SIGINT and SIGTERM signals
process.on('SIGINT', async () => {
    console.log('Received SIGINT. Shutting down gracefully...');
    Server.close(async () => {
        await disconnectFromDatabase();
        console.log('Server closed. Database connection closed. Exiting process.');
        process.exit(0); // Exit the process with a success code
    });
});
// Handle graceful shutdown on SIGTERM signal (e.g., when running in a containerized environment)
process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Shutting down gracefully...');
    Server.close(async () => {
        await disconnectFromDatabase();
        console.log('Server closed. Database connection closed. Exiting process.');
        process.exit(0); // Exit the process with a success code
    });
});
// Handle unhandled promise rejections to ensure the database connection is closed properly
process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    await disconnectFromDatabase();
    process.exit(1); // Exit the process with an error code
});
