const { Builder, By, until} = require('selenium-webdriver');
const assert = require('assert');
const {HomePage} = require('../pages/HomePage');
const {ResultsPage} = require('../pages/ResultsPage');
const { PropertyPage } = require('../pages/PropertyPage');
const { create } = require('domain');
require("chromedriver");

var url = 'http://www.daft.ie';
var area = 'Dublin (County)';
var keyword = 'garage';

var driver;
var homePage;
var resultsPage;
var propertyPage;

async function createPages(){
  driver = new Builder()
  .forBrowser('chrome')
  .build();
  await driver.manage().setTimeouts( { implicit: 5000 } );
  driver.get(url); 
  homePage = new HomePage(driver);
  resultsPage = new ResultsPage(driver);
  propertyPage = new PropertyPage(driver);
}

describe('Technical task', function(){
  describe('Filters', function(){

    beforeEach(async function () {
      this.timeout(5000);
      await createPages();
    });

    it('Keyword filter should work', async function(){
      this.timeout(40000);
      await homePage.acceptCookies();
      await homePage.searchArea(area);
      await resultsPage.closeBudgetPopup();
      
      assert(await resultsPage.hasResults());

      await resultsPage.openFilters();
      await resultsPage.filterByKeyword(keyword);
      await resultsPage.applyFilters();

      await resultsPage.waitForFilterToApply();

      assert(await resultsPage.hasResults());
      await resultsPage.openResult(0);

      assert(await propertyPage.findText(keyword));
    });

    afterEach(async function () {
      await driver.quit();
    });
  })
})

