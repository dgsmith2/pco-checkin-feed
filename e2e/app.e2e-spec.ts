import { OccCheckInFeedPage } from './app.po';

describe('occ-check-in-feed App', function() {
  let page: OccCheckInFeedPage;

  beforeEach(() => {
    page = new OccCheckInFeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
