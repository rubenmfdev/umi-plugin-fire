// ref:
// - https://umijs.org/plugins/api
import type { IApi } from '@umijs/types';
import { mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default (api: IApi) => {
  api.logger.info('use plugin');

  const joinAbsPath = (path: string) => join(api.paths.absTmpPath!, 'firebase', path);
  const joinTemplatePath = (path: string) => join(__dirname, '../template/umi/firebase', path);

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

    const config = api.userConfig.firebase

    if (process.env.NODE_ENV === 'production' && !config.apiKey) {
      api.logger.error(`In production 'firebase apiKey option' cannot be null.`);
    }

    const indexPath = joinAbsPath('index.tsx');
    const templatePath = joinTemplatePath('index.tsx');

    const indexTemplate = readFileSync(templatePath, 'utf-8');
    const indexContent = !config.apiKey ? '' : indexTemplate.replace('"<%= Config %>"', JSON.stringify(config));

    writeFileSync(indexPath, indexContent);
  });


  api.addEntryImports(() => {
    return [
      {
        source: './firebase/index'
      }
    ]
  });
}
