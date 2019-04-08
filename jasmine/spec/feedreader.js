/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have URL defined and URL is not empty', function(){
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toEqual(0);
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have a name defined and a name is not empty', function () {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toEqual(0);
            }
        });
    });

    /*  
    * This suite is all about "The menu" and its behaviour
    * when user clicks on it.
    */
    describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: the menu is displayed when
          * clicked and it is hidden when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function(){
            let menuIcon = $('.menu-icon-link'); // grabbing HTML anchor element by its class

            menuIcon.click(); //simulating mouse click
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* 
    * This suite is all about "Initial Entries" and its behaviour
    * when loadFeed function is called and completes its work.
    */
    describe('Initial Entries', function () {

        // loadFeed() is asynchronous so this test will require the use of Jasmine's beforeEach and asynchronous done() function.
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            });
        });

        /* Test that ensures when the loadFeed
        * function is called and completes its work, there is at least
        * a single .entry element within the .feed container.
        */
        it('is at least a single .entry element within the .feed container', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        });

    });
  
    /*
    * This suite is all about "New Feed Selection" and its behaviour
    * when new feed is loaded the content actually changes.
    */
    describe('New Feed Selection', function () {
        //variables to hold different feeds
        let newFeedSelected; 
        let oldFeed;

        // loadFeed() is asynchronous so this test will require the use of Jasmine's beforeEach and asynchronous done() function.
        beforeEach(function(done) {
            loadFeed(0, function () {
                oldFeed = $('.feed').html();
                loadFeed(1, function () {
                    newFeedSelected = $('.feed').html();
                    done();
                });
            });
        });

        /* Test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        */
        it('ensures a new feed is loaded', function(){
            expect(newFeedSelected).not.toEqual(oldFeed);
        });
    });
}());
