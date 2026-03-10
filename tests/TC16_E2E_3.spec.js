const {test, expect} = require ("@playwright/test");
const {HomePage} = require("../PageObjects/HomePage");
const {ProductsPage} = require("../PageObjects/ProductsPage");
const {CartPage} = require("../PageObjects/CartPage");
const {LoginPage} = require("../PageObjects/LoginPage");
const { CheckOutPage } = require("../PageObjects/CheckOutPage")
const { PaymentPage } = require("../PageObjects/PaymentPage");
const { AccountPage } = require("../PageObjects/AccountPage");
const {RegisterUserHelper} = require("../Utils/RegisterUserHelper");
/*
Steps
1️⃣ Launch browse
2️⃣ Navigate to URL https://automationexercise.com
3️⃣ Verify that home page is visible successfull
4️⃣ Click Signup / Login button
5️⃣ Fill email & password 
6️⃣ click 'Login' button
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

test('TC16 – Place Order: Login before Checkout', async ({page})=>{

    const index = 1;
    const commentTxt = "This is Comment";

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
    }

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

    // Step 1: Register user
        await RegisterUserHelper(page, userData)

    // Step 2: Click on Logout
        await homePage.clicklogOutBtn();

    // 2. Verify Home Page is visible
        await expect(homePage.homeLink).toBeVisible();

    // 3. Click Signup / Login
        await homePage.clickSignupLogin();

    // 4. Fill email, password and click 'Login' button
            await loginPage.login({
                    email : userData.email,
                    password : userData.password
                });

        await expect(homePage.getLoggedInUser(userData.name)).toBeVisible(); 

    // 5. Add product to cart
        await homePage.clickProductsLink();
        await productPage.addProductToCart(index);

    // 10. Click Cart button
        await productPage.clickCartBtn();

    // 11. Verify that Cart page is displayed
        await expect(page).toHaveURL(cartPage.cartPageUrl);
        
    // 12. Click Proceed to Checkout
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


})