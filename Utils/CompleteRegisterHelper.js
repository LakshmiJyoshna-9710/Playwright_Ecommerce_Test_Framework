const {LoginPage} = require("../PageObjects/LoginPage");
const {AccountPage} = require("../PageObjects/AccountPage");

async function CompleteRegisterHelper(page, userData) {

   
    const loginpage = new LoginPage(page);
    const accountpage = new AccountPage(page);

    await loginpage.signup(userData);

    await accountpage.fillAccountDetails(userData);
    await accountpage.fillAddressDetails(userData);

    await accountpage.createAccount();
    await accountpage.continueAfterCreation();
    }

module.exports = { CompleteRegisterHelper };