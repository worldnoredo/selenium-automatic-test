const { describe, it } = require('mocha');
const Page = require('./pratice automation testing/praticeAutomationTesting');

const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

process.on('unhandledRejection', () => {});

(async function example() {
    try {
      describe ('pratice automation testing', async function () {
        this.timeout(50000);
        let driver, page;
  
        beforeEach (async () => {
          page = new Page();
          driver = page.driver;
          await page.visit('http://practice.automationtesting.in/');
        });
  
        afterEach (async () => {
          await page.quit();
        });
  
        it ('go to shop page', async () => {
            const result = await page.goToShop();
            expect(result).to.be.equal(true);
        });

        it ('order content', async () => {
            const result = await page.orderPopularity();
            expect(result).to.be.equal(true);
          });

        it ('add to cart from shop', async () => {
            const result = await page.addCart();
            expect(result).to.be.equal(true);
          });

        it ('login fail with full', async () => {
            const result = await page.loginFailWithFull();
            expect(result).to.be.equal(true);
          });
        
        it ('register success', async () => {
          const result = await page.registerSuccess();
          expect(result).to.be.equal(true);
        });
      });
    } catch (ex) {
      console.log (new Error(ex.message));
    } finally {
      
    }
  })();