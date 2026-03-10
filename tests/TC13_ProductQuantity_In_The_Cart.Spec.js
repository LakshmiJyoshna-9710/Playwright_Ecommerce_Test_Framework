const {test,expect} = require ("@playwright/test");
const {HomePage} =  require ("../PageObjects/HomePage");
const {ProductsPage} = require ("../PageObjects/ProductsPage");
const {CartPage} = require ("../PageObjects/CartPage");
const {ProductsDetailsPage} = require("../PageObjects/ProductsDetailsPage");

/*
Steps
Launch browser
Navigate to URL
Verify Home Page is Visible
Click View Product for any product
Verify product detail page opened
Increase quantity to 4
Click Add to Cart
Click View Cart
Verify quantity 4 in cart
*/


test('TC13 - Verify product quantity in the cart', async ({page})=>{

    const quantity = 4;
    const index = 3;

    //Object Creation
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page)
    const cartPage = new CartPage(page);
    const productsDetailsPage = new ProductsDetailsPage(page);

    //Navigation
        await homePage.navigate();

     //Verify Home page is visible
        await expect(homePage.homeLink).toBeVisible();
    
    //Click 'Products' button
        await homePage.clickProductsLink();

    //Click 'View Product' for any product on home page
        await productsPage.clickViewProductBtn(index)

    //Verify product detail is opened
        await expect(page).toHaveURL(`https://automationexercise.com/product_details/${index + 1}`);

    //Increase quantity to 4
        await productsDetailsPage.setQuantity(quantity);

    //Click 'Add to cart' button
        await productsDetailsPage.clickAddToCart();

    //Click 'View Cart' button
        await productsDetailsPage.clickViewCartBtn();
    
    //Verify that product is displayed in cart page with exact quantity
        await expect(cartPage.productQuantities).toContainText(quantity.toString());

})