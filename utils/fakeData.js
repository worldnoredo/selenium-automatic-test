const faker = require('faker');

module.exports = {
  nameKeyword: faker.name.findName(),
  passKeyWord: faker.name.firstName().toLowerCase + faker.name.lastName() + "!" + faker.random.alphaNumeric(8) ,
  email: faker.name.firstName() + faker.random.alphaNumeric(3) + "@gmail.com"
};