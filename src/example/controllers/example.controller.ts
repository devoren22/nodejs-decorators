import { Service } from "typedi";
import { Body, Controller, Get, Middlewares, Param, Post, Req } from "../../express";
import { ExampleService } from "../services/example.service";
import { AppConfiguration, ConfigService } from "../../configuration/configuration";
import { IMiddleware } from "../../common/types";
import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@Service()
export class ExampleMiddleware1 implements IMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("enter middleware..");

    req.body["middleware1"] = "example1";

    next();
  }
}

@Service()
export class ExampleMiddleware2 implements IMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("enter middleware..");

    req.body["middleware2"] = "example2";

    next();
  }
}

@Controller("/example")
@Service()
export class ExampleController {
  constructor(
    private readonly _exampleService: ExampleService,
    private readonly _configService: ConfigService<AppConfiguration>
  ) {}

  @Get("/check/:value")
  async check(@Param("value") val: string) {
    console.log(val);

    return { val: `${this._exampleService.check()} -> ${val}`, config: this._configService.get("port") };
  }

  @Post("/check")
  @Middlewares(ExampleMiddleware1, ExampleMiddleware2)
  async addCheck(
    @Body() body: { firstName: string; lastName: string },
    @Body("firstName") firstNameAgain: string,
    @Body("lastName") lastNameAgain: string,
    @Req() request: Request
  ) {
    const { firstName, lastName } = body;

    return `${request.body["middleware1"]} ${request.body["middleware2"]} ${firstName} ${lastName} ${firstNameAgain} ${lastNameAgain}`;
  }
}
