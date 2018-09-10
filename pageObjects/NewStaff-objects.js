let locators = require("../uitlities/Locators");

let Staff = function () {

    let newStaff = locators.findByXpath("//*[@id='civicrm-menu']/li[4]");
    let newIndividual = locators.findByXpath("//*[@id='root-menu-div']//a[contains(text(),'New Individual')]");
    let prefix = locators.findByXpath("//*[@id='s2id_prefix_id']/a/span[2]");
    let firstName = locators.findById("first_name");
    let emailId = locators.findById("email_1_email");
    let submit = locators.findById("_qf_Contact_upload_view-bottom");

    this.clickStaff = () => {
        newStaff.click();
    };
    this.clickNewIndividual = () => {
        newIndividual.click();
    };
    this.verifyPage = () => {
        let title = browser.getTitle();
        title.then(function (text) {
            expect(text).toEqual("New Individual | CiviHR demo site");
        });
    };
    this.selectPrefix = () => {
        prefix.click();
        locators.findById("select2-result-label-14").click();
    };
    this.giveFirstName = (FirstName) => {
        firstName.sendKeys(FirstName);
    };
    this.giveEmailId = (EmailId) => {
        emailId.sendKeys(EmailId)
    };
    this.clickSubmit = () => {
        submit.click();
    };
    this.verifyRecordPage = () => {
        browser.getTitle().then(function (text) {
            expect(text).toEqual("Mr. Test3 | CiviHR demo site");
        });
    }
};
module.exports = new Staff();