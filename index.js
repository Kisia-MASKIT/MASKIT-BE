import express from "express";
import userRoutes from "./srcs/user/user.route.js";
import videoRoutes from "./srcs/video/video.route.js"

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/videos", videoRoutes)

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
