import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import logger from "../config/logger.config";
import { Request, Response } from "express";
import { appConfig } from '../config/app.config';

export class UserController {

    /**
     * loginUser
     */
    public async loginUser(req: Request, res: Response) {
        logger.info("UserController.loginUser()");
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ email });

            if (!user) {
                res.status(404).json({ message: 'User is not found' });
            } else {
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    res.status(400).json({ message: 'Invalid credentials' });
                } else {
                    const token = jwt.sign({ userId: user._id }, appConfig.tokenSecret, { expiresIn: '1h' });
                    res.status(200).json({ accessToken: token, expiresIn: 3600 });
                }
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }

    /**
     * registerUser
     */
    public async registerUser(req: Request, res: Response) {
        logger.info("UserController.registerUser()");
        const { email, password } = req.body;
        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                res.status(400).json({ message: 'User is already exists' });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({ email, password: hashedPassword, creationDate: Date.now() });
                await newUser.save();
                res.status(201).json({ message: 'User has been registered' });
            }
        } catch (error) {
            logger.error(error);
            res.status(500).json({ message: 'Something went wrong' });
        }
    }
}