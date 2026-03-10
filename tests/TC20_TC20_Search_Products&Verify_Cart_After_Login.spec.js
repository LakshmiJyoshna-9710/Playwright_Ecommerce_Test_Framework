const { test, expect } = require("@playwright/test");
const { HomePage } = require("../PageObjects/HomePage");
const { ProductsPage } = require("../PageObjects/ProductsPage");
const { CartPage } = require("../PageObjects/CartPage");
const { LoginPage } = require("../PageObjects/LoginPage");
const { RegisterUserHelper } = require("../Utils/RegisterUserHelper");

test('TC20 – Search Products and Verify Cart After Login', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const loginPage = new LoginPage(page);

    const searchText = "Dress";

    const userData = {
        name: 'Akshay',
        email: `test${Date.now()}@mail.com`,
        gender: 'Mrs',
        password: 'Test@123',
        day: '10',
        month: '5',
        year: '1998',
        firstName: 'Akshay',
        lastName: 'Kumar',
        company: 'ABC Pvt Ltd',
        address: 'Street 1',
        country: 'India',
        state: 'Telangana',
        city: 'Hyderabad',
        zipcode: '500001',
        mobile: '9876543210'
    };

    // Register user
    await RegisterUserHelper(page, userData);

    // Logout
    await homePage.clicklogOutBtn();

    // Navigate again
    await homePage.navigate();

    // Verify home page visible
    await expect(homePage.homeLink).toBeVisible();

    // Click Products
    await homePage.clickProductsLink();

    // Verify ALL PRODUCTS page
    await expect(productsPage.allProductsText).toBeVisible();

    // Search product
    await productsPage.productSearch(searchText);

    // Verify SEARCHED PRODUCTS heading
    await expect(productsPage.searchedProductsHeader).toBeVisible();

    // Get search results
    const productNames = await productsPage.getSearchResultNames();

    // Validate search results
    expect(
    productNames.some(name =>
        name.toLowerCase().includes(searchText.toLowerCase())
    )
).toBeTruthy();

    // Add search results to cart
    await productsPage.addSearchResultsToCart();

    // Go to cart
    await productsPage.clickCartBtn();

    // Verify products visible in cart
    const countBeforeLogin = await cartPage.getProductCount();
    expect(countBeforeLogin).toBeGreaterThan(0);

    // Login
    await homePage.clickSignupLogin();

    await loginPage.login({
        email: userData.email,
        password: userData.password
    });

    // Verify user logged in
    await expect(homePage.getLoggedInUser(userData.name)).toBeVisible();

    // Navigate to cart again
    await homePage.clickCartBtn();

    // Verify cart products still exist
    const countAfterLogin = await cartPage.getProductCount();
    expect(countAfterLogin).toBe(countBeforeLogin);

});