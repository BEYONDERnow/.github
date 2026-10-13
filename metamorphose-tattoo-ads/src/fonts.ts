import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';
import {fonts} from './theme';

export const fontsReady = Promise.all([
  loadFont({family: fonts.serif, url: staticFile('fonts/cormorant-garamond-latin-500-italic.woff2'), weight: '500', style: 'italic'}),
  loadFont({family: fonts.serif, url: staticFile('fonts/cormorant-garamond-latin-600-italic.woff2'), weight: '600', style: 'italic'}),
  loadFont({family: fonts.sans, url: staticFile('fonts/poppins-latin-400-normal.woff2'), weight: '400'}),
  loadFont({family: fonts.sans, url: staticFile('fonts/poppins-latin-500-normal.woff2'), weight: '500'}),
  loadFont({family: fonts.sans, url: staticFile('fonts/poppins-latin-600-normal.woff2'), weight: '600'}),
]);
