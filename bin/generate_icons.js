/* global require, __dirname, module */
/* eslint-disable no-console */
const {resolve} = require('path');
const baseDir = resolve(__dirname, '../');
const axios = require('axios');
const cheerio = require('cheerio');
const {writeFileSync} = require('fs');
const Horseman = require('node-horseman');

const getFontawesome = async () => {
    try {

        return await axios.get('https://use.fontawesome.com/releases/v5.2.0/css/all.css');
    } catch (error) {
        console.error(error);
    }
};

const horseman = new Horseman({
    injectJquery: true,
    ignoreSSLErrors: true,
    webSecurity: false,
    loadImages: false,
});

horseman
    .open('https://fontawesome.com/cheatsheet#brands')
    .html('body')
    .then(async (html) => {
        try {
            const $ = cheerio.load(html);
            const fontawesome = await getFontawesome();
            const incons = [];
            const json = [];

            $('#solid .icon-name')
                .each(function () {
                    incons.push('fas fa-' + $(this).text());
                });
            $('#regular .icon-name')
                .each(function () {
                    incons.push('far fa-' + $(this).text());
                });
            $('#brands .icon-name')
                .each(function () {
                    incons.push('fab fa-' + $(this).text());
                });

            fontawesome.data
                .match(/(?!\.)fa-[-\w]+(?=:before)/g)
                .forEach((element) => {
                    ['fas', 'far', 'fab'].forEach(prefix => {
                        let item = prefix + ' ' + element;
                        if (!json.includes(item) && incons.includes(item)) {
                            json.push(item);
                        }
                    });
                });

            writeFileSync(`${baseDir}/src/js/components/icons.json`, JSON.stringify(json));
        } catch (error) {
            console.error(error);
        }
    })
    .close();
