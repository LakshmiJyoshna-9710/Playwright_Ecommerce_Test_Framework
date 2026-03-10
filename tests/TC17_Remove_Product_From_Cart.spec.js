const {test, expect} = require ("@playwright/test");
const {HomePage} = require("../PageObjects/HomePage");
const {ProductsPage} = require("../PageObjects/ProductsPage");
const {CartPage} = require("../PageObjects/CartPage");
/*
Steps
1️⃣ Launch browser
2️⃣ Navigate to URL https://automationexercise.com
3️⃣ Verify that home page is visible successfully
4️⃣ Add products to cart
5️⃣ Click Cart button
6️⃣ Verify that Cart page is displayed
7️⃣ Click X button corresponding to a particular product
8️⃣ Verify that the product is removed from the cart.
*/


test('TC17 – Remove Products From Cart', async ({page})=>{

    //Object Creation
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    

    // 1. Launch browser
        await homePage.navigate();

    // 2. Verify Home Page is visible
        await expect(homePage.homeLink).toBeVisible();

    // Add first product
        await productsPage.addProductToCartByName2("Rose Pink Embroidered Maxi Dress");
        await productsPage.clickContinueShoppingBtn();

    // Add second product
        await productsPage.addProductToCartByName2("Winter Top");

    // 4. Click Cart button
        await productsPage.clickCartBtn();

    // Verify 2 products added
        await expect(cartPage.cartRows).toHaveCount(2);

    // 5. Verify that Cart page is displayed
        await expect(page).toHaveURL(cartPage.cartPageUrl);

    // verify both products exist
        await expect(page.getByText("Rose Pink Embroidered Maxi Dress")).toBeVisible();
        await expect(page.getByText("Winter Top")).toBeVisible();

    // remove one product
        await cartPage.removeProductByName2("Rose Pink Embroidered Maxi Dress");

    // verify removed
        await expect(page.getByText("Rose Pink Embroidered Maxi Dress")).toHaveCount(0);

    // verify other still exists
        await expect(page.getByText("Winter Top")).toBeVisible()




})

