class FooterPage {
  constructor(page) {
    this.page = page;

    this.subscriptionHeading = page.getByRole('heading', { name: 'Subscription' });
    this.emailInput = page.locator('#susbscribe_email');
    this.subscribeButton = page.locator('#subscribe');
    this.successMessage = page.getByText('You have been successfully subscribed!');
  }

  async scrollToFooter() {
    await this.subscriptionHeading.scrollIntoViewIfNeeded();
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
  }

  async clickSubscribe() {
    await this.subscribeButton.click();
  }
}

module.exports = { FooterPage };