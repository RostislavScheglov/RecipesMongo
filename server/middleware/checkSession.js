import jwt from 'jsonwebtoken';
// eslint-disable-next-line import/no-anonymous-default-export
export default (req, res, next) =>{
    const token = req.headers.session
    if(token){
        try {
            const decoded = jwt.verify(token, 'a1b2c');
            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({message:'Bad session'})  
        }
    } else {
        return res.status(403).json({message:'Bad session'})
    }

}
