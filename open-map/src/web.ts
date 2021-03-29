import { WebPlugin } from '@capacitor/core';
import { OpenMapPlugin } from './definitions';

export class OpenMapWeb extends WebPlugin implements OpenMapPlugin {
  constructor() {
    super({
      name: 'OpenMap',
      platforms: ['web'],
    });
  }

  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
  async open(options: { longitude: number; latitude: number }): Promise<void> {
    console.log('open', options);
  }
}

const OpenMap = new OpenMapWeb();

export { OpenMap };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(OpenMap);
