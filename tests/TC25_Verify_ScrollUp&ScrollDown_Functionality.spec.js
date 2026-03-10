const { test, expect } = require("@playwright/test");
const { HomePage } = require("../PageObjects/HomePage");

/*
TC26 – Verify Scroll Up without using Arrow button and Scroll Down functionality

1 Launch browser
2 Navigate to URL
3 Verify home page visible
4 Scroll down page to bottom
5 Verify 'SUBSCRIPTION' visible
6 Scroll up page to top
7 Verify top banner text visible
*/

test('TC26 – Verify Scroll Up without Arrow Button', async ({ page }) => {

    const homePage = new HomePage(page);

    // Navigate
    await homePage.navigate();

    // Verify home page
    await expect(homePage.homeLink).toBeVisible();

    // Scroll to bottom
    await homePage.scrollToBottom();

    // Verify subscription section
    await expect(homePage.subscriptionHeading).toBeVisible();

    // Scroll back to top
    await homePage.scrollToTop();

    // Verify top text
    await expect(homePage.topBannerText).toBeVisible();

});