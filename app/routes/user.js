import express from 'express'
import crypto from 'crypto'
import connection from '../connection.js'
import { createUniqueSlug } from '../utils/unique-slug.js'
const userRoutes = express.Router()


// Create New User
userRoutes.post('/create', (req, res) => {

    let status, message, data;

    const { firstname, lastname, email, password, contactno } = req.body

    if (firstname && lastname && email && password && contactno) {

        // Create Slug
        const slug = createUniqueSlug()

        // Create MD5 Hash
        const passwordhash = crypto.createHash('md5').update(password).digest('hex');
        // Insert User
        connection.query(`INSERT INTO users (userslug, firstname, lastname, email, password, contactno, isactive ) 
            VALUES ('${slug}', '${firstname}', '${lastname}', '${email}', '${passwordhash}', '${contactno}', 1)`, function (error, results, fields) {

            if (error) {
                status = 500
                message = error
                return res.status(status).json({ status, message })
            };
            if (results) {
                status = 200
                message = 'User Added Successfully!'
                data = results
                return res.status(status).json({ status, message, data })
            }
        });
    } else {
        // Not All Fields Given
        status = 404
        message = 'Please fill up all required fields!'
        return res.status(status).json({ status, message });
    }


})


// Authenticate User
userRoutes.post('/authenticate', (req, res) => {
    let status, message, data;

    const { username, password } = req.body
    console.log({ username, password } );
    if (username && password) {

        // Create MD5 Hash
        const passwordhash = crypto.createHash('md5').update(password).digest('hex');

        connection.query(`SELECT userslug FROM users WHERE email='${username}' AND password='${passwordhash}'`, function (error, results, fields) {
            if (error) {
                status = 500
                message = error
                data = []
                return res.status(status).json({ status, message, data })
            };
            if (results) {
                if(results.length) {
                    status = 200
                    data = results
                    return res.status(status).json({ status, data })
                } else {
                    status = 404
                    data = results
                    message = `*Username/password is wrong!`
                    return res.status(status).json({ status, message, data })
                }
            }
        })
    } else {
        // Not All Fields Given
        status = 404
        message = `*Username/password is wrong!`
        return res.status(status).json({ status, message });
    }

})


userRoutes.get('/', (req, res) => {
    return res.json({ data: "USER User API Index QQQQQQQQQQQ123123" })
})

userRoutes.get('/test', (req, res) => {
    return res.json({ key: "USER Test API 12312312312 TTTT" })
})
export default userRoutes
