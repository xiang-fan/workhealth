const express = require('express');
const router = express.Router();

const userMiddleware = require('../middleware/user');
const { USER_ROLE } = require('../assets/constants');

router.get('/', async function (req, res, next) {
  if (!req.query.username) {
    res.status(400).send();
    return;
  }

  if (req.user.role !== USER_ROLE.ADMIN) {
    res.status(404).send();
    return;
  }

  const users = await userMiddleware.findAll({
    username: req.query.username
  });

  res.send({
    users
  });
});

module.exports = router;
