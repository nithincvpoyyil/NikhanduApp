import {Theme} from '../types';

export const lightTheme: Theme = {
  primaryBG: '#376AED',
  primaryText: '#ffffff',
  secondryBG: '#E6EAF1',
  secondaryText: '#4b5563',
  lightBG: '#f9fafb',
  lightText: '#1f2937',
  darkColor1: '#0D253C',
  darkColor2: '#2151CD',
  whiteColor1: '#ffffff',
};

export const darkTheme = {
  primaryBG: '#f5386b',
  secondryBG: '#fbfbfb',
  primaryText: '#1f2937',
  secondaryText: '#4b5563',
};

export function getTheme(): Theme {
  return lightTheme;
}
