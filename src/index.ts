// ref:
// - https://umijs.org/plugins/api
import type { IApi } from '@umijs/types';
import { mkdirSync, existsSync, writeFileSync } from 'fs';
import { join } from 'path';

export default (api: IApi) => {
  api.logger.info('Using umi-plugin-fire');

  const joinAbsPath = (path: string) =>
    join(api.paths.absTmpPath!, 'firebase', path);

  api.describe({
    key: 'firebase',
    config: {
      schema(joi) {
        return joi.object();
      },
    },
  });

  api.onGenerateFiles(() => {
    const firebaseAbsPath = joinAbsPath('');
    if (!existsSync(firebaseAbsPath)) {
      mkdirSync(firebaseAbsPath);
    }

    const config = api.userConfig.firebase;

    if (process.env.NODE_ENV === 'production' && !config.apiKey) {
      api.logger.error(
        `In production 'firebase apiKey option' cannot be null.`,
      );
    }

    const indexPath = joinAbsPath('index.tsx');

    const code = 'import firebase from \'firebase/app\';\n' +
      '\nconst config = "<%= Config %>";\n' +
      '\n' +
      'firebase.initializeApp(config);'

    const indexContent = !config.apiKey
      ? ''
      : code.replace('"<%= Config %>"', JSON.stringify(config));

    writeFileSync(indexPath, indexContent);

  });

  api.addEntryImports(() => {
    return [
      {
        source: './firebase/index',
      },
      {
        source: 'firebase/app',
        specifier: 'firebase'
      },
    ];
  });
};
