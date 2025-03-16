import express from "express";
import { body } from "express-validator";
import { getAll, getById, add, update, del } from "../controllers/bookController.mjs";
import { requestErrorHandler } from "../middleware/errorMiddleware.mjs"

// Routesの定義
const router = express.Router();

// 以下、各リクエストに対する処理

router.get("/", requestErrorHandler(getAll));

router.get("/:id", requestErrorHandler(getById));

router.post(
  "/",
  body("title").notEmpty().withMessage("タイトルが未入力です。"),
  body("description").notEmpty().withMessage("概要が未入力です。"),
  body("comment").notEmpty().withMessage("内容が未入力です。"),
  body("rating").notEmpty().isInt({min: 1, max: 5}).withMessage("★1~5で評価してください。"),
  requestErrorHandler(add)
);

router.patch(
  "/",
  body("title").optional().notEmpty().withMessage("タイトルが未入力です。"),
  body("description").optional().notEmpty().withMessage("タイトルが未入力です。"),
  body("comment").optional().notEmpty().withMessage("タイトルが未入力です。"),
  body("rating").optional().notEmpty().isInt({min: 1, max: 5}).withMessage("★1~5で評価してください。"),
  requestErrorHandler(update)
);

router.delete("/:id", requestErrorHandler(del));

export default router;