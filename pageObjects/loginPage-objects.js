let locators = require("../uitlities/Locators");

let loginPage = function (userName, userPassword) {

    let username = locators.findById("edit-name");
    let password = locators.findById("edit-pass");
    let logIn = locators.findById("edit-submit");

    this.navigateToSite = () => {
        browser.driver.get("https://demo.civihrhosting.co.uk/welcome-page");
    };
    this.giveUserName = (userName) => {
        username.sendKeys(userName);
    };
    this.givePassword = (userPassword) => {
        password.sendKeys(userPassword);
    };
    this.clickLogin = () => {
        logIn.click();
    };
    this.verifyPage = () => {
        let title = browser.getTitle();
        title.then((text) => {
            expect(text).toEqual("Dashboard | CiviHR demo site")
        });
    }
};

module.exports = new loginPage();