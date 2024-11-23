export function changeStyle(theme?: string) {
  document.getElementById('style-theme')?.setAttribute('href', theme + '.css');
}

export interface Theme {
  label: string;
  colors: {
    primary_color: string;
    primary_color_text: string;
  };
}

export type ThemeName =
  | 'lara_light_blue'
  | 'lara_light_green'
  | 'lara_light_purple';

export const Themes: Record<ThemeName, Theme> = {
  lara_light_blue: {
    label: 'lara-light-blue',
    colors: {
      primary_color: '#3B82F6',
      primary_color_text: '#ffffff',
    },
  },
  lara_light_green: {
    label: 'lara-light-green',
    colors: {
      primary_color: '#10b981',
      primary_color_text: '#ffffff',
    },
  },
  lara_light_purple: {
    label: 'lara-light-purple',
    colors: {
      primary_color: '#8B5CF6',
      primary_color_text: '#ffffff',
    },
  },
};
