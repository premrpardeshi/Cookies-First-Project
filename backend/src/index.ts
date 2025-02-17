import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import cors from "cors";
import cookieParser from "cookie-parser";

const secret = "choco";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

app.post("/signin", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const token = jwt.sign({ email, password }, secret);

  res.cookie("token", token);
  res.send("Signed In, Cookie set.");
});

app.get("/user", (req, res) => {
  const token = req.cookies.token;
  const result = jwt.verify(token, secret) as JwtPayload;
  const email = result.email;
  res.json({
    email,
  });
});

app.post("/logout", (req, res) => {
  res.cookie("token", "");
  res.json({
    msg: "Cookie deleted!",
  });
});

app.listen(6969, () => {
  console.log("Listening on Port 6969");
});
