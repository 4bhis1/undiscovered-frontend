/* eslint-disable no-undef */
const url = process.env.REACT_APP_API_URL;
const en_k1 = process.env.REACT_APP_EN_K1;
const en_k2 = process.env.REACT_APP_EN_K2;

const BASE_URL = url;

const fetchUrl = BASE_URL;
const postUrl = BASE_URL;
const uploadUrl = BASE_URL;
const downloadUrl = BASE_URL;

const Config = {
  fetchUrl,
  postUrl,
  uploadUrl,
  downloadUrl,
  en_k1,
  en_k2,
};

export default Config;
