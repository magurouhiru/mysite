import { Component, effect, input, OnDestroy } from '@angular/core';

import { MenuItem, MenuItemCommandEvent } from 'primeng/api';
import { Button } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

import { changeStyle, ThemeName, Themes } from '../change-style';

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  imports: [MenuModule, Button],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss',
})
export class ThemePickerComponent implements OnDestroy {
  themes: MenuItem[] = [
    {
      label: 'Select Theme',
      items: [
        {
          label: Themes.lara_light_blue.label,
          command(event: MenuItemCommandEvent) {
            changeStyle(event.item?.label);
          },
        },
        {
          label: Themes.lara_light_purple.label,
          command(event: MenuItemCommandEvent) {
            changeStyle(event.item?.label);
          },
        },
        {
          label: Themes.lara_light_green.label,
          command(event: MenuItemCommandEvent) {
            changeStyle(event.item?.label);
          },
        },
        {
          label: Themes.lara_light_amber.label,
          command(event: MenuItemCommandEvent) {
            changeStyle(event.item?.label);
          },
        },
      ],
    },
  ];
  defaultTheme = input.required<ThemeName>();
  constructor() {
    effect(() => {
      changeStyle(Themes[this.defaultTheme()].label);
    });
  }
  ngOnDestroy() {
    changeStyle(Themes.lara_light_blue.label);
  }
}
