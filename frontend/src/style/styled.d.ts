import 'styled-components';
import { ColorKey, HeadingSize, ButtonSize, ButtonScheme, ThemeName } from './theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: ThemeName;
    color: Record<ColorKey, string>;
    heading: {
      [key in HeadingSize]: {
        fontSize: string;
      };
    };
    button: {
      [key in ButtonSize]: {
        fontSize: string;
        padding: string;
      };
    };
    buttonScheme: {
      [key in ButtonScheme]: {
        color: string;
        backgroundColor: string;
      };
    };
    borderRadius: {
      default: string;
    }
  }
}
