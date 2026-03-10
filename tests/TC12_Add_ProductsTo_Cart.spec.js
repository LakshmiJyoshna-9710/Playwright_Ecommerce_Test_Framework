const {test,expect} = require ("@playwright/test");
const {HomePage} =  require ("../PageObjects/HomePage");
const {ProductsPage} = require ("../PageObjects/ProductsPage");
const {CartPage} = require ("../PageObjects/CartPage");

/*
Steps
Launch browser
Navigate to URL
Verify home page visible
Click Products
Hover over first product → Click Add to cart
Click Continue Shopping
Hover over second product → Click Add to cart
Click View Cart
Verify both products are added
Verify their prices, quantity and total
*/

test('TC12 - Verify first & Second Products are added to cart', async ({page})=>{

    //Object Creation
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page);

    //Navigation
        await homePage.navigate();

    //Verify Home page is visible
        await expect(homePage.homeLink).toBeVisible();
    
    //Click 'Products' button
        await homePage.clickProductsLink();

    //Hover over first product and click 'Add to cart'
        await productsPage.addProductToCart(0);

    //Click 'Continue Shopping' button
        await productsPage.clickContinueShoppingBtn();

    //Hover over Second product and click 'Add to cart'
         await productsPage.addProductToCart(1);

    //Click 'View Cart' button
        await productsPage.clickCartBtn();

    //Verify both products are added to Cart
        const productCount = await cartPage.getProductCount();
        expect(productCount).toBe(2);

    //Verify names exist
        const names = await cartPage.getProductNames();
        expect(names.length).toBe(2);

    //Verify price × quantity = total (Business Logic Validation)
    const prices = await cartPage.getAllPrices();
    const quantities = await cartPage.getAllQuantities();
    const totals = await cartPage.getAllTotals();

    for (let i = 0; i < prices.length; i++) {

        const price = parseInt(prices[i].replace('Rs. ', ''));
        const quantity = parseInt(quantities[i]);
        const total = parseInt(totals[i].replace('Rs. ', ''));

        expect(price * quantity).toBe(total);
    }

    



})