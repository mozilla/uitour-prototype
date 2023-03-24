const { minify } = require('terser');

module.exports = async function (code, callback) {
  try {
    const minified = await minify(code);
    callback(null, minified.code);
  } catch (err) {
    console.error('Terser error: ', err);
    // Fail gracefully.
    callback(null, code);
  }
};
