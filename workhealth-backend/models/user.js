'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    personalId: DataTypes.STRING,
    ldapId: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'user']
    },
  }, {});
  User.associate = function (models) {
    User.hasMany(models.ScreeningHistory, { foreignKey: 'userId' })
  };
  return User;
};