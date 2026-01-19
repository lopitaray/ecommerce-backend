const Product = require("../models/Product");

// ADMIN: Add product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUBLIC: Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const {
      keyword,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 5
    } = req.query;

    let query = {};

    // 🔍 Search by name
    if (keyword) {
      query.name = { $regex: keyword, $options: "i" };
    }

    // 📂 Filter by category
    if (category) {
      query.category = category;
    }

    // 💰 Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // 📄 Pagination
    const skip = (page - 1) * limit;

    const products = await Product.find(query)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
