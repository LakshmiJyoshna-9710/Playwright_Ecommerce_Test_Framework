const { test, expect } = require('@playwright/test');
const { createUser } = require('../Utils/RegistrationUserFactory');
const { RegisterUserHelper } = require('../Utils/RegisterUserHelper');
const { HomePage } = require('../PageObjects/HomePage');
const { LoginPage } = require('../PageObjects/LoginPage');
const { AccountPage } = require('../PageObjects/AccountPage');

test('TC5 - Register with Existing Email', async ({ page }) => {

  const userData = createUser();

  const homepage = new HomePage(page);
  const loginpage = new LoginPage(page);
  //const accountpage = new AccountPage(page);

  // Step 1: Register user (so email exists in system)
    await RegisterUserHelper(page, userData);

  //Click on Logout button
    await homepage.clicklogOutBtn();
    
  // 3. Verify New User Signup visible
    await expect(loginpage.newUserSignupText).toBeVisible();

// 4. Enter name, email and click signup button
    await loginpage.signup(userData);

//Verify error 'Email Address already exist!' is visible.
    await expect(loginpage.existingErrorEmailMessage).toBeVisible();
    await expect(loginpage.existingErrorEmailMessage).toHaveText('Email Address already exist!');
});