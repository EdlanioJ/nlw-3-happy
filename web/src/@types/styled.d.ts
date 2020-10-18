import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    name: string;
    colors: {
      primary: string;
      secondary: string;
      black: string;
      blue: string;
      lightBlue: string;
      background: string;
      icon: string;
    };
    map: string;
  }
}
