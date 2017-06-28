import { NgxAlertsPage } from './app.po';

describe('ngx-alerts App', () => {
  let page: NgxAlertsPage;

  beforeEach(() => {
    page = new NgxAlertsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
