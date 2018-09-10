describe('angularjs homepage todo list', function() {

    beforeAll(function () {
        browser.ignoreSynchronization = true;
        browser.driver.get("https://demo.civihrhosting.co.uk/welcome-page");
    });

    it('should login', function () {
        element(by.id("edit-name")).sendKeys("Demo")

    });
});
