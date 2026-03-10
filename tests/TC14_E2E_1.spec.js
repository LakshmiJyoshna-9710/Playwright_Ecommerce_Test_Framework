const {test, expect} = require ("@playwright/test");
const {HomePage} = require("../PageObjects/HomePage");
const {ProductsPage} = require("../PageObjects/ProductsPage");
const {CartPage} = require("../PageObjects/CartPage");
const {HeaderPage} = require("../PageObjects/HeaderPage");
const { CheckOutPage } = require("../PageObjects/CheckOutPage")
const { PaymentPage } = require("../PageObjects/PaymentPage");
const { AccountPage } = require("../PageObjects/AccountPage");
const {CompleteRegisterHelper} = require("../Utils/CompleteRegisterHelper");
const { createUser } = require("../Utils/RegistrationUserFactory");

/*
Steps
1️⃣ Launch browse
2️⃣ Navigate to URL
3️⃣ Verify that home page is visible successfully
4️⃣ Add products to cart
5️⃣ Click Cart button
6️⃣ Verify that Cart page is displayed
7️⃣ Click Proceed To Checkout
8️⃣ Click Register / Login button
9️⃣ Fill all details in Signup and create account
🔟 Verify ACCOUNT CREATED! and click Continue
1️⃣1️⃣ Verify Logged in as username at top
1️⃣2️⃣ Click Cart button
1️⃣3️⃣ Click Proceed To Checkout
1️⃣4️⃣ Verify Address Details and Review Your Order
1️⃣5️⃣ Enter description in comment text area
1️⃣6️⃣ Click Place Order
1️⃣7️⃣ Enter payment details
1️⃣8️⃣ Click Pay and Confirm Order
1️⃣9️⃣ Verify success message 'Your order has been placed successfully!'
2️⃣0️⃣ Click Delete Account
2️⃣1️⃣ Verify ACCOUNT DELETED! and click Continue
*/

test('TC14 — Place Order: Register While Checkout', async ({page})=>{

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
    const productPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const headerPage = new HeaderPage(page);
    const checkOutPage = new CheckOutPage(page);
    const paymentPage = new PaymentPage(page);
    const accountPage = new AccountPage(page);


    // 1. Launch browser
        await homePage.navigate();

    // 2. Verify Home Page is visible
        await expect(homePage.homeLink).toBeVisible();

    // 3. Add product to cart
        await homePage.clickProductsLink();
        await productPage.addProductToCart(index);

    // 4. Click Cart button
        await productPage.clickCartBtn();

    // 5. Verify that Cart page is displayed
        await expect(page).toHaveURL(cartPage.cartPageUrl);
        
    // 6. Click Proceed to Checkout
        await cartPage.clickProceedToCheckOut();

    // 7. Click Register / Login
        await cartPage.clickRegisterLoginLink();

    /* 8, 9, 10. Click Register / Login button
          Fill all details in Signup and create account
          Verify ACCOUNT CREATED! and click Continue
    */
        await CompleteRegisterHelper(page, userData);
        await expect(homePage.getLoggedInUser(userData.name)).toBeVisible();

    // 11. Click Cart button
        await headerPage.clickCartLink();

    // 12. Click Proceed To Checkout
        await cartPage.clickProceedToCheckOut();

    // 13. Verify Address Details and Review Your Order
        await expect(checkOutPage.addressDetailsTextLoc).toBeVisible();
        await expect(checkOutPage.reviewYourOrderTextLoc).toBeVisible();

    // 14. Enter description in comment text area
        await checkOutPage.enterComment(commentTxt);

    // 15. Click Place Order
        await checkOutPage.clickPlaceOrderBtn();

    // 16. Payment
    await paymentPage.fillPaymentDetails(paymentData);
    await paymentPage.clickPayConfirm();

    // 17. Verify success
    await expect(paymentPage.orderSuccessMessage).toBeVisible();

    // 18. Delete Account
        await accountPage.deleteAccount();
        await expect(accountPage.accountDeletedText).toBeVisible();
    
    // 19. Click Continue Button
        await accountPage.clickContinue();

});
