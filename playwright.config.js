// @ts-check
import { defineConfig, devices } from '@playwright/test';


/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir:'tests',
   workers: 1,
  //testMatch: 'tests/InvalidLogin.spec.js',
  //by default wait tym is 30000
  timeout: 60000,
  //Assertion level tymout
  expect:
  {
    timeout: 60000,
  },

 /* reporter: [
  ['allure-playwright', {
    outputFolder: 'allure-results',
    detail: true,
    suiteTitle: false
  }],
  ['html']
],
*/
use: {
    
  browserName: 'chromium',
  headless: true,
    /* Collect trace when retrying the failed tst. See https://playwright.dev/docs/trace-viewer */
  screenshot: 'on',
  //trace: 'on' - for pass an fail both
  trace: 'retain-on-failure'
  },
});

  

