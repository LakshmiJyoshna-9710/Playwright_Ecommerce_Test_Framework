class CheckOutPage{
    constructor(page){
        this.page = page;
        this.addressDetailsTextLoc = page.getByRole('heading', { name: 'Address Details' });
        this.reviewYourOrderTextLoc = page.getByRole('heading', { name : 'Review Your Order'});
        this.commentBoxLoc = page.locator("textarea[class=form-control]");
        this.placeOrderBtnLoc = page.locator('a:has-text("Place Order")');

        //Delivery Address Lines
        this.deliveryAddressLines = page.locator('#address_delivery li');

        //Billing Address Lines
        this.billingAddressLines = page.locator('#address_invoice li');

    }

    async getDeliveryAddressLines(){
        return await this.deliveryAddressLines.allTextContents();
    }

    async getBillingAddressLines(){
        return await this.billingAddressLines.allTextContents();
    }

    async enterComment(commentTxt){
        await this.commentBoxLoc.fill(commentTxt);
    }

    async clickPlaceOrderBtn(){
        await this.placeOrderBtnLoc.click();
    }
}
module.exports = { CheckOutPage }