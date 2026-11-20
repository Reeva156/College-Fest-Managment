import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pulse_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const api = {

  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),

  checkSetupStatus: () => axiosInstance.get('/auth/setup-status'),
  setupAdmin: (adminData) => axiosInstance.post('/auth/setup-admin', adminData),
  login: (credentials) => axiosInstance.post('/auth/login', credentials),
  register: (userData) => axiosInstance.post('/auth/register', userData),
  getMe: () => axiosInstance.get('/auth/me'),
  updateProfile: (profileData) => axiosInstance.put('/auth/profile', profileData),
  changePassword: (passwordData) => axiosInstance.put('/auth/change-password', passwordData),
  getUsers: () => axiosInstance.get('/auth/users'),
  createUser: (userData) => axiosInstance.post('/auth/create-user', userData),
  deleteUser: (id) => axiosInstance.delete(`/auth/users/${id}`),

  getEvents: (params = {}) => axiosInstance.get('/events', { params }),
  getEventById: (id) => axiosInstance.get(`/events/${id}`),
  createEvent: (eventData) => axiosInstance.post('/events', eventData),
  updateEvent: (id, eventData) => axiosInstance.put(`/events/${id}`, eventData),
  deleteEvent: (id) => axiosInstance.delete(`/events/${id}`),

  registerIndividual: (eventId) => axiosInstance.post('/registrations/individual', { eventId }),
  registerTeam: (payload) => axiosInstance.post('/registrations/team', payload),
  joinTeam: (teamCode) => axiosInstance.post('/registrations/join-team', { teamCode }),
  getMyRegistrations: () => axiosInstance.get('/registrations/my'),
  getAllRegistrations: (params = {}) => axiosInstance.get('/registrations', { params }),

  verifyQR: (payload) => axiosInstance.post('/checkin/verify', payload),
  getCheckinStats: () => axiosInstance.get('/checkin/stats'),

  getResults: (params = {}) => axiosInstance.get('/results', { params }),
  publishResults: (payload) => axiosInstance.post('/results', payload),

  getMyCertificates: () => axiosInstance.get('/certificates/my'),
  verifyCertificate: (code) => axiosInstance.get(`/certificates/verify/${code}`),

  submitContact: (payload) => axiosInstance.post('/contact', payload),
  getContacts: () => axiosInstance.get('/contact'),

  getStatsOverview: () => axiosInstance.get('/stats/overview'),
};

export default axiosInstance;
