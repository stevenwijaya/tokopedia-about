<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" src="https://webpack.js.org/assets/icon-square-big.svg">
  </a>
</div>

# Webpack Static Boilerplate 

Boilerplate for static webpage development using the powerful webpack.

## Table of contents
1. [Installation and usage](#installation-and-usage)
2. [Configuration](#configuration)
3. [Style Guides](#style-guides)

## Installation and usage
We recommend using [Yarn](https://yarnpkg.com/en/) as package manager. 
First, install all dependencies.
```
$ yarn
```
Run development mode using `webpack-dev-server`
```
$ yarn dev
```
Build html for production. Also upload assets to AWS S3 (optional).
```
$ yarn build
```


## Configuration
Copy environment configuration file from `.env.example`
```
$ cp .env.example .env
```

You can change app configuration through `config.js` instead of modifying `webpack.config.js`.

### Update entry file
Bundle all js and scss file as entry into a chunk. Later, use this chunk for specific html page.
```js
{
  entry: {
    main: [
      './src/js/index.js',
      './src/sass/style.scss',
    ],
  }
}
```

### Toggle jQuery
Do you prefer using jQuery in your project? If you don't, just change it to `false`.
```js
{
  jquery: true
}
```

### HTML template
`template` is HTML source, `filename` is target HTML output with css and js included. And you have to add
`chunks` to each HTML Template.
```js
{
  html: [{
    template: './src/index.html',
    filename: 'index.html',
    chunks: ['main'],
  }]
}
```

### CDN (Amazon S3)
Set `upload: true` will activate automatic assets uploading to s3 when build process is running.
You can set bucket, directory, and your public S3 URL in `options`. Outputted HTML will replace local assets url with CDN url.
```js
{
  cdn: {
    upload: false,
    options: {
      bucket: 'tokopedia-upload',
      directory: 'assets-tokopoints/prod/static',
      domain: 'https://ecs7.tokopedia.net/',
    },
  }
}
```

## Style guides
This project use AirBnb javascript linter ([documentation](https://github.com/airbnb/javascript)) as default.
