module.exports = function() {
  return {
    ENV: process.env.ENV || 'production',
  };
};
