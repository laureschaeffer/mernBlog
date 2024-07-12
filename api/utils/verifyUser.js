// function that check if the user is logged in

import jwt from "jsonwebtoken";
import {errorHandler} from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;

    if(!token){
        return next(errorHandler(401, 'Unauthorized'));
    }
    //verify token : give an error or the user data
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) {
           return next(errorHandler(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    })
}