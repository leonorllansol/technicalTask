const {Page} = require('./Page');
const {By} = require('selenium-webdriver');

class HomePage extends Page{
    constructor(driver){
        super(driver);
        this.searchBox = By.id('search-box-input');
        this.firstSuggestedResult = By.id('search-box-item-0');
        this.acceptCookiesBtn = By.css('button.cc-modal__btn--daft:not(.cc-modal__btn--secondary)');
    }
    async searchArea(area){
        await this.driver.findElement(this.searchBox).click();
        await this.driver.findElement(this.searchBox).sendKeys(area);
        await this.driver.findElement(this.firstSuggestedResult).click();
    }   

    async acceptCookies(){
        await this.driver.findElement(this.acceptCookiesBtn).click();
    }
}

module.exports.HomePage = HomePage;