/** General Configurations Like PORT, HOST names and etc... */

var config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || 8080,
  karmaPort: 9876,
  ssr: false,
  sentry: false,
  // This part goes to React-Helmet for Head of our HTML
  app: {
    head: {
      title: 'Crazy Factory',
      meta: [
        {charset: 'utf-8'},
        {'http-equiv': 'x-ua-compatible', content: 'ie=edge'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        {name: 'description', content: 'React Redux Typescript'},
      ]
    }
  }
};

module.exports = config;
