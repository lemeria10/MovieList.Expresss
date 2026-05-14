import jwt from 'jsonwebtoken';
import {prisma}  from '../config/db.js';
import e from 'express';

//read the toekn from the request
// verify the token
// if valid, attach the user info to the request object and call next()
// if invalid, return a 401 Unauthorized response
const authMiddleware = async (req, res, next) => {
    console.log("Auth middleware called");
    next();
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];// Extract the token from the "Bearer <token>" format
    }
    else if (req.cookies?.jwt) {
        token = req.cookies.jwt; // Extract the token from cookies if available
    }
    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        // Verify the token and decode the user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const user = await prisma.user.findUnique({
            where: {
                id: decoded.userId,
            },
        });
        if (!user) {
            return res.status(401).json({ error: 'user no longer exists' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token, authorization denied' });
    }

};

export { authMiddleware };