export type DeviceLightMode = 'dark' | 'light' | 'device';
export type LoadState = 'init' | 'loading' | 'loaded' | 'error';
export type Theme = {
  searchIconBG?: string;
  searchIconColor?: string;
  primaryBG: string;
  primaryText: string;
  secondryBG: string;
  secondaryText: string;
  tertiaryBG: string;
  tertiaryText: string;
  darkColor1: string;
  darkColor2: string;
  lightColor1: string;
  lightColor2: string;
};

export type ThemeKey =
  | 'default'
  | 'green'
  | 'yellow'
  | 'powersave'
  | 'indigo'
  | 'white';

export const ANALYTICS_FLAG = '@analytics_flag';
export const USER_ID_KEY = '@userid-info';
export const THEME_STORE_KEY = '@NikhanduAppTheme';
