Feature('test');

Scenario('test something', (I) => {
  I.amOnPage('/');
  I.wait(4);
  I.see('test');
  I.wait(2);
  I.refreshPage();
  I.dontSee('nuthin');
  //let url = yield I.grabBrowserUrl();
  I.wait(4);
});
