const db = require('../models/');
const { USER_ROLE } = require('../assets/constants');

const Sequelize = db.Sequelize;

const userMiddleware = {};

userMiddleware.findOne = async (options) => {
  return await db.sequelize.models.User.findOne({
    attributes: ['id', 'username', 'role', 'personalId'],
    where: options,
  });
};

userMiddleware.findAll = async (options) => {
  return await db.sequelize.models.User.findAll({
    attributes: ['id', 'username', 'role', 'personalId', 'createdAt', 'updatedAt'],
    where: {
      [Sequelize.Op.and]: [
        { role: USER_ROLE.USER },
        Sequelize.where(
          Sequelize.fn('lower', Sequelize.col('username')),
          {
            [db.Sequelize.Op.like]: `%${options.username}%`
          }
        ),
      ]
    },

  });
};

module.exports = userMiddleware;