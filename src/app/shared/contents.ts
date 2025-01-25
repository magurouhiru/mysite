import { Theme, Themes } from './change-style';

export type ContentName = 'home' | 'article' | 'study' | 'portfolio';

export const Contents: Record<
  ContentName,
  { label: string; icon: string; link: string; theme: Theme }
> = {
  home: {
    label: 'home',
    icon: 'pi pi-home',
    link: '/',
    theme: Themes.lara_light_blue,
  },
  article: {
    label: 'article',
    icon: 'pi pi-pen-to-square',
    link: '/article',
    theme: Themes.lara_light_purple,
  },
  study: {
    label: 'study',
    icon: 'pi pi-graduation-cap',
    link: '/study',
    theme: Themes.lara_light_green,
  },
  portfolio: {
    label: 'portfolio',
    icon: 'pi pi-briefcase',
    link: '/portfolio',
    theme: Themes.lara_light_amber,
  },
};
