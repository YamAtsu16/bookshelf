import { validationResult } from 'express-validator';
import Book from '../models/bookModel.mjs';
import { getAllBooks, getBookById, addBook, updateBook, deleteBook } from '../services/bookService.mjs';

/**
 * 全件取得（GET /）
 * @param {*} req リクエスト
 * @param {*} res レスポンス
 * @returns 取得結果
 */
async function getAll(req, res) {
  const books = await getAllBooks();
  res.json(books);
}

/**
 * 検索取得（GET /:id）
 * @param {*} req リクエスト
 * @param {*} res レスポンス
 * @returns 検索結果
 */
async function getById(req, res) {
  const id = req.params.id;
  const book = await getBookById(id);

  if (book === null) return res.status(404).json({ msg: "Target Not Found"})

  res.json(book);
}

/**
 * 登録（POST /）
 * @param {*} req リクエスト
 * @param {*} res レスポンス
 * @returns 登録結果
 */
async function add(req, res) {
  // エラー処理（エラー定義はRoutes）
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array();
    res.status(400).json(error);
    return;
  }

  const result = await addBook(new Book(req.body));
  res.status(201).json(result);
}

/**
 * 更新（PATCH /）
 * @param {*} req リクエスト
 * @param {*} res レスポンス
 * @returns 更新結果
 */
async function update(req, res) {
  // エラー処理（エラー定義はRoutes）
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = errors.array();
    res.status(400).json(error);
    return;
  }

  await updateBook(new Book(req.body));
  res.json({"msg": "Update Succeeded"});
}

/**
 * 削除（DELETE /:id）
 * @param {*} req リクエスト
 * @param {*} res レスポンス
 * @returns 削除結果
 */
async function del(req, res) {
  const id = req.params.id;
  const deletedCount = await deleteBook(id);
  
  if (deletedCount === 0) return res.status(404).json({ msg: 'Target Book Not Found' });
  
  res.json({"msg": "Delete Succeeded"});
}

export { getAll, getById, add, update, del };
