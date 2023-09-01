import pino from "pino";
import pinoPretty from "pino-pretty";
const logger =
  process.env.NODE_ENV === "development"
    ? pino(
        pinoPretty({
          colorize: true,
        })
      )
    : pino();

export default logger;
