class HomePage {
    constructor(page){
        this.page = page;
        this.signupLoginLink = page.getByRole('link', {name: 'Signup / Login'});   
        this.homeLink = page.getByRole('link', { name: 'Home' });
        this.logOutBtn = page.getByRole('link', { name: 'Logout' });
        this.loggedInUser = page.getByText('Logged in as');
        this.contactUsBtn = page.getByRole("link", { name : 'Contact us'});
        this.testCasesLink = page.getByRole('link', { name: 'Test Cases', exact: true });
        this.productsLink = page.getByRole('link', { name: 'Products' });
        this.cartBtn = page.getByRole('link', {name: 'Cart'});

        //Recommended Items Locators
        //Recommended section
        this.recommendedSection = page.locator('.recommended_items');
        //Recommended product cards
        this.recommendedProducts = page.locator('.recommended_items .product-image-wrapper');
        //Continue shopping button (modal)
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
        //View cart button (modal)
        this.viewCartBtn = page.getByRole('link', { name: 'View Cart' });

        //Subscription section
        this.subscriptionHeading = page.getByText('Subscription');

        //Top banner text
        this.topBannerText = page.getByText('Full-Fledged practice website for Automation Engineers').first();
    


    }

    async navigate(){
        await this.page.goto("http://automationexercise.com/");
    }

    async clickSignupLogin(){
        await this.signupLoginLink.click();
    }

    async clickContactUsLink(){
        await this.contactUsBtn.click();
    }

    async clickTestCaseLink(){
        await this.testCasesLink.click();
    }
    async clickProductsLink(){
        await this.productsLink.click();
    }
    async clickCartBtn(){
        await this.cartBtn.click();
    }

    getLoggedInUser(username) {
    return this.page.getByText(`Logged in as ${username}`);
}

    async scrollToRecommendedItems(){
        await this.recommendedSection.scrollIntoViewIfNeeded();
    }

    async addRecommendedProductByName(productName){

        const products = this.recommendedProducts;
        const count = await products.count();

        for(let i = 0; i < count; i++){

            const name = await products
                .nth(i)
                .locator('.productinfo p')
                .textContent();

            if(name.trim() === productName){

                const product = products.nth(i);

                await product.scrollIntoViewIfNeeded();
                await product.hover();
                await product.locator('.add-to-cart').first().click();

                return;
            }
        }

        throw new Error(`Recommended product "${productName}" not found`);
    }


    async scrollToBottom(){
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async scrollToTop(){
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
    }


    async clickViewCartBtn(){
        await this.viewCartBtn.click();
    }


    async clicklogOutBtn (){
        await this.logOutBtn.click();
    }
}

module.exports = {HomePage}