const express = require('express');
const router = express.Router();

const historyMiddleware = require('../middleware/screeningHistory');
const answerMiddleware = require('../middleware/answer');
const { USER_ROLE } = require('../assets/constants');

router.get('/', async function (req, res, next) {
  if (!req.query.pass && !req.query.userId) {
    res.status(400).send();
    return;
  }

  if (req.user.role !== USER_ROLE.ADMIN) {
    res.status(404).send();
    return;
  }

  const screeningHistory = await historyMiddleware.findAll({
    ...req.query.pass && { pass: req.query.pass },
    ...req.query.userId && { userId: req.query.userId },
  });

  res.send({
    screeningHistory,
  });
});

router.get('/answers/:id', async function (req, res, next) {
  if (!req.params.id) {
    res.status(400).send();
    return;
  }

  const history = await historyMiddleware.findOne(
    { id: req.params.id },
    false,
  );

  if (!history) {
    res.status(422).send();
    return;
  }

  const answers = await answerMiddleware.findAll({
    screeningHistoryId: req.params.id,
  });

  const questionnaire = answers.map(answer => ({
    id: answer.Questionnaire.id,
    question: answer.Questionnaire.question,
    expectedAnswer: answer.Questionnaire.answer,
    answer: answer.answer,
  }));

  res.send({
    id: history.id,
    pass: history.pass,
    status: history.status,
    createdAt: history.createdAt,
    questionnaire,
  });
});

router.get('/current', async function (req, res, next) {
  const screeningHistories = await historyMiddleware.findAll({
    userId: req.user.id,
  }, false);

  res.send({
    screeningHistories,
  });
});

module.exports = router;
