'use strict';

module.exports = (sequelize, DataTypes) => {
  const Questionnaire = sequelize.define('Questionnaire', {
    question: DataTypes.STRING,
    answer: DataTypes.BOOLEAN,
    imageUrl: DataTypes.STRING,
  }, {});
  Questionnaire.associate = function(models) {
    Questionnaire.hasMany(models.Answer, { foreignKey: 'questionnaireId' });
  };
  return Questionnaire;
};