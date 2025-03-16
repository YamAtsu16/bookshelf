import Book from '../models/bookModel.mjs';

/**
 * 全件取得
 */
async function getAllBooks() {
  return await Book.find().sort({ updatedAt: -1 });
};

/**
 * IDによる検索取得
 * @param {*} id ID
 * @returns 検索結果
 */
async function getBookById(id) {
  return await Book.findById(id);
}

/**
 * 登録
 * @param {*} newBook 登録対象
 * @returns 登録結果
 */
async function addBook(newBook) {
  const book = new Book(newBook);
  await book.save();

  return book;
}

/**
 * 更新
 * @param {*} updateValue 更新データ
 * @param {*} target 更新対象
 * @returns 更新結果
 */
async function updateBook(updateValue) {
  const targetBook = await getBookById(updateValue._id);
  if (!targetBook) return null;

  const updateFields = ['title', 'description', 'comment', 'rating'];
  updateFields.forEach(field => {
    if (updateValue[field] !== undefined) {
      targetBook[field] = updateValue[field];
    }
  });

  await targetBook.save();
  return targetBook;
}

/**
 * 削除
 * @param {*} id ID
 * @returns 削除件数
 */
async function deleteBook(id) {
  const { deleteCount } = await Book.deleteOne({_id: new Object(id)});
  return deleteCount;
}

export { getAllBooks, getBookById, addBook, updateBook, deleteBook };

/* mongooseのCRUD操作 例 **********************************************************

【データ作成】
// パターン1
const newDoc = await Model.create({ field1: "value", field2: "value" });

// パターン2
const newDoc = new Model({ field1: "value", field2: "value" });
await newDoc.save();

【データ取得】
// すべて取得
const allDocs = await Model.find();

// IDで検索
const docById = await Model.findById("id");

// 1件取得
const docByCondition = await Model.findOne({ field1: "value" });

【データ更新】
// 1件更新
await Model.updateOne({ field1: "value" }, { field2: "new value" });

// 複数更新
await Model.updateMany({ field1: "value" }, { field2: "new value" });

// ID指定で更新（更新後のデータ取得）
await Model.findByIdAndUpdate("id", { field2: "new value" }, { new: true });

【データ削除】
// 1件削除
await Model.deleteOne({ field1: "value" });

// 複数削除
await Model.deleteMany({ field1: "value" });

// ID指定で削除
await Model.findByIdAndDelete("id");

********************************************************************************/
