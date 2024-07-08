import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import {errorHandler} from '../utils/error.js';
import jwt from 'jsonwebtoken';

//async since the response will take time, we need to wait and then resend it
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body

    //prevent errors or empty field
    if(!username || !email || !password || username === '' || email ==='' || password === ''){
        // return res.status(400).json({ message: 'All fields are required' });
        next(errorHandler(400, 'All fields are required'));
    }

    //hash the password
    const hashedPassword = bcryptjs.hashSync(password, 10) //10 is the number of rounds for salt

    const newUser = new  User({
        //only writting username equals to username: username when both are the same string
        username,
        email,
        password: hashedPassword
    });

    try{
        //save the new User inside  db
        await newUser.save();
        //create a response
        res.json('Signup successful');

    } catch(error){
       next(error);
    }

}

export const signin = async(req, res, next) => {
    const { email, password} = req.body; //get the info from form

    if(!email || !password || email === '' || password === ''){
        next(errorHandler(400, 'All fields are required'));
    }

    try {
        const validUser = await User.findOne({ email });

        //if the user doesn't exist
        if(!validUser){
            return next(errorHandler(404, 'Invalid credentials'));
        }

        //compare password get from the form and the one from the database
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword){
            return next(errorHandler(404, 'Invalid credentials'));
        }

        //--------------if everything's correct-------
        const token = jwt.sign(
            { id: validUser._id  }, process.env.JWT_SECRET
        );

        //hide the password to the json response for security
        const {password: pass, ...rest} = validUser._doc;
        res
        .status(200)
        .cookie('access_token', token, {
            httpOnly: true
        })
        .json(rest)

        
    } catch (error) {
        next(error);
        
    }
}

// export const signup = async (req, res) => {
//     console.log(req.body)
// }