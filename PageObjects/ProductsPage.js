class ProductsPage{
    constructor(page){
        this.page = page;
        this.allProductsText = page.getByRole('heading', { name: 'All Products' })
        //Complete Items table
        this.featureItems = page.locator(".features_items");
        //Product Card
        this.productCard = page.locator(".product-image-wrapper");
        //View Product Button of Firt Product
        this.firstViewProduct = page.locator('a').filter({ hasText: 'View Product' }).first()
        //Product Search Box
        this.productSearchBox = page.getByRole('textbox', { name: 'Search Product' });
        //Search Icon Button
        this.searchBtn = page.locator('#submit_search');
        //Heading of the Searched the Products
        this.searchedProductsHeader = page.getByText('Searched Products');
        //Products Name locator
        this.productNames = page.locator('.productinfo p');
        //Add To Cart
        this.addToCartButton = page.locator('a.add-to-cart');
        //Continue Shopping
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
        //View Cart Link
        this.viewCartLink = page.getByRole('link', { name: 'View Cart' });
        //Loctor of View Product Buttons
        this.viewProductButtons = page.locator('.choose a');

        
    }

        async clickFirstViewProduct(){
            await this.firstViewProduct.click(); 
        }

        async clickViewProductBtn(index){
            await this.viewProductButtons.nth(index).click();
        }
            
        async productSearch(searchTerm){
            await this.productSearchBox.fill(searchTerm);
            await this.searchBtn.click();
        }

    async getSearchResultNames(){

    const products = this.productCard;
    const count = await products.count();

    const names = [];

    for(let i = 0; i < count; i++){

        const name = await products
            .nth(i)
            .locator('.productinfo p')
            .textContent();

        names.push(name.trim());
    }

    return names;
}

    async addSearchResultsToCart(){

        const products = this.productCard;
        const count = await products.count();

        const limit = Math.min(count, 3); // avoid adding too many

        for(let i=0;i<limit;i++){

            const product = products.nth(i);

            await product.hover();
            await product.locator('.add-to-cart').first().click();

            if(i < limit-1){
                await this.continueShoppingButton.click();
            }
        }

    }
        
        async getProductCount() {
        return await this.productCard.count();
    }
    //----------------------------------------------------------------------------
        //Add products to cart using index
        async addProductToCart(index){
            const product = this.productCard.nth(index);
            await product.scrollIntoViewIfNeeded();
            await product.hover();

            const addButton = product.locator('.product-overlay .add-to-cart');
            await addButton.click();
        }

        //Add products using ProductName - Type 1
            async addProductToCartByName(productName){

        const product = this.page.locator('.product-image-wrapper', {
            has: this.page.getByText(productName)
        });

        await product.scrollIntoViewIfNeeded();
        await product.hover();

        await product.locator('.add-to-cart').first().click();
    }

        //Add products using ProductName - Type 2

        async addProductToCartByName2(productName){

    const products = this.page.locator('.product-image-wrapper');
    const count = await products.count();

    for(let i = 0; i < count; i++){

        const name = await products.nth(i).locator('.productinfo p').first().textContent();

        if(name.trim() === productName){

            const product = products.nth(i);

            await product.scrollIntoViewIfNeeded();
            await product.hover();
            await product.locator('.add-to-cart').first().click();

            return; // stop loop
        }
    }

    throw new Error(`Product "${productName}" not found`);
}

//------------------------------------------------------------------------------------

        async getAllProductNames() {
            return await this.productNames.allTextContents();
        }

        async clickContinueShoppingBtn(){
            await this.continueShoppingButton.click();

        }

        async clickCartBtn(){
            await this.viewCartLink.click();
        }

    }

module.exports = { ProductsPage };