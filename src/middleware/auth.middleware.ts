import jwt from "jsonwebtoken";
import User from "../models/user.model";
import logger from "../config/logger.config";
import { appConfig } from "../config/app.config";
import { Request, Response, NextFunction } from "express";

export class Auth {
    /**
     * authUser
     */
    public async authUser(req: Request, res: Response, next: NextFunction) {
        logger.info("Auth.authUser()");
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token){
                res.status(401).json({ message: "Authentication required" });
            } else {
                const decoded: any = jwt.verify(token, appConfig.tokenSecret);
                logger.info(`Decoded user: ${JSON.stringify(decoded)}`);
                const user = await User.findById(decoded.userId);
                if (!user){
                    throw new Error('User does not exist');
                } else {
                    req.body.user = user;
                    next();
                }
            }
        } catch (error) {
            logger.error(error);
            res.status(401).json({ message: "Authentication failed" });
        }
    }
}