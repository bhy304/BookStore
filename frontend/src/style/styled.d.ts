import 'styled-components';
import { ColorKey, HeadingSize, ThemeName } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: ThemeName;
    color: Record<ColorKey, string>;
    heading: {
      [key in HeadingSize]: {
        fontSize: string;
      };
    };
  }
}
