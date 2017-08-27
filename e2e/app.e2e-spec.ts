import { EyesPage } from './app.po';

describe('eyes App', () => {
  let page: EyesPage;

  beforeEach(() => {
    page = new EyesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
