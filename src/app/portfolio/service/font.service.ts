import { inject, Injectable, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FontService {
  readonly #rf = inject(RendererFactory2);
  readonly #render = this.#rf.createRenderer(null, null);

  setNotoSansJP() {
    const id = 'noto-sans-jp';
    if (!document.getElementById(id)) {
      const link1: HTMLLinkElement = this.#render.createElement('link');
      link1.rel = 'preconnect';
      link1.href = 'https://fonts.googleapis.com';
      const link2: HTMLLinkElement = this.#render.createElement('link');
      link2.rel = 'preconnect';
      link2.href = 'https://fonts.gstatic.com';
      link2.crossOrigin = '';
      const link3: HTMLLinkElement = this.#render.createElement('link');
      link3.rel = 'preload';
      link3.href =
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=PT+Mono&display=swap';
      link3.as = 'style';
      link3.fetchPriority = 'low';
      link3.id = id;
      const link4: HTMLLinkElement = this.#render.createElement('link');
      link4.rel = 'stylesheet';
      link4.href =
        'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&family=PT+Mono&display=swap';
      link4.media = 'print';
      link4.onload = () => {
        link4.media = 'all';
      };
      this.#render.appendChild(document.head, link1);
      this.#render.appendChild(document.head, link2);
      this.#render.appendChild(document.head, link3);
      this.#render.appendChild(document.head, link4);
    }
  }
}
