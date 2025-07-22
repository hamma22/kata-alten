module.exports = {
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 5000,
  dbUri:
    process.env.DB_URI ||
    "mongodb+srv://hamma216:BbM7j4Hp0ve1JDwz@cluster0.55enr1c.mongodb.net/",
  jwtSecret:
    process.env.JWT_SECRET || "Y3g9nL92iLr5Xlm0vTO9A7T6JexgT7XxyDdN1c5x9e8",
};
