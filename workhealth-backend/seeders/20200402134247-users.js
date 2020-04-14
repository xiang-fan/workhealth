'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username: 'John Doe',
      ldapId: '1',
      personalId: '3958028',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Mark Hamill',
      ldapId: '2',
      personalId: '8935001',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'John Doe',
      ldapId: '3',
      personalId: '3489275',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Mark Hamill',
      ldapId: '4',
      personalId: '0127583',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Carrie Fisher',
      ldapId: '5',
      personalId: '8931132',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'Harrison Ford',
      ldapId: '6',
      personalId: '1278083',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
