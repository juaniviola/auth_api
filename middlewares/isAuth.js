import { promisify } from 'util';
import jwt from 'jsonwebtoken';

const verify = promisify(jwt.verify);

const getTokenFromHeader = async (req, res, next) => {
  if (!req.headers.authorization || req.headers.authorization.split(' ')[0] !== 'Bearer'){
    return res.sendStatus(403);
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = await verify(token, process.env.SECRET || 'ZuP3r_Z3cR3t');

    if (!decodedToken || !decodedToken.data || !decodedToken.data._id) {
      return res.sendStatus(403);
    }

    req.tokenData = decodedToken;

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

export default getTokenFromHeader;
