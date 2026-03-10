class BrandPage{
    constructor(page){
        this.page = page;
        
        // Brand section
        this.brandSection = page.locator('.brands_products');
        //Brands Text
        this.brandsText = page.getByRole('heading', { name: 'Brands' })

}

    getBrandLocator(brandName){
    return this.page.getByRole('link', { name: brandName });
}

getBrandHeading(brandName){
    return this.page.getByRole('heading', {name: `Brand - ${brandName} Products`
    });
}

async clickBrand(brandName){
    await this.getBrandLocator(brandName).click();
}

}
module.exports = {BrandPage};