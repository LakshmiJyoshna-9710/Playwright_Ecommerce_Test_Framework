class LoginPage{
    constructor(page){
        this.page = page;

        //Signup locators
        this.newUserSignupText = page.getByText('New User Signup!');
        this.signupInputName = page.locator('[data-qa="signup-name"]');
        this.signupInputEmail = page.locator('[data-qa="signup-email"]');
        this.signupButton = page.locator('[data-qa="signup-button"]');

        //Login to your account locators
        this.loginToYourAccountText = page.locator('h2').filter({ hasText: 'Login to your account' })
        this.loginInputEmail = page.locator("input[data-qa='login-email']");
        this.loginInputPassword = page.locator("input[data-qa='login-password']");
        this.loginButton = page.locator("[data-qa='login-button']");
        this.invalidLoginMessageText = page.getByText('Your email or password is incorrect!', { exact: true });
        this.existingErrorEmailMessage = page.getByText('Email Address already exist!', { exact: true });
  }

        async signup(userData) {
        await this.signupInputName.fill(userData.name);
        await this.signupInputEmail.fill(userData.email);
        await this.signupButton.click();

    }

        async login(userData){
            await this.loginInputEmail.fill(userData.email);
            await this.loginInputPassword.fill(userData.password);
            await this.loginButton.click();
        }

}
module.exports = { LoginPage };