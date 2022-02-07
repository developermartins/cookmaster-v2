const jwt = require('jsonwebtoken');
const model = require('../models/Users');

const secret = 'DevMartsSecret';

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'missing auth token' });

  try {
    const decoded = jwt.verify(token, secret);
    // console.log(decoded, '---validdatejwt')
    const user = await model.findByEmail(decoded.data.email);

    if (!user) {
      return res
        .status(401)
        .json({ message: 'jwt malformed' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};
