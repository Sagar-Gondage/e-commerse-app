// const mongoose = require("mongoose");

// const reviewsSchema = mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     rating: { type: Number, required: true },
//     comment: { type: String, required: true },
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const productSchema = mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       required: true,
//       ref: "User",
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     brand: {
//       type: String,
//       required: true,
//     },
//     category: {
//       type: String,
//       required: true,
//       default: false,
//     },
//     description: {
//       type: String,
//       required: true,
//       default: false,
//     },
//     reviews: [reviewsSchema],

//     rating: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     numReviews: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     price: {
//       type: Number,
//       required: true,
//       default: 200,
//     },
//     countInStock: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model("Product", productSchema);

// module.exports = Product;

const mongoose = require("mongoose");

const reviewsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 5),
    },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      default: false,
    },
    description: {
      type: String,
      required: true,
      default: false,
    },
    reviews: [reviewsSchema],

    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: Math.floor(Math.random() * 10),
    },
    price: {
      type: Number,
      required: true,
      default: 200,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
