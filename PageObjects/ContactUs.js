const path = require('path');

class ContactUs {
  constructor(page) {
    this.page = page;

    this.getInTouchText = page.getByText('Get In Touch');
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.subjectInput = page.locator('input[name="subject"]');
    this.messageTextarea = page.locator('#message');
    this.uploadInput = page.locator('input[name="upload_file"]');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage = page.locator('#contact-page .status.alert-success')
    
    this.homeButton = page.getByRole('link', { name: 'Home' });
  }

  async fillContactForm(data) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    await this.subjectInput.fill(data.subject);
    await this.messageTextarea.fill(data.message);
  }

  async uploadFile(fileName) {
    const filePath = path.join(__dirname, '../Files', fileName);
    await this.uploadInput.setInputFiles(filePath);
  }

  async submitForm() {

  // Force confirm to always return true
  await this.page.evaluate(() => {
    window.confirm = () => true;
  });

  await this.submitButton.scrollIntoViewIfNeeded();
  await this.submitButton.click();

  // Wait for reload to finish
  await this.page.waitForLoadState('networkidle');
}

  async clickHome() {
    await this.homeButton.click();
  }
}



module.exports = { ContactUs };