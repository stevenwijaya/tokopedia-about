const config = {
  entry: {
    main: [
      './src/js/index.js',
      './src/sass/style.scss',
      './src/js/jqueryui.js',
    ],
    unify: [
      './src/js/unify.js',
    ],
  },
  jquery: true,
  html: [
    {
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['main'],
    },
    {
      template: './src/example/buttons.html',
      filename: 'example/buttons.html',
      chunks: ['main', 'unify'],
    },
    {
      template: './src/example/index.html',
      filename: 'example/index.html',
      chunks: ['main'],
    },
    {
      template: './src/example/form.html',
      filename: 'example/form.html',
      chunks: ['main', 'unify'],
    },
    {
      template: './src/example/selector.html',
      filename: 'example/selector.html',
      chunks: ['main', 'unify'],
    },
    {
      template: './src/example/cards.html',
      filename: 'example/cards.html',
      chunks: ['main'],
    },
  ],
  cdn: {
    upload: false,
    options: {
      bucket: 'tokopedia-upload',
      directory: 'assets-tokopoints/prod/webpacktest/',
      domain: 'https://ecs7.tokopedia.net/',
    },
  },
};

module.exports = config;
