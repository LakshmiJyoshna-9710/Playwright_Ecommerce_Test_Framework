class AccountPage{
    constructor(page){
        this.page = page;

        //Account Information Locators
        this.accountInfoTextCheck = page.locator('b:has-text("ENTER ACCOUNT INFORMATION")');
        //this.genderRadioMr = page.getByRole('radio', {name: 'Mr.'});
        //this.genderRadioMrs = page.getByRole('radio', {name: 'Mrs.'});
        //this.nameTextBox = page.getByRole('textbox', { name: 'Name *' });
        //this.emailTextBox = page.getByRole('textbox', { name: 'Email *' });
        this.passwordTextBox = page.locator("#password");
        this.daysSelect = page.locator('#days');
        this.monthsSelect = page.locator('#months');
        this.yearsSelect = page.locator('#years');
        this.newsletterCheckbox = page.locator('#newsletter');
        this.optinCheckbox = page.locator('#optin');

        //Address Information Locators.
        this.firstNameText = page.locator("[data-qa='first_name']");
        this.lastNameText = page.locator("[data-qa='last_name']");
        this.companyNameText = page.getByLabel('Company', { exact: true });
        this.address1Text = page.getByRole('textbox', { name: 'Address * (Street address, P.O. Box, Company name, etc.)' });
        this.country = page.getByRole('combobox', { name: 'Country *' });
        this.stateText = page.getByLabel('State *', { exact: true });
        this.city = page.locator('#city');
        this.zipcode = page.locator('#zipcode');
        this.mobileNumber = page.locator('#mobile_number');

        //Locators of Create Account and Delete Account 
        this.createAccountBtn = page.locator('[data-qa="create-account"]');
        this.accountCreatedText = page.getByText('Account Created!');
        this.continueBtn = page.locator('[data-qa="continue-button"]');
        this.deleteAccountLink = page.getByRole('link', { name: 'Delete Account' });
        this.accountDeletedText = page.getByText('Account Deleted!');
    }

    async fillAccountDetails(userData) {
        const radio = this.page.getByRole('radio', { name: `${userData.gender}.` });
        await radio.check();
        await this.passwordTextBox.fill(userData.password);
        await this.daysSelect.selectOption(userData.day);
        await this.monthsSelect.selectOption(userData.month);
        await this.yearsSelect.selectOption(userData.year);
        await this.newsletterCheckbox.check();
        await this.optinCheckbox.check();
  }

  async fillAddressDetails(userData) {
        await this.firstNameText.fill(userData.firstName);
        await this.lastNameText.fill(userData.lastName);
        await this.companyNameText.fill(userData.company);
        await this.address1Text.fill(userData.address);
        await this.country.selectOption(userData.country);
        await this.stateText.fill(userData.state);
        await this.city.fill(userData.city);
        await this.zipcode.fill(userData.zipcode);
        await this.mobileNumber.fill(userData.mobile);
    }

  async createAccount() {
        await this.createAccountBtn.click();
  }

  async continueAfterCreation() {
        await this.continueBtn.click();
  }

  async deleteAccount() {
        await this.deleteAccountLink.click();
  }
  async clickContinue() {
    await this.continueBtn.click();
}
}
module.exports = { AccountPage };