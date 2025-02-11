import { inject, Injectable, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FaviconService {
  readonly #rf = inject(RendererFactory2);
  readonly #render = this.#rf.createRenderer(null, null);

  serFavicon(iconUrl: string) {
    const link: HTMLLinkElement =
      document.getElementById('favicon') ?? this.#render.createElement('link');
    link.id = 'favicon';
    link.rel = 'icon';
    link.href = iconUrl;
    if (!document.getElementById('favicon')) {
      this.#render.appendChild(document.head, link);
    }
  }
}
