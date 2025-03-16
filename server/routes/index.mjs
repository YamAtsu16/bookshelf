import express from "express";
import booksRouter from "./bookRoutes.mjs"

const router = express.Router();

router.use("/book", booksRouter);

export default router;