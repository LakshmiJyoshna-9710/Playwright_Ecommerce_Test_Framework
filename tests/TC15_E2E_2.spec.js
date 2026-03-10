const {test, expect} = require ("@playwright/test");
const {HomePage} = require("../PageObjects/HomePage");
const {ProductsPage} = require("../PageObjects/ProductsPage");
const {CartPage} = require("../PageObjects/CartPage");
const {LoginPage} = require("../PageObjects/LoginPage");
const { CheckOutPage } = require("../PageObjects/CheckOutPage")
const { PaymentPage } = require("../PageObjects/PaymentPage");
const { AccountPage } = require("../PageObjects/AccountPage");
const {CompleteRegisterHelper} = require("../Utils/CompleteRegisterHelper");
const { createUser } = require("../Utils/RegistrationUserFactory");
/*
Steps
1️⃣ Launch browse
2️⃣ Navigate to URL https://automationexercise.com
3️⃣ Verify that home page is visible successfull
4️⃣ Click Signup / Login button
5️⃣ Fill all details in Signup and create account
6️⃣ Verify ACCOUNT CREATED! and click Continue
7️⃣ Verify Logged in as username at top
8️⃣ Add products to cart
9️⃣ Click Cart button
🔟 Verify that Cart page is displayed
1️⃣1️⃣ Click Proceed To Checkout
1️⃣2️⃣ Verify Address Details and Review Your Order
1️⃣3️⃣ Enter description in comment text area
1️⃣4️⃣ Click Place Order
1️⃣5️⃣ Enter payment details
1️⃣6️⃣ Click Pay and Confirm Order
1️⃣7️⃣ Verify success message Congratulations! Your order has been confirmed!
1️⃣8️⃣ Click Delete Account
1️⃣9️⃣ Verify ACCOUNT DELETED! and click Continue
*/

test('TC15 – Place Order: Register before Checkout', async ({page})=>{

    const index = 1;
    const userData = createUser();
    const commentTxt = "This is Comment";

    const paymentData = {
        name: "Akshay",
        cardNumber: "4111111111111111",
        cvc: "123",
        month: "12",
        year: "2030"
    };


    //Object Creation
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOutPage(page);
    const paymentPage = new PaymentPage(page);
    const accountPage = new AccountPage(page);

    // 1. Launch browser
        await homePage.navigate();

    // 2. Verify Home Page is visible
        await expect(homePage.homeLink).toBeVisible();

    // 3. Click Signup / Login
        await homePage.clickSignupLogin();

    // 4. Verify New User Signup visible
        await expect(loginPage.newUserSignupText).toBeVisible();

    /* 5, 6, 7. Click Register / Login button
          Fill all details in Signup and create account
          Verify ACCOUNT CREATED! and click Continue
    */
        await CompleteRegisterHelper(page, userData);
        await expect(homePage.getLoggedInUser(userData.name)).toBeVisible(); 

    // 8. Add product to cart
        await homePage.clickProductsLink();
        await productPage.addProductToCart(index);

    // 9. Click Cart button
        await productPage.clickCartBtn();

    // 10. Verify that Cart page is displayed
        await expect(page).toHaveURL(cartPage.cartPageUrl);
        
    // 11. Click Proceed to Checkout
        await cartPage.clickProceedToCheckOut();

    // 12. Verify Address Details and Review Your Order
        await expect(checkOutPage.addressDetailsTextLoc).toBeVisible();
        await expect(checkOutPage.reviewYourOrderTextLoc).toBeVisible();

    // 13. Enter description in comment text area
        await checkOutPage.enterComment(commentTxt);

    // 14. Click Place Order
        await checkOutPage.clickPlaceOrderBtn();

    // 15. Payment
    await paymentPage.fillPaymentDetails(paymentData);
    await paymentPage.clickPayConfirm();

    // 16. Verify success
    await expect(paymentPage.orderSuccessMessage).toBeVisible();

    // 17. Delete Account
        await accountPage.deleteAccount();
        await expect(accountPage.accountDeletedText).toBeVisible();
    
    // 18. Click Continue Button
        await accountPage.clickContinue();


})