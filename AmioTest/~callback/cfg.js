const baseURL = `https://api.amio.io/v1/`;
const OAUTH_TOKEN = `KjwEeLn0LiV5fslqr950zjvNPPEy8EvcI5hqmxIbmVyIZyHXdvJWgaXyWVekvNGqEnZMh6mB1CzXJbPETj88hZbp2b`;

const ConfigBase = (url, json, method, baseUrl, oauthToken) => ({
  url,
  json,
  method,
  baseUrl,
  headers: {
    'Content-Type': `application/json`,
    'Authorization': `Bearer ${OAUTH_TOKEN}`
  }
});

const getConfig = (url, method) => {
  return ConfigBase(url, true, method, baseURL, OAUTH_TOKEN);
}

module.exports = {
  getConfig
}
