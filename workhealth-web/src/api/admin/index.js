import api from '../api';

export const getScreeningHistoryByPass = pass => api.get(`screeningHistory?pass=${pass}`).then(res => res.data);

export const getScreeningHistoryByName = name => api.get(`user?username=${name}`).then(res => res.data);

export const getUserHisory = id => api.get(`screeningHistory?userId=${id}`).then(res => res.data);