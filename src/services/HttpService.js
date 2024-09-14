import axios from 'axios';
import Config from '../Config';
import {getEncryptedProps} from './Encryption';
const baseURL = Config.fetchUrl;

export default class Http {
  static async handleError(error) {
    if (axios.isCancel(error)) {
      console.error('Request cancelled : ', error.message);
    } else {
      throw error;
    }
  }

  static async get(
    _url,
    {handleDiscard = () => {}, encryption = true, params, ...config} = {},
  ) {
    try {
      const url = `${baseURL}${_url}`;

      const cancelGetRequest = axios.CancelToken.source();
      handleDiscard(cancelGetRequest);

      if (encryption) {
        params = getEncryptedProps(params);
      }

      const response = await axios.get(url, {
        cancelToken: cancelGetRequest.token,
        params,
        ...config,
      });

      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async post(
    _url,
    data,
    {handleDiscard = () => {}, encryption = true, ...config} = {},
  ) {
    try {
      const url = `${baseURL}${_url}`;

      const cancelPostRequest = axios.CancelToken.source();
      handleDiscard(cancelPostRequest);

      if (encryption) {
        data = getEncryptedProps(data);
      }

      const response = await axios.post(url, data, {
        cancelToken: cancelPostRequest.token,
        ...config,
      });

      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async put(
    _url,
    data,
    {handleDiscard = () => {}, encryption = true, ...config} = {},
  ) {
    try {
      const url = `${baseURL}${_url}`;

      const cancelPostRequest = axios.CancelToken.source();
      handleDiscard(cancelPostRequest);

      if (encryption) {
        data = getEncryptedProps(data);
      }

      const response = await axios.put(url, data, {
        cancelToken: cancelPostRequest.token,
        ...config,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async delete(_url, {handleDiscard = () => {}, ...config} = {}) {
    try {
      const url = `${baseURL}${_url}`;

      const cancelPostRequest = axios.CancelToken.source();
      handleDiscard(cancelPostRequest);

      const response = await axios.delete(url, {
        cancelToken: cancelPostRequest.token,
        ...config,
      });
      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async upload(
    _url,
    file,
    {onUploadProgress, handleDiscard = () => {}, ...config} = {},
  ) {
    if (!file) {
      console.error(new Error('File not found'));
      return;
    }

    try {
      let sanitizeFileName = file.name.replace(
        /[&/\\#,^@!+()$~%" "'":*?<>{}-]/g,
        '_',
      );
      file = new File([file], sanitizeFileName, {
        type: file.type,
        lastModified: file.lastModified,
      });
      const url = `${baseURL}${_url}`;
      const cancelFileUpload = axios.CancelToken.source();
      handleDiscard(cancelFileUpload);

      // Create a FormData object to hold the file
      let formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(url, formData, {
        onUploadProgress,
        cancelToken: cancelFileUpload.token,
        ...config,
      });

      return response.data;
    } catch (error) {
      return this.handleError(error);
    }
  }

  static async download(_url, {handleDiscard = () => {}, ...config} = {}) {
    const url = `${baseURL}${_url}`;
    // Check if the environment is web or React Native
    try {
      // Web logic to download the file
      const cancelFileDownload = axios.CancelToken.source();
      handleDiscard(cancelFileDownload);

      const response = await axios.get(url, {
        responseType: 'blob',
        cancelToken: cancelFileDownload.token,
        ...config,
      });

      // Extract the filename from the Content-Disposition header if present
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'download';
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(
          /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/,
        );
        if (fileNameMatch?.[1]) {
          fileName = fileNameMatch[1].replace(/['"]/g, ''); // Remove any surrounding quotes
        }
      }

      // Create a URL for the blob and trigger a download
      const windowUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = windowUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(windowUrl); // Clean up the URL object
    } catch (error) {
      return this.handleError(error);
    }
  }
}
