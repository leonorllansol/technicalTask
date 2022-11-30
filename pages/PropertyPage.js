const {Page} = require('./Page');
const {By} = require('selenium-webdriver');

class PropertyPage extends Page{
    async getXpath(type, text){
        let newText;
        if (type=='lower'){
            newText = text.toLowerCase();
        }
        else if (type=='upper'){
            newText = text.toUpperCase();
        }
        else if (type=='capitalised'){
            newText = text.charAt(0).toUpperCase() + text.slice(1);
        }
        return "//*[contains(text(), '"+ newText + "')]";
    }
    async findText(text){
        // searching for text in lower case, upper case and capitalized 
        let elements_lower = await this.driver.findElements(By.xpath(this.getXpath('lower',text)));
        let elements_upper = await this.driver.findElements(By.xpath(this.getXpath('upper',text)));
        let elements_capitalised = await this.driver.findElements(By.xpath(this.getXpath('capitalised',text)));

        return elements_lower.length > 0 || elements_upper.length > 0 || elements_capitalised.length > 0;
    }
}

module.exports.PropertyPage = PropertyPage;