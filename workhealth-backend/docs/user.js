module.exports = {
    tags: ['User'],
    description: 'returns users',
    security: [
        {
            basicAuth: []
        }
    ],
    parameters: [
        {
            name: 'username',
            description: 'username',
            in: 'query',
            schema: {
                type: 'integer',
            },
            required: true
        },
    ],
    responses: {
        '200': {
            description: ' confirmation',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            users: {
                                type: 'array', items: {
                                    type: 'object', properties: {
                                        id: { type: 'integer' },
                                        username: { type: 'string' },
                                        role: { type: 'string' },
                                        personalId: { type: 'string' },
                                        createdAt: { type: 'string', format: 'date-time' },
                                        updatedAt: { type: 'string', format: 'date-time' }
                                    }
                                }
                            },

                        }
                    }
                }
            }
        },
        '401': {
            description: ' unauthorized',
        }
    }
};


