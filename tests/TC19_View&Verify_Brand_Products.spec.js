const { test, expect } = require("@playwright/test");
const { HomePage } = require("../PageObjects/HomePage");
const { ProductsPage } = require("../PageObjects/ProductsPage");
const { BrandPage } = require("../PageObjects/BrandPage");

/*
Steps
1 Launch browser
2 Navigate to URL https://automationexercise.com
3 Verify home page is visible successfully
4 Click on 'Products' button
5 Verify that Brands are visible on left side bar
6 Click on any brand name
7 Verify that user is navigated to brand page and brand products are displayed
8 On left side bar, click on another brand link
9 Verify that user is navigated to that brand page and can see products
*/

test('TC19 – View & Verify Brand Products', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const brandPage = new BrandPage(page);

    // Navigate
    await homePage.navigate();

    // Verify Home Page
    await expect(homePage.homeLink).toBeVisible();

    // Click Products
    await homePage.clickProductsLink();

    // Verify Brands section
    await expect(brandPage.brandSection).toBeVisible();

    // Click first brand
    await brandPage.clickBrand('Polo');

    await expect(brandPage.getBrandHeading('Polo')).toBeVisible();

    // Click another brand
    await brandPage.clickBrand('H&M');

    await expect(brandPage.getBrandHeading('H&M')).toBeVisible();

});