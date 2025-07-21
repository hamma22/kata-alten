const express = require("express");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const logger = require("./config/logger");
require("dotenv").config();

const { host, port } = require("./config/config");

const app = express();

const connectDB = require("./config/db");

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(morgan("dev"));

app.get("/", (_, res) => res.send("Server running"));

app.listen(port, () => {
  logger.info(`🚀 Server running at http://localhost:${port} `);
});

app.get("/healthcheck", (_, res) => {
  const uptimeSeconds = process.uptime();
  const startTime = new Date(Date.now() - uptimeSeconds * 1000).toISOString();

  res.status(200).send({
    config: {
      httpServer: {
        port,
        host,
      },
    },
    startTime,
  });
});

const apiRoutes = require("./routes/api");

app.use("/api", apiRoutes);

app.use(errorHandler);
