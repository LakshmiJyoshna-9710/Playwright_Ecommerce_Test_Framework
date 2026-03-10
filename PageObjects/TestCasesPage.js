class TestCasesPage {
    constructor(page){
        this.page = page;

        this.testCasesHeading = page.getByRole('heading', { name: 'Test Cases', exact: true });
    }
}
module.exports = {TestCasesPage}