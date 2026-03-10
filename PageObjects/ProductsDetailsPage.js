class ProductsDetailsPage{
    constructor(page){
        this.page = page;

        //Locators
        this.productName = page.locator('.product-information h2');
        this.category = page.getByText('Category:');
        this.price = page.locator('.product-information span span');
        this.availability = page.getByText('Availability:');
        this.condition = page.getByText('Condition:');
        this.brand = page.getByText('Brand:');
        this.quantityInput = page.locator('#quantity');
        this.addToCartButton = page.locator('button[type="button"]').filter({ hasText: 'Add to cart' });
        this.viewCartButton = page.getByRole('link', { name: 'View Cart' });


        //Review Related Locators
        this.writeReviewHeading = page.locator('a:has-text("WRITE YOUR REVIEW")');
        this.reviewNameInput = page.locator('#name');
        this.reviewEmailInput = page.locator('#email');
        this.reviewTextarea = page.locator('#review');

        this.submitReviewBtn = page.locator('#button-review');

        this.reviewSuccessMessage = page.getByText('Thank you for your review.');

    }

    async setQuantity(quantity){
        await this.quantityInput.fill(quantity.toString());
    }

    async clickAddToCart(){
        await this.addToCartButton.click();
    }

    async submitReview(data){

            await this.reviewNameInput.fill(data.name);
            await this.reviewEmailInput.fill(data.email);
            await this.reviewTextarea.fill(data.review);

            await this.submitReviewBtn.click();
    }


    async clickViewCartBtn(){
        await this.viewCartButton.click();

    }
}
module.exports = { ProductsDetailsPage }