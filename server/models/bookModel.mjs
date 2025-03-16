import { Schema, model } from "mongoose";

/**
 * Bookスキーマの定義
 */
const bookSchema = Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    enum: [1,2,3,4,5],
    required: true,
    get: (val) => Math.round(val),
    set: (val) => Math.round(val)
  }
}, {timestamps: true})

const Book = model("book", bookSchema);
export default Book;