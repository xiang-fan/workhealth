const get = {
    tags: ['screeningHistory'],
    description: 'returns screening histories',
    security: [
        {
            basicAuth: []
        }
    ],
    parameters: [
        {
            name: 'pass',
            description: 'history\'s pass',
            in: 'query',
            schema: {
                type: 'string',
            },
            required: false
        },
        {
            name: 'userId',
            description: 'user id',
            in: 'query',
            schema: {
                type: 'integer',
            },
            required: false
        },
    ],
    responses: {
        '200': {
            description: 'screening histories',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            screeningHistory: {
                                type: 'array',
                                items: {
                                    type: 'object', properties: {
                                        id: { type: 'integer' },
                                        pass: { type: 'string' },
                                        userId: { type: 'integer' },
                                        status: { type: 'string' },
                                        createdAt: { type: 'string', format: 'date-time' },
                                        updatedAt: { type: 'string', format: 'date-time' },
                                        User: {
                                            type: 'object',
                                            properties: {
                                                id: { type: 'integer' },
                                                username: { type: 'string' },
                                                role: { type: 'string' },
                                                personalId: { type: 'string' },
                                                createdAt: { type: 'string', format: 'date-time' },
                                                updatedAt: { type: 'string', format: 'date-time' },
                                            }
                                        }
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

const getCurrent = {
    tags: ['screeningHistory'],
    description: 'returns user\'s screening histories',
    security: [
        {
            basicAuth: []
        }
    ],
    responses: {
        '200': {
            description: 'screening histories',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            screeningHistories: {
                                type: 'array',
                                items: {
                                    type: 'object', properties: {
                                        id: { type: 'integer' },
                                        pass: { type: 'string' },
                                        userId: { type: 'integer' },
                                        status: { type: 'string' },
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

const getAnswers = {
    tags: ['screeningHistory'],
    description: 'returns answers by history id',
    security: [
        {
            basicAuth: []
        }
    ],
    parameters: [
        {
            name: 'id',
            description: 'history\'s id',
            in: 'parameters',
            schema: {
                type: 'integer',
            },
            required: false
        },
    ],
    responses: {
        '200': {
            description: 'screening histories',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' },
                            pass: { type: 'string' },
                            status: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                            questionnaire: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'integer' },
                                        question: { type: 'string' },
                                        expectedAnswer: { type: 'boolean' },
                                        answer: { type: 'boolean' },
                                    }
                                }
                            }
                            ,
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

module.exports = {
    get,
    getCurrent,
    getAnswers,
};