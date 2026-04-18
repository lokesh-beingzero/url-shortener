import jwt from 'jsonwebtoken';

export const privateRoute = (req, res, next) => {

    const jwtToken = req.cookies.jwt;

    if (!jwtToken) {
        console.log('JWT token not found in request');
        return res.status(403).json({ status: 'FORBIDDEN', message: 'Token not Found' });
    }

    try {
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = decoded;

        next();
    } catch (error) {
        console.error('Error in validating the token in privateRoute', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: 'FORBIDDEN', message: 'Token Expired' });
        }
        
        return res.status(401).json({ status: 'FORBIDDEN', message: 'Invalid Token' });
    }
}