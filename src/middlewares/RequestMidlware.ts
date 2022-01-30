import { NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import logger from "../common/logger";

export class RequestMiddleware implements  NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const requestMsg = `method: ${req.method}, url: ${req.url}, query: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)}`;
    logger.log(requestMsg);

    res.on('close', () => {
      const { statusCode } = res;
      if (statusCode < 400) {
        logger.log(`Response code ${statusCode}`);
        return;
      } if (statusCode >= 400 && statusCode < 500) {
        logger.warn(`Response code ${statusCode}`);
        return;
      }

      logger.error(`Response code ${statusCode}, request - ${requestMsg}`);
    });

    next();
  }
}