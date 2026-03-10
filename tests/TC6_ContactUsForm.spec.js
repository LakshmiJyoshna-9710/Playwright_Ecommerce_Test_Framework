const {test, expect} = require ('@playwright/test');
const {HomePage} = require ("../PageObjects/HomePage");
const {ContactUs} = require ("../PageObjects/ContactUs");

/*
📌 TC6 – Contact Us Form

Launch browser
Navigate to URL
Verify home page is visible
Click on 'Contact Us' button
Verify 'GET IN TOUCH' is visible
Enter Name, Email, Subject, Message
Upload file
Click Submit button
Click OK button (alert)
Verify success message
Click Home button
Verify landed to home page.
*/

    let data = {
        name: "Akshay",
        email: "akshay@gmail.com",
        subject: "Hello",
        message: "Checking the functionality"

    }

test('TC6 - Contact Us Form', async ({page})=>{

    //object creation
    const homepage = new HomePage(page);
    const contactUspage = new ContactUs(page);

    //Navigation
        await homepage.navigate();

    //Verify home page is visible
        await expect(homepage.homeLink).toBeVisible();

    //Click on 'Contact Us' button
        await homepage.clickContactUsLink();

    //Enter Name, Email, Subject, Message
        await contactUspage.fillContactForm(data);

    //Upload file
        await contactUspage.uploadFile('ISTQB_Certificate.pdf');
        
    
    /*
        Click Submit button
        Click OK button (alert)
    */
        await contactUspage.submitForm();

    //Verify success message
       await expect(contactUspage.successMessage).toBeVisible({ timeout: 15000 });
       await expect(contactUspage.successMessage).toHaveText('Success! Your details have been submitted successfully.');

    //Click Home button
        await contactUspage.clickHome();

    //Verify landed to home page.
        await expect(homepage.homeLink).toBeVisible();
    
        

} )



