const { test, expect } = require('@playwright/test');
const { HomePage } = require('../PageObjects/HomePage');
const { TestCasesPage } = require('../PageObjects/TestCasesPage');

test('TC7 - Verify Test Cases Page', async ({ page }) => {

    const homepage = new HomePage(page);
    const testcasespage = new TestCasesPage(page);

    // 1. Navigate to URL
    await homepage.navigate();

    // 2. Verify home page is visible
    await expect(homepage.homeLink).toBeVisible();

    // 3. Click Test Cases
    await homepage.clickTestCaseLink();

    // 4. Verify Test Cases page is visible
    await expect(testcasespage.testCasesHeading).toBeVisible();
});