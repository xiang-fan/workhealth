var express = require('express');
var router = express.Router();

router.get('/login', function (req, res, next) {
  res.status(200).send({
    userRole: req.user.role,
    username: req.user.username,
    personalId: req.user.personalId,
  });
});

module.exports = router;
