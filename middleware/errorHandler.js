const handleError = (err, req, res, next) => {
    if (err) {
        console.log('error::::::', err);
        return res.status(500).send({ error: 'Something failed!', detail: err })
    }
    next();
};

export default handleError;