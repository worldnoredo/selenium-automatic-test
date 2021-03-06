let Page = require('../../lib/basePage');
const locator = require('./locator');
const fake = require('../../utils/fakeData');
const { Key } = require('selenium-webdriver');

const searchInputSelectorName = locator.searchInputSelectorName;
const searchButtonSelectorName = locator.searchButtonSelectorName;
const resultConfirmationSelectorId = locator.resultConfirmationId;

const fakeNameKeyword = fake.nameKeyword;

let searchInput, searchButton, resultStat;

Page.prototype.findInputAndButton = async function () {
  searchInput = await this.findByName(searchInputSelectorName);
  searchButton = await this.findByName(searchButtonSelectorName);

  const result = await this.driver.wait(async function () {
    const searchButtonText = await searchButton.getAttribute('value');
    const searchInputEnableFlag = await searchInput.isEnabled();

    return {
        inputEnabled: searchInputEnableFlag,
        buttonText: searchButtonText
    }
  }, 5000);
  return result;
};

Page.prototype.submitKeywordAndGetResult = async function() {
  await this.findInputAndButton();
  await this.write(searchInput, fakeNameKeyword + Key.ENTER);
  resultStat = await this.findById(resultConfirmationSelectorId);
  return await this.driver.wait(async function () {
    return await resultStat.getText();
  }, 5000);
};

module.exports = Page;