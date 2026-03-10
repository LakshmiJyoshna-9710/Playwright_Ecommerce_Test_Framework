const {test, expect} = require ("@playwright/test");
const {HomePage} = require("../PageObjects/HomePage");
const {ProductsPage} = require("../PageObjects/ProductsPage");
const {CategoryPage} = require("../PageObjects/CategoryPage");

/*
Steps
1 Launch browser
2 Navigate to URL https://automationexercise.com
3 Verify home page is visible successfully
4 Verify 'Category' section is visible on left side bar
5 Click on 'Women' category
6 Click on 'Dress' subcategory
7 Verify that category page is displayed
8 Click on 'Men' category
9 Click on 'Jeans' subcategory
10 Verify that category page is displayed
*/


test('TC18 – View Category Products', async ({page})=>{
   
    //Object Creation
    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const categoryPage = new CategoryPage(page);


    // Launch browser
        await homePage.navigate();

    // Verify Home Page is visible
        await expect(homePage.homeLink).toBeVisible();

    // Verify 'Category' section is visible on left side bar
        await expect(categoryPage.categoryText).toHaveText('Category');
        await expect(categoryPage.leftSideBarLoc).toBeVisible();

    // Click on 'Women' category
        await categoryPage.clickWomenCategory();

    // Click on 'Dress' subcategory
        await categoryPage.clickWomensDressSubCategory();

    // Verify that category page is displayed
        await expect(categoryPage.headingWomenDressLoc).toBeVisible();
        await expect(page).toHaveURL(/category_products/);

    // Click on 'Men' category
        await categoryPage.clickMenCategory();

    // Click on 'Tshirts' subcategory
        await categoryPage.clickMensJeansSubCategory();

    //Verify that category page is displayed
        await expect(categoryPage.headingMenJeansLoc).toBeVisible();
        await expect(page).toHaveURL(/category_products/);

    

})