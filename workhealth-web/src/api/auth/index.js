import api from '../api';

export const login = () => api.get('/auth/login').then(res => res.data);
