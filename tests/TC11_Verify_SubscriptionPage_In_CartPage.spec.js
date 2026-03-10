const {test, expect} = require("@playwright/test");
const { HomePage } = require('../PageObjects/HomePage');
const { FooterPage } = require('../PageObjects/FooterPage');

/*
Steps:
Launch browser
Navigate to URL
Verify home page is visible
Click Cart Button
Scroll down to footer
Verify text "SUBSCRIPTION"
Enter email address
Click arrow button
Verify success message
*/

test('TC11 - Verify Subscription in Cart Page', async ({ page }) => {

  const homepage = new HomePage(page);
  const footerPage = new FooterPage(page);

  const email = `test${Date.now()}@mail.com`;

  // 1️⃣ Navigate
  await homepage.navigate();

  // 2️⃣ Verify home visible
  await expect(homepage.homeLink).toBeVisible();

  // Click Cart Button
   await homepage.clickCartBtn();

  // 3️⃣ Scroll to footer
  await footerPage.scrollToFooter();

  // 4️⃣ Verify Subscription heading
  await expect(footerPage.subscriptionHeading).toBeVisible();

  // 5️⃣ Subscribe
  await footerPage.enterEmail(email);
  await footerPage.clickSubscribe();

  // 6️⃣ Verify success
  await expect(footerPage.successMessage).toBeVisible();
});