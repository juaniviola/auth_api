import express from 'express';
import AuthService from '../auth_service/index.js';

const app = express.Router();

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) return res.sendStatus(403);

  const db = req.app.get('db');
  const auth = new AuthService();

  try {
    const signup = await auth.signup(name, email, password, db);

    res.json(signup);
  } catch (error) {
    res.sendStatus(500);
  }
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.sendStatus(403);

  const db = req.app.get('db');
  const auth = new AuthService();

  try {
    const signin = await auth.login(email, password, db);
    const { user, token } = signin;

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default app;
