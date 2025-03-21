import express from "express";
import apiRoutes from "./routes/index.mjs"
import "./config/db.mjs"
import cors from "cors"
import path from "path"
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT || 8080;

// ビルドされたReactコードをサーバーから取得する設定
app.use(express.static("build"));

app.use(express.json());

// オリジン間リソース共有（CORS）の制御
app.use(cors({ origin: "*"}));

// API
app.use("/api", apiRoutes);

// "/api"のパスに一致しなかったパスのGETメソッドはすべてbuild/index.htmlが返却されるよう設定
app.get("*", (req, res) => {
  const indexHtml = path.resolve("build", "index.html")
  res.sendFile(indexHtml);
})

// "/api"のパス不正の場合（12行目が呼び出されなかった場合）に呼ばれる
app.use((req, res) =>{
  res.status(404).json({ msg: "Page Not Found"})
});

// エラーハンドラー（requestErrorHandler）
app.use((err, req, res, next) => {
  if(res.headerSent) {
    return next(err);
  }
  res.status(500).json({ msg: "予期せぬエラーが発生しました。"});
})

// サーバー起動
app.listen(port, () => {
  console.log(
    `${new Date().toLocaleString()} Server Running\nhttp://localhost:${port}`
  );
});