import { Page, expect } from '@playwright/test';
import SpotifyElements from '../elements/SpotifyElements';
import BasePage from './BasePage';

export default class SpotifyPage extends BasePage {
  readonly spotifyElements: SpotifyElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.spotifyElements = new SpotifyElements(page);
  }

  async open(): Promise<void> {
    await this.page.goto('https://open.spotify.com/', {
      waitUntil: 'domcontentloaded'
    });
  }

  async checkHomeLoaded(): Promise<void> {
    await expect(this.spotifyElements.getSearchField()).toBeVisible();
    await expect(this.spotifyElements.getLoginButton()).toBeVisible();
    await expect(this.spotifyElements.getSignUpButton()).toBeVisible();
  }

  async search(term: string): Promise<void> {
    const field = this.spotifyElements.getSearchField();
    await field.fill(term);
    await field.press('Enter');
  }

  async checkSearchResults(): Promise<void> {
    await expect(this.spotifyElements.getSongsSection()).toBeVisible();
    await expect(this.spotifyElements.getArtistsSection()).toBeVisible();
  }

  async openArtist(name: string): Promise<void> {
    await this.spotifyElements.getArtistLink(name).click();
  }

  async checkArtistPage(name: string): Promise<void> {
    await expect(this.spotifyElements.getArtistHeading(name)).toBeVisible();
  }
}
