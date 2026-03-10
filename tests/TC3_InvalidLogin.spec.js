const {expect, test} = require("@playwright/test");
const {HomePage} = require("../PageObjects/HomePage");
const {LoginPage} = require("../PageObjects/LoginPage");
const  invalidLoginData = require("../Data/invalidLoginData.json")
test.describe('TestCase - 3 - Invalid Login Scenarios', ()=>{
    
    invalidLoginData.forEach(data =>{

        test( `Invalid Login - ${data.scenario}`, async ({page}) => {

    //Object creation
    const homepage = new HomePage(page);
    const loginpage = new LoginPage(page);
    
    // 1 Browser Navigation
        await homepage.navigate();

    // 2 Verify that home page is visible successfully
        await expect(homepage.homeLink).toBeVisible();

    // 3 Click Signup / Login
        await homepage.clickSignupLogin();

    // 4 Verify Login to your Account is visible
        await expect(loginpage.loginToYourAccountText).toBeVisible();

    // 5 Enter incorrect email address and password + Click Login Button
        await loginpage.login(data);

    // 8 Verify error 'Your email or password is incorrect!' is visible
        await expect(loginpage.invalidLoginMessageText).toHaveText('Your email or password is incorrect!');
        })
    })
}
);