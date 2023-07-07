/* eslint-disable require-jsdoc */
function responseHandler(statusCode, message) {
  return response = {
    statusCode: statusCode,
    body: JSON.stringify({
      message: message,
    }),
  };
}

function swapi(path) {
  const baseUrl = 'https://swapi.dev/api/';
  return `${baseUrl}/${path}`;
}

module.exports = {
  responseHandler,
  swapi,
};

