import { ApplicationConfig } from '@angular/core';

import { provideMarkdown } from 'ngx-markdown';

export const PortfolioConfig: ApplicationConfig = {
  providers: [provideMarkdown()],
};
