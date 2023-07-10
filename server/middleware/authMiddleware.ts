import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretkey = process.env.SECRET_KEY ?? "";

interface DecodedRequest extends Request {
    decoded?: string | JwtPayload | undefined;
}

export const authMiddleware = (req: DecodedRequest, res: Response, next: NextFunction): void => {
    let token = '';
    if(req.headers.authorization && req.headers.authorization.startsWith(' ')) {
        token = req.headers.authorization.split(' ')[1];
    } else {
        return next('token not found')
    }

    jwt.verify(token, secretkey, function(err, decoded) {
        if(err) {
            next(new Error(err.message))
        } else {
            req.decoded = decoded;
            next();
        }
    })
};
