const { Faker, en, de, zh_CN } = require("@faker-js/faker");
const seedrandom = require("seedrandom");
const {times} = require("../utils/random")

exports.createBook = (seed, index, localeCode) => {
  let rng = seedrandom(`${seed}-${index}`);

  const faker = createFakerWithSeedAndLocale(rng.int32(), localeCode);

  const title = generateBookTitle(faker);
  const authorCount = rng() > 0.7 ? 2 : 1;
  const authors = Array.from({ length: authorCount }, () => faker.person.fullName());
  const publisher = `${faker.company.name()}, ${faker.date.between({
                                                  from: '1970-01-01',
                                                  to: '2025-07-01'
                                                }).getFullYear()}`;
  const isbn = faker.commerce.isbn();

  return {
    index,
    title,
    authors,
    publisher,
    isbn,
  };
}

exports.generateLikes = (avg, seed, index) => {
  const rng = seedrandom(`${seed}-likes-${index}`);
  const increment = times(avg, rng, (likes) => likes + 1);
  return increment(0);
}

exports.generateReviews = (avg, seed, index, localeCode) => {
  const rng = seedrandom(`${seed}-reviews-${index}`);
  const faker = createFakerWithSeedAndLocale(rng.int32(), localeCode);
  const maxWords = Math.floor(rng() * 10) + 10 ;
  const addReview = times(avg, rng, (acc) => {
    acc.push({
      text: `${capitalize(faker.word.words({ count: { min: 5, max: maxWords} }))}.`,
      author: faker.person.fullName(),
      company: faker.company.name(),
    });
    return acc;
  });

  return addReview([]);
}

const localeMap = {
  en: en,
  de: de,
  zh_cn: zh_CN,
};

function createFakerWithSeedAndLocale(seed, localeCode) {
  const faker = new Faker({ locale: localeMap[localeCode]});
  faker.seed(seed);
  return faker;
}

function generateBookTitle(faker) {
  const templates = [
    () => `${faker.word.adjective()} ${faker.word.noun()}`,
    () => `${faker.word.noun()} ${faker.word.preposition()} ${faker.word.noun()}`,
    () => `${faker.word.verb()} ${faker.word.noun()}`,
    () => `${faker.word.adverb()} ${faker.word.verb()}`,
    () => `${faker.word.noun()} ${faker.word.adjective()}`,
    () => `${faker.word.adjective()} ${faker.word.noun()} ${faker.word.preposition()} ${faker.word.noun()}`,
    () => `${faker.word.noun()}`
  ];

  const template = faker.helpers.arrayElement(templates);
  const title = template();
  return capitalize(title);
}

function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}
