import mongoose from 'mongoose'


const db_connect = () => {
    // Connecting to the database
    const { MONGO_DB_URL } = process.env;
    mongoose
        .connect(MONGO_DB_URL)
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