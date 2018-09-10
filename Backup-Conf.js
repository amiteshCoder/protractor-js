let Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

// Connecting directing to the conf file
exports.config = {
    directConnect: true,
    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome'
    },
    // multiCapabilities: [
    //     //{browserName: 'firefox'},
    //     {browserName: 'chrome'}
    // ],

    // Framework to use. Jasmine is recommended.
    framework: 'jasmine2',
    // Spec patterns are relative to the current working directory when protractor is called.

    specs: ['./test-Scripts/New-Staff.js'],
    specs: ['./Test-Mail.js'],
    // Options to be passed to Jasmine.
    jasmineNodeOpts: {
        showColors: true,
        DEFAULT_TIMEOUT_INTERVAL: 10000,
        includeStackTrace: true,
        isVerbose: true
    },

    // on initial environment is set where reports are added.
    onPrepare: function() {
        browser.driver.fullscreen();

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: 'testReport',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true,
                cleanDestination: false,
                fileName: 'HTML-Test-Run'
            })
        );

        let MailListener = require("mail-listener2");

        let mailListener = new MailListener({
            username: "amitesh.test01@gmail.com", // email or userName
            password: "Amitesh90", // password
            host: "imap.gmail.com", // e.g. imap.gmail.com
            port: 993,
            tls: true,
            fetchUnreadOnStart: true,
            tlsOptions: { rejectUnauthorized: false },
            mailbox: "INBOX", // mailbox to monitor
            searchFilter: ["UNSEEN", "UNFLAGGED"], // the search filter being used after an IDLE notification has been retrieved
            markSeen: true,
            mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib.
            attachments: true, // download attachments as they are encountered to the project directory
            attachmentOptions: { directory: "attachments/" }
        });

        mailListener.on("server:connected", function() {
            console.log("imapConnected");
        });
        mailListener.on("server:disconnected", function() {
            console.log("imapDisconnected");
        });
        mailListener.on("error", function(err) {
            console.log(err);
        });

        var count = 0;
        mailListener.on("mail", function(mail, seqno, attributes) {
            let mailuid = attributes.uid;
            let toMailbox = '[Gmail]/All Mail';
            let i = ++count;
            if (i > 2) {
                mailListener.stop(); // start listening
                return;
            }
            console.log('attempting to mark msg read/seen');
            mailListener.imap.addFlags(mailuid, '\\Seen', function(err) {
                if (err) {
                    console.log('error marking message read/SEEN');
                    return;
                }
                console.log('moving ' + (seqno || '?') + ' to ' + toMailbox);
                mailListener.imap.move(mailuid, toMailbox, function(err) {
                    if (err) {
                        console.log('error moving message');
                        return;
                    }
                    console.log('moved ' + (seqno || '?'), mail.subject);
                });
            });
        });

        mailListener.start(); // start listening
        setTimeout(function() {
            mailListener.stop(); // start listening
        }, 60 * 1000);

        global.mailListener = mailListener;

    },

    params: {
        getLastEmail: function() {
            const deferred = protractor.promise.defer();
            console.log("Waiting for email...");

            let count = 0;
            mailListener.on("mail", function(mail, seqno, attributes) {
                let mailuid = attributes.uid;
                let toMailbox = '[Gmail]/All Mail';
                let i = ++count;
                if (i > 2) {
                    mailListener.stop(); // start listening
                    return;
                }
                testContent = {
                    i: i,
                    subject: mail.subject,
                    seqno: seqno,
                    uid: attributes.uid,
                    attributes: attributes,
                    text: mail.html
                };
                deferred.fulfill(mail);
            });
            return deferred.promise;
        }
    },
};

