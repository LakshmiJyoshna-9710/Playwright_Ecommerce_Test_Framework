const { test, expect } = require("@playwright/test");

const { HomePage } = require("../PageObjects/HomePage");
const { ProductsPage } = require("../PageObjects/ProductsPage");
const { CartPage } = require("../PageObjects/CartPage");
const { CheckOutPage } = require("../PageObjects/CheckOutPage");
const { AccountPage } = require("../PageObjects/AccountPage");
const { RegisterUserHelper } = require("../Utils/RegisterUserHelper");

test('TC23 – Verify Address Details in Checkout Page', async ({ page }) => {

    const homePage = new HomePage(page);
    const productsPage = new ProductsPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckOutPage(page);
    const accountPage = new AccountPage(page);

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
        state: 'Andhra',
        city: 'Nellore',
        zipcode: '500001',
        mobile: '9876543210'
    };

    // Register user
    await RegisterUserHelper(page, userData);

    // Verify logged in
    await expect(homePage.getLoggedInUser(userData.name)).toBeVisible();

    // Add product
    await homePage.clickProductsLink();
    await productsPage.addProductToCart(1);

    // Open cart
    await productsPage.clickCartBtn();

    // Proceed to checkout
    await cartPage.clickProceedToCheckOut();

    // Get delivery address lines
    const deliveryAddress = (await checkOutPage.getDeliveryAddressLines())
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(line => line !== '');
    // Validate delivery address
    expect(deliveryAddress).toContain(`${userData.gender}. ${userData.firstName} ${userData.lastName}`);
    expect(deliveryAddress).toContain(userData.company);
    expect(deliveryAddress).toContain(userData.address);
    expect(deliveryAddress).toContain(`${userData.city} ${userData.state} ${userData.zipcode}`);
    expect(deliveryAddress).toContain(userData.country);
    expect(deliveryAddress).toContain(userData.mobile);

    // Get billing address lines
    const billingAddress = (await checkOutPage.getDeliveryAddressLines())
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(line => line !== '');

    // Validate billing address
    expect(billingAddress).toContain(`${userData.gender}. ${userData.firstName} ${userData.lastName}`);
    expect(billingAddress).toContain(userData.company);
    expect(billingAddress).toContain(userData.address);
    expect(billingAddress).toContain(`${userData.city} ${userData.state} ${userData.zipcode}`);
    expect(billingAddress).toContain(userData.country);
    expect(billingAddress).toContain(userData.mobile);

    // Delete account
    await accountPage.deleteAccount();
    await expect(accountPage.accountDeletedText).toBeVisible();

});