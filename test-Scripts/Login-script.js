let loginPageObject = require("../pageObjects/loginPage-objects");
let data = require("../resources/Data-Source");
let testBase = require("../uitlities/TestBase");

describe('Accessing the website: ', () => {
    
    beforeAll(() => {
        testBase.openBrowser('https://demo.civihrhosting.co.uk/welcome-page');
    });

    it('should login successfully', () => {
        loginPageObject.giveUserName(data.logIn.userName);
        loginPageObject.givePassword(data.logIn.userPassword);
        loginPageObject.clickLogin();
        loginPageObject.verifyPage();
    });

    afterAll(() => {
        testBase.consoleErrorFetcher();
    });

});