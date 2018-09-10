
let  TestBase = function () {
    this.openBrowser = function(url) {
        browser.ignoreSynchronization = true;
        browser.manage().deleteAllCookies();
        browser.get(url);
    };
    this.consoleErrorFetcher = () => {
        //To trace the console error of site.
        browser.manage().logs().get('browser').then(function (browserLog) {
            console.error('Console Error: ' + JSON.stringify(browserLog));
        });
        //activity wait's for all the elements to load.
        browser.waitForAngular();
    }
};
module.exports = new TestBase();