'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Questionnaires', [{
      question: 'Fever above 37.8C/100F in armpit or forehead?',
      answer: false,
      imageUrl: '/images/1.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Dry cough?',
      answer: false,
      imageUrl: '/images/2.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Fatigue (feeling extra tired)?',
      answer: false,
      imageUrl: '/images/3.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'No appetite?',
      answer: false,
      imageUrl: '/images/4.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Breathing difficulty?',
      answer: false,
      imageUrl: '/images/5.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Sputum (spitting or coughing lung mucus)?',
      answer: false,
      imageUrl: '/images/6.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Muscle or bone pain?',
      answer: false,
      imageUrl: '/images/7.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Sore throat?',
      answer: false,
      imageUrl: '/images/8.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Headache or dizziness?',
      answer: false,
      imageUrl: '/images/9.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Loss of consciousness(fainting)?',
      answer: false,
      imageUrl: '/images/10.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Chills (cold or shivering)?',
      answer: false,
      imageUrl: '/images/11.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Nausea or vomiting or diarrhea?',
      answer: false,
      imageUrl: '/images/12.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Chronic disease?',
      answer: false,
      imageUrl: '/images/13.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Chest pain or chest pressure or irregular heartbeat?',
      answer: false,
      imageUrl: '/images/14.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Bluish lips or face?',
      answer: false,
      imageUrl: '/images/15.png',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      question: 'Loss of smell or taste?',
      answer: false,
      imageUrl: '/images/16.png',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questionnaires', null, {});
  }
};
