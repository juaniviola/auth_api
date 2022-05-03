export default async (req, res, next) => {
  const decodedTokenData = req.tokenData;
  if (!decodedTokenData || !decodedTokenData.data || !decodedTokenData.data._id) {
    return res.sendStatus(403);
  }

  try {
    const db = req.app.get('db');
    const userRecord = await db.findUser({ email: decodedTokenData.data.email });

    if (!userRecord) {
      return res.sendStatus(404);
    }

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};
