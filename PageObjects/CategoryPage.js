class CategoryPage{
    constructor(page){
        this.page = page;
        
        //Left Side Bar
        this.leftSideBarLoc = page.locator('.left-sidebar');
        //Category Text
        this.categoryText = page.getByRole('heading', { name: 'Category' });
        //Brands Text
        this.brandsText = page.getByRole('heading', { name: 'Brands' })
        //Women
        this.womenCategoryLoc = page.locator("a[href='#Women']");
        //Sub Category of Women - Dress
        this.subCategoryWomenDress = page.locator("a[href='/category_products/1']");
        //Men
            this.menCategoryLoc = page.locator("a[href='#Men']");
        //Sub Category of Men - Dress
        this.subCategoryMenJeans = page.locator("a[href='/category_products/6']");
        //Heading of Women Dress Products
        this.headingWomenDressLoc = page.getByRole('heading', { name: 'Women - Dress Products' });
        //Heading of Men Jeans Products
        this.headingMenJeansLoc= page.getByRole('heading', { name: 'Men - Jeans Products' })
        

}

    async clickWomenCategory(){
        await this.womenCategoryLoc.click();
    }

    async clickWomensDressSubCategory(){
        await this.subCategoryWomenDress.click();
    }
    async clickMenCategory(){
        await this.menCategoryLoc.click();
    }
    async clickMensJeansSubCategory(){
        await this.subCategoryMenJeans.click();
    }

    //--------------------------------------------------------

    getBrandLocator(brandName){
    return this.page.locator(`a[href="/brand_products/${brandName}"]`);
}

    async clickBrand(brandName){
        await this.getBrandLocator(brandName).click();
    }

    getBrandProductsLocator(brandName){
    return this.page.getByRole('heading', {name: `Brand - ${brandName} Products`});
}

    async clickBrandProducts(brandName){
        await this.getBrandLocator(brandName).click();
    }
}
module.exports = {CategoryPage};