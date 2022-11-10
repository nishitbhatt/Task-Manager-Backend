import mysql from 'mysql';
import dotenv from 'dotenv'

dotenv.config();
const connection = mysql.createConnection({
    // host: process.env.HOST,
    // user: process.env.USER,
    // password: process.env.PASSWORD,
    // database: process.env.DB_NAME

    host: process.env.PR_HOST,
    user: process.env.PR_USER,
    password: process.env.PR_PASSWORD,
    database: process.env.PR_DB_NAME
});

try {
    connection.connect(() => {
        console.log('hERE')
    })
} catch (error) {
    console.log('Can not connect to database', error)
}
export default connection