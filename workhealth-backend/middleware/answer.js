const db = require('../models');

const answerMiddleware = {};

answerMiddleware.findAll = async (options) => {
  return await db.sequelize.models.Answer.findAll({
    where: options,
    include:  [db.sequelize.models.Questionnaire]
  });
};

answerMiddleware.create = async (answers) => {
  return await db.sequelize.models.Answer.bulkCreate(answers);
};

module.exports = answerMiddleware;