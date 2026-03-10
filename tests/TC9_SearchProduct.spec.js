const {expect, test} = require ("@playwright/test");
const {HomePage} = require("../PageObjects/HomePage");
const {ProductsPage} = require("../PageObjects/ProductsPage");

test('TC9 - Search Product Verification', async ({page}) =>{

//Object Creation
    const homepage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    

    const searchTerm = 'Sleeveless';

//Navigation
    await homepage.navigate();

// 2. Verify home page is visible
    await expect(homepage.homeLink).toBeVisible();

// 3. Click on 'Products' button
    await homepage.clickProductsLink();

// 4. Verify user is navigated to ALL PRODUCTS page successfully
    await expect(productsPage.allProductsText).toBeVisible();

// 5. Enter product name in search input and click search button
    await productsPage.productSearch(searchTerm);

// 6️. Verify 'Searched Products' is visible
     await expect(productsPage.searchedProductsHeader).toBeVisible();

  // 7️. Verify at least one product is displayed
    const productCount = await productsPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);

  // 8️. Verify all displayed products contain search keyword
  const productNames = await productsPage.getAllProductNames();

  for (const name of productNames) {
    expect(name.toLowerCase()).toContain(searchTerm.toLowerCase());
  }
});