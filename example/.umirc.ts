import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [require.resolve('../lib')],
  firebase: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
  },
});
