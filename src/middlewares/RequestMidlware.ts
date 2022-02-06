import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class RequestMiddleware implements  NestMiddleware {
  private readonly logger = new Logger();

  use(req: Request, res: Response, next: () => void) {
    const requestMsg = `method: ${req.method}, url: ${req.url}, query: ${JSON.stringify(req.query)}, body: ${JSON.stringify(req.body)}`;
    this.logger.log(requestMsg);

    res.on('close', () => {
      const { statusCode } = res;
      if (statusCode < 400) {
        this.logger.log(`Response code ${statusCode}`);
        return;
      } if (statusCode >= 400 && statusCode < 500) {
        this.logger.warn(`Response code ${statusCode}`);
        return;
      }

      this.logger.error(`Response code ${statusCode}, request - ${requestMsg}`);
    });

    next();
  }
}