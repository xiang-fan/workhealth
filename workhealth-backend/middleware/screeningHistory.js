const db = require('../models/');

const historyMiddleware = {};

historyMiddleware.create = async (options) => {
  return await db.sequelize.models.ScreeningHistory.create(options);
};

historyMiddleware.findOne = async (options, isUserIncluded = true) => {
  return await db.sequelize.models.ScreeningHistory
    .findOne({
      where: options,
      ...isUserIncluded && {
        include: [{
          model: db.sequelize.models.User,
          attributes: ['id', 'username', 'role', 'personalId', 'createdAt', 'updatedAt'],
        }]
      },
    });
};

historyMiddleware.findAll = async (options, isUserIncluded = true) => {
  return await db.sequelize.models.ScreeningHistory
    .findAll({
      where: options,
      ... isUserIncluded && {
        include: [{
          model: db.sequelize.models.User,
          attributes: ['id', 'username', 'role', 'personalId', 'createdAt', 'updatedAt'],
        }],
        order: [
          ['createdAt', 'DESC'],
      ],
      },
    });
};

module.exports = historyMiddleware;