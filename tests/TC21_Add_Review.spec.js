const { test, expect } = require("@playwright/test");

const { HomePage } = require("../PageObjects/HomePage");
const { ProductsPage } = require("../PageObjects/ProductsPage");
const { ProductsDetailsPage } = require("../PageObjects/ProductsDetailsPage");

/*
Steps
1 Launch browser
2 Navigate to URL https://automationexercise.com
3 Verify home page is visible successfully
4 Click 'Products' button
5 Verify ALL PRODUCTS page is visible
6 Click 'View Product' for first product
7 Verify 'Write Your Review' section is visible
8 Enter Name, Email and Review
9 Click 'Submit' button
10 Verify success message "Thank you for your review."
*/

test('TC21 – Add Review on Product', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const productDetailsPage = new ProductsDetailsPage(page);

    const reviewData = {
        name: "Akshay",
        email: "akshay@gmail.com",
        review: "Very good quality product. Highly recommended."
    };

    // Navigate to site
    await homePage.navigate();

    // Verify home page
    await expect(homePage.homeLink).toBeVisible();

    // Click Products
    await homePage.clickProductsLink();

    // Verify All Products page
    await expect(productsPage.allProductsText).toBeVisible();

    // Click first product
    await productsPage.clickFirstViewProduct();

    // Verify review section
    await expect(productDetailsPage.writeReviewHeading).toBeVisible();

    // Submit review
    await productDetailsPage.submitReview(reviewData);

    // Verify success message
    await expect(productDetailsPage.reviewSuccessMessage).toBeVisible();

});