# Newtab

[![Build Status](https://travis-ci.org/fireworkweb/newtab.svg?branch=master)](https://travis-ci.org/fireworkweb/newtab)

Newtab is the easiest way to manage and access your pages. Only one click away!

### Installation

Using Yarn

```sh
yarn install
yarn hot
```

### How to use

Add the website: https://newtab.fireworkweb.com/ as your home page and restart your browser.


##### Using Firefox:

- Install the plugin [New Tab Override](https://www.soeren-hentzschel.at/firefox-webextensions/new-tab-override/) to add the Newtab as your home page and new tab

##### Using Google Chrome:

- Install the plugin [New Tab Redirect](https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna?hl=en-US) to add the Newtab as your home page and new tab

##### Using Safari:

- Add the website in the browser preferences and change all the options above to `Home Page`


### Contributing

All contribution is welcome, please feel free to open tickets and pull requests.

### icons.json

Extracted from [Font Awesome](https://fontawesome.com/cheatsheet#brands)

Used to save file [Devtools Snippets](https://github.com/bgrins/devtools-snippets/tree/master/snippets/console-save)

In console with: 

```javascript
var response = await fetch('https://use.fontawesome.com/releases/v5.2.0/css/all.css').then(response => response.text());

var incons = [];
var json = {
    "icons": []
};

$$('#solid .icon-name').forEach(function (el) {
    incons.push('fas fa-' + el.innerText);
});
$$('#regular .icon-name').forEach(function (el) {
    incons.push('far fa-' + el.innerText);
});
$$('#brands .icon-name').forEach(function (el) {
    incons.push('fab fa-' + el.innerText);
});

response.match(/(?!\.)fa-[-\w]+(?=:before)/g)
    .forEach((element) => {
        ['fas', 'far', 'fab'].forEach(prefix => {
            let item = prefix + ' ' + element;
            if (!json.icons.includes(item) && incons.includes(item)) {
                json.icons.push(item);
            }
        });
    });

var blob = new Blob([JSON.stringify(json, undefined, 4)], {type: 'text/json'}),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a');

a.download = 'icons.json';
a.href = window.URL.createObjectURL(blob);
a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':');
e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
a.dispatchEvent(e);
```
