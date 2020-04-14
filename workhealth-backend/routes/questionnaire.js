var express = require('express');
var router = express.Router();

const questionnaireMiddleware = require('../middleware/questionnaire');
const historyMiddleware = require('../middleware/screeningHistory');
const answerMiddleware = require('../middleware/answer');

const { SCREENING_HISTORY_STATUS } = require('../assets/constants');

router.get('/', async function (req, res, next) {
  const questionnaires = await questionnaireMiddleware.findAll({
    attributes: ['id', 'question', 'imageUrl']
  });

  res.status(200).send({
    questionnaires: questionnaires,
  });
});

router.post('/', async function (req, res, next) {
  let questionnaires = await questionnaireMiddleware.findAll({
    attributes: ['id', 'answer']
  });

  questionnaires = questionnaires.reduce((obj, item) => {
    obj[item.id] = item.answer
    return obj
  }, {});

  const isSuccesful = questionnaireMiddleware.checkEquality(
    questionnaires,
    req.body,
  );

  const screeningHistory = {};
  if (!isSuccesful) {
    screeningHistory.status = SCREENING_HISTORY_STATUS.FAILED;
  } else {
    screeningHistory.status = SCREENING_HISTORY_STATUS.PASSED;
    screeningHistory.pass = Math.floor(Math.random() * (99999 - 10000) + 10000);
  }

  const history = await historyMiddleware.create({
    userId: req.user.id,
    ...screeningHistory
  });

  const answers = Object.keys(req.body).map((key) => ({
    screeningHistoryId: history.id,
    questionnaireId: parseInt(key),
    answer: req.body[key],
  }));

  await answerMiddleware.create(answers);

  res.send({
    id: history.id,
    ...screeningHistory,
  });
});

module.exports = router;
