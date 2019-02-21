/* global require, __dirname, module */
/* eslint-disable no-console */
const {resolve} = require('path');
const baseDir = resolve(__dirname, '../');
const {writeFileSync} = require('fs');
const {fas} = require('@fortawesome/free-solid-svg-icons');
const {far} = require('@fortawesome/free-regular-svg-icons');
const {fab} = require('@fortawesome/free-brands-svg-icons');

const json = Object.values(fas)
    .concat(Object.values(far))
    .concat(Object.values(fab))
    .map(a => a.prefix + " fa-" + a.iconName);

writeFileSync(`${baseDir}/src/js/components/icons.json`, JSON.stringify(json));
