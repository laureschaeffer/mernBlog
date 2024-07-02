import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';

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


// export const signup = async (req, res) => {
//     console.log(req.body)
// }