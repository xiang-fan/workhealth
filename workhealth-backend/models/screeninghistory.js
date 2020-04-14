'use strict';

module.exports = (sequelize, DataTypes) => {
  const ScreeningHistory = sequelize.define('ScreeningHistory', {
    pass: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['passed', 'failed']
    },
  }, {});
  ScreeningHistory.associate = function (models) {
    ScreeningHistory.belongsTo(models.User, {foreignKey: 'userId'});
    ScreeningHistory.hasMany(models.Answer, { foreignKey: 'screeningHistoryId' });
  };
  return ScreeningHistory;
};