import { ApplicationConfig } from '@angular/core';

import { provideMarkdown } from 'ngx-markdown';

export const ArticleConfig: ApplicationConfig = {
  providers: [provideMarkdown()],
};
