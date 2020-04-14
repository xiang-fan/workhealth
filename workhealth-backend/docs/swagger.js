const login = require('./login');
const questionnaire = require('./questionnaire');
const screeningHistory = require('./screeningHistory');
const user = require('./user');

const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    version: '1.0.0',
    title: 'APIs Document',
    description: 'your description here',
    termsOfService: '',
  },
  paths: {
    "/auth/login": {
      "get": login,
    },
    "/questionnaire": {
      "get": questionnaire.get,
      "post": questionnaire.post,
    },
    "/screeningHistory": {
      "get": screeningHistory.get,
    },
    "/screeningHistory/current": {
      "get": screeningHistory.getCurrent,
    },
    "/screeningHistory/answers/:id": {
      "get": screeningHistory.getAnswers,
    },
    "/users": {
      "get": user,
    },
   
  }
}

module.exports = swaggerDocument;