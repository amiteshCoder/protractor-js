let staff = require("../pageObjects/NewStaff-objects");
let loginPageObject = require("../pageObjects/loginPage-objects");
let data = require("../resources/Data-Source");
let testBase = require("../uitlities/TestBase");

describe('creating a new staff: ', () => {

    beforeAll(() => {
        testBase.openBrowser('https://demo.civihrhosting.co.uk/welcome-page');
    });

    it('should login successfully', () => {
        loginPageObject.giveUserName(data.logIn.userName);
        loginPageObject.givePassword(data.logIn.userPassword);
        loginPageObject.clickLogin();
        loginPageObject.verifyPage();
        browser.sleep(4000)
    });

    it('should click on staff', () => {
        staff.clickStaff();
        browser.sleep(500);
        staff.clickNewIndividual();
        browser.sleep(1000);
        staff.verifyPage();
        staff.selectPrefix();
        browser.sleep(1000);
        staff.giveFirstName(data.newIndividual.FirstName);
        staff.giveEmailId(data.newIndividual.EmailId);
        staff.clickSubmit();
        browser.sleep(2000);
        staff.verifyRecordPage();
        browser.sleep(1000);
    });

    afterAll(() => {
        testBase.consoleErrorFetcher();
    });
});