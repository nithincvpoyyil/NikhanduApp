import {ThemeKey} from '../types';

export default function getLogo(theme: ThemeKey): 'white' | 'black' {
  switch (theme) {
    case 'powersave':
    case 'indigo':
    case 'green':
    case 'default':
      return 'white';

    case 'white':
    case 'yellow':
    default:
      return 'black';
  }
}
