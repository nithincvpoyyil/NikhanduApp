import {Theme, ThemeKey} from '../types';

const defaultTheme = {
  primaryBG: '#376AED',
  primaryText: '#ffffff',
  secondryBG: '#E6EAF1',
  secondaryText: '#4b5563',
  tertiaryBG: '#fff',
  tertiaryText: '#000',
  lightBG: '#f9fafb',
  lightText: '#1f2937',
  darkColor1: '#0D253C',
  darkColor2: '#2151CD',
  lightColor1: '#ffffff',
  lightColor2: '#ffffff',
};

const indigo = {
  primaryBG: '#083D77',
  primaryText: '#C8E2F9',
  secondryBG: '#ecf5fd',
  secondaryText: '#082B49',
  tertiaryBG: '#fff',
  tertiaryText: '#000',
  lightBG: '#f9fafb',
  lightText: '#062037',
  darkColor1: '#0E4B81',
  darkColor2: '#1261A5',
  lightColor1: '#ffffff',
  lightColor2: '#ffffff',
};

const green = {
  primaryBG: '#339989',
  primaryText: '#ddf8f4',
  secondryBG: '#86DEB7',
  secondaryText: '#1C2815',
  tertiaryBG: '#fff',
  tertiaryText: '#000',
  lightBG: '#CFF2E2',
  lightText: '#262417',
  darkColor1: '#2F4323',
  darkColor2: '#56B38C',
  lightColor1: '#ffffff',
  lightColor2: '#ffffff',
};

const yellow = {
  primaryBG: '#FFAD0A',
  primaryText: '#1c1c1c',
  secondryBG: '#FFEDC2',
  secondaryText: '#3D2900',
  tertiaryBG: '#fff',
  tertiaryText: '#000',
  lightBG: '#FFFFEB',
  lightText: '#1f2937',
  darkColor1: '#340B09',
  darkColor2: '#063B4B',
  lightColor1: '#ffffff',
  lightColor2: '#ffffff',
};

const white: Theme = {
  primaryBG: '#f9f9f9',
  primaryText: '#1c1c1c',
  secondryBG: '#f2f2f2',
  secondaryText: '#373A3E',
  searchIconBG: '#f2f2f2',
  searchIconColor: '#1c1c1c',
  tertiaryBG: '#f5f5f5',
  tertiaryText: '#515B63',
  lightBG: '#fff',
  lightText: '#000',
  darkColor1: '#444444',
  darkColor2: '#0C2D48',
  lightColor1: '#D4D7DC',
  lightColor2: '#F0F0F0',
};

const powersave = {
  primaryBG: '#376AED',
  primaryText: '#ffffff',
  secondryBG: '#E6EAF1',
  secondaryText: '#4b5563',
  tertiaryBG: '#fff',
  tertiaryText: '#000',
  lightBG: '#f9fafb',
  lightText: '#1f2937',
  darkColor1: '#0D253C',
  darkColor2: '#2151CD',
  lightColor1: '#ffffff',
  lightColor2: '#ffffff',
};

export const themes: Record<ThemeKey, Theme> = {
  default: defaultTheme,
  indigo,
  green,
  yellow,
  white,
  powersave,
};
