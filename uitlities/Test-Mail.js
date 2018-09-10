describe('Test', () => {

    it('should ', () => {
        browser.wait(browser.params.getLastEmail())
            .then((email) => {
            //expect(email['subject']).toEqual("Answer the Call for Code.");
            expect(email['subject']).toContain("amitesh, welcome to your new Google Account");
            expect(email['from']).toContain("Google Community Team <googlecommunityteam-noreply@google.com>"); //should contain from address
            //expect(email['headers'].to).toEqual("aiman.shabbir@hackerearth.com");
            console.log(email['text']);
        });
    });
});