class PaymentPage {

    constructor(page) {
        this.page = page;

        this.nameOnCard = page.locator("[data-qa='name-on-card']");
        this.cardNumber = page.locator("[data-qa='card-number']");
        this.cvc = page.locator("[data-qa='cvc']");
        this.expMonth = page.locator("[data-qa='expiry-month']");
        this.expYear = page.locator("[data-qa='expiry-year']");

        this.payConfirmBtn = page.locator("[data-qa='pay-button']");

        this.orderSuccessMessage = page.getByText('Congratulations! Your order has been confirmed!');

        //Download invoice
        this.downloadInvoiceBtn = page.getByRole('link', { name: 'Download Invoice' });

        this.continueBtn = page.getByRole('link', { name: 'Continue' });
    }

    async fillPaymentDetails(data) {

        await this.nameOnCard.fill(data.name);
        await this.cardNumber.fill(data.cardNumber);
        await this.cvc.fill(data.cvc);
        await this.expMonth.fill(data.month);
        await this.expYear.fill(data.year);

    }

    async clickPayConfirm() {
        await this.payConfirmBtn.click();
    }
}

module.exports = { PaymentPage };