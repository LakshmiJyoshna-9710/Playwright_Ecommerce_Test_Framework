const { test, expect } = require("@playwright/test");
const { HomePage } = require("../PageObjects/HomePage");
const { CartPage } = require("../PageObjects/CartPage");

/*
Steps
1 Launch browser
2 Navigate to https://automationexercise.com
3 Verify home page is visible successfully
4 Scroll to bottom of page
5 Verify 'RECOMMENDED ITEMS' section is visible
6 Click 'Add To Cart' on recommended product
7 Click 'View Cart'
8 Verify product is displayed in cart
*/

test('TC22 – Add to Cart from Recommended Items', async ({ page }) => {

    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    const productName = "Stylish Dress";

    //Navigate to website
    await homePage.navigate();

    //Verify home page
    await expect(homePage.homeLink).toBeVisible();

    //Scroll to recommended section
    await homePage.scrollToRecommendedItems();

    //Verify recommended section visible
    await expect(homePage.recommendedSection).toBeVisible();

    //Add recommended product dynamically
    await homePage.addRecommendedProductByName(productName);

    //Click View Cart
    await homePage.clickViewCartBtn();

    //Verify product added to cart
    const cartProducts = await cartPage.getProductNames();

        expect(cartProducts.some(name => name.includes(productName))).toBeTruthy();
});