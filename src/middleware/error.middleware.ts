import { Request, Response, NextFunction } from "express";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    let msg = err.message;
    if (msg.includes('request/body/')) {
        msg = msg.replaceAll('request/body/','');
    }
    res.status(err.status || 500).json({
        message: msg,
    });
}