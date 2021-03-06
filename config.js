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
    slick: [
      // './src/js/slick.min.js',
      // './src/sass/_slick.scss',
    ],
    merchant: [
      './src/sass/merchant.scss',
      './src/js/merchant.js',
    ],
    event: [
      './src/sass/event.scss',
      './src/js/event.js',
    ],
    career:[
      './src/sass/career.scss',
      './src/js/career.js',
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
    {
      template: './src/about/index.html',
      filename: 'about/index.html',
      chunks: ['main'],
    },
    {
      template: './src/about/career.html',
      filename: 'about/career.html',
      chunks: ['main', 'career'],
    },
    {
      template: './src/about/contact-us.html',
      filename: 'about/contact-us.html',
      chunks: ['main'],
    },
    {
      template: './src/about/event.html',
      filename: 'about/event.html',
      chunks: ['main', 'event'],
    },
    {
      template: './src/about/merchant.html',
      filename: 'about/merchant.html',
      chunks: ['main', 'merchant'],
    },
    {
      template: './src/about/product.html',
      filename: 'about/product.html',
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
