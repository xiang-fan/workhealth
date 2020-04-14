import api from '../api';

export const screeningHistory = () => api.get('/screeningHistory/current').then(res => res.data.screeningHistories
    .sort((a,b) => (new Date(b.createdAt)).getTime() - (new Date(a.createdAt)).getTime())
    .map(item => {
        return {
            id: item.id,
            date: item.createdAt,
            status: item.status === "passed",
            pass: item.pass ? +item.pass : 0
        }
    })
);

export const getQuestionnaire = () => api.get('/questionnaire').then(res => res.data.questionnaires.map(question => {
    return {
        id: question.id,
        text: question.question,
        img: question.imageUrl,
        correctAnswer: question.answer,
        answered: null
    }
}));

export const checkAnswers = answers => api.post('/questionnaire', answers).then(res => res.data);

export const getUserResult = id => api.get(`/screeningHistory/answers/${id}`).then(res => res.data);
