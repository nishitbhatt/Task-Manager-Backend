import jwt from "jsonwebtoken"

const config = process.env;

const verifyToken = (req, res, next) => {
    let status, message;
    const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies['x-access-token'];

    if (!token) {
        status = 403
        message = `A token is required for authentication`
        return res.status(status).send({ status, message });
    }
    try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
    } catch (err) {
        status = 401
        message = `Invalid Token`
        return res.status(status).send({ status, message });
    }
    return next();
};

export default verifyToken;