/* global require */
let mix = require('laravel-mix'),
    tailwindcss = require('tailwindcss'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

require('laravel-mix-purgecss');

mix
    .setPublicPath('dist')
    .js('src/js/main.js', 'dist')
    .options({
        processCssUrls: false,
        postCss: [ tailwindcss('./tailwind.js') ],
    })
    .sass('src/sass/app.scss', 'dist')
    .webpackConfig({
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                hash: true,
            }),
        ],
        output: { publicPath: '' },
    })
    .purgeCss({
        globs: [ './src/**/index.html', './src/**/*.vue' ],
        whitelistPatterns: [ /^app-color-/ ],
    });
