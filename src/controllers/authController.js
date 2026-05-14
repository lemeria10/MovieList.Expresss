import { prisma } from '../config/db.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';

const signup=async (req, res) => {
    const { name,email, password } = req.body;
    //check if user already exists
    const userExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }
    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //create the user
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    });
    //generate jwt token
    const token = generateToken(user.id, res);

    res.status(201).json({ message: 'User created successfully',
         user: {
            id: user.id,
            name: name,
            email: email,
        },
            token
    });
};

const login=async (req, res) => {
    const { email, password } = req.body;

    //check if user email exists
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }
    //generate jwt token
    const token = generateToken(user.id, res);
    
    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email }, token });
};

const logout = (req, res) => {
    res.clearCookie('jwt',"", {
        httpOnly: true,
        expires: new Date(0) // Set the cookie to expire in the past
    });
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    });
};



export { signup, login, logout };
