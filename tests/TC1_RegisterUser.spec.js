const {test, expect} =  require ('@playwright/test');
const {HomePage} =  require("../PageObjects/HomePage");
const {LoginPage} = require("../PageObjects/LoginPage");
const {AccountPage} = require("../PageObjects/AccountPage");
const {createUser} = require("../Utils/RegistrationUserFactory");

test('TestCase - 1 -> RegisterUser', async ({page})=>{

//Created DataFacotry for UseCreation and called the function here 
const userData = createUser();

//Object creation 
const homepage = new HomePage(page);
const loginpage = new LoginPage(page);
const accountpage = new AccountPage(page);

// 1. Navigate SignUp Page.
    await homepage.navigate();

// 2  Verify that home page is visible successfully
    await expect(homepage.homeLink).toBeVisible();

// 2. Click Signup / Login
    await homepage.clickSignupLogin();

// 3. Verify New User Signup visible
    await expect(loginpage.newUserSignupText).toBeVisible();

// 4. Enter name & email
    await loginpage.signup(userData);

// Verify Account Details fill text 
    await expect(accountpage.accountInfoTextCheck).toBeVisible();

// 5. Fill Account Details
    await accountpage.fillAccountDetails(userData);

// 6. Fill Address Details
    await accountpage.fillAddressDetails(userData);

// 7. Create Account
    await accountpage.createAccount();

// 8. Verify Account Created
    await expect(accountpage.accountCreatedText).toBeVisible();
    

// 9. Click Continue
    await accountpage.continueAfterCreation();

 // 10. Verify Logged in as username (TEST FILE ASSERTION)
    await expect(
        homepage.getLoggedInUser(userData.name)).toBeVisible();

// 11. Delete Account
    await accountpage.deleteAccount();
    await expect(accountpage.accountDeletedText).toBeVisible();
    
//Click Continue Button
    await accountpage.clickContinue();

}

);

