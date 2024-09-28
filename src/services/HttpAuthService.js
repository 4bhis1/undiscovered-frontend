import Http from './HttpService';
import {showError} from '../hooks/showError';
// Debounce function that collects all calls and executes them after a delay
const debounceRequests = (fn, delay = 500) => {
  let timeoutId;
  const pendingRequests = [];

  return (...args) =>
    new Promise((resolve, reject) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(async () => {
        try {
          const result = await fn.apply(this, args);
          pendingRequests.forEach(pending => pending.resolve(result));
        } catch (error) {
          pendingRequests.forEach(pending => pending.reject(error));
        } finally {
          pendingRequests.length = 0;
        }
      }, delay);
      pendingRequests.push({resolve, reject});
    });
};

export default class HttpAuth {
  static access_token = {};
  static refresh_token = {};
  // Function to refresh the access token, debounced
  static refreshTokens = debounceRequests(async () => {
    return await this.post(`/v1/auth/refresh-tokens`, {
      refresh_token: HttpAuth.access_token?.token,
    });
  });

  static async errorHandler(error, retryRequest, retryCount) {
    const statusCode = error.response?.status;
    if (error.response?.data?.error) {
      error = error.response.data.error;
    }
    if (statusCode === 401 && !retryCount && error.message === 'jwt expired') {
      try {
        await this.refreshTokens();
        return await retryRequest();
      } catch (refreshError) {
        showError(refreshError);
      }
    } else {
      showError(error);
    }
  }

  static async get(_url, {retryCount = 0, ...config} = {}) {
    const {headers = {}} = config || {};
    headers.Authorization = `Bearer ${HttpAuth.access_token?.token}`;
    try {
      return await Http.get(_url, {
        ...config,
        withCredentials: true,
        headers,
      });
    } catch (error) {
      return await this.errorHandler(
        error,
        async () => this.get(_url, {...config, retryCount: retryCount + 1}),
        retryCount,
      );
    }
  }

  static async post(_url, data, {retryCount = 0, ...config} = {}) {
    const {headers = {}} = config;
    headers.Authorization = `Bearer ${HttpAuth.access_token?.token}`;
    try {
      return await Http.post(_url, data, {
        ...config,
        withCredentials: true,
        headers,
      });
    } catch (error) {
      return await this.errorHandler(
        error,
        async () =>
          this.post(_url, data, {
            ...config,
            retryCount: retryCount + 1,
          }),
        retryCount,
      );
    }
  }

  static async put(_url, data, {retryCount = 0, ...config} = {}) {
    const {headers = {}} = config;
    headers.Authorization = `Bearer ${HttpAuth.access_token?.token}`;
    try {
      return await Http.put(_url, data, {
        ...config,
        withCredentials: true,
        headers,
      });
    } catch (error) {
      return await this.errorHandler(
        error,
        async () =>
          this.put(_url, data, {
            ...config,
            retryCount: retryCount + 1,
          }),
        retryCount,
      );
    }
  }

  static async delete(_url, {retryCount = 0, ...config} = {}) {
    const {headers = {}} = config;
    headers.Authorization = `Bearer ${HttpAuth.access_token?.token}`;
    try {
      return await Http.delete(_url, {
        ...config,
        withCredentials: true,
        headers,
      });
    } catch (error) {
      return await this.errorHandler(
        error,
        async () =>
          this.delete(_url, {
            ...config,
            retryCount: retryCount + 1,
          }),
        retryCount,
      );
    }
  }

  static async upload(_url, file, {retryCount = 0, ...config} = {}) {
    const {headers = {}} = config;
    headers.Authorization = `Bearer ${HttpAuth.access_token?.token}`;
    try {
      return await Http.upload(_url, file, {
        ...config,
        withCredentials: true,
        headers,
      });
    } catch (error) {
      return await this.errorHandler(
        error,
        async () =>
          this.upload(_url, file, {
            ...config,
            retryCount: retryCount + 1,
          }),
        retryCount,
      );
    }
  }

  static async download(_url, {retryCount = 0, ...config} = {}) {
    const {headers = {}} = config;
    headers.Authorization = `Bearer ${HttpAuth.access_token?.token}`;
    try {
      return await Http.download(_url, {
        ...config,
        withCredentials: true,
        headers,
      });
    } catch (error) {
      return await this.errorHandler(
        error,
        async () =>
          this.download(_url, {
            ...config,
            retryCount: retryCount + 1,
          }),
        retryCount,
      );
    }
  }
}
