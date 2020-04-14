'use strict';

module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    screeningHistoryId: DataTypes.INTEGER,
    questionnaireId: DataTypes.INTEGER,
    answer: DataTypes.BOOLEAN,
  }, {});
  Answer.associate = function(models) {
    Answer.belongsTo(models.ScreeningHistory, {foreignKey: 'screeningHistoryId'});
    Answer.belongsTo(models.Questionnaire, {foreignKey: 'questionnaireId'});
  };
  return Answer;
};