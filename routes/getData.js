import express from 'express';
import isAuth from '../middlewares/isAuth.js';
import attachUser from '../middlewares/attachCurrentUser.js';

const app = express.Router();

app.get('/items', isAuth, attachUser, (req, res) => {
  const user = req.currentUser;

  res.json({
    user,
    items: ['item1', 'item2', 'item3', 'item4'],
  })
});

export default app;
