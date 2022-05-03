import * as argon from 'argon2';
import jwt from 'jsonwebtoken';

class AuthService {
  generateToken(user) {
    const data = {
      _id: user._id,
      email: user.email,
      name: user.name,
    };

    const key = process.env.SECRET || 'ZuP3r_Z3cR3t';
    const expiration = '3d';

    return jwt.sign({ data }, key, { expiresIn: expiration });
  }

  async signup(name, email, password, database) {
    try {
      const newRecord = await database.insertUser(name, email, password);

      if (!newRecord || !newRecord.insertedId) throw Error('error');

      return {
        name,
        email,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(email, password, database) {
    try {
      const userRecord = await database.findUser({ email });
      if (!userRecord) {
        throw new Error('user not found');
      }

      const correctPassword = await argon.verify(userRecord.password, password);
      if (!correctPassword) {
        throw new Error('invalid credentials');
      }

      return {
        user: {
          email: userRecord.email,
          name: userRecord.name,
        },
        token: this.generateToken(userRecord),
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AuthService;
