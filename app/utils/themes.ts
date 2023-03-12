import {Theme, ThemeKey} from '../types';

const defaultTheme: Theme = {
  primaryBG: '#376AED',
  primaryText: '#ffffff',
  secondryBG: '#E6EAF1',
  secondaryText: '#4b5563',
  tertiaryBG: '#fff',
  tertiaryText: '#000',
  darkColor1: '#0D253C',
  darkColor2: '#2151CD',
  lightColor1: '#ffffff',
  lightColor2: '#ffffff',
  custom: {switch: {thumbColor: '#083D77'}},
};

const indigo: Theme = {
  primaryBG: '#083D77',
  primaryText: '#C8E2F9',
  secondryBG: '#ecf5fd',
  secondaryText: '#082B49',
  tertiaryBG: '#fdfdfb',
  tertiaryText: '#444',
  darkColor1: '#0E4B81',
  darkColor2: '#0C2D48',
  lightColor1: '#ffffff',
  lightColor2: '#ffffff',
  custom: {switch: {thumbColor: '#376AED'}},
};

const green: Theme = {
  primaryBG: '#339989',
  primaryText: '#d4f8f4',
  secondryBG: '#D9F8C4',
  secondaryText: '#1C2815',
  tertiaryBG: '#D3EBCD',
  tertiaryText: '#000',
  darkColor1: '#2F4323',
  darkColor2: '#56B38C',
  lightColor1: '#f1f1f1',
  lightColor2: '#ffffff',
  custom: {switch: {thumbColor: '#0E4B81'}},
};

const yellow: Theme = {
  primaryBG: '#FFAD0A',
  primaryText: '#1c1c1c',
  secondryBG: '#FFEDC2',
  secondaryText: '#3D2900',
  tertiaryBG: '#fff',
  tertiaryText: '#000',
  darkColor1: '#340B09',
  darkColor2: '#063B4B',
  lightColor1: '#ffffff',
  lightColor2: '#ffffff',
  custom: {switch: {thumbColor: '#ffffff'}},
};

const white: Theme = {
  primaryBG: '#f9f9f9',
  primaryText: '#1c1c1c',
  secondryBG: '#f2f2f2',
  secondaryText: '#373A3E',
  searchIconBG: '#f2f2f2',
  searchIconColor: '#1c1c1c',
  tertiaryBG: '#fefefe',
  tertiaryText: '#404258',
  darkColor1: '#50577A',
  darkColor2: '#0C2D48',
  lightColor1: '#f6f5f5',
  lightColor2: '#FeFeFe',
  custom: {switch: {thumbColor: '#FFAD0A'}},
};

const powersave: Theme = {
  primaryBG: '#222831',
  primaryText: '#eeeeee',
  secondryBG: '#fbfbfb',
  secondaryText: '#4b5563',
  tertiaryBG: '#222831',
  tertiaryText: '#fbfbfb',
  lightColor1: '#4d4d4c',
  lightColor2: '#3d3d3c',
  darkColor1: '#f9f6f7',
  darkColor2: '#f2f2f2',
  custom: {switch: {thumbColor: '#FFAD0A'}},
};

export const themes: Record<ThemeKey, Theme> = {
  default: defaultTheme,
  indigo,
  green,
  yellow,
  white,
  powersave,
};
