import mongoose from "mongoose";
import env from "dotenv";
env.config();

/**
 * DB接続（MONGO_DB）
 */
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(`${new Date().toLocaleString()} Database connected`))
.catch((err) => console.log("Database connection failed", err));