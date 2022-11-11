import mongoose from 'mongoose'


const db_connect = () => {
    // Connecting to the database
    const { MEDIUM, MONGO_URI, LIVE_MONGO_URI } = process.env;

    let DB_MONGO_URL = (MEDIUM == 'PROD') ? LIVE_MONGO_URI : MONGO_URI

    mongoose
        .connect(DB_MONGO_URL)
        .then(() => {
            console.log('Successfully connected to database');
        })
        .catch((error) => {
            console.log('database connection failed. exiting now...');
            console.error(error);
            process.exit(1);
        });
};

export default db_connect