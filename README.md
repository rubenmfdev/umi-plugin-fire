# umi-plugin-fire

[![NPM version](https://img.shields.io/npm/v/umi-plugin-fire.svg?style=flat)](https://npmjs.org/package/umi-plugin-fire)

Umi plugin for firebase.

## Install

Add to package.json 

```bash
    "umi-plugin-fire": "^1.0.3",
```
## Use

Just setup the plugin on `.umirc.js` or in `config.js`

```js
export default {
  plugins: [
    // ...
    ['umi-plugin-fire'],
    firebase: {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: ''
	}
    // ...
  ],
}
```

## Options

| name                | type                             |
|---------------------|----------------------------------|
| apiKey              | string (required in production)  |
| authDomain          | string (optional)                |
| databaseURL         | string (optional)                |
| projectId           | string (optional)                |
| storageBucket       | string (optional)                |
| messagingSenderId   | string (optional)                |

### How to use

After you configure the plugin, you are able to use `firebase app` as usual. But this time you don't need to `initializeApp` your app:

```js
import app from 'firebase/app';

analytics = app.analytics();
```
