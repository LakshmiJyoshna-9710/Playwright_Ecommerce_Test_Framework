class HeaderPage{
    constructor(page){
        this.page = page;

        //CartLink
        this.cartLinkLoc = page.getByRole('link', {name: 'Cart'});

    }

    async clickCartLink(){
        await this.cartLinkLoc.click();
    }
}
module.exports = {HeaderPage};