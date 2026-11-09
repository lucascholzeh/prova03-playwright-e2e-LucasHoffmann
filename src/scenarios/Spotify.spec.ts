import { test } from '@playwright/test';
import SpotifyPage from '../support/pages/SpotifyPage';

test.describe('Spotify Web Player E2E', () => {
  let spotifyPage: SpotifyPage;

  test.beforeEach(async ({ page }) => {
    spotifyPage = new SpotifyPage(page);
    await spotifyPage.open();
  });

  test('deve carregar a home com busca e botoes de acesso', async () => {
    await spotifyPage.verifyTitle(/Spotify/);
    await spotifyPage.checkHomeLoaded();
  });

  test('deve buscar por Legiao Urbana e exibir musicas e artistas', async () => {
    await spotifyPage.search('Legião Urbana');

    await spotifyPage.verifyUrl(/\/search\/Legi%C3%A3o%20Urbana/);
    await spotifyPage.checkSearchResults();
  });

  test('deve abrir a pagina do artista a partir da busca', async () => {
    await spotifyPage.search('Legião Urbana');
    await spotifyPage.checkSearchResults();

    await spotifyPage.openArtist('Legião Urbana');

    await spotifyPage.verifyUrl(/\/artist\//);
    await spotifyPage.checkArtistPage('Legião Urbana');
  });
});
