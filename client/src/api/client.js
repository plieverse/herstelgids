import axios from 'axios';

// Token provider — set from authStore after initialization to avoid circular deps
let _getAccessToken = () => null;
let _getRefreshToken = () => null;
let _setTokens = () => {};
let _clearAuth = () => {};

export function configureApiAuth({ getAccessToken, getRefreshToken, setTokens, clearAuth }) {
  _getAccessToken = getAccessToken;
  _getRefreshToken = getRefreshToken;
  _setTokens = setTokens;
  _clearAuth = clearAuth;
}

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((config) => {
  const token = _getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

function processQueue(error, token = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }))
        .then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return api(original);
        });
    }

    original._retry = true;
    isRefreshing = true;

    const refreshToken = _getRefreshToken();
    if (!refreshToken) {
      _clearAuth();
      isRefreshing = false;
      return Promise.reject(error);
    }

    try {
      const { data } = await axios.post('/api/auth/refresh', { refreshToken });
      _setTokens(data.accessToken, data.refreshToken);
      original.headers.Authorization = `Bearer ${data.accessToken}`;
      processQueue(null, data.accessToken);
      return api(original);
    } catch (err) {
      processQueue(err, null);
      _clearAuth();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
