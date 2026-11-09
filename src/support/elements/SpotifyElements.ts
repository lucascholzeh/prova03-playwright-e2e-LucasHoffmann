import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class SpotifyElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getSearchField(): Locator {
    return this.page.getByTestId('search-input');
  }

  getLoginButton(): Locator {
    return this.page.getByRole('button', { name: 'Entrar' }).first();
  }

  getSignUpButton(): Locator {
    return this.page.getByRole('button', { name: 'Inscrever-se' }).first();
  }

  getSongsSection(): Locator {
    return this.page.getByRole('region', { name: 'Músicas', exact: true });
  }

  getArtistsSection(): Locator {
    return this.page.getByRole('region', { name: 'Artistas', exact: true });
  }

  getArtistLink(name: string): Locator {
    return this.page
      .locator('main a[href*="/artist/"]')
      .filter({ hasText: name })
      .first();
  }

  getArtistHeading(name: string): Locator {
    return this.page.getByRole('heading', { level: 1, name });
  }
}
