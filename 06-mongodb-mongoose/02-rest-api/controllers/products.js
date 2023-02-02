const Product = require('../models/Product')
const mapProduct = require('../mappers/product')
let mongoose = require('mongoose')

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const {subcategory} = ctx.query;
  if (!subcategory) return next();
  const products = await Product.findOne({subcategory})
  if (!products) return ctx.body = {products: []}

  ctx.body = {products: [products].map(mapProduct)};

};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find({})
  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productById = async function productById(ctx, next) {
  if (!mongoose.isValidObjectId(ctx.params.id)) ctx.throw(400, 'Product not found')

  const products = await Product.findById(ctx.params.id)
  if (!products) ctx.throw(404, 'Product not found')
  
  ctx.body = {product: mapProduct(products)};
};
