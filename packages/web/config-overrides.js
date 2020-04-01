module.exports = {
  jest: function(config) {
    config.globals = {
      "ts-jest": {
        isolatedModules: true,
      },
    };
    return config;
  },
};
