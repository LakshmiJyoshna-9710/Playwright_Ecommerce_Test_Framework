const {expect, test} = require ("@playwright/test");
const {HomePage} = require("../PageObjects/HomePage");
const {ProductsPage} = require("../PageObjects/ProductsPage");
const {ProductsDetailsPage} = require("../PageObjects/ProductsDetailsPage");

/*
Steps:
Launch browse
Navigate to URL
Verify home page is visible successfully
Click on 'Products' button
Verify user is navigated to ALL PRODUCTS page successfully
Click on View Product of first product
Verify product detail page is opened
Verify product name, category, price, availability, condition, brand are visible
*/

test('Verify all products and products detail page', async ({page}) =>{

//Object Creation
    const homepage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productsDetailsPage = new ProductsDetailsPage(page);

//Navigation
    await homepage.navigate();

// 2. Verify home page is visible
    await expect(homepage.homeLink).toBeVisible();

// 3. Click on 'Products' button
    await homepage.clickProductsLink();

// 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(productsPage.allProductsText).toBeVisible();

// 5. Products List is visible
    await expect(productsPage.featureItems).toBeVisible();
    await expect(productsPage.productCard.first()).toBeVisible();

// 6.Click on 'View Product' of first product
    await productsPage.clickFirstViewProduct();

// 8. User is landed to product detail page
    await expect(page).toHaveURL(/product_details/);
    //https://automationexercise.com/product_details/1

//Verify that detail detail is visible: product name, category, price, availability, condition, brand
    await expect(productsDetailsPage.productName).toBeVisible();
    await expect(productsDetailsPage.category).toBeVisible();
    await expect(productsDetailsPage.price).toBeVisible();
    await expect(productsDetailsPage.availability).toBeVisible();
    await expect(productsDetailsPage.condition).toBeVisible();
    await expect(productsDetailsPage.brand).toBeVisible();
      
})

