const {createBook, generateLikes, generateReviews} = require('../models/bookModel');
const crypto = require('crypto');

const MAX_LIMIT = 10000000000;
const DEFAULT_SIZE = 20;

exports.getBooks =  async (req, res) => {
  const {
    seed = "12345",
    lang = "en",
    page = "0",
    likes = "0",
    reviews = "0",
    size = DEFAULT_SIZE,
  } = req.query;

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(size, 10);
  const avgLikes = parseFloat(likes);
  const avgReviews = parseFloat(reviews);
  const localeCode = lang.toLowerCase();
  const difference = DEFAULT_SIZE - pageSize;

  const books = [];

  try{
    for (let i = 0; i < pageSize; i++) {
      const index = pageNumber * pageSize + i + difference;
      const base = createBook(seed, index, localeCode);
      const likeCount = generateLikes(avgLikes, seed, index);
      const reviewList = generateReviews(avgReviews, seed, index, localeCode);

      books.push({
        ...base,
        likes: likeCount,
        reviews: reviewList,
      });
    }
    res.json(books);
  }catch(err){
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getRegions =  async (req, res) => {
  const regions = [
    { code: "en", label: "English (USA)" },
    { code: "de", label: "German (Germany)" },
    { code: "zh_CN", label: "Simplified Chinese (China)" },
  ];

  res.json(regions);
};

exports.generateSeed = async (req, res) => {
  const seed = crypto.randomInt(0, MAX_LIMIT);
  res.json({ seed });
};
