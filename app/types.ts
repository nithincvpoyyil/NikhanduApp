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
  lightBG: string;
  lightText: string;
};

export type ThemeKey =
  | 'default'
  | 'green'
  | 'yellow'
  | 'powersave'
  | 'indigo'
  | 'white';
