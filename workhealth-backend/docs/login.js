module.exports = {
    tags: ['Login'],
    description: 'confirms user presence in the system',
    security: [
        {
            basicAuth: []
        }
    ],
    responses: {
        '200': {
            description: ' confirmation',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            userRole: { type: 'integer' },
                            username: { type: 'string' },
                            personalId: { type: 'string' },
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