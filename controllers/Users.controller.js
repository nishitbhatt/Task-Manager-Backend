import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from "../models/index.js";
import { createUniqueSlug } from '../utils/unique-slug.js'


// Add New User
export const register = async (req, res) => {
    let status, message;
    try {
        // Get user input
        const { first_name, last_name, email, password, contact_no } = req.body;

        // Validate user input
        if (!(email && password && first_name && last_name && contact_no)) {
            status = 400
            message = `All field is required`
            return res.status(400).send({ status, message });
        }

        // check if user already exist
        const oldUser = await UserModel.findOne({ email });

        if (oldUser) {
            status = 409
            message = `User Already Exist. Please Login!`
            return res.status(400).send({ status, message });
        }

        //Encrypt user password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user slug
        const userslug = await createUniqueSlug()
        // Create user in our database
        const user = await UserModel.create({
            userslug,
            first_name,
            last_name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            contact_no,
            is_active: 1
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h",
            }
        );
        // save user token
        user.token = token;

        // return new user
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
    }
}


// Login User
export const login = async (req, res) => {
    let status, message;
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            status = 400
            message = `Username and password required!`
            return res.status(400).json({ status, message });
        }
        // Validate if user exist in our database
        const user = await UserModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const userToken = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = userToken
            // set user
            const cookieOptions = {
                path: "/",
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 20, // would expire after 2 hours
                httpOnly: true, // The cookie only accessible by the web server
            }
            res.cookie('x-access-token', userToken, cookieOptions)
            return res.status(200).json({ status: 200, user });
        }

        status = 400
        message = `Invalid Credentials`
        return res.status(400).json({ status, message });
    } catch (err) {
        console.log(err)
        status = 500
        message = `Error Occured!`
        return res.status(status).json({ status, message });
    }
}