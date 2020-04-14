const db = require('../models/');

const questionnaireMiddleware = {};

questionnaireMiddleware.findAll = async (attributes, options) => {
  return await db.sequelize.models.Questionnaire.findAll({ attributes, options });
};

questionnaireMiddleware.checkEquality = (firstSet, secondSet) => {
  return Object.entries(firstSet).toString() === Object.entries(secondSet).toString();
};

module.exports = questionnaireMiddleware;