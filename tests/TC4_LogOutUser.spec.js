const {expect, test} = require ("@playwright/test");
const {HomePage} = require ("../PageObjects/HomePage");
const {AccountPage} = require("../PageObjects/AccountPage");
const {LoginPage} = require("../PageObjects/LoginPage");
const { RegisterUserHelper } = require("../Utils/RegisterUserHelper");
const {createUser} = require("../Utils/RegistrationUserFactory");

test("TC3 - LogOutUser", async ({page}) =>{

    const userData = createUser()

    const homepage = new HomePage(page);
    const loginpage = new LoginPage(page);

    // Step 1: Register user (setup)
        await RegisterUserHelper(page, userData);
    
    // Step 2: Verify logged in
        await expect(
            homepage.getLoggedInUser(userData.name)
        ).toBeVisible();

    // Step 3: Click Logout
        await homepage.clicklogOutBtn();

    // Step 4: Verify redirected to Login page
        await expect(loginpage.loginToYourAccountText)
            .toBeVisible();
        });

    
   



