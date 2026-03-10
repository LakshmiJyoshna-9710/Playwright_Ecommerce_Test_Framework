const {HomePage} =  require("../PageObjects/HomePage");
const {LoginPage} = require("../PageObjects/LoginPage");
const {AccountPage} = require("../PageObjects/AccountPage");

async function RegisterUserHelper(page, userData) {

    const homepage = new HomePage(page);
    const loginpage = new LoginPage(page);
    const accountpage = new AccountPage(page);

    await homepage.navigate();
    await homepage.clickSignupLogin();


    await loginpage.signup(userData);

    await accountpage.fillAccountDetails(userData);
    await accountpage.fillAddressDetails(userData);

    await accountpage.createAccount();
    await accountpage.continueAfterCreation();
    }

module.exports = { RegisterUserHelper };