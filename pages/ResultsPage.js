const {Page} = require('./Page');
const {By, until} = require('selenium-webdriver');

class ResultsPage extends Page{
    constructor(driver){
        super(driver);
        this.numberOfResultsText = By.css("*[data-testid='search-h1']");
        this.resultContainer = By.css("[class*='SearchPage__Result']");
        this.filtersBtn = By.css("*[aria-label='Filters']");
        this.applyFilterBtn = By.css("*[data-testid='filters-modal-show-results-button']");
        this.keywordFilter = By.id("keywordtermsModal");
        this.closePopupBtn = By.css("*[data-testid='close-modal-button']");
    }

    async resultCount(){
        try{
            let element = await this.driver.findElement(this.numberOfResultsText);
            let text = await element.getText();
            let count = text.split(' ')[0];
            return parseInt(count);
        }
        catch (err){
            return 0;
        }
    }

    async hasResults(){
        this.numberOfResults = await this.resultCount();
        return this.numberOfResults > 0;
    }

    async openResult(n){
        let results = await this.driver.findElements(this.resultContainer);
        await results[n].click();
    }

    async waitForFilterToApply(){
        // waiting for number of results text to change, as filter takes a few seconds to apply
        let regexStr = '^((?!'+this.numberOfResults.toString()+').)*$';
        const regex = new RegExp(regexStr);
        await this.driver.wait(until.elementTextMatches(this.driver.findElement(this.numberOfResultsText), regex), 10000);
    }

    async openFilters(){
        await this.driver.findElement(this.filtersBtn).click();
    }

    async applyFilters(){
        await this.driver.findElement(this.applyFilterBtn).click();
    }

    async filterByKeyword(keyword){
        await this.driver.findElement(this.keywordFilter).click();
        await this.driver.findElement(this.keywordFilter).sendKeys(keyword);
    }

    async closeBudgetPopup(){
        let elements = await this.driver.findElements(this.closePopupBtn);
        if (elements.length > 0){
            await elements[0].click();
        }
    }
}

module.exports.ResultsPage = ResultsPage;