const get = {
    tags: ['Questionnaire'],
    description: 'returns all questions',
    security: [
        {
            basicAuth: []
        }
    ],
    responses: {
        '200': {
            description: 'questions',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            questionnaires: {
                                type: 'array',
                                items: {
                                    type: 'object', properties: {
                                        id: { type: 'integer' },
                                        question: { type: 'string' },
                                        answer: { type: 'string' },
                                        imageUrl: { type: 'string' },
                                        createdAt: { type: 'string', format: 'date-time' },
                                        updatedAt: { type: 'string', format: 'date-time' },
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

const post = {
    tags: ['Questionnaire'],
    description: 'checks answers',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        "0": {
                            type: 'boolean',
                            description: "mapped question id : answer"
                        },
                        "1": {
                            type: 'boolean'
                        }
                    }
                }
            }
        },
        required: true
    },
    security: [
        {
            basicAuth: []
        }
    ],
    responses: {
        '200': {
            description: 'questions',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            status: { type: 'string' },
                            pass: { type: 'string' },
                        }
                    }
                }
            }
        },
        '401': {
            description: ' unauthorized',
        }
    }
}

module.exports = {
    get,
    post,
};