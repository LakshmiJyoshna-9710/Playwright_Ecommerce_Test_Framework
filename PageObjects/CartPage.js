class CartPage{
    constructor(page){
        this.page = page;

        this.cartPageUrl = "https://automationexercise.com/view_cart";

        //Cart Rows or Cart Items
        this.cartRows = page.locator('#cart_info_table tbody tr');
        //Product Names
        this.productNames = page.locator('.cart_description h4 a');
        //Product Price
        this.productPrices = page.locator('.cart_price p');
        //Product Quantity
        this.productQuantities = page.locator('.cart_quantity button');
        //Total price of each product
        this.productTotals = page.locator('.cart_total p');
        //Proceed to CheckOutButton
        this.checkOutButton = page.getByText('Proceed To Checkout', { exact: true });
        //Login/Register locator on popup
        this.loginRegisterLink = page.getByText('Register / Login', { exact: true });

        

    }

    async getProductCount(){
        return await this.cartRows.count();

    }
    async getProductNames(){
        return await this.productNames.allTextContents();

    }
    async getAllPrices() {
    return await this.productPrices.allTextContents();
  }

  async getAllQuantities() {
    return await this.productQuantities.allTextContents();
  }

  async getAllTotals() {
    return await this.productTotals.allTextContents();
  }

  async clickProceedToCheckOut(){
    await this.checkOutButton.click();
  }

  async clickRegisterLoginLink(){
    await this.loginRegisterLink.click();
  }

  //Method - 1 - Removing product from the cart - loop method
  async removeProductByName(productName){

    const cartProducts = this.page.locator('#cart_info_table tbody tr');
    const count = await cartProducts.count();

    for(let i = 0; i < count; i++){

        const name = await cartProducts.nth(i).locator('.cart_description a').textContent();

        if(name.trim() === productName){

            await cartProducts.nth(i).locator('.cart_quantity_delete').click();

            return;
        }
    }

    throw new Error(`Product "${productName}" not found in cart`);
}

//Method - 2 - Removing product from the cart - Locator Filtering method
    async removeProductByName2(productName){

    const product = this.page.locator('#cart_info_table tbody tr', {
        has: this.page.getByText(productName)
    });

    await product.locator('.cart_quantity_delete').click();
}

  
}
module.exports = {CartPage}