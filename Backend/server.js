import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import { connectDb } from "./src/config/db.js";

const PORT = process.env.PORT || 3000;
connectDb()
app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
});
