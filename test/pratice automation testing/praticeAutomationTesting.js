let Page = require('../../lib/basePage');
const locator = require('./locator');
const fake = require('../../utils/fakeData');
const { Key, By, WebElement } = require('selenium-webdriver');

let shopButton;

Page.prototype.goToShop = async function () {
  shopButton = await this.findById(locator.shopId);
  await shopButton.click();
  const shopContent = await this.findById(locator.shopContentId);
  return await shopContent.isEnabled();
};

Page.prototype.orderPopularity = async function () {
    shopButton = await this.findById(locator.shopId);
    await shopButton.click();

    let oldContent = await this.findById(locator.shopContentId);
    let formOrder = await this.findByClassName("woocommerce-ordering");
    let order = (await formOrder.findElements(By.css("option")))[1];
    await order.click();
    let newContent = await this.findById(locator.shopContentId);
    return (oldContent != newContent);
};

Page.prototype.addCart = async function () {
    shopButton = await this.findById(locator.shopId);
    await shopButton.click();

    let oldCount = await this.findByClassName(locator.amountClassName);
    let addCartButton = await this.driver.findElement(By.className(locator.addCartClassName));
    await addCartButton.click();
    let newCount = await this.findByClassName(locator.amountClassName);

    return ( oldCount != newCount);
};
Page.prototype.loginFailWithFull = async function () {
    AccountButton = await this.findById(locator.AccountId);
    await AccountButton.click();

    let username = await this.findById(locator.usernameId);
    let password = await this.findById(locator.passwordId);
    await this.write(username,fake.nameKeyword);
    await this.write(username,fake.passKeyWord);

    let loginButton = await this.findByName("login");
    await loginButton.click();

    let error = await this.findByClassName("woocommerce-error");

    return (await error.isEnabled());
};

Page.prototype.registerSuccess = async function () {
    AccountButton = await this.findById(locator.AccountId);
    await AccountButton.click();

    let reg_user = await this.findById(locator.reg_user);
    let reg_pass = await this.findById(locator.reg_pass);
    await this.write(reg_user,fake.email);
    await this.write(reg_pass,fake.passKeyWord);

    let registerButton = await this.findByName("register");
    await registerButton.isEnabled();
    await registerButton.click();
    return (true);
};

module.exports = Page;