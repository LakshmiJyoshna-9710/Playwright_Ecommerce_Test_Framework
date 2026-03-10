const {expect, test} = require ("@playwright/test");
const {RegisterUserHelper} = require("../Utils/RegisterUserHelper");
const {HomePage} = require("../PageObjects/HomePage");
const {LoginPage} = require("../PageObjects/LoginPage");
const {AccountPage} = require("../PageObjects/AccountPage")

test('TestCase - 2 -> LoginUser', async ({page})=>{

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

    //Object creation 
        const homepage = new HomePage(page);
        const loginpage = new LoginPage(page);
        const accountpage = new AccountPage(page);


    // Step 1: Register user
        await RegisterUserHelper(page, userData)

    // Step 2: Click on Logout
        await homepage.clicklogOutBtn();

    // Step 3: Navigation to Home
        await homepage.navigate();

    // Step 4:  Verify that home page is visible successfully
        await expect(homepage.homeLink).toBeVisible();

    // Step 5: Click Signup / Login
        await homepage.clickSignupLogin();

    // Step 6: Verify Login to your Account is visible
        await expect(loginpage.loginToYourAccountText).toBeVisible();

    // Step 7: Enter Login details and click on login button.
        await loginpage.login({
            email : userData.email,
            password : userData.password
        });

    // Step 8: Verify that 'Logged in as username' is visible.
        await expect(homepage.getLoggedInUser(userData.name)).toBeVisible();
    // 11. Delete Account
        await accountpage.deleteAccount();
        await expect(accountpage.accountDeletedText).toBeVisible();
    
    //Click Continue Button
        await accountpage.clickContinue();







});
