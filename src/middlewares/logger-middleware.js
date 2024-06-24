import winston from "winston";

const log = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [new winston.transports.File({ filename: "logs.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("signin") || !req.url.includes("signup")) {
    const logData = {
      timestamp: new Date(),
      method: req.method,
      url: req.url,
      requestBody: req.body,
      queryParameters: req.query,
    };

    const formattedLogData = JSON.stringify(logData, null, 2); // Adding indentation for readability

    await log.info(formattedLogData);
    next();
  }
};

export default loggerMiddleware;
