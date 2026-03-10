const { test, expect } = require("@playwright/test");
const path = require("path");

/*
1 Launch browser
2 Navigate to https://automationexercise.com
3 Verify home page is visible successfully
4 Add product to cart
5 Click Cart button
6 Verify that Cart page is displayed
7 Click Proceed To Checkout
8 Click Register / Login button
9 Register new user
10 Verify 'ACCOUNT CREATED!' is visible
11 Click Continue
12 Verify 'Logged in as username'
13 Click Cart button
14 Click Proceed To Checkout
15 Verify Address Details and Review Your Order
16 Enter description in comment text area
17 Click Place Order
18 Enter payment details
19 Click Pay and Confirm Order
20 Verify success message 'Your order has been placed successfully!'
21 Click Download Invoice
22 Verify invoice file downloaded successfully
23 Click Continue
24 Click Delete Account
25 Verify ACCOUNT DELETED!
*/

const { HomePage } = require("../PageObjects/HomePage");
const { ProductsPage } = require("../PageObjects/ProductsPage");
const { CartPage } = require("../PageObjects/CartPage");
const { CheckOutPage } = require("../PageObjects/CheckOutPage");
const { PaymentPage } = require("../PageObjects/PaymentPage");
const { AccountPage } = require("../PageObjects/AccountPage");
const { RegisterUserHelper } = require("../Utils/RegisterUserHelper");

test('TC24 – Download Invoice after Purchase', async ({ page }) => {

const homePage = new HomePage(page);
const productsPage = new ProductsPage(page);
const cartPage = new CartPage(page);
const checkOutPage = new CheckOutPage(page);
const paymentPage = new PaymentPage(page);
const accountPage = new AccountPage(page);

const userData = {
name: 'Akshay',
email: `test${Date.now()}@mail.com`,
gender: 'Mrs',
password: 'Test@123',
day: '10',
month: '5',
year: '1998',
firstName: 'Akshay',
lastName: 'Kumar',
company: 'ABC Pvt Ltd',
address: 'Street 1',
country: 'India',
state: 'Telangana',
city: 'Hyderabad',
zipcode: '500001',
mobile: '9876543210'
};

const paymentData = {
name: "Akshay",
cardNumber: "4111111111111111",
cvc: "123",
month: "12",
year: "2030"
};


// Step 1
await homePage.navigate();

// Step 2
await expect(homePage.homeLink).toBeVisible();

// Step 3 Add product
await homePage.clickProductsLink();
await productsPage.addProductToCart(1);

// Step 4 Open cart
await productsPage.clickCartBtn();

// Step 5 Verify cart page
await expect(page).toHaveURL(/view_cart/);

// Step 6 Proceed to checkout
await cartPage.clickProceedToCheckOut();

// Step 7 Click Register/Login
await cartPage.clickRegisterLoginLink();

// Step 8 Register user
await RegisterUserHelper(page, userData);

// Step 9 Verify logged in
await expect(homePage.getLoggedInUser(userData.name)).toBeVisible();

// Step 10 Open cart again
await homePage.clickCartBtn();

// Step 11 Checkout again
await cartPage.clickProceedToCheckOut();

// Step 12 Verify address section
await expect(checkOutPage.addressDetailsTextLoc).toBeVisible();

// Step 13 Verify order review section
await expect(checkOutPage.reviewYourOrderTextLoc).toBeVisible();

// Step 14 Enter comment
await checkOutPage.enterComment("Order comment test");

// Step 15 Place order
await checkOutPage.clickPlaceOrderBtn();

// Step 16 Fill payment
await paymentPage.fillPaymentDetails(paymentData);

// Step 17 Confirm payment
await paymentPage.clickPayConfirm();

// Step 18 Verify order success
await expect(paymentPage.orderSuccessMessage).toBeVisible();

// Step 19 Download invoice
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        paymentPage.downloadInvoiceBtn.click()
    ]);
// Step 20 Verify file downloaded
expect(download.suggestedFilename()).toContain("invoice");

// Step 21 Save file locally
const filePath = path.join(__dirname, "../Downloads", download.suggestedFilename());

await download.saveAs(filePath);

// Step 22 Verify file exists
const fs = require("fs");
expect(fs.existsSync(filePath)).toBeTruthy();

// Step 23 Continue
await paymentPage.continueBtn.click();

// Step 24 Delete account
await accountPage.deleteAccount();

// Step 25 Verify deletion
await expect(accountPage.accountDeletedText).toBeVisible();

});