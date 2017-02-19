import { TPage } from './app.po';

describe('t App', () => {
  let page: TPage;

  beforeEach(() => {
    page = new TPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
